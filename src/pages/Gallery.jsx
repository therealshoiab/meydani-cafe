import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Share2, Instagram } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import galleryItems from '../data/gallery-data.json';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePhoto, setActivePhoto] = useState(null); // stores index in current filtered list

  const categories = ['All', 'Food', 'Ambiance', 'Reels'];

  const filteredPhotos = galleryItems.filter(item => 
    selectedCategory === 'All' || item.category === selectedCategory
  );

  const openLightbox = (index) => {
    setActivePhoto(index);
  };

  const closeLightbox = () => {
    setActivePhoto(null);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setActivePhoto(prev => (prev + 1) % filteredPhotos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setActivePhoto(prev => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <div className="bg-[#141313] min-h-screen pt-28 pb-20 px-6">
      <SEOHead 
        title="Photo Gallery & Ambiance" 
        description="Take a visual tour of Meydani Cafe, Srinagar. View photos of our mouthwatering dishes, cozy Middle Eastern ambiance, and Sufi events by the Jhelum."
        path="/gallery"
      />

      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Header Block */}
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.2em] text-[#ffbf00] font-semibold">Visual Journey</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-[#c8c6c5]">Gallery & Atmosphere</h1>
          <div className="w-12 h-[2px] bg-[#ffbf00] mx-auto" />
        </div>

        {/* Category Tabs & Upload CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-[#2d2b2b] pb-6">
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#ffbf00] text-[#402d00]'
                    : 'bg-[#1e1e1e] text-[#8e9192] border border-[#2d2b2b] hover:text-[#c8c6c5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Submit Photo Button */}
          <a
            href="https://www.instagram.com/meydani_cafe1/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#1e1e1e] border border-[#2d2b2b] text-[#c8c6c5] hover:border-[#ffbf00] hover:text-[#ffbf00] rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 pointer-events-auto"
          >
            <Camera className="w-4 h-4" />
            Share Your Photo
          </a>
        </div>

        {/* Grid Layout (supports fluid resizing and hover animations) */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[200px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => openLightbox(index)}
                className={`${photo.span} rounded-xl overflow-hidden relative cursor-pointer group border border-[#2d2b2b] hover:border-[#ffbf00]/30 transition-all duration-300`}
              >
                {/* CSS gradient block with high contrast overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${photo.grad} opacity-80 group-hover:scale-105 transition-transform duration-500`} />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/15 transition-colors" />

                {/* Grid Item Details */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <span className="px-2.5 py-1 rounded bg-black/50 text-[#ffbf00] border border-[#ffbf00]/20 text-[9px] font-bold uppercase tracking-wider w-fit">
                    {photo.category}
                  </span>
                  
                  <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-display text-lg font-bold text-[#c8c6c5]">
                      {photo.label}
                    </h3>
                    <p className="text-[10px] text-[#ffbf00] uppercase tracking-[0.15em] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Large Photo
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* FULLSCREEN LIGHTBOX */}
      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-[#141313]/98 backdrop-blur-md flex flex-col justify-between p-6"
          >
            {/* Header Control Panel */}
            <div className="flex justify-between items-center max-w-[1200px] w-full mx-auto pb-4 border-b border-[#2d2b2b]/40">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#ffbf00] font-semibold">
                  {filteredPhotos[activePhoto].category}
                </span>
                <h3 className="font-display text-lg font-bold text-[#c8c6c5] mt-1">
                  {filteredPhotos[activePhoto].label}
                </h3>
              </div>
              <button 
                onClick={closeLightbox} 
                className="p-3 bg-[#1e1e1e] border border-[#2d2b2b] text-[#c8c6c5] hover:text-[#ffbf00] rounded-full transition-colors pointer-events-auto"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Visual Display Area */}
            <div className="flex-1 flex items-center justify-center max-w-[1200px] w-full mx-auto relative my-8">
              {/* Left Control Arrow */}
              <button
                onClick={prevPhoto}
                className="absolute left-0 p-3 bg-[#1e1e1e]/80 border border-[#2d2b2b] text-[#c8c6c5] hover:text-[#ffbf00] rounded-full z-10 transition-colors pointer-events-auto"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Large Styled Display Panel */}
              <motion.div 
                key={filteredPhotos[activePhoto].id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-xl h-[450px] rounded-2xl border border-[#2d2b2b] relative overflow-hidden flex flex-col justify-between p-8 bg-[#1e1e1e] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Decorative background glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${filteredPhotos[activePhoto].grad} opacity-5 blur-2xl pointer-events-none`} />
                
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-[#c8c6c5]">meydani_cafe1</p>
                    <p className="text-[10px] text-[#ffbf00] uppercase tracking-wider font-semibold">Srinagar, J&K</p>
                  </div>
                </div>

                {/* Content Body */}
                <div className="my-auto py-6 text-center space-y-4">
                  <Instagram className="w-16 h-16 text-[#ffbf00] mx-auto stroke-[1] opacity-75" />
                  <div className="space-y-2">
                    <h4 className="font-display text-xl font-bold text-[#c8c6c5]">{filteredPhotos[activePhoto].label}</h4>
                    <p className="text-xs text-[#8e9192]">Authentic content from our official Instagram page.</p>
                  </div>
                </div>

                {/* Call To Action */}
                <div className="space-y-3">
                  <a
                    href={filteredPhotos[activePhoto].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-[1.02] shadow-lg pointer-events-auto"
                  >
                    <Instagram className="w-4 h-4 fill-white" />
                    Watch on Instagram
                  </a>
                  <p className="text-[10px] text-center text-[#8e9192]">Clicking opens Instagram in a new tab</p>
                </div>
              </motion.div>

              {/* Right Control Arrow */}
              <button
                onClick={nextPhoto}
                className="absolute right-0 p-3 bg-[#1e1e1e]/80 border border-[#2d2b2b] text-[#c8c6c5] hover:text-[#ffbf00] rounded-full z-10 transition-colors pointer-events-auto"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Footer Control Panel */}
            <div className="flex justify-between items-center max-w-[1200px] w-full mx-auto pt-4 border-t border-[#2d2b2b]/40 text-xs text-[#8e9192]">
              <span>Photo {activePhoto + 1} of {filteredPhotos.length}</span>
              <a 
                href="https://www.instagram.com/meydani_cafe1/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-[#ffbf00] transition-colors pointer-events-auto"
              >
                <Share2 className="w-4 h-4" />
                Share on Instagram
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
