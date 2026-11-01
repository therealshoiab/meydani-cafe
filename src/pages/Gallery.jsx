import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Instagram, ExternalLink, Play, Image as ImageIcon, Video, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import galleryData from '../data/gallery-data.json';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'photos' | 'videos'
  const [visibleCount, setVisibleCount] = useState(12);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const cardRefs = useRef({});

  // Helper to extract embed url from Instagram link
  const getEmbedInfo = (link) => {
    if (!link) return { code: '', embedUrl: '' };
    const match = link.match(/\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
    const code = match ? match[2] : '';
    return {
      code,
      embedUrl: code ? `https://www.instagram.com/p/${code}/embed/` : link
    };
  };

  // Enhance items with type and embed info
  const items = useMemo(() => {
    return galleryData.map((item, idx) => {
      const isVideo = item.category === 'Reels' || (item.link && item.link.includes('/reel/'));
      const embedInfo = getEmbedInfo(item.link);
      return {
        ...item,
        index: idx,
        type: isVideo ? 'video' : 'photo',
        embedUrl: embedInfo.embedUrl,
        code: embedInfo.code
      };
    });
  }, []);

  // Filter items based on activeTab
  const filteredItems = useMemo(() => {
    if (activeTab === 'photos') {
      return items.filter(item => item.type === 'photo');
    }
    if (activeTab === 'videos') {
      return items.filter(item => item.type === 'video');
    }
    return items;
  }, [items, activeTab]);

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const photosCount = useMemo(() => items.filter(i => i.type === 'photo').length, [items]);
  const videosCount = useMemo(() => items.filter(i => i.type === 'video').length, [items]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setVisibleCount(12);
  };

  // 3D Parallax Tilt Effect on cards
  const handleMouseMove = (e, id) => {
    const card = cardRefs.current[id];
    if (!card || window.innerWidth < 1024) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (id) => {
    const card = cardRefs.current[id];
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  // Lightbox navigation
  const openLightbox = (indexInFiltered) => {
    setLightboxIndex(indexInFiltered);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const nextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="bg-[#141313] min-h-screen pt-28 pb-24 px-4 sm:px-6">
      <SEOHead 
        title="Photo & Video Gallery" 
        description="Experience the visual story of Meydani Cafe, Srinagar. Explore authentic Turkish kebabs, Kunafa reels, riverside Jhelum views, and guest dining moments."
        path="/gallery"
      />

      <div className="max-w-[1240px] mx-auto space-y-10">
        
        {/* Header Block */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#ffbf00] font-semibold">
            Visual Ambiance &bull; Social Stories
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#c8c6c5]">
            Meydani Cafe Gallery
          </h1>
          <p className="text-sm text-[#8e9192] max-w-xl mx-auto">
            A curated look into our charcoal kitchens, riverside seating, and signature Turkish feasts.
          </p>
          <div className="w-14 h-[2px] bg-[#ffbf00] mx-auto mt-4" />
        </div>

        {/* AmberLeaf-Parity Category Tabs & Social Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#2d2b2b] pb-6">
          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full p-1 bg-[#1e1e1e] border border-[#2d2b2b] rounded-xl">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#ffbf00] text-[#402d00] shadow-md shadow-[#ffbf00]/20'
                  : 'text-[#8e9192] hover:text-[#c8c6c5]'
              }`}
            >
              All Media
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'all' ? 'bg-[#402d00]/20 text-[#402d00]' : 'bg-[#141313] text-[#8e9192]'}`}>
                {items.length}
              </span>
            </button>

            <button
              onClick={() => handleTabChange('videos')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'videos'
                  ? 'bg-[#ffbf00] text-[#402d00] shadow-md shadow-[#ffbf00]/20'
                  : 'text-[#8e9192] hover:text-[#c8c6c5]'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              Videos &amp; Reels
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'videos' ? 'bg-[#402d00]/20 text-[#402d00]' : 'bg-[#141313] text-[#8e9192]'}`}>
                {videosCount}
              </span>
            </button>

            <button
              onClick={() => handleTabChange('photos')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'photos'
                  ? 'bg-[#ffbf00] text-[#402d00] shadow-md shadow-[#ffbf00]/20'
                  : 'text-[#8e9192] hover:text-[#c8c6c5]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Photos
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'photos' ? 'bg-[#402d00]/20 text-[#402d00]' : 'bg-[#141313] text-[#8e9192]'}`}>
                {photosCount}
              </span>
            </button>
          </div>

          {/* Social Direct Follow */}
          <a
            href="https://www.instagram.com/meydani_cafe1/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#1e1e1e] border border-[#2d2b2b] text-[#c8c6c5] hover:border-[#ffbf00] hover:text-[#ffbf00] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all"
          >
            <Instagram className="w-4 h-4 text-[#ffbf00]" />
            @meydani-cafe1
          </a>
        </div>

        {/* Media Grid with AmberLeaf Parallax Tilt and Clean Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                ref={(el) => { cardRefs.current[item.id] = el; }}
                onMouseMove={(e) => handleMouseMove(e, item.id)}
                onMouseLeave={() => handleMouseLeave(item.id)}
                className="w-full h-[520px] rounded-2xl overflow-hidden bg-[#1e1e1e] border border-[#2d2b2b] hover:border-[#ffbf00]/40 hover:shadow-2xl hover:shadow-[#ffbf00]/10 transition-all duration-300 flex flex-col justify-between group"
                style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s' }}
              >
                {/* Card Top Header */}
                <div className="p-3.5 bg-[#141313] border-b border-[#2d2b2b] flex items-center justify-between z-10">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#ffbf00]/15 text-[#ffbf00] border border-[#ffbf00]/30 flex items-center gap-1.5">
                    {item.type === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                    {item.category || (item.type === 'video' ? 'Reel' : 'Photo')}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openLightbox(index)}
                      className="p-1.5 rounded-lg bg-[#1e1e1e] border border-[#2d2b2b] text-[#8e9192] hover:text-[#ffbf00] hover:border-[#ffbf00] transition-colors"
                      title="Expand Lightbox"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-[#1e1e1e] border border-[#2d2b2b] text-[#8e9192] hover:text-[#ffbf00] hover:border-[#ffbf00] transition-colors"
                      title="Open on Instagram"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Real Reel / Photo Embed Frame */}
                <div className="flex-1 w-full relative overflow-hidden bg-[#141313]">
                  <iframe
                    src={item.embedUrl}
                    className="w-full h-full border-0 absolute inset-0"
                    scrolling="no"
                    allowtransparency="true"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen={true}
                    loading="lazy"
                    title={item.label}
                  />
                </div>

                {/* Card Bottom Details Bar */}
                <div className="p-4 bg-[#141313] border-t border-[#2d2b2b] flex items-center justify-between gap-3">
                  <div className="min-w-0 pr-2">
                    <h3 className="font-display text-sm font-bold text-[#c8c6c5] truncate group-hover:text-[#ffbf00] transition-colors">
                      {item.label}
                    </h3>
                    <span className="text-[10px] uppercase tracking-wider text-[#8e9192]">
                      Meydani Cafe &bull; @meydani-cafe1
                    </span>
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-xs font-semibold text-[#ffbf00] hover:underline flex items-center gap-1"
                  >
                    View
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Pagination Button */}
        {visibleCount < filteredItems.length && (
          <div className="text-center pt-6">
            <button
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="px-8 py-3.5 bg-[#ffbf00] hover:bg-[#ffbf00]/95 text-[#402d00] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#ffbf00]/15 cursor-pointer pointer-events-auto"
            >
              Load More Media ({filteredItems.length - visibleCount} Remaining)
            </button>
          </div>
        )}

      </div>

      {/* AmberLeaf-Parity Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {currentLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={closeLightbox}
          >
            {/* Modal Container */}
            <div 
              className="relative w-full max-w-2xl bg-[#1e1e1e] border border-[#2d2b2b] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Modal Bar */}
              <div className="px-5 py-4 border-b border-[#2d2b2b] flex items-center justify-between bg-[#141313]">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#ffbf00]/15 text-[#ffbf00] border border-[#ffbf00]/30">
                    {currentLightboxItem.category || currentLightboxItem.type}
                  </span>
                  <span className="text-xs text-[#8e9192]">
                    {lightboxIndex + 1} of {filteredItems.length}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={currentLightboxItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-[#1e1e1e] border border-[#2d2b2b] text-[#8e9192] hover:text-[#ffbf00] transition-colors"
                    title="Open on Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <button
                    onClick={closeLightbox}
                    className="p-1.5 rounded-lg bg-[#1e1e1e] border border-[#2d2b2b] text-[#8e9192] hover:text-[#ffbf00] transition-colors cursor-pointer"
                    title="Close Lightbox (ESC)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Lightbox Embed Frame */}
              <div className="w-full h-[540px] relative bg-[#141313]">
                <iframe
                  src={currentLightboxItem.embedUrl}
                  className="w-full h-full border-0 absolute inset-0"
                  scrolling="no"
                  allowtransparency="true"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen={true}
                  title={currentLightboxItem.label}
                />
              </div>

              {/* Bottom Lightbox Bar */}
              <div className="p-4 bg-[#141313] border-t border-[#2d2b2b] flex items-center justify-between">
                <div className="min-w-0 pr-4">
                  <h4 className="font-display text-base font-bold text-[#c8c6c5] truncate">
                    {currentLightboxItem.label}
                  </h4>
                  <p className="text-xs text-[#8e9192]">
                    Shared by Meydani Cafe on Instagram
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={prevLightbox}
                    className="p-2 rounded-lg bg-[#1e1e1e] border border-[#2d2b2b] text-[#c8c6c5] hover:text-[#ffbf00] hover:border-[#ffbf00] transition-colors cursor-pointer"
                    title="Previous (Left Arrow)"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextLightbox}
                    className="p-2 rounded-lg bg-[#1e1e1e] border border-[#2d2b2b] text-[#c8c6c5] hover:text-[#ffbf00] hover:border-[#ffbf00] transition-colors cursor-pointer"
                    title="Next (Right Arrow)"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
