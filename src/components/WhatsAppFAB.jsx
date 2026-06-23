import React from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppFAB() {
  const whatsappNumber = '917780938743';
  const message = encodeURIComponent("Hello Meydani Cafe! I'm visiting your website and would like to ask a question.");
  const url = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 p-4 bg-[#25d366] text-[#ffffff] rounded-full shadow-2xl shadow-[#25d366]/30 flex items-center justify-center hover:bg-[#20ba5a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:ring-offset-2 focus:ring-offset-[#141313]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: [0, -8, 0],
      }}
      transition={{
        initial: { duration: 0.3 },
        y: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageSquare className="w-6 h-6 fill-white text-[#25d366]" />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ffbf00]"></span>
      </span>
    </motion.a>
  );
}
