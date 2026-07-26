import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-lemon text-darkBlue shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide"
          onClick={closeMenu}
        >
          MediTrust Hospital
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-8 font-medium">
          
          <li>
            <Link
              to="/"
              className={`hover:opacity-70 transition ${
                location.pathname === "/" ? "font-bold" : ""
              }`}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/doctors"
              className={`hover:opacity-70 transition ${
                location.pathname === "/doctors" ? "font-bold" : ""
              }`}
            >
              Doctors
            </Link>
          </li>

          <li>
            <Link
              to="/departments"
              className={`hover:opacity-70 transition ${
                location.pathname === "/departments" ? "font-bold" : ""
              }`}
            >
              Departments
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className={`hover:opacity-70 transition ${
                location.pathname === "/contact" ? "font-bold" : ""
              }`}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* CTA */}
        <Link
          to="/appointment"
          className="hidden md:block bg-darkBlue text-white px-5 py-2 rounded-lg hover:bg-opacity-90 transition"
        >
          Book Appointment
        </Link>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-lemon px-6 pb-4">
          <ul className="flex flex-col gap-4 font-medium">
            
            <li>
              <Link to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>

            <li>
              <Link to="/doctors" onClick={closeMenu}>
                Doctors
              </Link>
            </li>

            <li>
              <Link to="/departments" onClick={closeMenu}>
                Departments
              </Link>
            </li>

            <li>
              <Link to="/contact" onClick={closeMenu}>
                Contact
              </Link>
            </li>

            <li>
              <Link
                to="/appointment"
                className="bg-darkBlue text-white px-4 py-2 rounded-lg w-fit"
                onClick={closeMenu}
              >
                Book Appointment
              </Link>
            </li>

          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;