import React, { useState, useMemo } from 'react';
import { MapPin, Phone, MessageSquare, ExternalLink, Copy, Check, Clock, Send } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import data from '../data/restaurant-data.json';

const hours = data.restaurant.openingHours;

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const fullAddress = "The Bund Road, Residency Road, near Chai Jai, Poloview, Srinagar, Jammu and Kashmir 190001";
  const latitude = 34.0719668;
  const longitude = 74.8216271;

  // Highlights today dynamically
  const todayName = useMemo(() => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(p => ({ ...p, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.message) return;

    // Composes a WhatsApp text for contact form submission
    const text = 
      `✉️ *Website Contact Enquiry*\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `👤 *Name:* ${formState.name}\n` +
      `📧 *Email:* ${formState.email || 'Not provided'}\n` +
      `🏷️ *Subject:* ${formState.subject || 'General inquiry'}\n` +
      `📝 *Message:* ${formState.message}`;

    const whatsappNumber = '917780938743';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsSent(true);
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-[#141313] min-h-screen pt-28 pb-20 px-6">
      <SEOHead 
        title="Contact & Location" 
        description="Find our location on The Bund Road, Srinagar. View driving directions, get contact numbers, check today's hours, or send an enquiry directly."
        path="/contact"
      />

      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Header Block */}
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[#ffbf00] font-semibold">Location & Enquiry</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-[#c8c6c5]">Connect With Us</h1>
          <div className="w-12 h-[2px] bg-[#ffbf00] mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side: Contact details & timings */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Info Cards */}
            <div className="bg-[#1e1e1e] border border-[#2d2b2b] p-6 rounded-xl space-y-6 shadow-xl">
              <h3 className="font-display text-xl font-bold text-[#c8c6c5] border-b border-[#2d2b2b] pb-3">Contact Details</h3>
              
              {/* Address card with copy button */}
              <div className="space-y-3">
                <div className="flex gap-3 text-xs text-[#8e9192]">
                  <MapPin className="w-5 h-5 text-[#ffbf00] shrink-0" />
                  <div className="space-y-2 flex-1">
                    <p className="text-sm text-[#c8c6c5] leading-relaxed">{fullAddress}</p>
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#141313] border border-[#2d2b2b] text-[10px] uppercase font-bold tracking-wider text-[#c8c6c5] hover:text-[#ffbf00] transition-colors pointer-events-auto"
                    >
                      {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied!' : 'Copy Address'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Call triggers */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="tel:+918899058697"
                  className="flex-1 py-3 bg-[#141313] border border-[#2d2b2b] text-[#c8c6c5] hover:border-[#ffbf00] hover:text-[#ffbf00] rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all pointer-events-auto"
                >
                  <Phone className="w-4 h-4" />
                  Call +91 8899058697
                </a>
                <a
                  href={`https://wa.me/917780938743?text=${encodeURIComponent("Hello Meydani Cafe! I'd like to ask an inquiry.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-[#141313] border border-[#2d2b2b] text-[#c8c6c5] hover:border-[#ffbf00] hover:text-[#ffbf00] rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all pointer-events-auto"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Dynamic Timings Card */}
            <div className="bg-[#1e1e1e] border border-[#2d2b2b] p-6 rounded-xl space-y-4 shadow-xl">
              <div className="flex items-center gap-2 border-b border-[#2d2b2b] pb-3">
                <Clock className="w-5 h-5 text-[#ffbf00]" />
                <h3 className="font-display text-xl font-bold text-[#c8c6c5]">Opening Hours</h3>
              </div>
              <div className="space-y-2.5 text-xs">
                {[
                  { name: 'Monday', val: hours.monday, key: 'monday' },
                  { name: 'Tuesday', val: hours.tuesday, key: 'tuesday' },
                  { name: 'Wednesday', val: hours.wednesday, key: 'wednesday' },
                  { name: 'Thursday', val: hours.thursday, key: 'thursday' },
                  { name: 'Friday', val: hours.friday, key: 'friday' },
                  { name: 'Saturday', val: hours.saturday, key: 'saturday' },
                  { name: 'Sunday', val: hours.sunday, key: 'sunday' }
                ].map(day => (
                  <div 
                    key={day.key} 
                    className={`flex justify-between py-2 px-3 rounded-lg transition-all ${
                      todayName === day.key 
                        ? 'bg-[#ffbf00]/10 border border-[#ffbf00]/30 text-[#ffbf00] font-bold' 
                        : 'text-[#8e9192]'
                    }`}
                  >
                    <span>{day.name} {todayName === day.key && <span className="text-[9px] uppercase tracking-wide bg-[#ffbf00]/20 text-[#ffbf00] px-1.5 py-0.5 rounded ml-2 font-semibold">Today</span>}</span>
                    <span>{day.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Map and Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Map Frame */}
            <div className="bg-[#1e1e1e] border border-[#2d2b2b] rounded-xl p-4 shadow-xl space-y-4">
              <div className="h-64 sm:h-80 rounded-lg overflow-hidden border border-[#2d2b2b] relative">
                {/* Embed Google Maps with direct coordinates */}
                <iframe
                  title="Meydani Cafe Location Map"
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1653.6067744383126!2d74.8210!3d34.0719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e18fa34071a565%3A0x697cf7726c551712!2sMeydani%20Cafe!5e0!3m2!1sen!2sin!4v1700000000000`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale invert opacity-80"
                ></iframe>
              </div>

              <div className="flex justify-between items-center gap-4">
                <p className="text-xs text-[#8e9192]">Situated conveniently near Chai Jai in Srinagar's historic Polo View area.</p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-[#ffbf00] text-[#402d00] hover:bg-[#ffbf00]/95 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition-colors pointer-events-auto min-h-[44px]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Get Directions
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#1e1e1e] border border-[#2d2b2b] p-6 sm:p-8 rounded-xl shadow-xl space-y-6">
              <h3 className="font-display text-xl font-bold text-[#c8c6c5] border-b border-[#2d2b2b] pb-3">Send A Message</h3>
              
              {isSent && (
                <div className="p-4 bg-green-950/20 border border-green-500/30 rounded-lg text-xs text-green-400">
                  Thank you! Your message inquiry has been redirected to our WhatsApp desk.
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="contact-name" className="sr-only">Your Name *</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="Your Name *"
                      className="w-full px-4 py-2.5 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-lg text-xs text-[#c8c6c5] placeholder-[#8e9192] outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="contact-email" className="sr-only">Email Address</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      className="w-full px-4 py-2.5 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-lg text-xs text-[#c8c6c5] placeholder-[#8e9192] outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="contact-subject" className="sr-only">Subject</label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                    className="w-full px-4 py-2.5 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-lg text-xs text-[#c8c6c5] placeholder-[#8e9192] outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="contact-message" className="sr-only">Your Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows="3"
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Your Message *"
                    className="w-full px-4 py-2.5 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-lg text-xs text-[#c8c6c5] placeholder-[#8e9192] outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#2d2b2b] hover:bg-[#ffbf00] hover:text-[#402d00] text-[#c8c6c5] rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all pointer-events-auto"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Enquiry
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
