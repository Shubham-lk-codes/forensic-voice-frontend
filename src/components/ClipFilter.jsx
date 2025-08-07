import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

export default function ClipFilter({ onFilter }) {
  const [filters, setFilters] = useState({ speakerId: "", date: "", emotion: "" });
  const [speakerOptions, setSpeakerOptions] = useState([]);
  const [emotionOptions, setEmotionOptions] = useState([]);

  useEffect(() => {
    // Fetch speakers
    fetch(`${API_BASE}/audio/speakers`).then(res => res.json()).then(setSpeakerOptions);
    // Fetch emotions
    fetch(`${API_BASE}/audio/emotions`).then(res => res.json()).then(setEmotionOptions);
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">🔍 Filter Audio Clips</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="speakerId" className="block text-sm font-medium text-gray-600 mb-1">
            Speaker ID
          </label>
          <select
            id="speakerId"
            name="speakerId"
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.speakerId}
          >
            <option value="">All Speakers</option>
            {speakerOptions.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-600 mb-1">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="emotion" className="block text-sm font-medium text-gray-600 mb-1">
            Emotion
          </label>
          <select
            id="emotion"
            name="emotion"
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.emotion}
          >
            <option value="">All Emotions</option>
            {emotionOptions.map(e => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-right">
        <button
          onClick={() => onFilter(filters)}
          className="inline-block bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
