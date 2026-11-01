import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Video, Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2, ExternalLink, Instagram } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import galleryMediaData from '../data/gallery-media.json';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'photos' | 'videos'
  const [visibleCount, setVisibleCount] = useState(18);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const videoRefs = useRef({});
  const cardRefs = useRef({});

  const baseUrl = import.meta.env.BASE_URL;

  // Enhance items with full URLs
  const items = useMemo(() => {
    return galleryMediaData.map((item, idx) => ({
      ...item,
      index: idx,
      fullUrl: `${baseUrl}${item.url}`,
      fullPoster: item.poster ? `${baseUrl}${item.poster}` : undefined,
    }));
  }, [baseUrl]);

  // Filter items based on activeTab
  const filteredItems = useMemo(() => {
    if (activeTab === 'photos') return items.filter(item => item.type === 'photo');
    if (activeTab === 'videos') return items.filter(item => item.type === 'video');
    return items;
  }, [items, activeTab]);

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const photosCount = useMemo(() => items.filter(i => i.type === 'photo').length, [items]);
  const videosCount = useMemo(() => items.filter(i => i.type === 'video').length, [items]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setVisibleCount(18);
  };

  // Video hover to play muted preview
  const handleMouseEnter = (id) => {
    const el = videoRefs.current[id];
    if (el) {
      el.muted = true;
      el.play().catch(() => {});
    }
  };

  const handleMouseLeave = (id) => {
    const el = videoRefs.current[id];
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
  };

  // Lightbox handlers
  const openLightbox = (index) => {
    setLightboxIndex(index);
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
        title="Ambiance & Culinary Gallery" 
        description="Experience the visual story of Meydani Cafe, Srinagar. Authentic Turkish culinary reels, sizzling platters, Jhelum river views, and guest dining moments."
        path="/gallery"
      />

      <div className="max-w-[1240px] mx-auto space-y-10">
        
        {/* Header Block Matching Image 2 */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#ffbf00] font-semibold">
            Visual Showcase
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#c8c6c5]">
            Ambiance &amp; Culinary Gallery
          </h1>
          <div className="w-16 h-[2.5px] bg-[#ffbf00] mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Buttons Matching Image 2 */}
        <div className="gallery-tab-container">
          <button
            onClick={() => handleTabChange('all')}
            className={`gallery-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          >
            All Media ({items.length})
          </button>
          <button
            onClick={() => handleTabChange('photos')}
            className={`gallery-tab-btn ${activeTab === 'photos' ? 'active' : ''}`}
          >
            Photos ({photosCount})
          </button>
          <button
            onClick={() => handleTabChange('videos')}
            className={`gallery-tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
          >
            Videos ({videosCount})
          </button>
        </div>

        {/* 3-Column Pure Masonry Grid Matching Image 2 */}
        <div className="masonry-grid">
          {visibleItems.map((item, index) => {
            const isVideo = item.type === 'video';

            return (
              <div
                key={item.id}
                className="masonry-item"
                ref={(el) => { cardRefs.current[item.id] = el; }}
              >
                <div
                  onClick={() => openLightbox(index)}
                  onMouseEnter={() => isVideo && handleMouseEnter(item.id)}
                  onMouseLeave={() => isVideo && handleMouseLeave(item.id)}
                  className="relative rounded-2xl overflow-hidden bg-[#1e1e1e] border border-[#2d2b2b] hover:border-[#ffbf00]/50 shadow-xl hover:shadow-2xl hover:shadow-[#ffbf00]/10 transition-all duration-300 group cursor-pointer"
                >
                  {isVideo ? (
                    /* Video Element */
                    <div className="relative w-full">
                      <video
                        ref={(el) => { videoRefs.current[item.id] = el; }}
                        src={item.fullUrl}
                        poster={item.fullPoster}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full object-cover rounded-2xl block"
                      />

                      {/* Video Indicator Icon in Top-Right Matching Image 2 */}
                      <div className="absolute top-3.5 right-3.5 z-10 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-md">
                        <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                      </div>

                      {/* Instagram Link Pill at Bottom Matching Image 2 */}
                      <div className="absolute bottom-3.5 left-3.5 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] text-[#c8c6c5] group-hover:text-[#ffbf00] group-hover:border-[#ffbf00]/40 transition-colors shadow-md">
                        <Instagram className="w-3 h-3 text-[#ffbf00]" />
                        <span>instagram.com</span>
                      </div>
                    </div>
                  ) : (
                    /* Photo Element */
                    <div className="relative w-full overflow-hidden">
                      <img
                        src={item.fullUrl}
                        alt={item.title}
                        loading="lazy"
                        className="w-full object-cover rounded-2xl block transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Photo Badge */}
                      <div className="absolute top-3.5 right-3.5 z-10 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Subtle Title Overlay on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end pointer-events-none">
                    <p className="font-display text-sm font-bold text-white truncate drop-shadow-md">
                      {item.title}
                    </p>
                    <span className="text-[10px] uppercase font-semibold text-[#ffbf00]">
                      Meydani Cafe &bull; Srinagar
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Pagination Button */}
        {visibleCount < filteredItems.length && (
          <div className="text-center pt-6">
            <button
              onClick={() => setVisibleCount(prev => prev + 18)}
              className="px-8 py-3.5 bg-[#ffbf00] hover:bg-[#ffbf00]/95 text-[#402d00] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#ffbf00]/15 cursor-pointer pointer-events-auto"
            >
              Load More Media ({filteredItems.length - visibleCount} Remaining)
            </button>
          </div>
        )}

      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {currentLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={closeLightbox}
          >
            <div 
              className="relative w-full max-w-2xl bg-[#1e1e1e] border border-[#2d2b2b] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-5 py-3.5 border-b border-[#2d2b2b] flex items-center justify-between bg-[#141313]">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#ffbf00]/15 text-[#ffbf00] border border-[#ffbf00]/30">
                    {currentLightboxItem.category || currentLightboxItem.type}
                  </span>
                  <span className="text-xs text-[#8e9192]">
                    {lightboxIndex + 1} of {filteredItems.length}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <a
                    href={currentLightboxItem.instagramUrl}
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

              {/* Lightbox Media Body */}
              <div className="w-full flex-1 min-h-[360px] max-h-[65vh] bg-black flex items-center justify-center overflow-hidden relative">
                {currentLightboxItem.type === 'video' ? (
                  <video
                    src={currentLightboxItem.fullUrl}
                    controls
                    autoPlay
                    playsInline
                    className="max-w-full max-h-[65vh] object-contain"
                  />
                ) : (
                  <img
                    src={currentLightboxItem.fullUrl}
                    alt={currentLightboxItem.title}
                    className="max-w-full max-h-[65vh] object-contain"
                  />
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-[#141313] border-t border-[#2d2b2b] flex items-center justify-between">
                <div className="min-w-0 pr-4">
                  <h4 className="font-display text-base font-bold text-[#c8c6c5] truncate">
                    {currentLightboxItem.title}
                  </h4>
                  <p className="text-xs text-[#8e9192]">
                    Meydani Cafe &bull; The Bund Road, Srinagar
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
