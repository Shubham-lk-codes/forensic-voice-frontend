import React, { useState, useEffect } from 'react';

const ClipList = ({ onSelectRecording, selectedRecordings = [] }) => {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter states
  const [filters, setFilters] = useState({
    speaker_id: '',
    emotion: '',
    source_platform: '',
    date_from: '',
    date_to: ''
  });

  const [stats, setStats] = useState({
    total_recordings: 0,
    unique_speakers: 0,
    platforms: [],
    emotions: []
  });

  useEffect(() => {
    fetchRecordings();
    fetchStats();
  }, [filters]);

  const fetchRecordings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await fetch(`http://127.0.0.1:5000/api/audio/recordings?${params}`);
      const data = await response.json();

      if (response.ok) {
        setRecordings(data);
      } else {
        setError(data.error || 'Failed to fetch recordings');
      }
    } catch (err) {
      setError('Error fetching recordings');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/audio/recordings/stats');
      const data = await response.json();
      
      if (response.ok) {
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      speaker_id: '',
      emotion: '',
      source_platform: '',
      date_from: '',
      date_to: ''
    });
  };

  const isRecordingSelected = (recordingId) => {
    return selectedRecordings.some(r => r.id === recordingId);
  };

  const handleRecordingClick = (recording) => {
    if (onSelectRecording) {
      onSelectRecording(recording);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Stats Bar */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-gray-900">{stats.total_recordings}</div>
            <div className="text-gray-600">Total Recordings</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900">{stats.unique_speakers}</div>
            <div className="text-gray-600">Unique Speakers</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900">{stats.platforms.length}</div>
            <div className="text-gray-600">Platforms</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900">{stats.emotions.length}</div>
            <div className="text-gray-600">Emotions</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold mb-3">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Speaker ID</label>
            <input
              type="text"
              value={filters.speaker_id}
              onChange={(e) => handleFilterChange('speaker_id', e.target.value)}
              placeholder="Filter by speaker..."
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Emotion</label>
            <select
              value={filters.emotion}
              onChange={(e) => handleFilterChange('emotion', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">All Emotions</option>
              {stats.emotions.map(emotion => (
                <option key={emotion} value={emotion}>{emotion}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
            <select
              value={filters.source_platform}
              onChange={(e) => handleFilterChange('source_platform', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">All Platforms</option>
              {stats.platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
            <input
              type="date"
              value={filters.date_from}
              onChange={(e) => handleFilterChange('date_from', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
            <input
              type="date"
              value={filters.date_to}
              onChange={(e) => handleFilterChange('date_to', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
        
        <button
          onClick={clearFilters}
          className="mt-3 px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Clear Filters
        </button>
      </div>

      {/* Recordings List */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3">
          Recordings ({recordings.length})
        </h3>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {recordings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No recordings found. Try adjusting your filters or upload some recordings.
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recordings.map((recording) => (
              <div
                key={recording.id}
                onClick={() => handleRecordingClick(recording)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  isRecordingSelected(recording.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-gray-900">
                        {recording.speaker_id}
                      </span>
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {recording.source_platform}
                      </span>
                      {recording.emotion && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                          {recording.emotion}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Date: {formatDate(recording.date)}</div>
                      <div>Duration: {formatDuration(recording.duration)}</div>
                      {recording.url && (
                        <div className="truncate">
                          <a 
                            href={recording.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Source
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    ID: {recording.id}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClipList;
