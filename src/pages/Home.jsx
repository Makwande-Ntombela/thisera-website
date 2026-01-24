import React, { useState, useEffect } from 'react';
import { Menu, X, CheckCircle, Target, Eye, Zap, Heart, Shield, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import heroBgImg from '../assets/hero-pawns.jpg'; // Ensure this path is correct
import logo from '../assets/logo.png'; // Ensure this path is correct

// --- INTERNAL STYLES FOR ZOOM ANIMATION ---
const styles = `
  @keyframes slowZoom {
    0% { transform: scale(1); }
    100% { transform: scale(1.1); }
  }
  .animate-slow-zoom {
    animation: slowZoom 20s infinite alternate ease-in-out;
  }
`;

// --- NAVBAR COMPONENT ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-0' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          
          {/* --- LOGO SECTION --- */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer" 
            onClick={() => window.scrollTo(0,0)}
          >
             <img 
               src={logo} 
               alt="Thisera Consulting Logo" 
               // Logo: Slightly smaller on mobile (h-16) to fit everything
               className={`h-16 sm:h-20 w-auto object-contain -ml-2 sm:-ml-4 mr-2 sm:mr-3 transition-all duration-300 ${
                 !scrolled ? 'brightness-0 invert' : ''
               }`} 
             />
             
             {/* --- TEXT FIX: Removed 'hidden', added responsive text sizes --- */}
             <span 
                className={`font-serif font-bold uppercase tracking-widest leading-tight transition-colors duration-300 
                  text-[0.6rem] sm:text-sm  /* Mobile: Tiny text, Desktop: Normal text */
                  ${scrolled ? 'text-brand-dark' : 'text-white drop-shadow-md'}
                `}
             >
                Thisera Consulting <br className="block lg:hidden"/> {/* Force break on mobile to stack words */}
                <span className="lg:block inline">Projects</span>
             </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`font-medium transition duration-150 ${
                    scrolled 
                    ? 'text-gray-700 hover:text-brand-orange' 
                    : 'text-white hover:text-brand-orange drop-shadow-md'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button - Ensure it has z-index and correct color */}
          <div className="md:hidden z-50">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`focus:outline-none transition-colors p-2 rounded-md ${
                    // If menu is OPEN, force dark text so it's visible against the white menu background
                    // If menu is CLOSED, follow the scroll logic (White at top, Dark when scrolled)
                    isOpen ? 'text-gray-800' : (scrolled ? 'text-gray-700' : 'text-white')
                }`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {/* Added 'absolute' positioning to ensure it overlays correctly */}
      {isOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full bg-white border-t shadow-xl pt-24 pb-6 px-4 z-40">
           <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="block px-3 py-3 rounded-md text-lg font-bold text-gray-800 hover:text-brand-orange hover:bg-gray-50 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
// --- HERO COMPONENT ---
const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
       {/* Inject Styles for Animation */}
       <style>{styles}</style>

      {/* --- BACKGROUND IMAGE WITH ZOOM --- */}
      <div className="absolute inset-0 z-0">
         <img 
           src={heroBgImg} 
           alt="Diverse HR Pawns Background" 
           className="w-full h-full object-cover opacity-50 animate-slow-zoom"
         />
         {/* Dark overlay to ensure white text pops */}
         <div className="absolute inset-0 bg-black/50"></div>
         
         {/* --- REMOVED THE BOTTOM WHITE GRADIENT DIV FROM HERE --- */}
      </div>

      {/* --- CONTENT --- */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center pt-20">
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight cursor-default drop-shadow-lg">
          Your HR Matters For<br />
          <span className="text-brand-orange transition-all duration-500 drop-shadow-lg hover:drop-shadow-[0_0_25px_rgba(217,74,38,1)]">
             This Era.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl font-medium drop-shadow-md">
          Delivering comprehensive, customer-focused HR solutions. We are the experts so you can focus on your core business.
        </p>
        
        <a 
          href="#contact" 
          className="inline-flex items-center px-10 py-4 border-2 border-brand-orange text-lg font-bold rounded-full text-white bg-brand-orange hover:bg-transparent hover:text-brand-orange transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-2xl"
        >
          Get in Touch
        </a>

      </div>
    </section>
  );
};



const About = () => {
  const cards = [
    { title: "Vision", content: "To be the one Human Resources solutions service provider.", icon: <Eye size={32} />, borderColor: "border-brand-orange", iconColor: "text-brand-orange", hoverBg: "group-hover:bg-brand-orange" },
    { title: "Mission", content: "To be part of awaken and unleash human potential.", icon: <Target size={32} />, borderColor: "border-brand-dark", iconColor: "text-brand-dark", hoverBg: "group-hover:bg-brand-dark" },
    { title: "Tagline", content: "Your HR for This Era.", icon: <Zap size={32} />, borderColor: "border-brand-orange", iconColor: "text-brand-orange", hoverBg: "group-hover:bg-brand-orange" },
    { title: "Values", customContent: (<ul className="space-y-1"><li>• Value for money</li><li>• Ethical business</li><li>• Speed</li></ul>), icon: <Heart size={32} />, borderColor: "border-brand-dark", iconColor: "text-brand-dark", hoverBg: "group-hover:bg-brand-dark" },
  ];
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">A Little Bit About Us</h2>
          <div className="w-24 h-1.5 bg-brand-orange mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <div key={index} className={`group relative bg-gray-50 p-8 rounded-2xl shadow-sm border-t-4 ${card.borderColor} transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:bg-white cursor-default`}>
              <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center bg-white shadow-sm ${card.iconColor} transition-all duration-300 ${card.hoverBg} group-hover:text-white group-hover:scale-110 group-hover:rotate-3`}>{card.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-dark">{card.title}</h3>
              <div className="text-gray-600 leading-relaxed group-hover:text-gray-700">{card.customContent ? card.customContent : card.content}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const pillars = [{ id: "01", title: "Generalist HR", desc: "Full HR Management" }, { id: "02", title: "Talent Acquisition", desc: "Sourcing & Branding" }, { id: "03", title: "Talent Management", desc: "Retention & L&D" }, { id: "04", title: "HR Projects", desc: "Specialized Interventions" }];
  const services = [
    { label: "Ad Hoc Services", icon: <Zap className="text-brand-orange" size={28} />, desc: "Irregular specialist support when you need it most.", points: ["Restructuring & Redundancy", "Disciplinary Investigations", "Job Analysis & Evaluation", "Recruitment Processes"] },
    { label: "Retained Packages", icon: <Shield className="text-brand-orange" size={28} />, desc: "The 'All-In' compliance package for peace of mind.", points: ["Unlimited Email/Phone Advice", "Dedicated Consultant Hours", "Induction Systems", "Legislation Updates"] },
    { label: "Contracts & Docs", icon: <Mail className="text-brand-orange" size={28} />, desc: "Tailored documentation compliant with legislation.", points: ["Tailored Document Questionnaires", "Employee Handbooks", "Template Portal Access", "Privacy Notice Compliance"] },
    { label: "HR Admin", icon: <Target className="text-brand-orange" size={28} />, desc: "We handle the paperwork so you can focus on strategy.", points: ["Offer Letter Compilation", "Legal Starter Docs", "Contract Variations", "Database Administration"] }
  ];
  const expertises = ["Strategy Formulation", "Performance Management", "Talent Sourcing", "Disciplinary Cases", "HR Policies", "SARS Submission", "Leadership Training", "CCMA Investigations", "Bargaining Council", "Project Management", "Small-Medium Payroll"];
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">Areas of Expertise</h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Comprehensive solutions designed to fit your business model.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {pillars.map((item) => (<div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border-t-4 border-gray-200 hover:border-brand-orange transition-colors duration-300 text-center"><div className="text-3xl font-bold text-gray-200 mb-1">{item.id}</div><h3 className="font-bold text-brand-dark text-sm md:text-base leading-tight">{item.title}</h3><p className="text-xs text-gray-500 mt-1 hidden md:block">{item.desc}</p></div>))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (<div key={index} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-brand-orange/20"><div className="flex items-center mb-6"><div className="p-3 bg-orange-50 rounded-lg mr-4">{service.icon}</div><div><h3 className="text-xl font-bold text-brand-dark">{service.label}</h3><p className="text-sm text-gray-500">{service.desc}</p></div></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-2">{service.points.map((point, idx) => (<div key={idx} className="flex items-start text-sm text-gray-700"><CheckCircle size={16} className="text-brand-orange mr-2 mt-0.5 flex-shrink-0" /><span className="leading-snug">{point}</span></div>))}</div></div>))}
        </div>
        <div className="bg-brand-dark rounded-3xl p-8 md:p-12 text-center shadow-xl"><h3 className="text-xl font-bold text-white mb-8">Specific Interventions & Workshops</h3><div className="flex flex-wrap justify-center gap-3">{expertises.map((item, index) => (<span key={index} className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all duration-300 cursor-default">{item}</span>))}<span className="px-4 py-2 bg-brand-orange text-white rounded-lg text-sm font-bold">+ Many More</span></div></div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  return (
    <section id="why-us" className="py-20 bg-brand-orange text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div><h2 className="text-4xl font-extrabold mb-6">Why Us?</h2><div className="space-y-6 text-orange-50"><p className="text-lg leading-relaxed">With more than <strong>15 years' experience</strong> in managing everyday and complex employee matters, Thisera Consulting Projects can support you no matter what employment issue you come across.</p><p>All consultants are qualified experts possessing a wealth of HR experience across all sectors. We ensure not only legislative compliance but that advice fits your organization's culture.</p></div></div>
            <div className="bg-white text-gray-800 p-8 rounded-xl shadow-2xl"><h3 className="text-2xl font-bold text-brand-dark mb-6">Benefits of Outsourcing</h3><ul className="space-y-4"><li className="flex"><Shield className="text-brand-orange mr-4 flex-shrink-0" /><div><h4 className="font-bold">Compliance</h4><p className="text-sm text-gray-600">Stop worrying about employment law. We ensure you are fully compliant and protected.</p></div></li><li className="flex"><Target className="text-brand-orange mr-4 flex-shrink-0" /><div><h4 className="font-bold">Focus on Core Business</h4><p className="text-sm text-gray-600">Free your company to focus on what is important. Outsourcing increases productivity.</p></div></li><li className="flex"><Zap className="text-brand-orange mr-4 flex-shrink-0" /><div><h4 className="font-bold">Saves Money</h4><p className="text-sm text-gray-600">Significantly less cost than hiring a full-time HR professional.</p></div></li></ul></div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-brand-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div><h2 className="text-3xl font-serif font-bold mb-6">ThisEra Consulting Projects </h2><p className="text-gray-400 max-w-sm mb-6">We are part of your team. Delivering comprehensive and customer-focused HR employment support solutions for businesses of all sizes.</p></div>
            <div><h3 className="text-xl font-bold mb-6 text-brand-orange">Contact Us</h3><div className="space-y-4"><div className="flex items-center text-gray-300"><MapPin className="mr-3 text-brand-orange" size={20} /><span>124 Madeline Road, Morningside, 4001</span></div><div className="flex items-center text-gray-300"><Phone className="mr-3 text-brand-orange" size={20} /><span>071 304 8286</span></div><div className="flex items-center text-gray-300"><Mail className="mr-3 text-brand-orange" size={20} /><span>thiseraconsulting22@gmail.com</span></div></div></div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">&copy; {new Date().getFullYear()} Thisera Consulting Projects. All rights reserved.</div>
      </div>
    </footer>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  return (
    <div className="font-sans antialiased text-gray-900 bg-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Footer />
    </div>
  );
}