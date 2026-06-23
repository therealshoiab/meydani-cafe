import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Plus, Minus, Trash2, X, MessageSquare } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import data from '../data/restaurant-data.json';

const menuData = data.restaurant.menu;

export default function Menu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDiet, setSelectedDiet] = useState('All'); // All | Veg | Non-Veg
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Extract all categories dynamically from the JSON
  const categories = useMemo(() => {
    const list = menuData.map(c => c.category);
    return ['All', ...list];
  }, []);

  // Flattened and filtered menu items list
  const filteredItems = useMemo(() => {
    let list = [];
    
    // First flatten items along with their category name
    menuData.forEach(cat => {
      cat.items.forEach(item => {
        list.push({
          ...item,
          categoryName: cat.category
        });
      });
    });

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      list = list.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by Category Tab
    if (selectedCategory !== 'All') {
      list = list.filter(item => item.categoryName === selectedCategory);
    }

    // Filter by Diet (Veg / Non-Veg)
    if (selectedDiet !== 'All') {
      list = list.filter(item => item.type === selectedDiet);
    }

    return list;
  }, [searchQuery, selectedCategory, selectedDiet]);

  // Cart operations
  const addToCart = (item) => {
    setCart(prevCart => {
      const existing = prevCart.find(cartItem => cartItem.name === item.name);
      if (existing) {
        return prevCart.map(cartItem => 
          cartItem.name === item.name 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (name) => {
    setCart(prevCart => prevCart.filter(item => item.name !== name));
  };

  const updateQuantity = (name, amount) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.name === name) {
          const newQty = item.quantity + amount;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => setCart([]);

  const totalCartItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const totalCartPrice = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  // Formats and opens the WhatsApp checkout link
  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    let text = "🛒 *New Order from Meydani Cafe Website*\n";
    text += "━━━━━━━━━━━━━━━━━━━━━\n\n";
    
    cart.forEach((item, index) => {
      const dietIndicator = item.type === "Veg" ? "🟢" : "🔴";
      text += `*${index + 1}. ${item.name}* (${dietIndicator})\n`;
      text += `   Qty: ${item.quantity} x ₹${item.price} = ₹${item.price * item.quantity}\n`;
    });
    
    text += "\n━━━━━━━━━━━━━━━━━━━━━\n";
    text += `*Total Order Value:* ₹${totalCartPrice}\n\n`;
    text += "Please confirm my order. I would like to know estimated preparation time.";

    const whatsappNumber = '917780938743';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-[#141313] min-h-screen pt-28 pb-20 px-6 relative">
      <SEOHead 
        title="Mouthwatering Menu" 
        description="Browse the complete menu of Meydani Cafe, Srinagar. Filter by Veg/Non-Veg, search your favorite Turkish kebabs, and order directly on WhatsApp."
        path="/menu"
      />

      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Header Block */}
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[#ffbf00] font-semibold">Exquisite Taste</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-[#c8c6c5]">Our Culinary Menu</h1>
          <div className="w-12 h-[2px] bg-[#ffbf00] mx-auto" />
        </div>

        {/* Search & Diet Toggle */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-[#1e1e1e] p-4 rounded-xl border border-[#2d2b2b]">
          {/* Search bar */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8e9192]" />
            <input
              type="text"
              placeholder="Search dishes (e.g. Kabab, Hummus, Kunafa)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#141313] border border-[#2d2b2b] focus:border-[#ffbf00] rounded-lg text-sm text-[#c8c6c5] placeholder-[#8e9192] outline-none transition-colors"
            />
          </div>

          {/* Diet filters (All / Veg / Non-Veg) */}
          <div className="flex bg-[#141313] border border-[#2d2b2b] p-1 rounded-lg">
            {['All', 'Veg', 'Non-Veg'].map((diet) => (
              <button
                key={diet}
                onClick={() => setSelectedDiet(diet)}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${
                  selectedDiet === diet 
                    ? 'bg-[#ffbf00] text-[#402d00]' 
                    : 'text-[#8e9192] hover:text-[#c8c6c5]'
                }`}
              >
                {diet}
              </button>
            ))}
          </div>
        </div>

        {/* Sticky Filter Tabs */}
        <div className="sticky top-[72px] z-30 py-3 bg-[#141313]/90 backdrop-blur-md border-b border-[#2d2b2b] -mx-6 px-6 overflow-x-auto no-scrollbar flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all uppercase tracking-wider shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#ffbf00] text-[#402d00] shadow-md shadow-[#ffbf00]/15'
                  : 'bg-[#1e1e1e] text-[#8e9192] border border-[#2d2b2b] hover:text-[#c8c6c5] hover:border-[#8e9192]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <motion.div
                  key={item.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#1e1e1e] border border-[#2d2b2b] rounded-xl p-6 flex flex-col justify-between hover:border-[#ffbf00]/30 hover:shadow-xl hover:shadow-[#ffbf00]/5 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="space-y-4">
                    {/* Top tags and indicators */}
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.type === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#8e9192]">{item.type}</span>
                      </span>
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex gap-1">
                          {item.tags.map(t => (
                            <span key={t} className="px-2 py-0.5 rounded bg-[#ffbf00]/15 text-[#ffbf00] border border-[#ffbf00]/25 text-[9px] font-bold uppercase tracking-wider">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Title & Price */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline gap-2">
                        <h3 className="font-display text-lg font-bold text-[#c8c6c5] group-hover:text-[#ffbf00] transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-[#ffbf00] font-bold text-base font-sans shrink-0">₹{item.price}</span>
                      </div>
                      <p className="text-xs text-[#8e9192] leading-relaxed line-clamp-2">
                        {item.description || 'Delicately cooked with fresh Mediterranean spices and served warm.'}
                      </p>
                    </div>
                  </div>

                  {/* Add button */}
                  <div className="pt-6">
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full py-3 rounded-lg border border-[#3a3939] hover:bg-[#ffbf00] hover:text-[#402d00] hover:border-[#ffbf00] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 pointer-events-auto min-h-[44px]"
                    >
                      <Plus className="w-4 h-4" />
                      Add to WhatsApp Order
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center space-y-3">
                <p className="text-[#8e9192] text-sm">No dishes matched your filters or search query.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedDiet('All'); }}
                  className="px-4 py-2 bg-[#ffbf00] text-[#402d00] rounded-md text-xs font-semibold uppercase tracking-wider"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* FLOATING CART FAB BUTTON */}
      <AnimatePresence>
        {totalCartItems > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-24 right-6 z-40 p-4 bg-[#ffbf00] text-[#402d00] rounded-full shadow-2xl shadow-[#ffbf00]/25 flex items-center justify-center hover:scale-105 transition-transform"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-6 h-6 stroke-[2]" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white font-sans text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#141313]">
              {totalCartItems}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* CART DRAWER BACKDROP */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-black"
            />
            
            {/* Cart Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#1e1e1e] border-l border-[#2d2b2b] p-6 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-[#2d2b2b]">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#ffbf00]" />
                    <h2 className="text-lg font-bold text-[#c8c6c5]">Your WhatsApp Cart</h2>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)} 
                    className="w-11 h-11 text-[#8e9192] hover:text-[#c8c6c5] flex items-center justify-center pointer-events-auto"
                    aria-label="Close Cart"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Items List */}
                <div className="overflow-y-auto max-h-[50vh] no-scrollbar space-y-4 pr-1">
                  {cart.map((item) => (
                    <div key={item.name} className="flex justify-between items-center gap-3 bg-[#141313] p-4 rounded-lg border border-[#2d2b2b]">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${item.type === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                          <h4 className="text-sm font-semibold text-[#c8c6c5]">{item.name}</h4>
                        </div>
                        <p className="text-xs text-[#8e9192]">₹{item.price} each</p>
                      </div>

                      {/* Stepper & Trash */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-[#1e1e1e] border border-[#2d2b2b] rounded-lg p-0.5">
                          <button 
                            onClick={() => updateQuantity(item.name, -1)}
                            className="w-11 h-11 text-[#8e9192] hover:text-[#c8c6c5] transition-colors flex items-center justify-center pointer-events-auto"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-[#c8c6c5] px-1 select-none">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.name, 1)}
                            className="w-11 h-11 text-[#8e9192] hover:text-[#c8c6c5] transition-colors flex items-center justify-center pointer-events-auto"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.name)}
                          className="w-11 h-11 text-[#8e9192] hover:text-red-400 transition-colors flex items-center justify-center pointer-events-auto"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkout details */}
              <div className="pt-6 border-t border-[#2d2b2b] space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#8e9192]">Subtotal</span>
                  <span className="font-semibold text-[#c8c6c5]">₹{totalCartPrice}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#8e9192] pb-4">
                  <span>Delivery Charge</span>
                  <span>Calculated on Chat</span>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-lg bg-[#ffbf00] text-[#402d00] text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#ffbf00]/95 transition-colors shadow-lg shadow-[#ffbf00]/10"
                  >
                    <MessageSquare className="w-4 h-4 fill-[#402d00] text-[#ffbf00]" />
                    Checkout to WhatsApp (₹{totalCartPrice})
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full py-2.5 rounded-lg border border-[#3a3939] hover:bg-red-950/20 hover:text-red-400 hover:border-red-500/20 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
                  >
                    Clear Order List
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
