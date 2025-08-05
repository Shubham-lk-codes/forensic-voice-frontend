import React, { useState } from 'react';
import AudioUpload from './components/AudioUpload';
import ClipList from './components/ClipList';
import ComparisonPanel from './components/ComparisonPanel';
import './App.css';

function App() {
  const [selectedRecordings, setSelectedRecordings] = useState([]);
  const [activeTab, setActiveTab] = useState('upload');

  const handleRecordingSelect = (recording) => {
    const isSelected = selectedRecordings.some(r => r.id === recording.id);
    
    if (isSelected) {
      setSelectedRecordings(selectedRecordings.filter(r => r.id !== recording.id));
    } else if (selectedRecordings.length < 2) {
      setSelectedRecordings([...selectedRecordings, recording]);
    }
  };

  const handleUploadSuccess = (data) => {
    // Refresh the recordings list
    console.log('Upload successful:', data);
  };

  const clearSelection = () => {
    setSelectedRecordings([]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Forensic Voice Comparison System
              </h1>
              <p className="text-sm text-gray-600">
                Advanced voice analysis for forensic research and legal cases
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {selectedRecordings.length}/2 recordings selected
              </span>
              {selectedRecordings.length > 0 && (
                <button
                  onClick={clearSelection}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('upload')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'upload'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upload Recordings
            </button>
            <button
              onClick={() => setActiveTab('browse')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'browse'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Browse & Compare
            </button>
            <button
              onClick={() => setActiveTab('scrape')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'scrape'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Data Collection
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'upload' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Upload Forensic Voice Recordings
              </h2>
              <p className="text-gray-600 mb-6">
                Upload audio files with metadata for forensic voice analysis. 
                The system will automatically extract speaker embeddings and detect emotions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AudioUpload onUploadSuccess={handleUploadSuccess} />
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Upload Guidelines
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Supported formats: WAV, MP3, M4A</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Minimum duration: 3 seconds</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Clear speech with minimal background noise</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Provide accurate speaker ID and recording date</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Include source URL for traceability</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'browse' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Browse & Compare Recordings
              </h2>
              <p className="text-gray-600 mb-6">
                Select two recordings to perform forensic voice comparison with time gap analysis.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ClipList 
                onSelectRecording={handleRecordingSelect}
                selectedRecordings={selectedRecordings}
              />
              
              <ComparisonPanel selectedRecordings={selectedRecordings} />
            </div>
          </div>
        )}

        {activeTab === 'scrape' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Data Collection & Scraping
              </h2>
              <p className="text-gray-600 mb-6">
                Automatically collect voice recordings from PBS, VoxCeleb, and other sources for forensic analysis.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* PBS Scraping */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  PBS Voice Collection
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Collect interviews, speeches, and testimonies from PBS channels
                </p>
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch('http://127.0.0.1:5000/api/metadata/scrape/pbs', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          search_terms: ['interview', 'speech', 'testimony'],
                          max_videos: 3
                        })
                      });
                      const data = await response.json();
                      alert(`Scraped ${data.videos?.length || 0} PBS videos`);
                    } catch (error) {
                      alert('Error scraping PBS');
                    }
                  }}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Start PBS Scraping
                </button>
              </div>

              {/* VoxCeleb Scraping */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  VoxCeleb Dataset
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Access celebrity voice recordings for research purposes
                </p>
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch('http://127.0.0.1:5000/api/metadata/scrape/voxceleb', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ max_videos: 3 })
                      });
                      const data = await response.json();
                      alert(`Scraped ${data.videos?.length || 0} VoxCeleb samples`);
                    } catch (error) {
                      alert('Error scraping VoxCeleb');
                    }
                  }}
                  className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Start VoxCeleb Scraping
                </button>
              </div>

              {/* Full Scraping */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  Comprehensive Collection
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Run full scraping from all available sources
                </p>
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch('http://127.0.0.1:5000/api/metadata/scrape/full', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ max_videos_per_source: 2 })
                      });
                      const data = await response.json();
                      alert(`Scraped ${data.videos?.length || 0} total videos`);
                    } catch (error) {
                      alert('Error in full scraping');
                    }
                  }}
                  className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Run Full Scraping
                </button>
              </div>
            </div>

            {/* Research Information */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-900">
                Forensic Research Information
              </h3>
              <div className="text-sm text-blue-800 space-y-2">
                <p>
                  <strong>Purpose:</strong> This system is designed for forensic voice comparison research, 
                  particularly for legal cases involving voice identification over time.
                </p>
                <p>
                  <strong>Methodology:</strong> Uses ECAPA-TDNN embeddings for speaker recognition and 
                  Wav2Vec2 for emotion detection, providing comprehensive voice analysis.
                </p>
                <p>
                  <strong>Time Gap Analysis:</strong> Analyzes how time differences between recordings 
                  affect voice comparison reliability, crucial for forensic applications.
                </p>
                <p>
                  <strong>Legal Considerations:</strong> All collected data should be used in accordance 
                  with applicable laws and regulations. Ensure proper consent and data handling procedures.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
