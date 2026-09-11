import { useState } from "react";
import { getResumeTips } from "../api/ai";

function AiAdvisorPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    setError("");

    try {
      const response = await getResumeTips(jobDescription);
      setResult(response.data.tips);
    } catch (err) {
      setError("Failed to get AI tips, Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          AI Resume Advisor
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Paste a job description and get started and get tailored resume tips
          powered by Gemini AI
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Job description
            </label>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              rows={8}
              className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus: ring-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!jobDescription || loading}
            className="bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Analyzing..." : "Get Resume Tips"}
          </button>
        </form>

        {result && (
          <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">
              AI Suggestions
            </h2>
            <div className="flex flex-col gap-3">
              {result
                .split("\n")
                .filter(
                  (line) => line.trim() !== "" && /^\d+\./.test(line.trim()),
                )
                .map((line, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <span className="min-w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                      {index + 1}
                    </span>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {line.replace(/^\d+\.\s\*?\*?/, "").replace(/\*\*/g, "")}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AiAdvisorPage;
