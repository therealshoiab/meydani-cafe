import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  ExternalLink, 
  Copy, 
  Check, 
  Clock, 
  Send, 
  Calendar, 
  Gift, 
  Users, 
  CheckCircle2, 
  ArrowLeft,
  PhoneCall,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import data from '../data/restaurant-data.json';

const hours = data.restaurant.openingHours;

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
  "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"
];

const occasions = [
  "Just Dining",
  "Birthday Party",
  "Anniversary Celebration",
  "Date Night",
  "Family Gathering",
  "Business Meeting"
];

export default function Contact() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'message' ? 'message' : 'reserve';
  const [activeTab, setActiveTab] = useState(initialTab);

  const [copied, setCopied] = useState(false);
  
  // Table Reservation State
  const [reserveForm, setReserveForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: timeSlots[8], // default 2:00 PM
    occasion: occasions[0],
    requests: ''
  });
  const [guests, setGuests] = useState(2);
  const [isReserveSubmitted, setIsReserveSubmitted] = useState(false);
  const [reserveError, setReserveError] = useState('');

  // General Inquiry State
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isInquirySubmitted, setIsInquirySubmitted] = useState(false);
  const [inquiryError, setInquiryError] = useState('');

  const fullAddress = "The Bund Road, Residency Road, near Chai Jai, Poloview, Srinagar, Jammu and Kashmir 190001";
  const latitude = 34.0719668;
  const longitude = 74.8216271;
  const primaryPhone = "+91 8899058697";
  const whatsappNumber = "917780938743";

  // Dynamic day of week
  const todayName = useMemo(() => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
  }, []);

  // Min and max dates for reservation (today to +30 days)
  const { minDate, maxDate } = useMemo(() => {
    const today = new Date();
    const future = new Date();
    future.setDate(today.getDate() + 30);
    return {
      minDate: today.toISOString().split('T')[0],
      maxDate: future.toISOString().split('T')[0]
    };
  }, []);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'message') {
      setActiveTab('message');
    } else if (tab === 'reserve') {
      setActiveTab('reserve');
    }
  }, [searchParams]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGuestChange = (delta) => {
    setGuests(prev => {
      const val = prev + delta;
      return val >= 1 && val <= 20 ? val : prev;
    });
  };

  // Handle Table Reservation Submit
  const handleReserveSubmit = (e) => {
    e.preventDefault();
    if (!reserveForm.name.trim() || !reserveForm.phone.trim() || !reserveForm.date) {
      setReserveError('Please fill in your name, phone number, and preferred date.');
      return;
    }
    setReserveError('');

    const text = 
      `🍽️ *Table Reservation — Meydani Cafe*\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `👤 *Name:* ${reserveForm.name}\n` +
      `📞 *Phone:* ${reserveForm.phone}\n` +
      `📅 *Date:* ${reserveForm.date}\n` +
      `⏰ *Time Slot:* ${reserveForm.time}\n` +
      `👥 *Guests:* ${guests} ${guests === 1 ? 'Guest' : 'Guests'}\n` +
      `🎉 *Occasion:* ${reserveForm.occasion}\n` +
      `📝 *Special Requests:* ${reserveForm.requests || 'None'}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `*Submitted via meydanicafe.in* ✅`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsReserveSubmitted(true);
  };

  // Handle General Inquiry Submit
  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryForm.name.trim() || !inquiryForm.message.trim()) {
      setInquiryError('Please enter your name and message.');
      return;
    }
    setInquiryError('');

    const text = 
      `✉️ *Contact & Inquiry — Meydani Cafe*\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `👤 *Name:* ${inquiryForm.name}\n` +
      `📞 *Phone / Contact:* ${inquiryForm.phone || 'Not provided'}\n` +
      `📧 *Email:* ${inquiryForm.email || 'Not provided'}\n` +
      `🏷️ *Subject:* ${inquiryForm.subject || 'General Inquiry'}\n` +
      `📝 *Message:* ${inquiryForm.message}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `*Sent via meydanicafe.in* ✅`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsInquirySubmitted(true);
  };

  return (
    <div className="bg-[#141313] min-h-screen pt-28 pb-20 px-4 sm:px-6">
      <SEOHead 
        title="Contact & Table Reservations" 
        description="Book your dining table at Meydani Cafe, Srinagar or get in touch with our team. Location on The Bund Road near Chai Jai, Polo View, Srinagar."
        path="/contact"
      />

      <div className="max-w-[1240px] mx-auto space-y-12">
        {/* Header Block */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#ffbf00] font-semibold">
            Visit &bull; Reserve &bull; Connect
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#c8c6c5]">
            Contact & Reservations
          </h1>
          <p className="text-sm text-[#8e9192] max-w-xl mx-auto">
            Book a scenic riverside table, plan private gatherings, or connect with our host desk.
          </p>
          <div className="w-14 h-[2px] bg-[#ffbf00] mx-auto mt-4" />
        </div>

        {/* Main Grid: Left unified info + Right interactive form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE (5 Cols): Unified Location, Contacts, Hours & Google Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact & Address Card */}
            <div className="bg-[#1e1e1e] border border-[#2d2b2b] p-6 sm:p-7 rounded-2xl shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#2d2b2b] pb-4">
                <h3 className="font-display text-xl font-bold text-[#c8c6c5] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#ffbf00]" />
                  Visit Meydani Cafe
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#ffbf00]/15 text-[#ffbf00] border border-[#ffbf00]/30">
                  Open Daily
                </span>
              </div>

              {/* Full Address */}
              <div className="space-y-3">
                <p className="text-xs text-[#8e9192] uppercase tracking-wider font-semibold">Address</p>
                <p className="text-sm text-[#c8c6c5] leading-relaxed">
                  {fullAddress}
                </p>
                <div className="pt-1">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#141313] border border-[#2d2b2b] text-xs font-semibold uppercase tracking-wider text-[#c8c6c5] hover:text-[#ffbf00] hover:border-[#ffbf00]/40 transition-colors pointer-events-auto"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-[#ffbf00]" />}
                    {copied ? 'Address Copied!' : 'Copy Full Address'}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${primaryPhone.replace(/\s+/g, '')}`}
                  className="py-3 px-4 bg-[#141313] border border-[#2d2b2b] hover:border-[#ffbf00] text-[#c8c6c5] hover:text-[#ffbf00] rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Phone className="w-4 h-4 text-[#ffbf00]" />
                  Call Direct
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Meydani Cafe! I'd like to make an inquiry.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-[#141313] border border-[#2d2b2b] hover:border-[#25D366] text-[#c8c6c5] hover:text-[#25D366] rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Operating Hours Card with Dynamic Today Highlighting */}
            <div className="bg-[#1e1e1e] border border-[#2d2b2b] p-6 sm:p-7 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-[#2d2b2b] pb-3">
                <Clock className="w-5 h-5 text-[#ffbf00]" />
                <h3 className="font-display text-xl font-bold text-[#c8c6c5]">Service Timings</h3>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { name: 'Monday', val: hours.monday, key: 'monday' },
                  { name: 'Tuesday', val: hours.tuesday, key: 'tuesday' },
                  { name: 'Wednesday', val: hours.wednesday, key: 'wednesday' },
                  { name: 'Thursday', val: hours.thursday, key: 'thursday' },
                  { name: 'Friday', val: hours.friday, key: 'friday' },
                  { name: 'Saturday (Specials)', val: hours.saturday, key: 'saturday' },
                  { name: 'Sunday', val: hours.sunday, key: 'sunday' }
                ].map(day => (
                  <div 
                    key={day.key} 
                    className={`flex justify-between items-center py-2 px-3 rounded-lg transition-all ${
                      todayName === day.key 
                        ? 'bg-[#ffbf00]/10 border border-[#ffbf00]/30 text-[#ffbf00] font-bold' 
                        : 'text-[#8e9192] hover:bg-[#141313]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {day.name}
                      {todayName === day.key && (
                        <span className="text-[9px] uppercase tracking-wider bg-[#ffbf00] text-[#402d00] font-extrabold px-1.5 py-0.5 rounded">
                          Today
                        </span>
                      )}
                    </span>
                    <span className={todayName === day.key ? 'text-[#ffbf00]' : 'text-[#c8c6c5]'}>
                      {day.val}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#8e9192] pt-2 text-center italic border-t border-[#2d2b2b]/60">
                Kitchen orders accepted up to 30 minutes before closing.
              </p>
            </div>

            {/* Embedded Google Map Frame */}
            <div className="bg-[#1e1e1e] border border-[#2d2b2b] rounded-2xl p-4 shadow-xl space-y-3">
              <div className="h-60 rounded-xl overflow-hidden border border-[#2d2b2b] relative">
                <iframe
                  title="Meydani Cafe Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1653.6067744383126!2d74.8210!3d34.0719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e18fa34071a565%3A0x697cf7726c551712!2sMeydani%20Cafe!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale invert opacity-85"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <p className="text-[11px] text-[#8e9192] text-center sm:text-left">
                  Located near Chai Jai, along scenic Polo View & The Bund.
                </p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 bg-[#ffbf00] text-[#402d00] hover:bg-[#ffbf00]/95 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shrink-0 transition-colors shadow-md shadow-[#ffbf00]/10"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Get Directions
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE (7 Cols): Dual-Mode Interaction Form (Reservation & Message) */}
          <div className="lg:col-span-7 bg-[#1e1e1e] border border-[#2d2b2b] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Form Mode Tabs Switcher */}
            <div className="flex items-center p-1.5 bg-[#141313] border border-[#2d2b2b] rounded-xl mb-8">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('reserve');
                  setSearchParams({ tab: 'reserve' });
                }}
                className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer pointer-events-auto ${
                  activeTab === 'reserve'
                    ? 'bg-[#ffbf00] text-[#402d00] shadow-md shadow-[#ffbf00]/20'
                    : 'text-[#8e9192] hover:text-[#c8c6c5]'
                }`}
              >
                <Calendar className="w-4 h-4" />
                Book A Table
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('message');
                  setSearchParams({ tab: 'message' });
                }}
                className={`flex-1 py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer pointer-events-auto ${
                  activeTab === 'message'
                    ? 'bg-[#ffbf00] text-[#402d00] shadow-md shadow-[#ffbf00]/20'
                    : 'text-[#8e9192] hover:text-[#c8c6c5]'
                }`}
              >
                <Send className="w-4 h-4" />
                Send Inquiry
              </button>
            </div>

            {/* TAB 1: TABLE RESERVATION */}
            {activeTab === 'reserve' && (
              <AnimatePresence mode="wait">
                {!isReserveSubmitted ? (
                  <motion.div
                    key="reserve-active"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#c8c6c5]">
                        Reserve Your Table
                      </h2>
                      <p className="text-xs text-[#8e9192] mt-1">
                        Instant reservation allocation dispatched directly to our WhatsApp desk.
                      </p>
                    </div>

                    {reserveError && (
                      <div className="p-3.5 bg-red-950/30 border border-red-500/40 rounded-xl text-xs text-red-300">
                        {reserveError}
                      </div>
                    )}

                    <form onSubmit={handleReserveSubmit} className="space-y-5">
                      {/* Name & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="reserve-name" className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="reserve-name"
                            required
                            placeholder="e.g. Shoiab Mushtaq"
                            value={reserveForm.name}
                            onChange={(e) => setReserveForm(p => ({ ...p, name: e.target.value }))}
                            className="w-full px-4 py-3 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-xl text-sm text-[#c8c6c5] placeholder-[#8e9192]/60 outline-none transition-colors"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="reserve-phone" className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="reserve-phone"
                            required
                            placeholder="e.g. 9419600518"
                            value={reserveForm.phone}
                            onChange={(e) => setReserveForm(p => ({ ...p, phone: e.target.value }))}
                            className="w-full px-4 py-3 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-xl text-sm text-[#c8c6c5] placeholder-[#8e9192]/60 outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Date & Time Slot */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="reserve-date" className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">
                            Preferred Date *
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ffbf00]" />
                            <input
                              type="date"
                              id="reserve-date"
                              required
                              min={minDate}
                              max={maxDate}
                              value={reserveForm.date}
                              onChange={(e) => setReserveForm(p => ({ ...p, date: e.target.value }))}
                              className="w-full pl-12 pr-4 py-3 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-xl text-sm text-[#c8c6c5] outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="reserve-time" className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">
                            Time Slot *
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ffbf00]" />
                            <select
                              id="reserve-time"
                              required
                              value={reserveForm.time}
                              onChange={(e) => setReserveForm(p => ({ ...p, time: e.target.value }))}
                              className="w-full pl-12 pr-4 py-3 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-xl text-sm text-[#c8c6c5] outline-none transition-colors appearance-none cursor-pointer"
                            >
                              {timeSlots.map(slot => (
                                <option key={slot} value={slot} className="bg-[#1e1e1e]">
                                  {slot}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Guests Stepper & Occasion */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold flex items-center justify-between">
                            <span>Number of Guests</span>
                            <span className="text-[#ffbf00] font-bold">{guests} Pax</span>
                          </label>
                          <div className="flex items-center justify-between bg-[#141313] border border-[#2d2b2b] rounded-xl p-1.5 h-[48px]">
                            <button
                              type="button"
                              onClick={() => handleGuestChange(-1)}
                              className="w-12 h-[38px] rounded-lg bg-[#1e1e1e] hover:bg-[#2d2b2b] text-[#c8c6c5] flex items-center justify-center text-lg font-bold transition-colors cursor-pointer pointer-events-auto"
                              aria-label="Decrease guests"
                            >
                              &minus;
                            </button>
                            <span className="text-sm font-bold text-[#c8c6c5] select-none flex items-center gap-1.5">
                              <Users className="w-4 h-4 text-[#ffbf00]" />
                              {guests} {guests === 1 ? 'Person' : 'Persons'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleGuestChange(1)}
                              className="w-12 h-[38px] rounded-lg bg-[#1e1e1e] hover:bg-[#2d2b2b] text-[#c8c6c5] flex items-center justify-center text-lg font-bold transition-colors cursor-pointer pointer-events-auto"
                              aria-label="Increase guests"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="reserve-occasion" className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">
                            Occasion
                          </label>
                          <div className="relative">
                            <Gift className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#ffbf00]" />
                            <select
                              id="reserve-occasion"
                              value={reserveForm.occasion}
                              onChange={(e) => setReserveForm(p => ({ ...p, occasion: e.target.value }))}
                              className="w-full pl-12 pr-4 py-3 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-xl text-sm text-[#c8c6c5] outline-none transition-colors appearance-none cursor-pointer"
                            >
                              {occasions.map(occ => (
                                <option key={occ} value={occ} className="bg-[#1e1e1e]">
                                  {occ}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Special Requests */}
                      <div className="space-y-2">
                        <label htmlFor="reserve-requests" className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">
                          Special Requests (Optional)
                        </label>
                        <textarea
                          id="reserve-requests"
                          rows="3"
                          value={reserveForm.requests}
                          onChange={(e) => setReserveForm(p => ({ ...p, requests: e.target.value }))}
                          placeholder="e.g. Riverside deck table, candlelight dinner setup, vegetarian menu preference, etc."
                          className="w-full px-4 py-3 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-xl text-sm text-[#c8c6c5] placeholder-[#8e9192]/60 outline-none transition-colors resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full py-4 bg-[#ffbf00] text-[#402d00] hover:bg-[#ffbf00]/95 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-[#ffbf00]/15 cursor-pointer pointer-events-auto"
                      >
                        <MessageSquare className="w-4 h-4 fill-[#402d00]" />
                        Confirm Table Reservation via WhatsApp
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="reserve-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-10 space-y-6 flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#ffbf00]/15 flex items-center justify-center border border-[#ffbf00]/30">
                      <CheckCircle2 className="w-9 h-9 text-[#ffbf00]" />
                    </div>

                    <div className="space-y-2 max-w-md">
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#c8c6c5]">
                        Reservation Request Dispatched!
                      </h3>
                      <p className="text-sm text-[#8e9192] leading-relaxed">
                        Your table reservation has been forwarded to our WhatsApp desk. Our host team will confirm availability with you promptly.
                      </p>
                    </div>

                    {/* Summary card */}
                    <div className="bg-[#141313] border border-[#2d2b2b] p-5 rounded-xl w-full max-w-sm text-left divide-y divide-[#2d2b2b]/60">
                      <div className="py-2 flex justify-between text-xs">
                        <span className="text-[#8e9192]">Guest Name:</span>
                        <span className="font-semibold text-[#c8c6c5]">{reserveForm.name}</span>
                      </div>
                      <div className="py-2 flex justify-between text-xs">
                        <span className="text-[#8e9192]">Contact:</span>
                        <span className="font-semibold text-[#c8c6c5]">{reserveForm.phone}</span>
                      </div>
                      <div className="py-2 flex justify-between text-xs">
                        <span className="text-[#8e9192]">Date & Time:</span>
                        <span className="font-semibold text-[#ffbf00]">{reserveForm.date} at {reserveForm.time}</span>
                      </div>
                      <div className="py-2 flex justify-between text-xs">
                        <span className="text-[#8e9192]">Party Size:</span>
                        <span className="font-semibold text-[#c8c6c5]">{guests} Pax</span>
                      </div>
                      <div className="py-2 flex justify-between text-xs">
                        <span className="text-[#8e9192]">Occasion:</span>
                        <span className="font-semibold text-[#c8c6c5]">{reserveForm.occasion}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsReserveSubmitted(false);
                        setReserveForm(p => ({ ...p, requests: '' }));
                      }}
                      className="px-6 py-3 rounded-xl border border-[#3a3939] text-[#c8c6c5] hover:border-[#ffbf00] hover:text-[#ffbf00] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer pointer-events-auto"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Make Another Booking
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {/* TAB 2: GENERAL INQUIRY / SEND A MESSAGE */}
            {activeTab === 'message' && (
              <motion.div
                key="inquiry-active"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#c8c6c5]">
                    Send Us A Message
                  </h2>
                  <p className="text-xs text-[#8e9192] mt-1">
                    Have a catering inquiry, private party request, or feedback? Drop us a line.
                  </p>
                </div>

                {inquiryError && (
                  <div className="p-3.5 bg-red-950/30 border border-red-500/40 rounded-xl text-xs text-red-300">
                    {inquiryError}
                  </div>
                )}

                {isInquirySubmitted && (
                  <div className="p-4 bg-green-950/20 border border-green-500/30 rounded-xl text-xs text-green-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-green-400" />
                    Thank you! Your inquiry has been forwarded to our WhatsApp desk.
                  </div>
                )}

                <form onSubmit={handleInquirySubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="inquiry-name" className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="inquiry-name"
                        required
                        placeholder="e.g. Shoiab Mushtaq"
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-3 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-xl text-sm text-[#c8c6c5] placeholder-[#8e9192]/60 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="inquiry-phone" className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="inquiry-phone"
                        placeholder="e.g. 9419600518"
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm(p => ({ ...p, phone: e.target.value }))}
                        className="w-full px-4 py-3 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-xl text-sm text-[#c8c6c5] placeholder-[#8e9192]/60 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="inquiry-email" className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        id="inquiry-email"
                        placeholder="e.g. yourname@domain.com"
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm(p => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-3 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-xl text-sm text-[#c8c6c5] placeholder-[#8e9192]/60 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="inquiry-subject" className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="inquiry-subject"
                        placeholder="e.g. Birthday Celebration / Outdoor Catering"
                        value={inquiryForm.subject}
                        onChange={(e) => setInquiryForm(p => ({ ...p, subject: e.target.value }))}
                        className="w-full px-4 py-3 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-xl text-sm text-[#c8c6c5] placeholder-[#8e9192]/60 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="inquiry-message" className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">
                      Your Message *
                    </label>
                    <textarea
                      id="inquiry-message"
                      required
                      rows="4"
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm(p => ({ ...p, message: e.target.value }))}
                      placeholder="Please share details about your request, estimated guest count, or any questions..."
                      className="w-full px-4 py-3 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-xl text-sm text-[#c8c6c5] placeholder-[#8e9192]/60 outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#ffbf00] text-[#402d00] hover:bg-[#ffbf00]/95 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-[#ffbf00]/15 cursor-pointer pointer-events-auto"
                  >
                    <Send className="w-4 h-4" />
                    Submit Inquiry via WhatsApp
                  </button>
                </form>
              </motion.div>
            )}

          </div>

        </div>

        {/* BOTTOM SECTION: Takeaway & Curbside Pickup Info (Matching AmberLeaf style) */}
        <div className="bg-[#1e1e1e] border border-[#2d2b2b] p-8 sm:p-10 rounded-2xl shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffbf00]/15 border border-[#ffbf00]/30 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[#ffbf00]" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-[#c8c6c5]">
                Takeaway & Express Curbside Pickup
              </h3>
              <p className="text-xs text-[#8e9192]">
                Enjoy authentic Turkish and Middle Eastern delicacies on-the-go without waiting.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Step 1 */}
            <div className="bg-[#141313] border border-[#2d2b2b] p-5 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-[#ffbf00] font-bold text-xs uppercase tracking-wider">
                <PhoneCall className="w-4 h-4" />
                Step 1: Pre-order
              </div>
              <h4 className="font-semibold text-sm text-[#c8c6c5]">Call or WhatsApp 20 Mins Ahead</h4>
              <p className="text-xs text-[#8e9192] leading-relaxed">
                Reach us at <a href={`tel:${primaryPhone.replace(/\s+/g, '')}`} className="text-[#ffbf00] font-semibold">{primaryPhone}</a> to place your order so it's fresh and ready.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#141313] border border-[#2d2b2b] p-5 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-[#ffbf00] font-bold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                Step 2: Arrival
              </div>
              <h4 className="font-semibold text-sm text-[#c8c6c5]">Drive to The Bund Road</h4>
              <p className="text-xs text-[#8e9192] leading-relaxed">
                Pull up near Chai Jai on Residency Road / The Bund. Our crew can hand over straight to your car.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#141313] border border-[#2d2b2b] p-5 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-[#ffbf00] font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Step 3: Enjoy
              </div>
              <h4 className="font-semibold text-sm text-[#c8c6c5]">Fresh & Steaming Handover</h4>
              <p className="text-xs text-[#8e9192] leading-relaxed">
                Receive tamper-proof hot packaged platters, authentic shawarmas, or Turkish tea to enjoy anywhere.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
