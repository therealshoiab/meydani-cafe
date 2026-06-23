import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Coffee, Compass, Check, Calendar, ArrowRight, MessageSquare, Send, Sparkles } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const promos = [
  {
    icon: Coffee,
    title: "Happy Hour Mocktails",
    discount: "15% OFF",
    time: "Mon - Fri: 4:00 PM - 7:00 PM",
    desc: "Unwind with our handcrafted mocktails and refreshing mojitos. Get 15% off on all cool refreshments."
  },
  {
    icon: Compass,
    title: "Weekend Uzbeki Platter",
    discount: "10% OFF",
    time: "Saturdays & Sundays",
    desc: "Gather the family for a massive feast featuring Uzbeki Pulao, chargrilled lamb chops, Turkish kebabs, and drinks."
  },
  {
    icon: Gift,
    title: "Celebrate With Us",
    discount: "FREE KUNAFA",
    time: "Valid on birthdays & anniversaries",
    desc: "Host your party at Meydani Cafe. We'll celebrate your day with a free signature warm baked Kunafa dessert (for groups of 4+)."
  }
];

export default function Offers() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    // Retrieve existing email lists
    const existing = JSON.parse(localStorage.getItem('meydani_subscribers') || '[]');
    if (!existing.includes(email)) {
      existing.push(email);
      localStorage.setItem('meydani_subscribers', JSON.stringify(existing));
    }
    setSubscribed(true);
    setEmail('');
  };

  const handleCateringCta = () => {
    const text = encodeURIComponent("Hi Meydani Cafe! I would like to inquire about bulk ordering/catering services for an event.");
    const whatsappNumber = '917780938743';
    const url = `https://wa.me/${whatsappNumber}?text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-[#141313] min-h-screen pt-28 pb-20 px-6">
      <SEOHead 
        title="Special Offers & Events" 
        description="Explore exclusive dining discounts, happy hour deals, and weekend banquet specials at Meydani Cafe, Srinagar. Sign up for our newsletter."
        path="/offers"
      />

      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Header Block */}
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[#ffbf00] font-semibold">Dine & Save</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-[#c8c6c5]">Exclusive Offers</h1>
          <div className="w-12 h-[2px] bg-[#ffbf00] mx-auto" />
        </div>

        {/* Promo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promos.map((promo, idx) => {
            const IconComp = promo.icon;
            return (
              <div 
                key={idx} 
                className="bg-[#1e1e1e] border border-[#2d2b2b] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#ffbf00]/30 hover:shadow-xl hover:shadow-[#ffbf00]/5 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Glow Overlay */}
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#ffbf00]/5 blur-xl pointer-events-none" />

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 rounded-xl bg-[#ffbf00]/10 flex items-center justify-center border border-[#ffbf00]/25">
                      <IconComp className="w-5 h-5 text-[#ffbf00]" />
                    </div>
                    <span className="text-xl font-extrabold text-[#ffbf00] font-sans bg-[#ffbf00]/10 px-3 py-1 rounded-lg border border-[#ffbf00]/20">
                      {promo.discount}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#c8c6c5] group-hover:text-[#ffbf00] transition-colors">{promo.title}</h3>
                    <p className="text-xs text-[#ffbf00] font-semibold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {promo.time}
                    </p>
                    <p className="text-xs text-[#8e9192] leading-relaxed pt-2">{promo.desc}</p>
                  </div>
                </div>

                <div className="pt-6">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8e9192] group-hover:text-[#ffbf00] transition-colors flex items-center gap-1">
                    Applicable on Dine-In
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Catering Enquiry Block */}
        <section className="bg-[#1e1e1e] border border-[#2d2b2b] p-8 sm:p-12 rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[#ffbf00]/2 opacity-25 pointer-events-none" />
          
          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#ffbf00]/15 border border-[#ffbf00]/25 text-[10px] font-bold uppercase tracking-wider text-[#ffbf00]">
              <Sparkles className="w-3 h-3" />
              Special Events
            </div>
            <h2 className="font-display text-3xl font-bold text-[#c8c6c5] leading-tight">
              Hostings & Bulk Catering Orders
            </h2>
            <p className="text-xs text-[#8e9192] leading-relaxed">
              Planning a birthday party, family get-together, or corporate lunch? Meydani Cafe provides customized catering platters and reserved seating blocks. Talk to our coordinator to design your customized menu.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end relative z-10">
            <button
              onClick={handleCateringCta}
              className="py-4 px-8 rounded-lg bg-[#ffbf00] text-[#402d00] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#ffbf00]/95 transition-colors shadow-lg shadow-[#ffbf00]/10 pointer-events-auto"
            >
              <MessageSquare className="w-4 h-4 fill-[#402d00] text-[#ffbf00]" />
              Inquire Catering via WhatsApp
            </button>
          </div>
        </section>

        {/* Newsletter Block */}
        <section className="py-16 text-center max-w-[600px] mx-auto space-y-6">
          <div className="space-y-2">
            <h3 className="font-display text-2xl font-bold text-[#c8c6c5]">Join The Meydani Club</h3>
            <p className="text-xs text-[#8e9192] leading-relaxed">
              Subscribe to receive updates about monthly music events, chef's additions, and members-only weekend discount codes.
            </p>
          </div>

          {subscribed ? (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 bg-green-950/20 border border-green-500/30 rounded-lg text-xs text-green-400 flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              Subscription successful! Welcome to Meydani Cafe newsletter list.
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-[#1e1e1e] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-lg text-sm text-[#c8c6c5] placeholder-[#8e9192] outline-none transition-colors"
              />
              <button
                type="submit"
                className="py-3 px-6 bg-[#ffbf00] hover:bg-[#ffbf00]/90 text-[#402d00] rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors pointer-events-auto"
              >
                <Send className="w-3.5 h-3.5" />
                Subscribe
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
