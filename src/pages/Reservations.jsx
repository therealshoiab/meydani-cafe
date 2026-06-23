import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Gift, MessageSquare, Phone, ArrowLeft, CheckCircle2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';

// Generates half-hour slots within opening hours (10:00 AM - 9:00 PM)
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

export default function Reservations() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: timeSlots[8], // default 2:00 PM
    occasion: occasions[0],
    requests: ''
  });
  const [guests, setGuests] = useState(2);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Restrict calendar select range: min = today, max = 30 days from now
  const { minDate, maxDate } = useMemo(() => {
    const today = new Date();
    const future = new Date();
    future.setDate(today.getDate() + 30);
    
    return {
      minDate: today.toISOString().split('T')[0],
      maxDate: future.toISOString().split('T')[0]
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGuestChange = (amount) => {
    setGuests(prev => {
      const val = prev + amount;
      return val >= 1 && val <= 20 ? val : prev;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Quick validation
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    setErrorMsg('');

    // Composing the WhatsApp Message
    const text = 
      `🍽️ *Table Reservation — Meydani Cafe*\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `📅 *Date:* ${formData.date}\n` +
      `⏰ *Time:* ${formData.time}\n` +
      `👥 *Guests:* ${guests} Pax\n` +
      `🎉 *Occasion:* ${formData.occasion}\n` +
      `📝 *Special Request:* ${formData.requests || 'None'}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━\n` +
      `*Booked via website* ✅`;

    const whatsappNumber = '917780938743';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    
    // Redirect user to WhatsApp
    window.open(url, '_blank');
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#141313] min-h-screen pt-28 pb-20 px-6">
      <SEOHead 
        title="Reserve A Table" 
        description="Book your dining table at Meydani Cafe, Srinagar. Choose your preferred date, time slot, and guest count, and receive instant confirmation via WhatsApp."
        path="/reservations"
      />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Form Panel */}
        <div className="lg:col-span-8 bg-[#1e1e1e] border border-[#2d2b2b] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="booking-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#ffbf00] font-semibold">Instant Booking</span>
                  <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#c8c6c5]">Book Your Experience</h1>
                  <p className="text-xs text-[#8e9192]">Configure your details below. Clicking submit will send your request to our reservation desk via WhatsApp.</p>
                </div>

                {errorMsg && (
                  <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-lg text-xs text-red-400">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="booking-name" className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">Your Name *</label>
                      <input
                        type="text"
                        id="booking-name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Suhail Ahmad"
                        className="w-full px-4 py-3 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-lg text-sm text-[#c8c6c5] placeholder-[#8e9192] outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="booking-phone" className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">Phone Number *</label>
                      <input
                        type="tel"
                        id="booking-phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 9906XXXXXX"
                        className="w-full px-4 py-3 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-lg text-sm text-[#c8c6c5] placeholder-[#8e9192] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="booking-date" className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">Preferred Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e9192]" />
                        <input
                          type="date"
                          id="booking-date"
                          name="date"
                          required
                          min={minDate}
                          max={maxDate}
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-lg text-sm text-[#c8c6c5] outline-none transition-colors appearance-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="booking-time" className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">Time Slot *</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e9192]" />
                        <select
                          id="booking-time"
                          name="time"
                          required
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-lg text-sm text-[#c8c6c5] outline-none transition-colors appearance-none"
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">Number of Guests *</label>
                      <div className="flex items-center justify-between bg-[#141313] border border-[#2d2b2b] rounded-lg p-1.5 h-[46px]">
                        <button
                          type="button"
                          onClick={() => handleGuestChange(-1)}
                          className="w-11 h-[38px] rounded-md bg-[#1e1e1e] hover:bg-[#2d2b2b] text-[#c8c6c5] flex items-center justify-center text-lg font-bold pointer-events-auto min-h-[44px]"
                          aria-label="Decrease guests"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold text-[#ffbf00] select-none">{guests} Guest{guests > 1 ? 's' : ''}</span>
                        <button
                          type="button"
                          onClick={() => handleGuestChange(1)}
                          className="w-11 h-[38px] rounded-md bg-[#1e1e1e] hover:bg-[#2d2b2b] text-[#c8c6c5] flex items-center justify-center text-lg font-bold pointer-events-auto min-h-[44px]"
                          aria-label="Increase guests"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="booking-occasion" className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">Occasion</label>
                      <div className="relative">
                        <Gift className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e9192]" />
                        <select
                          id="booking-occasion"
                          name="occasion"
                          value={formData.occasion}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-lg text-sm text-[#c8c6c5] outline-none transition-colors appearance-none"
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
                    <label htmlFor="booking-requests" className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">Special Requests (Optional)</label>
                    <textarea
                      id="booking-requests"
                      name="requests"
                      rows="3"
                      value={formData.requests}
                      onChange={handleChange}
                      placeholder="e.g. Riverside table preferred, food allergies, decoration setup, etc."
                      className="w-full px-4 py-3 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-lg text-sm text-[#c8c6c5] placeholder-[#8e9192] outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#ffbf00] text-[#402d00] rounded-lg text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#ffbf00]/95 transition-colors shadow-lg shadow-[#ffbf00]/10 cursor-pointer pointer-events-auto"
                  >
                    <MessageSquare className="w-4 h-4 fill-[#402d00] text-[#ffbf00]" />
                    Send Request to WhatsApp
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-12 space-y-6 flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#ffbf00]/15 flex items-center justify-center border border-[#ffbf00]/30 mb-2">
                  <CheckCircle2 className="w-8 h-8 text-[#ffbf00]" />
                </div>
                
                <div className="space-y-2 max-w-md">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#c8c6c5]">Request Sent!</h2>
                  <p className="text-sm text-[#8e9192] leading-relaxed">
                    Your table reservation request has been dispatched. Our team will verify table availability and reply to you on WhatsApp within 30 minutes. 🎉
                  </p>
                </div>

                <div className="bg-[#141313] border border-[#2d2b2b] p-6 rounded-xl w-full max-w-sm text-left divide-y divide-[#2d2b2b]/60">
                  <div className="py-2 flex justify-between text-xs"><span className="text-[#8e9192]">Guest:</span> <span className="font-semibold text-[#c8c6c5]">{formData.name}</span></div>
                  <div className="py-2 flex justify-between text-xs"><span className="text-[#8e9192]">Date:</span> <span className="font-semibold text-[#c8c6c5]">{formData.date}</span></div>
                  <div className="py-2 flex justify-between text-xs"><span className="text-[#8e9192]">Time Slot:</span> <span className="font-semibold text-[#c8c6c5]">{formData.time}</span></div>
                  <div className="py-2 flex justify-between text-xs"><span className="text-[#8e9192]">Guests Count:</span> <span className="font-semibold text-[#c8c6c5]">{guests} Pax</span></div>
                  <div className="py-2 flex justify-between text-xs"><span className="text-[#8e9192]">Occasion:</span> <span className="font-semibold text-[#c8c6c5]">{formData.occasion}</span></div>
                </div>

                <button
                  onClick={() => { setIsSubmitted(false); setFormData(p => ({ ...p, requests: '' })); }}
                  className="px-6 py-2.5 rounded-lg border border-[#3a3939] text-[#c8c6c5] hover:border-[#ffbf00] hover:text-[#ffbf00] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all pointer-events-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Make Another Booking
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Right Side: Info Panel */}
        <div className="lg:col-span-4 space-y-6">
          {/* Visual card */}
          <div className="bg-[#1e1e1e] border border-[#2d2b2b] rounded-2xl overflow-hidden shadow-xl">
            <div className="h-48 bg-gradient-to-br from-[#281810] to-[#502a1b] relative overflow-hidden flex items-center justify-center text-center">
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 p-6 space-y-2">
                <h3 className="font-display text-xl font-bold text-[#c8c6c5]">Riverside Deck Dining</h3>
                <p className="text-xs text-[#ffbf00]">Beautiful Scenic Dining Overlooking the Jhelum</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-xs text-[#8e9192] leading-relaxed">
                Enjoy a scenic, cozy evening. For special group layouts, corporate dinners, or candlelit date nights, please submit details ahead of schedule.
              </p>
              <a
                href="tel:+918899058697"
                className="w-full py-3 bg-[#2d2b2b] hover:bg-[#ffbf00] hover:text-[#402d00] text-[#c8c6c5] rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 pointer-events-auto"
              >
                <Phone className="w-4 h-4" />
                Call to Confirm Direct
              </a>
            </div>
          </div>

          {/* Timings card */}
          <div className="bg-[#1e1e1e] border border-[#2d2b2b] p-6 rounded-2xl space-y-4 shadow-xl">
            <h4 className="text-xs uppercase tracking-wider text-[#ffbf00] font-semibold">Service Timings</h4>
            <div className="space-y-2 text-xs divide-y divide-[#2d2b2b]">
              <div className="flex justify-between py-2"><span className="text-[#8e9192]">Monday - Friday</span> <span className="text-[#c8c6c5] font-medium">10:00 AM - 9:00 PM</span></div>
              <div className="flex justify-between py-2"><span className="text-[#8e9192]">Saturday Specials</span> <span className="text-[#c8c6c5] font-semibold text-[#ffbf00]">10:00 AM - 9:30 PM</span></div>
              <div className="flex justify-between py-2"><span className="text-[#8e9192]">Sunday Feasts</span> <span className="text-[#c8c6c5] font-medium">10:00 AM - 9:00 PM</span></div>
            </div>
            <p className="text-[10px] text-[#8e9192] leading-relaxed italic text-center pt-2">
              Note: Kitchen orders close 30 minutes before closing.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
