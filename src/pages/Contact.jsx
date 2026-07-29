import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import hospitalImage from "../assets/meditrust.png";

const contactDetails = [
  {
    icon: Phone,
    title: "Call us",
    primary: "+234 911 344 5658",
    secondary: "24/7 emergency support",
    href: "tel: 09113445658",
    href: "https://wa.me/09113445658",
  },
  {
    icon: Mail,
    title: "Email us",
    primary: "support@meditrustnigeria.com",
    secondary: "We respond within 24 hours",
    href: "mailto:support@meditrustnigeria.com",
  },
  {
    icon: MapPin,
    title: "Visit us",
    primary: "25 Victoria Island Road",
    secondary: "Lagos, Nigeria",
  },
  {
    icon: Clock,
    title: "Opening hours",
    primary: "Open 24 hours daily",
    secondary: "Every day of the week",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = ({ target }) =>
    setFormData((current) => ({
      ...current,
      [target.name]: target.value,
    }));

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Form Submitted:", formData);

      setSubmitted(true);
      setIsSubmitting(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }, 900);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-darkGreen py-28 text-center">
        <motion.img
          src={hospitalImage}
          alt="MediTrust Hospital"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35"
          initial={{ scale: 1.04 }}
          animate={{ scale: [1.04, 1.1, 1.04] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 -z-10 bg-darkGreen/80" />

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl px-6"
        >
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-lemon">
            Here whenever you need us
          </p>

          <h1 className="mt-6 text-5xl font-bold text-white md:text-6xl">
            Get in touch.
          </h1>

          <p className="mt-5 text-xl leading-relaxed text-gray-100">
            Appointments, consultations, emergency support, and healthcare
            questions—our team is ready to help.
          </p>
        </motion.div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-2">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-darkBlue">
              We'd love to hear from you.
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600">
              Reach the MediTrust care team through any channel that works for
              you.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {contactDetails.map(
                ({ icon: Icon, title, primary, secondary, href }) => {
                  const content = (
                    <>
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lemon/20 text-darkBlue">
                        <Icon size={24} />
                      </span>

                      <h3 className="mt-5 font-bold text-darkBlue">
                        {title}
                      </h3>

                      <p className="mt-2 font-medium text-gray-800">
                        {primary}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {secondary}
                      </p>
                    </>
                  );

                  return href ? (
                    <a
                      key={title}
                      href={href}
                      className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    >
                      {content}
                    </a>
                  ) : (
                    <article
                      key={title}
                      className="rounded-3xl bg-white p-6 shadow-sm"
                    >
                      {content}
                    </article>
                  );
                }
              )}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] bg-white p-8 shadow-xl md:p-10"
          >
            {submitted ? (
              <div className="grid min-h-[430px] place-items-center text-center">
                <div>
                  <CheckCircle className="mx-auto h-16 w-16 text-green-600" />

                  <h2 className="mt-6 text-3xl font-bold text-darkBlue">
                    Thank you.
                  </h2>

                  <p className="mt-3 text-gray-600">
                    Your message has been received. We'll reply shortly.
                  </p>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-7 font-semibold text-darkBlue underline"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-green-600">
                  Patient support
                </p>

                <h2 className="mt-3 text-3xl font-bold text-darkBlue">
                  Send us a message.
                </h2>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <Field
                    label="Full name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Email address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />

                    <Field
                      label="Phone number"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234 900 334 5693"
                    />
                  </div>

                  <label className="block text-sm font-semibold text-darkBlue">
                    Message

                    <textarea
                      rows="6"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="How can we help you?"
                      className="mt-2 w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-lemon/50"
                    />
                  </label>

                  <button
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-lemon py-4 font-semibold text-darkBlue transition hover:bg-darkBlue hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending…" : "Send message"}

                    {!isSubmitting && <Send size={18} />}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

function Field({ label, ...props }) {
  return (
    <label className="block text-sm font-semibold text-darkBlue">
      {label}

      <input
        {...props}
        className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-lemon/50"
      />
    </label>
  );
}

export default Contact;