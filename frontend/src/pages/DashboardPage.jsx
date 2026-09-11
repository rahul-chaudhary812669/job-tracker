import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getApplications } from "../api/applications";

function DashboardPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const getCount = (status) =>
    applications.filter((app) => app.status === status).length;

  const stats = [
    {
      label: "Total Applied",
      value: applications.length,
      color: "text-blue-600",
    },
    {
      label: "Interviews",
      value: getCount("Interview"),
      color: "text-yellow-500",
    },
    { label: "Offers", value: getCount("Offer"), color: "text-green-600" },
    { label: "Rejected", value: getCount("Rejected"), color: "text-red-500" },
  ];

  const kanbanColumns = ["Applied", "Interview", "Offer", "Rejected"];

  const STATUS_COLORS = {
    Applied: "bg-blue-100 text-blue-700",
    Interview: "bg-yellow-100 text-yellow-700",
    Offer: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const fetchApplications = async () => {
    try {
      const respone = await getApplications();
      setApplications(respone.data);
    } catch (err) {
      console.err("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
        <p className="text-gray-500 text-sm mb-6">
          Track your job hunt progress
        </p>

        {loading ? (
          <div className="text-center text-gray-500 text-sm py-12">
            Loading...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white border border-gray-200 rounded-xl p-4"
                >
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-blue-600 mt-1">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {kanbanColumns.map((col) => (
                <div
                  key={col}
                  className="bg-white border border-gray-200 rounded-xl p-4 min-h-64"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-gray-700 mb-3">
                      {col}
                    </h2>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                      {getCount(col)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {applications
                      .filter((app) => app.status == col)
                      .map((app) => (
                        <div
                          key={app.id}
                          className="border border-gray-100 rounded-lg p-3 bg-gray-50"
                        >
                          <p className="text-sm font-medium text-gray-800">
                            {app.company}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {app.role}
                          </p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full mt-2 inline-block font-medium ${STATUS_COLORS[col]}`}
                          >
                            {app.date}
                          </span>
                        </div>
                      ))}

                    {getCount(col) === 0 && (
                      <p className="text-xs text-gray-400"> No applications</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
