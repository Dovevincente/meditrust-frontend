import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// Pages
import Hero from "./components/Hero";
import Departments from "./components/Departments";
import Doctors from "./components/Doctors";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

// Home Page Layout
function Home() {
  return (
    <>
      <Hero />
      <Departments />
      <Doctors />
    </>
  );
}

// Simple admin protection
const isAdmin = () => {
  return localStorage.getItem("adminToken");
};

function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* PUBLIC NAVBAR (hidden on admin pages) */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/contact" element={<Contact />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* PROTECTED ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            isAdmin() ? <Admin /> : <Navigate to="/admin-login" />
          }
        />

        {/* 404 PAGE */}
        <Route
          path="*"
          element={
            <h1 className="text-center text-4xl py-20">
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
    </>
  );
}

export default App;