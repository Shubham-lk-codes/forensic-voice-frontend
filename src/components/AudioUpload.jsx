import { useState } from "react";

export default function AudioUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 transition hover:shadow-xl">
      <h2 className="text-xl font-bold text-gray-800 mb-4">🎙️ Upload Audio Clip</h2>

      <label
        htmlFor="audio-upload"
        className="flex items-center justify-center w-full h-40 px-4 transition bg-gray-50 border-2 border-dashed rounded-xl cursor-pointer border-gray-300 hover:border-blue-500 hover:bg-blue-50"
      >
        <div className="text-center">
          <p className="text-sm text-gray-500">Drag & drop your audio file here</p>
          <p className="mt-1 text-base text-blue-600 font-medium">or click to browse</p>
          {selectedFile && (
            <p className="mt-2 text-sm text-green-600">✅ Selected: {selectedFile.name}</p>
          )}
        </div>
        <input
          id="audio-upload"
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <button
        className="mt-5 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={!selectedFile}
      >
        Upload
      </button>
    </div>
  );
}
