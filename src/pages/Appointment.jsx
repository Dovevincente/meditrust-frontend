import { useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Building2,
  MessageSquare,
  CheckCircle,
  Clock,
  X,
} from "lucide-react";

// Doctors List
const doctors = [
  { id: 1, name: "Dr. John Carter", specialty: "Senior Cardiologist" },
  { id: 2, name: "Dr. Sarah Williams", specialty: "Neurologist" },
  { id: 3, name: "Dr. Michael Smith", specialty: "Pediatrician" },
  { id: 4, name: "Dr. Emily Brown", specialty: "Orthopedic Surgeon" },
  { id: 5, name: "Dr. Aisha Khan", specialty: "Gynecologist & Obstetrician" },
  { id: 6, name: "Dr. David Okon", specialty: "General Physician" },
];

const Appointment = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    doctor: "",
    appointmentDate: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const selectDoctor = (doctorName) => {
    setForm((prev) => ({
      ...prev,
      doctor: doctorName,
    }));

    setShowDoctorModal(false);

    if (errors.doctor) {
      setErrors((prev) => ({
        ...prev,
        doctor: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullName.trim())
      newErrors.fullName = "Full name is required";

    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Valid email is required";

    if (!form.phone.trim())
      newErrors.phone = "Phone number is required";

    if (!form.department)
      newErrors.department = "Please select a department";

    if (!form.doctor)
      newErrors.doctor = "Please select a doctor";

    if (!form.appointmentDate)
      newErrors.appointmentDate = "Please select appointment date";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");
    setSuccess(false);

    if (!validateForm()) return;

    if (!API_URL) {
      setServerError("Backend URL is not configured.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/api/appointments`,
        form
      );

      console.log("Success:", response.data);

      setSuccess(true);
      setErrors({});

      setForm({
        fullName: "",
        email: "",
        phone: "",
        department: "",
        doctor: "",
        appointmentDate: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      setServerError(
        error.response?.data?.message ||
        error.message ||
        "Failed to book appointment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-darkBlue mb-4">
            Book an Appointment
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Schedule your visit with our experienced medical professionals.
          </p>
        </div>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-5 rounded-2xl flex items-center gap-3 mb-10">
            <CheckCircle className="w-6 h-6" />
            Appointment booked successfully! Our team will contact you shortly.
          </div>
        )}

        {serverError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-2xl mb-10">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-[32px] p-8 md:p-12 grid md:grid-cols-2 gap-8">

          <div>
            <label className="block text-sm font-medium text-darkBlue mb-2">Full Name <span className="text-red-500">*</span></label>
            <div className="flex items-center border border-gray-200 rounded-2xl px-4 focus-within:border-lemon transition">
              <User className="text-gray-400" size={20} />
              <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Doe" className="w-full px-4 py-4 outline-none" />
            </div>
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-darkBlue mb-2">Email Address <span className="text-red-500">*</span></label>
            <div className="flex items-center border border-gray-200 rounded-2xl px-4 focus-within:border-lemon transition">
              <Mail className="text-gray-400" size={20} />
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className="w-full px-4 py-4 outline-none" />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-darkBlue mb-2">Phone Number <span className="text-red-500">*</span></label>
            <div className="flex items-center border border-gray-200 rounded-2xl px-4 focus-within:border-lemon transition">
              <Phone className="text-gray-400" size={20} />
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+234 801 234 5678" className="w-full px-4 py-4 outline-none" />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-darkBlue mb-2">Department <span className="text-red-500">*</span></label>
            <div className="flex items-center border border-gray-200 rounded-2xl px-4 focus-within:border-lemon transition">
              <Building2 className="text-gray-400" size={20} />
              <select name="department" value={form.department} onChange={handleChange} className="w-full px-4 py-4 outline-none bg-transparent">
                <option value="">Select Department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="General Surgery">General Surgery</option>
                <option value="Internal Medicine">Internal Medicine</option>
              </select>
            </div>
            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
          </div>

          {/* Preferred Doctor */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-darkBlue mb-2">Preferred Doctor <span className="text-red-500">*</span></label>
            <div 
              onClick={() => setShowDoctorModal(true)}
              className="flex items-center border border-gray-200 rounded-2xl px-4 py-4 cursor-pointer hover:border-lemon transition"
            >
              <User className="text-gray-400 mr-3" size={20} />
              <input 
                type="text" 
                value={form.doctor} 
                placeholder="Click here to select a doctor" 
                readOnly 
                className="flex-1 outline-none bg-transparent cursor-pointer" 
              />
              <Clock className="text-gray-400" size={20} />
            </div>
            {errors.doctor && <p className="text-red-500 text-sm mt-1">{errors.doctor}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-darkBlue mb-2">Appointment Date <span className="text-red-500">*</span></label>
            <div className="flex items-center border border-gray-200 rounded-2xl px-4 focus-within:border-lemon transition">
              <Calendar className="text-gray-400" size={20} />
              <input type="date" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} className="w-full px-4 py-4 outline-none" />
            </div>
            {errors.appointmentDate && <p className="text-red-500 text-sm mt-1">{errors.appointmentDate}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-darkBlue mb-2">Additional Message (Optional)</label>
            <div className="flex border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-lemon transition">
              <MessageSquare className="text-gray-400 mt-3" size={20} />
              <textarea name="message" value={form.message} onChange={handleChange} rows="4" placeholder="Tell us more about your condition..." className="w-full px-4 py-3 outline-none resize-none" />
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-darkBlue text-white py-4 rounded-2xl font-semibold hover:bg-lemon hover:text-darkBlue transition disabled:opacity-70"
            >
              {loading ? "Booking Appointment..." : "Confirm & Book Appointment"}
            </button>
          </div>
        </form>
      </div>

      {/* Doctor Selection Modal */}
      {showDoctorModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-darkBlue">Select Preferred Doctor</h2>
              <button onClick={() => setShowDoctorModal(false)}>
                <X size={28} className="text-gray-500 hover:text-red-500" />
              </button>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-6 overflow-y-auto max-h-[70vh]">
              {doctors.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => selectDoctor(doc.name)}
                  className="border border-gray-200 hover:border-lemon p-4 rounded-2xl cursor-pointer hover:shadow-md transition-all"
                >
                  <h3 className="font-bold text-lg text-darkBlue">{doc.name}</h3>
                  <p className="text-lemon">{doc.specialty}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Appointment;