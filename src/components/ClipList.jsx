export default function ClipList({ clips, selected, setSelected }) {
  const toggleSelect = (clip) => {
    if (selected.find((c) => c.id === clip.id)) {
      setSelected(selected.filter((c) => c.id !== clip.id));
    } else if (selected.length < 2) {
      setSelected([...selected, clip]);
    }
  };

  const isSelected = (clip) => selected.some((c) => c.id === clip.id);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {clips.map((clip) => (
        <div
          key={clip.id}
          onClick={() => toggleSelect(clip)}
          className={`p-5 rounded-xl border shadow-sm cursor-pointer transition duration-200 ease-in-out
            ${isSelected(clip) ? "bg-green-100 border-green-500 shadow-md" : "bg-white hover:shadow-lg"}
          `}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{clip.filename}</h3>

          <ul className="text-sm text-gray-600 space-y-1">
            <li><span className="font-medium text-gray-700">Speaker:</span> {clip.speakerId}</li>
            <li><span className="font-medium text-gray-700">Date:</span> {clip.date}</li>
            <li><span className="font-medium text-gray-700">Emotion:</span> {clip.emotion}</li>
          </ul>

          {isSelected(clip) && (
            <div className="mt-3 inline-block px-2 py-1 text-xs bg-green-600 text-white rounded-md">
              Selected
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
