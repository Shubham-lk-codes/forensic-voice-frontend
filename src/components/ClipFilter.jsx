import { useState } from "react";

export default function ClipFilter({ onFilter }) {
  const [filters, setFilters] = useState({ speakerId: "", date: "", emotion: "" });

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
          <input
            id="speakerId"
            name="speakerId"
            type="text"
            placeholder="Enter Speaker ID"
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
          >
            <option value="">All Emotions</option>
            <option value="neutral">Neutral</option>
            <option value="happy">Happy</option>
            <option value="angry">Angry</option>
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
