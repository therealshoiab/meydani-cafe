import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Instagram } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import galleryItems from '../data/gallery-data.json';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(12);

  const categories = ['All', 'Food', 'Ambiance', 'Reels'];

  const filteredPhotos = galleryItems.filter(item => 
    selectedCategory === 'All' || item.category === selectedCategory
  );

  const visiblePhotos = filteredPhotos.slice(0, visibleCount);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setVisibleCount(12);
  };

  const getEmbedUrl = (link) => {
    const match = link.match(/\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
    return match ? `https://www.instagram.com/p/${match[2]}/embed/` : null;
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
                onClick={() => handleCategoryChange(cat)}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visiblePhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-[480px] rounded-2xl overflow-hidden bg-[#1e1e1e] border border-[#2d2b2b] hover:border-[#ffbf00]/30 hover:shadow-xl hover:shadow-[#ffbf00]/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex-1 w-full relative overflow-hidden bg-[#141313]">
                  <iframe
                    src={getEmbedUrl(photo.link)}
                    className="w-full h-full border-0 absolute inset-0"
                    scrolling="no"
                    allowtransparency="true"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen={true}
                    loading="lazy"
                    title={photo.label}
                  />
                </div>
                {/* Details bar */}
                <div className="p-4 bg-[#1e1e1e] border-t border-[#2d2b2b] flex items-center justify-between gap-3">
                  <div className="text-left min-w-0">
                    <h3 className="font-display text-sm font-bold text-[#c8c6c5] truncate">
                      {photo.label}
                    </h3>
                    <span className="text-[9px] uppercase tracking-wider text-[#ffbf00] font-semibold">
                      {photo.category}
                    </span>
                  </div>
                  <a
                    href={photo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-1.5 bg-[#141313] border border-[#2d2b2b] text-[#8e9192] hover:text-[#ffbf00] hover:border-[#ffbf00] rounded-lg transition-colors"
                    title="Open on Instagram"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {visibleCount < filteredPhotos.length && (
          <div className="text-center pt-8">
            <button
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="px-8 py-3 bg-[#ffbf00] hover:bg-[#ffbf00]/90 text-[#402d00] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-lg shadow-[#ffbf00]/10 pointer-events-auto"
            >
              Load More Content ({filteredPhotos.length - visibleCount} Remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
