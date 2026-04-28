import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white shadow">
      
      <h1 className="text-xl font-bold">QR Library</h1>

      <div className="flex gap-6">
        <Link to="/dashboard" className="hover:text-yellow-400">
          Dashboard
        </Link>

        <Link to="/scanner" className="hover:text-yellow-400">
          Scan
        </Link>

        {user?.role === "admin" && (
          <Link to="/admin" className="hover:text-yellow-400">
            Admin
          </Link>
        )}
          <Link to="/admin/qrcodes" className="hover:text-yellow-400">
            QR Codes
          </Link>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}