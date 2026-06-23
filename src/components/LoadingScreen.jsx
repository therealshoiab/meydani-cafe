import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee } from 'lucide-react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user has already loaded the site in this session to make the experience smooth
    const hasLoaded = sessionStorage.getItem('meydani_loaded');
    
    let timer;
    if (hasLoaded) {
      // Shorter loading time if already visited in this session
      timer = setTimeout(() => {
        setLoading(false);
      }, 800);
    } else {
      timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('meydani_loaded', 'true');
      }, 1800);
    }
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#141313] text-[#ffbf00]"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="relative flex flex-col items-center gap-6">
            {/* Spinning Visual */}
            <motion.div
              className="relative w-24 h-24 rounded-full border-4 border-[#ffbf00]/10 border-t-[#ffbf00] flex items-center justify-center shadow-xl shadow-[#ffbf00]/5"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            >
              <Coffee className="w-8 h-8 text-[#ffbf00] stroke-[1.5]" />
            </motion.div>
            
            {/* Brand Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <h1 className="font-display text-3xl font-bold tracking-wider text-[#c8c6c5] mb-2">
                MEYDANI CAFE
              </h1>
              <div className="flex items-center gap-2 justify-center">
                <span className="h-[1px] w-4 bg-[#ffbf00]/40" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#ffbf00] font-semibold font-sans">
                  Luxury Turkish Hospitality
                </p>
                <span className="h-[1px] w-4 bg-[#ffbf00]/40" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
