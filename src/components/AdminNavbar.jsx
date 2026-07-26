import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <nav className="bg-darkBlue text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-xl font-bold">
          Admin Dashboard
        </h1>

        <div className="flex gap-6 items-center">

          <Link to="/admin" className="hover:opacity-70">
            Appointments
          </Link>

          <Link to="/" className="hover:opacity-70">
            View Website
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;