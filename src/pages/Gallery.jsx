import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Video, Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2, ExternalLink, Instagram } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'photos' | 'videos'
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const videoRefs = useRef({});
  const cardRefs = useRef({});

  const baseUrl = import.meta.env.BASE_URL;

  // Curated genuine Meydani Cafe gallery items matching Image 2's masonry layout
  const galleryItems = useMemo(() => [
    {
      id: 'm1',
      type: 'video',
      url: `${baseUrl}media/m1.mp4`,
      poster: `${baseUrl}media/m1.jpg`,
      title: 'Meydani Cafe Grills & Vibe',
      category: 'Reels',
      aspect: 'aspect-[9/16]',
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/reel/DZjfw6IOK92/'
    },
    {
      id: 'g_p1',
      type: 'photo',
      url: `${baseUrl}media/g_p1.jpg`,
      title: 'Authentic Turkish Kabab Platter',
      category: 'Food',
      aspect: 'aspect-square',
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/p/DYj7fcdH9vI/'
    },
    {
      id: 'g_v1',
      type: 'video',
      url: `${baseUrl}media/g_v1.mp4`,
      poster: `${baseUrl}media/g_v1.jpg`,
      title: 'S.ia.06 Dining Experience',
      category: 'Reels',
      aspect: 'aspect-[9/16]',
      instagramUrl: 'https://www.instagram.com/s.ia.06/reel/DYPUV7ZvuXt/'
    },
    {
      id: 'g_p3',
      type: 'photo',
      url: `${baseUrl}media/g_p3.jpg`,
      title: 'Signature Turkish Pizza Lahmacun',
      category: 'Food',
      aspect: 'aspect-video',
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/p/DZQOVmqjkb6/'
    },
    {
      id: 'm2',
      type: 'video',
      url: `${baseUrl}media/m2.mp4`,
      poster: `${baseUrl}media/m2.jpg`,
      title: 'Mubashir Kashmiri Review',
      category: 'Reels',
      aspect: 'aspect-[9/16]',
      instagramUrl: 'https://www.instagram.com/mubashirkashmirii/reel/DYCWrvWpe5w/'
    },
    {
      id: 'g_p4',
      type: 'photo',
      url: `${baseUrl}media/g_p4.jpg`,
      title: 'Meydani Special Family Feast',
      category: 'Food',
      aspect: 'aspect-square',
      instagramUrl: 'https://www.instagram.com/aimanashrafbhat/p/DPz3jzigbeT/'
    },
    {
      id: 'g_v2',
      type: 'video',
      url: `${baseUrl}media/g_v2.mp4`,
      poster: `${baseUrl}media/g_v2.jpg`,
      title: 'Xplorer Sahil Food Feature',
      category: 'Reels',
      aspect: 'aspect-[9/16]',
      instagramUrl: 'https://www.instagram.com/xplorer_sahil/reel/DYPRa7ggaz0/'
    },
    {
      id: 'g_p5',
      type: 'photo',
      url: `${baseUrl}media/g_p5.jpg`,
      title: 'Creamy Hummus Dip with Pita',
      category: 'Food',
      aspect: 'aspect-square',
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/p/DMfzqBbuxSB/'
    },
    {
      id: 'm3',
      type: 'video',
      url: `${baseUrl}media/m3.mp4`,
      poster: `${baseUrl}media/m3.jpg`,
      title: 'Authentic Turkish Flavors',
      category: 'Reels',
      aspect: 'aspect-[9/16]',
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/reel/DWsuULoDkCW/'
    },
    {
      id: 'g_p6',
      type: 'photo',
      url: `${baseUrl}media/g_p6.jpg`,
      title: 'Charcoal Grilled Kebab Spread',
      category: 'Food',
      aspect: 'aspect-video',
      instagramUrl: 'https://www.instagram.com/foods.in.kashmir/p/DGr9wZiPun6/'
    },
    {
      id: 'g_v3',
      type: 'video',
      url: `${baseUrl}media/g_v3.mp4`,
      poster: `${baseUrl}media/g_v3.jpg`,
      title: 'NexGen Marketing Food Tour',
      category: 'Reels',
      aspect: 'aspect-[9/16]',
      instagramUrl: 'https://www.instagram.com/nexgen.marketting/reel/DZhtId9JvDx/'
    },
    {
      id: 'g_p7',
      type: 'photo',
      url: `${baseUrl}media/g_p7.jpg`,
      title: 'Traditional Turkish Cezve Coffee',
      category: 'Food',
      aspect: 'aspect-square',
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/p/Cmx6E2Tt8W4/'
    },
    {
      id: 'm4',
      type: 'video',
      url: `${baseUrl}media/m4.mp4`,
      poster: `${baseUrl}media/m4.jpg`,
      title: 'Warm Kunafa Preparation',
      category: 'Reels',
      aspect: 'aspect-[9/16]',
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/reel/DZBuQ53OlwQ/'
    },
    {
      id: 'g_v4',
      type: 'video',
      url: `${baseUrl}media/g_v4.mp4`,
      poster: `${baseUrl}media/g_v4.jpg`,
      title: 'Meydani Special Platter Grill',
      category: 'Reels',
      aspect: 'aspect-[9/16]',
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/reel/DYGJGjeu4eN/'
    },
    {
      id: 'm5',
      type: 'video',
      url: `${baseUrl}media/m5.mp4`,
      poster: `${baseUrl}media/m5.jpg`,
      title: 'Weekend Riverside Feast',
      category: 'Reels',
      aspect: 'aspect-[9/16]',
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/reel/DYrajFsMmse/'
    },
    {
      id: 'g_v6',
      type: 'video',
      url: `${baseUrl}media/g_v6.mp4`,
      poster: `${baseUrl}media/g_v6.jpg`,
      title: 'Riverside Sunset Atmosphere',
      category: 'Reels',
      aspect: 'aspect-[9/16]',
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/reel/DXvBfzpuguO/'
    },
    {
      id: 'm6',
      type: 'video',
      url: `${baseUrl}media/m6.mp4`,
      poster: `${baseUrl}media/m6.jpg`,
      title: 'Traditional Turkish Samovar',
      category: 'Reels',
      aspect: 'aspect-[9/16]',
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/reel/DYBfjSQOoxf/'
    },
    {
      id: 'g_v7',
      type: 'video',
      url: `${baseUrl}media/g_v7.mp4`,
      poster: `${baseUrl}media/g_v7.jpg`,
      title: 'Rabiya95 Official Review',
      category: 'Reels',
      aspect: 'aspect-[9/16]',
      instagramUrl: 'https://www.instagram.com/rabiya95_official/reel/DXljtQeE2KL/'
    },
    {
      id: 'g_v8',
      type: 'video',
      url: `${baseUrl}media/g_v8.mp4`,
      poster: `${baseUrl}media/g_v8.jpg`,
      title: 'Fresh Sizzling Tandoor',
      category: 'Reels',
      aspect: 'aspect-[9/16]',
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/reel/DXdbH4rDlMy/'
    },
    {
      id: 'g_v9',
      type: 'video',
      url: `${baseUrl}media/g_v9.mp4`,
      poster: `${baseUrl}media/g_v9.jpg`,
      title: 'Signature Lavash Wrap',
      category: 'Reels',
      aspect: 'aspect-[9/16]',
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/reel/DXBR_c0DtQe/'
    },
    {
      id: 'g_v10',
      type: 'video',
      url: `${baseUrl}media/g_v10.mp4`,
      poster: `${baseUrl}media/g_v10.jpg`,
      title: 'Nooriverse Experience',
      category: 'Reels',
      aspect: 'aspect-[9/16]',
      instagramUrl: 'https://www.instagram.com/nooriversse/reel/DWq01_gCf5H/'
    }
  ], [baseUrl]);

  // Filter items based on activeTab
  const filteredItems = useMemo(() => {
    if (activeTab === 'photos') return galleryItems.filter(item => item.type === 'photo');
    if (activeTab === 'videos') return galleryItems.filter(item => item.type === 'video');
    return galleryItems;
  }, [galleryItems, activeTab]);

  // Handle video hover to play muted preview
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
            onClick={() => setActiveTab('all')}
            className={`gallery-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          >
            All Media
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`gallery-tab-btn ${activeTab === 'photos' ? 'active' : ''}`}
          >
            Photos
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`gallery-tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
          >
            Videos
          </button>
        </div>

        {/* 3-Column Pure Masonry Grid Matching Image 2 */}
        <div className="masonry-grid">
          {filteredItems.map((item, index) => {
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
                        src={item.url}
                        poster={item.poster}
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
                        src={item.url}
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
                    src={currentLightboxItem.url}
                    controls
                    autoPlay
                    playsInline
                    className="max-w-full max-h-[65vh] object-contain"
                  />
                ) : (
                  <img
                    src={currentLightboxItem.url}
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
