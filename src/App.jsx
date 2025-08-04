import { useState } from "react";
import AudioUpload from "./components/AudioUpload";
import ClipFilter from "./components/ClipFilter";
import ClipList from "./components/ClipList";
import ComparisonPanel from "./components/ComparisonPanel";
import ResultBox from "./components/ResultBox";
import { clips } from "./data/mockData";

function App() {
  const [filteredClips, setFilteredClips] = useState(clips);
  const [selectedClips, setSelectedClips] = useState([]);
  const [result, setResult] = useState(null);

  const handleFilter = (filters) => {
    const filtered = clips.filter((clip) => {
      return (
        (!filters.speakerId || clip.speakerId === filters.speakerId) &&
        (!filters.date || clip.date === filters.date) &&
        (!filters.emotion || clip.emotion === filters.emotion)
      );
    });
    setFilteredClips(filtered);
  };

  const handleCompare = () => {
    if (selectedClips.length === 2) {
      const [a, b] = selectedClips;
      const same = a.speakerId === b.speakerId;
      const score = same ? "0.92" : "0.33";
      setResult({ score, verdict: same ? "Same Speaker" : "Different Speaker" });
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 font-sans">
      <h1 className="text-2xl font-bold text-center">🎤 Forensic Voice Comparison</h1>
      <AudioUpload />
      <ClipFilter onFilter={handleFilter} />
      <ClipList clips={filteredClips} selected={selectedClips} setSelected={setSelectedClips} />
      <ComparisonPanel selected={selectedClips} onCompare={handleCompare} />
      {result && <ResultBox result={result} />}
    </div>
  );
}

export default App;
