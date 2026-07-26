import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      navigate("/admin");
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${API_URL}/api/admin/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminRole", data.admin.role);

      navigate("/admin");

    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={login}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >

        <h2 className="text-3xl font-bold mb-6 text-darkBlue">
          Admin Login
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-600">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email Address"
          className="w-full mb-4 p-3 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-darkBlue text-white py-3 rounded-lg hover:opacity-90 transition"
        >
          {loading ? "Signing In..." : "Login"}
        </button>

      </form>

    </div>
  );
};

export default AdminLogin;