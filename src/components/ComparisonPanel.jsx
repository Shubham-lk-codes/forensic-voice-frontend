import React, { useState, useEffect } from 'react';

const ComparisonPanel = ({ selectedRecordings = [] }) => {
  const [comparisonResult, setComparisonResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeGapAnalysis, setTimeGapAnalysis] = useState(null);

  useEffect(() => {
    if (selectedRecordings.length === 2) {
      performComparison();
    } else {
      setComparisonResult(null);
    }
  }, [selectedRecordings]);

  const performComparison = async () => {
    if (selectedRecordings.length !== 2) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/audio/recordings/compare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recording1_id: selectedRecordings[0].id,
          recording2_id: selectedRecordings[1].id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setComparisonResult(data);
        fetchTimeGapAnalysis();
      } else {
        setError(data.error || 'Failed to compare recordings');
      }
    } catch (err) {
      setError('Error performing comparison');
    } finally {
      setLoading(false);
    }
  };

  const fetchTimeGapAnalysis = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/audio/recordings/analysis');
      const data = await response.json();
      
      if (response.ok) {
        setTimeGapAnalysis(data.time_gap_analysis);
      }
    } catch (err) {
      console.error('Error fetching time gap analysis:', err);
    }
  };

  const getSimilarityColor = (score) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSimilarityLabel = (score) => {
    if (score >= 0.8) return 'High Similarity';
    if (score >= 0.6) return 'Moderate Similarity';
    return 'Low Similarity';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTimeGap = (days) => {
    if (days === 0) return 'Same day';
    if (days === 1) return '1 day';
    if (days < 30) return `${days} days`;
    if (days < 365) return `${Math.floor(days / 30)} months`;
    return `${Math.floor(days / 365)} years`;
  };

  if (selectedRecordings.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Voice Comparison</h2>
        <div className="text-center py-8 text-gray-500">
          Select two recordings to compare their voice characteristics
        </div>
      </div>
    );
  }

  if (selectedRecordings.length === 1) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Voice Comparison</h2>
        <div className="text-center py-8 text-gray-500">
          Select one more recording to perform comparison
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Selected Recording:</h3>
          <div className="text-sm text-blue-800">
            <div><strong>Speaker:</strong> {selectedRecordings[0].speaker_id}</div>
            <div><strong>Date:</strong> {formatDate(selectedRecordings[0].date)}</div>
            <div><strong>Emotion:</strong> {selectedRecordings[0].emotion || 'N/A'}</div>
            <div><strong>Platform:</strong> {selectedRecordings[0].source_platform}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Forensic Voice Comparison</h2>
        
        {/* Selected Recordings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {selectedRecordings.map((recording, index) => (
            <div key={recording.id} className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">
                Recording {index + 1}
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div><strong>Speaker:</strong> {recording.speaker_id}</div>
                <div><strong>Date:</strong> {formatDate(recording.date)}</div>
                <div><strong>Emotion:</strong> {recording.emotion || 'N/A'}</div>
                <div><strong>Platform:</strong> {recording.source_platform}</div>
                <div><strong>Duration:</strong> {recording.duration ? `${Math.floor(recording.duration / 60)}:${(recording.duration % 60).toString().padStart(2, '0')}` : 'N/A'}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Results */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Analyzing voice characteristics...</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {comparisonResult && (
          <div className="space-y-6">
            {/* Similarity Score */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Similarity Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getSimilarityColor(comparisonResult.similarity_score)}`}>
                    {(comparisonResult.similarity_score * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Similarity Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatTimeGap(comparisonResult.time_gap_days)}
                  </div>
                  <div className="text-sm text-gray-600">Time Gap</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {getSimilarityLabel(comparisonResult.similarity_score)}
                  </div>
                  <div className="text-sm text-gray-600">Assessment</div>
                </div>
              </div>
            </div>

            {/* Detailed Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Recording 1 Details</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div><strong>Speaker:</strong> {comparisonResult.recording1.speaker_id}</div>
                  <div><strong>Date:</strong> {formatDate(comparisonResult.recording1.date)}</div>
                  <div><strong>Emotion:</strong> {comparisonResult.recording1.emotion || 'N/A'}</div>
                  <div><strong>Platform:</strong> {comparisonResult.recording1.source_platform}</div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Recording 2 Details</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div><strong>Speaker:</strong> {comparisonResult.recording2.speaker_id}</div>
                  <div><strong>Date:</strong> {formatDate(comparisonResult.recording2.date)}</div>
                  <div><strong>Emotion:</strong> {comparisonResult.recording2.emotion || 'N/A'}</div>
                  <div><strong>Platform:</strong> {comparisonResult.recording2.source_platform}</div>
                </div>
              </div>
            </div>

            {/* Forensic Assessment */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Forensic Assessment</h4>
              <div className="text-sm text-blue-800 space-y-2">
                <div>
                  <strong>Similarity Level:</strong> {getSimilarityLabel(comparisonResult.similarity_score)}
                </div>
                <div>
                  <strong>Time Gap Impact:</strong> {comparisonResult.time_gap_days > 365 ? 
                    'Significant time gap may affect reliability' : 
                    'Reasonable time gap for comparison'}
                </div>
                <div>
                  <strong>Recommendation:</strong> {
                    comparisonResult.similarity_score >= 0.8 ? 
                    'High confidence in same speaker' :
                    comparisonResult.similarity_score >= 0.6 ?
                    'Moderate confidence - additional analysis recommended' :
                    'Low confidence - different speakers likely'
                  }
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Time Gap Analysis */}
        {timeGapAnalysis && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Time Gap Analysis</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {Object.entries(timeGapAnalysis).map(([range, data]) => (
                <div key={range} className="text-center">
                  <div className="font-semibold text-gray-900">{range.replace('_', ' ')}</div>
                  <div className="text-gray-600">{data.count} comparisons</div>
                  <div className="text-blue-600 font-medium">
                    {(data.avg_similarity * 100).toFixed(1)}% avg
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-600">
              This analysis shows how time gaps affect similarity scores across all comparisons in the database.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonPanel;
