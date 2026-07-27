import { useEffect, useState } from "react";
import axios from "axios";
import {
  Calendar,
  Trash2,
  Phone,
  Mail,
  Building2,
  Users,
  RefreshCw,
  UserCheck,
  Clock,
  Search,
  CheckCircle,
  LogOut,
  Eye,
} from "lucide-react";

// Doctors Data
const doctorsList = [
  { id: 1, name: "Dr. John Carter", specialty: "Senior Cardiologist", experience: "15+ Years", status: "Available" },
  { id: 2, name: "Dr. Sarah Williams", specialty: "Neurologist", experience: "12+ Years", status: "On Duty" },
  { id: 3, name: "Dr. Michael Smith", specialty: "Pediatrician", experience: "10+ Years", status: "Available" },
  { id: 4, name: "Dr. Emily Brown", specialty: "Orthopedic Surgeon", experience: "14+ Years", status: "In Surgery" },
  { id: 5, name: "Dr. Aisha Khan", specialty: "Gynecologist", experience: "11+ Years", status: "Available" },
  { id: 6, name: "Dr. David Okon", specialty: "General Physician", experience: "18+ Years", status: "Available" },
];

// Dummy Patients Data
const patientsList = [
  {
    id: 1,
    name: "Mrs. Fatima Adebayo",
    age: 34,
    gender: "Female",
    phone: "+234 803 456 7890",
    email: "fatima.adebayo@email.com",
    lastVisit: "2025-06-02",
    condition: "Hypertension",
  },
  {
    id: 2,
    name: "Mr. Chukwudi Okoro",
    age: 47,
    gender: "Male",
    phone: "+234 809 123 4567",
    email: "c.okoro@email.com",
    lastVisit: "2025-06-05",
    condition: "Diabetes Type 2",
  },
  {
    id: 3,
    name: "Miss Aisha Bello",
    age: 12,
    gender: "Female",
    phone: "+234 901 233 5678",
    email: "aisha.bello@email.com",
    lastVisit: "2025-05-28",
    condition: "Asthma",
  },
  {
    id: 4,
    name: "Mr. Emmanuel Okafor",
    age: 65,
    gender: "Male",
    phone: "+234 807 890 1234",
    email: "emmanuel.o@email.com",
    lastVisit: "2025-06-06",
    condition: "Arthritis",
  },
];

const Admin = () => {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("appointments");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


const fetchAppointments = async () => {
  try {
    setLoading(true);

    const res = await axios.get(
      `${API_URL}/api/appointments`,
      getAuthHeaders()
    );

    // Backend returns {success:true, data:[]}
    setAppointments(res.data.data || []);

  } catch (error) {
    console.error(
      "Fetch appointments error:",
      error.response?.data || error.message
    );

    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin-login";
    }

  } finally {
    setLoading(false);
  }
};


const deleteAppointment = async (id) => {

  if (!window.confirm("Delete this appointment permanently?")) return;

  try {

    await axios.delete(
      `${API_URL}/api/appointments/${id}`,
      getAuthHeaders()
    );

    setAppointments((prev) =>
      prev.filter((item) => item._id !== id)
    );

  } catch (error) {

    console.error(
      "Delete error:",
      error.response?.data || error.message
    );

    alert("Failed to delete");

  }
};


const updateStatus = async (id, status) => {

  try {

    await axios.patch(
      `${API_URL}/api/appointments/${id}`,
      { status },
      getAuthHeaders()
    );

    fetchAppointments();

  } catch (error) {

    console.error(
      "Update error:",
      error.response?.data || error.message
    );

    alert("Failed to update status");

  }
};


const handleLogout = () => {

  if (window.confirm("Are you sure you want to logout?")) {

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");

    window.location.href = "/admin-login";

  }

};
  useEffect(() => {
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter((item) => {
    const matchesSearch = 
      item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.doctor?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDepartment === "all" || item.department === filterDepartment;
    return matchesSearch && matchesDept;
  });

  const departments = ["all", ...new Set(appointments.map(a => a.department))];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 bg-darkBlue text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-lemon text-darkBlue w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-3xl">A</div>
            <div>
              <h1 className="text-2xl font-bold">MediTrust Hospital</h1>
              <p className="text-xs text-gray-400">Admin Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <div onClick={() => setActiveTab("appointments")} className={`px-4 py-3 rounded-2xl flex items-center gap-3 cursor-pointer ${activeTab === "appointments" ? "bg-white/10" : "hover:bg-white/10"}`}>
              <Calendar size={20} /> Appointments
            </div>
            <div onClick={() => setActiveTab("doctors")} className={`px-4 py-3 rounded-2xl flex items-center gap-3 cursor-pointer ${activeTab === "doctors" ? "bg-white/10" : "hover:bg-white/10"}`}>
              <UserCheck size={20} /> Doctors
            </div>
            <div onClick={() => setActiveTab("patients")} className={`px-4 py-3 rounded-2xl flex items-center gap-3 cursor-pointer ${activeTab === "patients" ? "bg-white/10" : "hover:bg-white/10"}`}>
              <Users size={20} /> Patients
            </div>
            <div className="px-4 py-3 hover:bg-white/10 rounded-2xl flex items-center gap-3 text-gray-300 cursor-pointer">
              <Building2 size={20} /> Departments
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-white/10 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/10 rounded-2xl transition font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <nav className="bg-white border-b px-8 py-5 flex items-center justify-between sticky top-0 z-50">
          <h1 className="text-3xl font-bold text-darkBlue">
            {activeTab === "appointments" && "Appointments Management"}
            {activeTab === "doctors" && "Doctors Management"}
            {activeTab === "patients" && "Patient Records"}
          </h1>

          <button onClick={fetchAppointments} className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-2xl transition">
            <RefreshCw size={18} /> Refresh
          </button>
        </nav>

        <div className="p-8">
          {/* Appointments Tab - unchanged */}
          {activeTab === "appointments" && (
            // ... (your existing appointments code remains the same)
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white rounded-3xl p-6 shadow">
                  <p className="text-gray-500">Total Appointments</p>
                  <h3 className="text-4xl font-bold text-darkBlue mt-3">{appointments.length}</h3>
                </div>
                {/* other stats */}
              </div>

              {/* Appointments Table - same as before */}
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                {/* Table code remains the same as your previous version */}
                {/* ... paste your table here if needed ... */}
              </div>
            </>
          )}

          {/* Doctors Tab */}
          {activeTab === "doctors" && (
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8">Hospital Doctors</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctorsList.map((doc) => (
                  <div key={doc.id} className="border rounded-3xl p-6 hover:shadow-xl transition">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-xl">{doc.name}</h3>
                        <p className="text-lemon">{doc.specialty}</p>
                      </div>
                      <span className={`px-4 py-1 rounded-full text-sm ${doc.status === "Available" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                        {doc.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{doc.experience} Experience</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Patients Tab - Now Upgraded */}
          {activeTab === "patients" && (
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-3xl font-bold text-darkBlue">Patient Records</h2>
                <div className="relative w-80">
                  <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search patients..." 
                    className="pl-11 pr-4 py-3 w-full border rounded-2xl focus:border-lemon outline-none" 
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-6 py-5">Patient Name</th>
                      <th className="text-left px-6 py-5">Age / Gender</th>
                      <th className="text-left px-6 py-5">Contact</th>
                      <th className="text-left px-6 py-5">Last Visit</th>
                      <th className="text-left px-6 py-5">Condition</th>
                      <th className="text-center px-6 py-5">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientsList.map((patient) => (
                      <tr key={patient.id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-5 font-medium">{patient.name}</td>
                        <td className="px-6 py-5">{patient.age} years • {patient.gender}</td>
                        <td className="px-6 py-5 text-sm">
                          <p>{patient.email}</p>
                          <p>{patient.phone}</p>
                        </td>
                        <td className="px-6 py-5">{patient.lastVisit}</td>
                        <td className="px-6 py-5">
                          <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm">
                            {patient.condition}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <button className="flex items-center gap-2 bg-darkBlue text-white px-5 py-2 rounded-2xl hover:bg-lemon hover:text-darkBlue transition">
                            <Eye size={18} /> View History
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;