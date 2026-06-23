import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin, Phone, MessageSquare, Star, ChevronDown, Award, Shield, ThumbsUp } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import RatingBadge from '../components/RatingBadge';

// Bestseller dishes data from JSON
const featuredDishes = [
  {
    name: "Adana Kabab",
    price: 549,
    description: "Ground lamb or beef, grilled on a skewer and served wrapped in a lavash and topped with tomato sauce and yogurt.",
    type: "Non-Veg",
    tags: ["Bestseller", "Must-try"],
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Hummus With Pita Bread",
    price: 349,
    description: "Creamy, smooth blend of chickpeas, tahini, olive oil, and garlic served with warm, freshly baked pita bread.",
    type: "Veg",
    tags: ["Bestseller"],
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Mutton Uzbeki Pulao",
    price: 599,
    description: "Fragrant long-grain rice cooked in mutton broth with carrots, raisins, and chick peas, topped with tender mutton pieces.",
    type: "Non-Veg",
    tags: ["Must-try", "Bestseller"],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"
  }
];

// 6 Select Review Quotes from JSON
const reviews = [
  { quote: "The Kunafa here is absolutely to die for! The best I have had in Srinagar, served warm.", rating: 5, author: "Aamir H." },
  { quote: "Awesome service, especially by Mr. Adnan, who was extremely courteous and attentive.", rating: 5, author: "Sarah M." },
  { quote: "Adana Kabab is highly recommended. It was cooked to perfection, juicy and flavorful.", rating: 5, author: "Zaid B." },
  { quote: "Charming riverside ambiance overlooking the Jhelum. Very cozy interior decor.", rating: 5, author: "Mehak R." },
  { quote: "Great portion sizes. The Mix Kabab Platter easily feeds three people and is worth every rupee.", rating: 5, author: "Vikram S." },
  { quote: "Hummus was smooth and creamy, just the way it should be. The flatbread was warm and fresh.", rating: 5, author: "Nida Y." }
];

export default function Home() {
  const whatsappNumber = '917780938743';

  const makeWhatsAppUrl = (dishName) => {
    const text = encodeURIComponent(`Hi Meydani Cafe! I would like to order the featured dish: *${dishName}* from your website.`);
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  const genericOrderWhatsAppUrl = () => {
    const text = encodeURIComponent("Hi Meydani Cafe! I would like to order food from your menu.");
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  return (
    <div className="bg-[#141313] min-h-screen">
      <SEOHead 
        title="Authentic Turkish & Middle Eastern Dining" 
        description="Experience luxury Turkish and Middle Eastern hospitality at Meydani Cafe, Srinagar. View menu, order online, or reserve your table by the Jhelum banks."
        path="/"
      />

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        {/* Atmospheric Ambient Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#141313]/70 via-[#141313]/90 to-[#141313] z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop')` }}
        />

        {/* Glow Element */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#ffbf00]/5 blur-[120px] pointer-events-none z-0" />

        <div className="relative z-20 max-w-4xl mx-auto space-y-6">
          {/* Rating Badges Row */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <RatingBadge type="google" rating={4.7} count={1325} />
            <RatingBadge type="zomato" rating={4.2} count={46} />
          </motion.div>

          {/* Restaurant Title */}
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#c8c6c5]"
          >
            Meydani Cafe
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-lg md:text-2xl text-[#ffbf00] italic font-medium"
          >
            A Taste of Turkey on the Banks of Jhelum
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/reservations"
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#ffbf00] text-[#402d00] font-bold uppercase tracking-wider text-sm hover:bg-[#ffbf00]/95 hover:shadow-lg hover:shadow-[#ffbf00]/15 transition-all duration-200"
            >
              Reserve Table
            </Link>
            <Link
              to="/menu"
              className="w-full sm:w-auto px-8 py-4 rounded-lg border-2 border-[#ffbf00] text-[#ffbf00] font-bold uppercase tracking-wider text-sm hover:bg-[#ffbf00]/10 transition-all duration-200"
            >
              View Menu
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10 z-20 flex flex-col items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
          onClick={() => window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })}
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8e9192]">Explore More</span>
          <ChevronDown className="w-5 h-5 text-[#ffbf00]" />
        </motion.div>
      </section>

      {/* 2. QUICK INFO STRIP */}
      <section className="bg-[#1e1e1e] border-y border-[#2d2b2b] relative z-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#2d2b2b]">
          
          <div className="flex items-center gap-4 p-6 md:p-8">
            <Clock className="w-6 h-6 text-[#ffbf00] shrink-0" />
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">Opening Hours</h4>
              <p className="text-sm text-[#c8c6c5] mt-1">Daily: 10:00 AM - 9:00 PM</p>
              <p className="text-xs text-[#8e9192]">Saturday till 9:30 PM</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 md:p-8">
            <MapPin className="w-6 h-6 text-[#ffbf00] shrink-0" />
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">Location</h4>
              <p className="text-sm text-[#c8c6c5] mt-1">The Bund Road, Residency Road</p>
              <p className="text-xs text-[#8e9192]">Near Chai Jai, Polo View, Srinagar</p>
            </div>
          </div>

          <a href="tel:+918899058697" className="flex items-center gap-4 p-6 md:p-8 hover:bg-[#2d2b2b]/30 transition-colors group">
            <Phone className="w-6 h-6 text-[#ffbf00] shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#8e9192] font-semibold">Call For Delivery</h4>
              <p className="text-sm text-[#c8c6c5] mt-1 font-semibold group-hover:text-[#ffbf00] transition-colors">+91 8899058697</p>
              <p className="text-xs text-[#8e9192]">Click to call directly</p>
            </div>
          </a>

        </div>
      </section>

      {/* 3. FEATURED DISHES SECTION */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#ffbf00] font-semibold">Chef's Selection</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#c8c6c5]">Signature Bestsellers</h2>
          <div className="w-12 h-[2px] bg-[#ffbf00] mx-auto mt-4" />
        </div>

        {/* Responsive Grid with Horizontal Scroll on Mobile */}
        <div className="flex gap-6 overflow-x-auto pb-6 md:pb-0 md:grid md:grid-cols-3 no-scrollbar snap-x snap-mandatory">
          {featuredDishes.map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="min-w-[280px] sm:min-w-[340px] md:min-w-0 bg-[#1e1e1e] rounded-xl overflow-hidden shadow-xl snap-start flex flex-col justify-between group border border-[#2d2b2b] hover:border-[#ffbf00]/30 transition-all duration-300"
            >
              {/* Dish Image */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] to-transparent" />
                {/* Type Badge */}
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  dish.type === 'Veg' ? 'bg-green-900/80 text-green-300 border border-green-500/20' : 'bg-red-900/80 text-red-300 border border-red-500/20'
                }`}>
                  {dish.type}
                </span>
                {/* Tag badges */}
                <div className="absolute bottom-4 left-4 flex gap-1.5">
                  {dish.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-[#ffbf00]/90 text-[#402d00] text-[9px] font-bold uppercase tracking-wide">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-display text-xl font-bold text-[#c8c6c5] group-hover:text-[#ffbf00] transition-colors">{dish.name}</h3>
                    <span className="text-[#ffbf00] font-bold text-lg font-sans">₹{dish.price}</span>
                  </div>
                  <p className="text-xs text-[#8e9192] leading-relaxed line-clamp-3">{dish.description}</p>
                </div>

                <div className="space-y-2">
                  <a
                    href={makeWhatsAppUrl(dish.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    Order on WhatsApp
                  </a>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="https://www.zomato.com/srinagar/meydani-cafe-dal-gate"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 rounded-lg bg-[#E23744]/10 border border-[#E23744]/30 text-[#E23744] hover:bg-[#E23744] hover:text-white text-[10px] font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1 transition-all duration-200"
                    >
                      Zomato
                    </a>
                    <a
                      href="https://www.swiggy.com/city/srinagar/meydani-cafe-the-bund-road-residency-road-rest923343"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 rounded-lg bg-[#FC8019]/10 border border-[#FC8019]/30 text-[#FC8019] hover:bg-[#FC8019] hover:text-white text-[10px] font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1 transition-all duration-200"
                    >
                      Swiggy
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. ABOUT SNIPPET SECTION */}
      <section className="py-20 px-6 bg-[#1e1e1e] border-y border-[#2d2b2b]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#ffbf00] font-semibold">Our Story</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#c8c6c5] leading-tight">
              Crafting A Fine Mediterranean Culinary Legacy
            </h2>
            <p className="text-sm text-[#8e9192] leading-relaxed">
              Nestled near the historic Polo View and overlooking the tranquil banks of the Jhelum River, Meydani Cafe is a sanctuary of refined dining. We specialize in bringing authentic Turkish grills, delicate Middle Eastern mezze, and a curated range of continental fusion favorites to Srinagar. 
            </p>
            <p className="text-sm text-[#8e9192] leading-relaxed">
              Every kebab is hand-pressed, spiced with imported sumac and pul biber, and chargrilled over open coals. Under the dedicated care of our hospitality team, we strive to ensure that every visitor experiences genuine Mediterranean warmth.
            </p>
            <div className="pt-2">
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 text-sm text-[#ffbf00] font-semibold hover:text-[#ffbf00]/80 transition-colors group"
              >
                Read Full Story 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#141313] border border-[#2d2b2b] p-8 rounded-xl space-y-8"
          >
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#8e9192] mb-3 font-semibold">Cuisine Focus</h4>
              <div className="flex flex-wrap gap-2">
                {["Turkish", "Middle Eastern", "Continental", "Chinese Fusion", "Kunafa Specialty"].map(tag => (
                  <span key={tag} className="text-xs bg-[#1e1e1e] border border-[#2d2b2b] text-[#c8c6c5] px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 divide-x divide-[#2d2b2b]">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-[#8e9192] mb-1 font-semibold">Cost For Two</h4>
                <p className="text-xl font-bold text-[#ffbf00]">₹800 <span className="text-xs text-[#8e9192] font-normal">Approx.</span></p>
              </div>
              <div className="pl-6">
                <h4 className="text-xs uppercase tracking-wider text-[#8e9192] mb-1 font-semibold">Ambience Vibe</h4>
                <p className="text-sm text-[#c8c6c5] font-semibold">Riverside View & Cozy Decor</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#8e9192] mb-4 font-semibold">Amenities Offered</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-xs text-[#8e9192]">
                  <Award className="w-4 h-4 text-[#ffbf00]" />
                  <span>Indoor Dining</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8e9192]">
                  <Shield className="w-4 h-4 text-[#ffbf00]" />
                  <span>Free WiFi</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8e9192]">
                  <ThumbsUp className="w-4 h-4 text-[#ffbf00]" />
                  <span>Air Conditioned</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8e9192]">
                  <Clock className="w-4 h-4 text-[#ffbf00]" />
                  <span>Riverside View</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 5. REVIEWS MARQUEE STRIP */}
      <section className="py-16 bg-[#141313] overflow-hidden border-b border-[#2d2b2b] relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#141313] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#141313] to-transparent z-10" />
        
        {/* Infinite scrolling block */}
        <div className="animate-marquee">
          {/* Double list for smooth loop */}
          {[...reviews, ...reviews].map((rev, idx) => (
            <div 
              key={idx} 
              className="bg-[#1e1e1e] border border-[#2d2b2b] rounded-xl p-6 mx-4 w-[280px] sm:w-[350px] shrink-0 space-y-4 shadow-lg"
            >
              <div className="flex gap-1">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#ffbf00] text-[#ffbf00]" />
                ))}
              </div>
              <p className="text-xs text-[#8e9192] italic leading-relaxed">
                "{rev.quote}"
              </p>
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-[#ffbf00] font-semibold">
                <span>— {rev.author}</span>
                <span className="text-[#8e9192] lowercase">verified diner</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ORDER ONLINE / DELIVERY LINKS */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto text-center space-y-12">
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] text-[#ffbf00] font-semibold">Fast & Fresh</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#c8c6c5]">Order From Home</h2>
          <p className="text-xs text-[#8e9192] max-w-lg mx-auto">
            Craving Turkish delights? Get them delivered straight to your doorstep via Srinagar's top food delivery aggregators or order directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Zomato */}
          <div className="bg-[#1e1e1e] border border-[#2d2b2b] hover:border-red-500/30 p-8 rounded-xl flex flex-col justify-between items-center space-y-6 group transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-red-950/20 border border-red-500/20 flex items-center justify-center">
              <span className="text-red-500 font-black text-2xl tracking-tighter">Z</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#c8c6c5]">Zomato Delivery</h3>
              <p className="text-xs text-[#8e9192]">Get 4.2★ rated dining delivered in Srinagar</p>
            </div>
            <a 
              href="https://www.zomato.com/srinagar/meydani-cafe-dal-gate"
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Order on Zomato
            </a>
          </div>

          {/* Swiggy */}
          <div className="bg-[#1e1e1e] border border-[#2d2b2b] hover:border-orange-500/30 p-8 rounded-xl flex flex-col justify-between items-center space-y-6 group transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-orange-950/20 border border-orange-500/20 flex items-center justify-center">
              <span className="text-orange-500 font-black text-xl tracking-wider">S</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#c8c6c5]">Swiggy Delivery</h3>
              <p className="text-xs text-[#8e9192]">Fast hot delivery straight from our grill</p>
            </div>
            <a 
              href="https://www.swiggy.com/city/srinagar/meydani-cafe-the-bund-road-residency-road-rest923343"
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-[#141313] text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Order on Swiggy
            </a>
          </div>

          {/* Direct WhatsApp */}
          <div className="bg-[#1e1e1e] border border-[#2d2b2b] hover:border-[#ffbf00]/30 p-8 rounded-xl flex flex-col justify-between items-center space-y-6 group transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-[#ffbf00]/10 border border-[#ffbf00]/35 flex items-center justify-center">
              <MessageSquare className="w-7 h-7 text-[#ffbf00]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#c8c6c5]">WhatsApp Order</h3>
              <p className="text-xs text-[#8e9192]">Direct takeaway & delivery coordination</p>
            </div>
            <a 
              href={genericOrderWhatsAppUrl()}
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-2 rounded-lg bg-[#ffbf00] hover:bg-[#ffbf00]/90 text-[#402d00] text-xs font-bold uppercase tracking-wider transition-colors shadow-md shadow-[#ffbf00]/10"
            >
              Chat to Order
            </a>
          </div>
        </div>
      </section>

      {/* 7. INSTAGRAM STRIP */}
      <section className="py-20 bg-[#1e1e1e] border-y border-[#2d2b2b]">
        <div className="max-w-[1200px] mx-auto px-6 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left space-y-1">
              <h3 className="font-display text-2xl font-bold text-[#c8c6c5]">Follow Us On Instagram</h3>
              <p className="text-xs text-[#8e9192]">Share your meals using #MeydaniCafe</p>
            </div>
            <a 
              href="https://www.instagram.com/meydani_cafe1/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg border border-[#3a3939] text-[#c8c6c5] hover:text-[#ffbf00] hover:border-[#ffbf00] text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            >
              @[handle] meydani_cafe1
            </a>
          </div>

          {/* 6 Photo Grid Placeholders with premium overlays */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Hummus Dip", grad: "from-[#2b1010] to-[#502818]", link: "https://www.instagram.com/meydani_cafe1/reel/DZjfw6IOK92/?hl=en" },
              { label: "River Deck", grad: "from-[#10202b] to-[#1a384f]", link: "https://www.instagram.com/mubashirkashmirii/reel/DYCWrvWpe5w/?hl=en" },
              { label: "Shish Tawook", grad: "from-[#281810] to-[#4c2d1b]", link: "https://www.instagram.com/meydani_cafe1/reel/DWsuULoDkCW/?hl=en" },
              { label: "Turkish Tea", grad: "from-[#2b1020] to-[#501a38]", link: "https://www.instagram.com/nexgen.marketting/reel/DZhtId9JvDx/?hl=en" },
              { label: "Cozy Dining", grad: "from-[#1a102b] to-[#341d50]", link: "https://www.instagram.com/meydani_cafe1/reel/DZBuQ53OlwQ/?hl=en" },
              { label: "Kunafa Plate", grad: "from-[#2b2b10] to-[#4f4f1a]", link: "https://www.instagram.com/meydani_cafe1/reel/DYrajFsMmse/?hl=en" }
            ].map((tile, i) => (
              <a 
                href={tile.link}
                key={i} 
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-44 rounded-lg overflow-hidden group border border-[#2d2b2b]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tile.grad} opacity-80 group-hover:scale-105 transition-transform duration-300`} />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 p-4 flex items-end justify-center text-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#c8c6c5] font-sans">
                    {tile.label}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
