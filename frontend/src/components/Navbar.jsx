import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Applications", path: "/applications" },
  { label: "AI Advisor", path: "/ai-advisor" },
];

function Navbar() {
  const location = useLocation();

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAuth =
    location.pathname === "/login" || location.pathname === "/register";

  if (isAuth) return null;

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link to="/dashboard" className="text-xl font-bold text-blue-600">
        JobTracker
      </Link>
      {/* <div className="flex gap-4">
        <Link to="/login" className="text-gray-600 hover:text-blue-600 text-sm">
          Login
        </Link>
        <Link
          to="/register"
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Register
        </Link>
      </div> */}

      <div className="flex items-center gap-6">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm font-medium transition ${
              location.pathname == link.path
                ? "text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            {" "}
            {link.label}
          </Link>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="text-sm text-red-500 hover:text-red-700 font-medium transition"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
