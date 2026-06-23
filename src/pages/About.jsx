import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Compass, Heart, Sparkles, Coffee, Users } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import data from '../data/restaurant-data.json';

const amenities = data.restaurant.amenities;

const values = [
  {
    icon: Award,
    title: "Premium Quality",
    desc: "We source authentic spices (pul biber, sumac) and tender cuts of meat to maintain standard Turkish and Middle Eastern culinary authenticity."
  },
  {
    icon: Compass,
    title: "Riverside Ambiance",
    desc: "Overlooking the banks of the Jhelum River, our cafe offers a cozy, peaceful evening sanctuary in the heart of Srinagar."
  },
  {
    icon: Heart,
    title: "Warm Hospitality",
    desc: "Led by Adnan and Tariq, our staff is dedicated to offering courteous, attentive service that makes you feel like family."
  }
];

export default function About() {
  return (
    <div className="bg-[#141313] min-h-screen pt-28 pb-20">
      <SEOHead 
        title="Our Story & Values" 
        description="Learn about Meydani Cafe, the premier Turkish and Middle Eastern cafe on Jhelum banks in Srinagar. Read about our culinary philosophy and core values."
        path="/about"
      />

      {/* 1. HERO BANNER */}
      <section className="relative h-64 sm:h-80 flex items-center justify-center text-center px-6 overflow-hidden border-b border-[#2d2b2b]">
        <div className="absolute inset-0 bg-[#141313]/85 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop')` }}
        />
        
        <div className="relative z-20 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#ffbf00] font-semibold">Hospitality Legacy</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#c8c6c5]">Our Story</h1>
          <p className="text-xs text-[#8e9192] max-w-md mx-auto">Get to know Meydani Cafe's founding values and culinary philosophy.</p>
        </div>
      </section>

      {/* 2. STORY NARRATIVE */}
      <section className="py-20 px-6 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-8 bg-[#ffbf00]" />
            <span className="text-xs uppercase tracking-wider text-[#ffbf00] font-semibold">Behind the Grill</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#c8c6c5] leading-tight">
            Turkish Heritage Meets Kashmiri Landscape
          </h2>
          
          <p className="text-sm text-[#8e9192] leading-relaxed">
            Meydani Cafe was founded with a singular purpose: to bring the vibrant, rich culinary culture of Turkey and the Mediterranean to the historic Bund Road in Srinagar. Overlooking the Jhelum, the cafe serves as a bridge between the spice bazaars of Istanbul and the serene beauty of Jammu and Kashmir.
          </p>

          <p className="text-sm text-[#8e9192] leading-relaxed">
            Our kitchen focuses on authentic grill techniques. Every dish, from the hand-pressed Adana Kabab to the golden Kunafa, is prepared under strict specifications. We believe in scratch-cooked mezze, utilizing cold-pressed olive oils, fresh tahini, and house-baked pita bread. 
          </p>

          <p className="text-sm text-[#8e9192] leading-relaxed">
            Our founders envisioned a space that transcends dining—a place of cozy lighting, soft music, and generous portions, where families and travelers can unwind. Led by managers Mr. Adnan and Mr. Tariq, our service is focused on ensuring that every visit is memorable.
          </p>
        </div>

        {/* Right side banner layout */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="h-44 rounded-xl bg-gradient-to-br from-[#281810] to-[#502a1b] overflow-hidden flex items-center justify-center p-4 border border-[#2d2b2b]">
              <div className="text-center space-y-1">
                <span className="text-2xl font-black text-[#ffbf00]">Authentic</span>
                <p className="text-[10px] uppercase text-[#c8c6c5] tracking-wider font-semibold">Turkish Spices</p>
              </div>
            </div>
            <div className="h-64 rounded-xl bg-gradient-to-tr from-[#10202b] to-[#1a384f] overflow-hidden flex items-center justify-center p-4 border border-[#2d2b2b]">
              <div className="text-center space-y-2">
                <Coffee className="w-8 h-8 text-[#ffbf00] mx-auto opacity-70" />
                <span className="text-base font-bold text-[#c8c6c5] block">Riverside Vibe</span>
                <p className="text-[10px] text-[#8e9192] leading-relaxed">Overlooking Jhelum River banks</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="h-64 rounded-xl bg-gradient-to-br from-[#2b1020] to-[#501a38] overflow-hidden flex items-center justify-center p-4 border border-[#2d2b2b]">
              <div className="text-center space-y-2">
                <Users className="w-8 h-8 text-[#ffbf00] mx-auto opacity-70" />
                <span className="text-base font-bold text-[#c8c6c5] block">Attentive Care</span>
                <p className="text-[10px] text-[#8e9192] leading-relaxed">Mr. Adnan & team hospitality</p>
              </div>
            </div>
            <div className="h-44 rounded-xl bg-gradient-to-tr from-[#2d2a1a] to-[#5c5636] overflow-hidden flex items-center justify-center p-4 border border-[#2d2b2b]">
              <div className="text-center space-y-1">
                <span className="text-2xl font-black text-[#ffbf00]">4.7 ★</span>
                <p className="text-[10px] uppercase text-[#c8c6c5] tracking-wider font-semibold">Google Score</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VALUE CARDS */}
      <section className="py-20 bg-[#1e1e1e] border-y border-[#2d2b2b] px-6">
        <div className="max-w-[1200px] mx-auto space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#ffbf00] font-semibold">Core Pillars</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#c8c6c5]">What Defines Us</h2>
            <div className="w-12 h-[2px] bg-[#ffbf00] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div key={idx} className="bg-[#141313] border border-[#2d2b2b] p-8 rounded-xl space-y-4 hover:border-[#ffbf00]/30 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-[#ffbf00]/10 flex items-center justify-center border border-[#ffbf00]/25">
                    <IconComp className="w-5 h-5 text-[#ffbf00]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#c8c6c5]">{val.title}</h3>
                  <p className="text-xs text-[#8e9192] leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. AMENITIES GRID */}
      <section className="py-20 px-6 max-w-[1200px] mx-auto space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-[#ffbf00] font-semibold">Diner Facilities</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#c8c6c5]">Amenities & Highlights</h2>
          <div className="w-12 h-[2px] bg-[#ffbf00] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {amenities.map((item, index) => (
            <div key={index} className="bg-[#1e1e1e] border border-[#2d2b2b] p-5 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#141313] flex items-center justify-center shrink-0 border border-[#2d2b2b]">
                <Sparkles className="w-4 h-4 text-[#ffbf00]" />
              </div>
              <span className="text-xs text-[#c8c6c5] font-sans font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. VISIT US CTA */}
      <section className="py-24 px-6 max-w-[900px] mx-auto text-center relative overflow-hidden rounded-2xl bg-[#1e1e1e] border border-[#2d2b2b] shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#ffbf00]/5 blur-3xl z-0" />
        
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#ffbf00] font-semibold">Reserve Your Seat</span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#c8c6c5] leading-tight">
              Ready to Experience Authentic Hospitality?
            </h2>
            <p className="text-xs text-[#8e9192] max-w-md mx-auto leading-relaxed">
              We look forward to hosting you on the banks of the Jhelum. Direct confirmations sent instantly.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/reservations"
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#ffbf00] text-[#402d00] font-bold uppercase tracking-wider text-xs hover:bg-[#ffbf00]/95 transition-all shadow-lg shadow-[#ffbf00]/15"
            >
              Reserve Table
            </Link>
            <Link
              to="/menu"
              className="w-full sm:w-auto px-8 py-4 rounded-lg border border-[#3a3939] text-[#c8c6c5] hover:border-[#ffbf00] hover:text-[#ffbf00] font-bold uppercase tracking-wider text-xs transition-all"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
