// export default function ResultBox({ result }) {
//   return (
//     <div className="mt-4 p-4 border rounded-lg shadow bg-white">
//       <h3 className="text-lg font-bold">Comparison Result</h3>
//       <p><b>Similarity Score:</b> {result.score}</p>
//       <p><b>Verdict:</b> {result.verdict}</p>
//     </div>
//   );
// }


export default function ResultBox({ result }) {
  if (!result) return null;

  const { similarityScore, emotion1, emotion2, matchStatus } = result;

  return (
    <div className="mt-6 p-6 rounded-xl shadow-md border bg-white">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Comparison Result</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-semibold text-gray-700 mb-1">Clip 1 Emotion</h4>
          <p className="text-gray-900">{emotion1}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-semibold text-gray-700 mb-1">Clip 2 Emotion</h4>
          <p className="text-gray-900">{emotion2}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
        <div>
          <p className="text-gray-600 text-sm">Similarity Score</p>
          <p className="text-2xl font-semibold text-blue-700">{similarityScore}%</p>
        </div>

        <div className="mt-4 sm:mt-0 px-4 py-2 rounded-lg font-medium
          text-white
          bg-gradient-to-r from-indigo-600 to-purple-600
          shadow-md">
          {matchStatus}
        </div>
      </div>
    </div>
  );
}
