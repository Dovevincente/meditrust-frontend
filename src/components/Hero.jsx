import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity, Ambulance, ArrowRight, Clock, HeartPulse, Shield, Stethoscope, Users,
} from "lucide-react";
import hospitalImage from "../assets/meditrust.png";

const services = [
  { icon: Stethoscope, title: "Departments", text: "Specialist care across every stage of your health journey.", to: "/departments" },
  { icon: Users, title: "Our Specialists", text: "Experienced clinicians focused on compassionate care.", to: "/doctors" },
  { icon: Clock, title: "Emergency Care", text: "Prompt, coordinated emergency support, day and night." },
  { icon: Shield, title: "Trusted Care", text: "Safe, respectful care centred on every patient." },
];

const Hero = () => (
  <main>
    <section id="home" className="relative isolate min-h-[92vh] overflow-hidden bg-darkGreen">
      <motion.img
        src={hospitalImage}
        alt="MediTrust Nigeria Hospital"
        className="absolute inset-0 -z-30 h-full w-full object-cover"
        initial={{ scale: 1.04 }}
        animate={{ scale: [1.04, 1.13, 1.04] }}
        transition={{ duration: 26, ease: "easeInOut", repeat: Infinity }}
      />
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-darkGreen via-darkGreen/90 to-[#041B2D]/65" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_16%,rgba(173,255,47,0.24),transparent_28%)]" />

      <div className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
            <Shield size={17} className="text-lemon" /> Trusted healthcare · Advanced medical technology
          </div>
          <h1 className="max-w-2xl text-5xl font-bold leading-[1.05] text-white md:text-7xl">
            Excellence in <span className="text-lemon">modern healthcare.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-gray-100 md:text-xl">
            MediTrust Nigeria Hospital brings together experienced doctors, advanced equipment, and compassionate patient care for every family.
          </p>
          <motion.div className="mt-9 flex flex-wrap gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            <Link to="/appointment" className="inline-flex items-center gap-2 rounded-2xl bg-lemon px-7 py-4 font-semibold text-darkBlue shadow-xl transition hover:bg-white">
              Book an appointment <ArrowRight size={19} />
            </Link>
            <Link to="/doctors" className="rounded-2xl border border-white/70 px-7 py-4 font-semibold text-white transition hover:bg-white hover:text-darkBlue">
              Meet our specialists
            </Link>
          </motion.div>
          <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/15 pt-7">
            {[['50+', 'Expert doctors'], ['20k+', 'Patients treated'], ['24/7', 'Emergency care']].map(([value, label]) => (
              <div key={label}><p className="text-3xl font-bold text-white md:text-4xl">{value}</p><p className="mt-1 text-sm text-gray-200">{label}</p></div>
            ))}
          </div>
        </motion.div>

        <motion.div className="relative hidden min-h-[560px] lg:block" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
          <img src={hospitalImage} alt="MediTrust Hospital building" className="h-[560px] w-full rounded-[2.5rem] object-cover shadow-2xl" />
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-t from-darkGreen/55 via-transparent" />
          <InfoCard className="-left-10 top-8" icon={<Activity />} title="MRI & Diagnostics" text="Accurate imaging and modern testing." />
          <InfoCard className="-right-8 bottom-8" icon={<HeartPulse />} title="Intensive Care" text="Advanced critical-care support." green />
          <InfoCard className="-left-8 bottom-36" icon={<Ambulance />} title="Emergency Response" text="Care available around the clock." red />
        </motion.div>
      </div>
    </section>

    <section className="bg-gray-50 py-20">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ icon: Icon, title, text, to }, index) => {
          const content = <><span className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-lemon/20 text-darkBlue"><Icon size={29} /></span><h2 className="text-xl font-bold text-darkBlue">{title}</h2><p className="mt-3 leading-relaxed text-gray-600">{text}</p></>;
          const classes = "group rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-2 hover:shadow-xl";
          return to ? <Link key={title} to={to} className={classes}>{content}</Link> : <motion.article key={title} className={classes} whileHover={{ y: -8 }}>{content}</motion.article>;
        })}
      </div>
    </section>

    <a href="tel:+2348001234567" className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full bg-red-600 px-5 py-3 font-semibold text-white shadow-2xl transition hover:scale-105">
      <Ambulance size={22} /><span>Emergency: +234 800 123 4567</span>
    </a>
  </main>
);

function InfoCard({ className, icon, title, text, green, red }) {
  const tone = red ? "bg-red-100 text-red-600" : green ? "bg-green-100 text-green-600" : "bg-lemon/20 text-darkBlue";
  return <motion.div className={`absolute w-64 rounded-3xl bg-white/95 p-5 shadow-2xl backdrop-blur ${className}`} animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}><div className="flex gap-3"><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${tone}`}>{icon}</span><div><h2 className="font-bold text-darkBlue">{title}</h2><p className="mt-1 text-sm text-gray-600">{text}</p></div></div></motion.div>;
}

export default Hero;
