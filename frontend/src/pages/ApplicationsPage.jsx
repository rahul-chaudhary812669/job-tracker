import { useEffect, useState } from "react";
import AddApplicationModal from "../components/AddApplicationModal";
import EditApplicationModal from "../components/EditApplicationModal";
import {
  createApplications,
  deleteApplications,
  getApplications,
  updateApplications,
} from "../api/applications";

const SAMPLE_DATA = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineer",
    status: "Interview",
    date: "2026-03-28",
  },
  {
    id: 2,
    company: "Netflix",
    role: "Frontend Developer",
    status: "Applied",
    date: "2026-03-30",
  },
  {
    id: 3,
    company: "Amazon",
    role: "Java Developer",
    status: "Rejected",
    date: "2026-03-25",
  },
];

const STATUS_COLORS = {
  Applied: "bg-blue-100 text-blue-700",
  Interview: "bg-yellow-100 text-yellow-700",
  Offer: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

function ApplicationPage() {
  const [applications, setApplications] = useState(SAMPLE_DATA);
  const [showModal, setShowModal] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await getApplications();
      setApplications(response.data);
    } catch (err) {
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (newApp) => {
    try {
      const respone = await createApplications(newApp);
      setApplications([...applications, respone.data]);
    } catch (err) {
      setError("Failed to add application");
    }
  };

  const handleEdit = async (updatedApp) => {
    try {
      const response = await updateApplications(updatedApp.id, updatedApp);
      setApplications(
        applications.map((app) =>
          app.id === updatedApp.id ? updatedApp : app,
        ),
      );
    } catch (err) {
      setError("Failed to update application");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteApplications(id);
      setApplications(applications.filter((app) => app.id !== id));
    } catch (err) {
      setError("Failed to delete application");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Applications{" "}
            </h1>
            <p className="text-gray-500 text-sm">
              All your job applications in one place
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Application
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500 text-sm py-12">
            Loading...
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium">
                    Company
                  </th>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium">
                    Role
                  </th>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium">
                    Date
                  </th>
                  <th className="text-left px-6 py-3 text-gray-600 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {app.company}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-600">
                      {app.role}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[app.status]}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-600">
                      {app.date}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setEditingApp(app)}
                        className="text-blue-600 hover:underline text-xs mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="text-red-500 hover:underline text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <AddApplicationModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}

      {editingApp && (
        <EditApplicationModal
          application={editingApp}
          onClose={() => setEditingApp(null)}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}

export default ApplicationPage;
