export default function ComparisonPanel({ selected, onCompare }) {
  const isEnabled = selected.length === 2;

  return (
    <div className="flex justify-center items-center mt-6">
      <button
        onClick={onCompare}
        disabled={!isEnabled}
        className={`px-6 py-2 md:px-8 md:py-3 rounded-xl font-semibold shadow-sm transition-all duration-200
          ${isEnabled
            ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        Compare Selected Clips
      </button>
    </div>
  );
}
