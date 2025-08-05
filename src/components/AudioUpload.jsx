import React, { useState } from 'react';

const AudioUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [speakerId, setSpeakerId] = useState('');
  const [recordingDate, setRecordingDate] = useState('');
  const [url, setUrl] = useState('');
  const [sourcePlatform, setSourcePlatform] = useState('uploaded');
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('audio/')) {
      setFile(selectedFile);
      setMessage('');
    } else {
      setMessage('Please select a valid audio file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file || !speakerId || !recordingDate) {
      setMessage('Please fill in all required fields');
      return;
    }

    setIsUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('speaker_id', speakerId);
    formData.append('date', recordingDate);
    formData.append('url', url);
    formData.append('source_platform', sourcePlatform);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/audio/recordings', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Recording uploaded and processed successfully!');
        setFile(null);
        setSpeakerId('');
        setRecordingDate('');
        setUrl('');
        setSourcePlatform('uploaded');
        if (onUploadSuccess) {
          onUploadSuccess(data);
        }
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Forensic Voice Recording</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Audio File *
          </label>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Speaker ID *
          </label>
          <input
            type="text"
            value={speakerId}
            onChange={(e) => setSpeakerId(e.target.value)}
            placeholder="e.g., speaker_001, john_doe"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recording Date *
          </label>
          <input
            type="date"
            value={recordingDate}
            onChange={(e) => setRecordingDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/video"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source Platform
          </label>
          <select
            value={sourcePlatform}
            onChange={(e) => setSourcePlatform(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="uploaded">Uploaded</option>
            <option value="PBS">PBS</option>
            <option value="VoxCeleb">VoxCeleb</option>
            <option value="YouTube">YouTube</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isUploading || !file}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isUploading || !file
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isUploading ? 'Processing...' : 'Upload & Process'}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-md ${
          message.includes('Error') 
            ? 'bg-red-100 text-red-700 border border-red-300' 
            : 'bg-green-100 text-green-700 border border-green-300'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AudioUpload;
