import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, X, ChevronLeft, ChevronRight, Heart, MessageCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const videoRefs = useRef({});
  const cardRefs = useRef({});
  const lightboxVideoRef = useRef(null);

  const baseUrl = import.meta.env.BASE_URL;

  // Unified Gallery Items (17 Photos + 10 Videos matching Meydani Cafe theme)
  const galleryItems = useMemo(() => [
    // --- Meydani Ambiance & Food Photos ---
    {
      id: 'g1',
      type: 'image',
      url: `${baseUrl}images/g1.jpg`,
      caption: 'Sophisticated Turkish dining setup featuring warm atmospheric lighting.',
      likes: 284,
      comments: 25,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 'g2',
      type: 'image',
      url: `${baseUrl}images/g2.jpg`,
      caption: 'Perfect table detailing ready for our evening Mediterranean guests.',
      likes: 192,
      comments: 18,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 'g3',
      type: 'image',
      url: `${baseUrl}images/g3.jpg`,
      caption: 'Spacious dining hall with panoramic riverbank views of the Jhelum.',
      likes: 319,
      comments: 42,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 'g4',
      type: 'image',
      url: `${baseUrl}images/g4.jpg`,
      caption: 'Elegant wooden lattices and cozy seating arrangements by Polo View.',
      likes: 253,
      comments: 31,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 'g5',
      type: 'image',
      url: `${baseUrl}images/g5.jpg`,
      caption: 'Cozy seating booth framed by beautiful ambient drop lights.',
      likes: 267,
      comments: 24,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 'g6',
      type: 'image',
      url: `${baseUrl}images/g6.jpg`,
      caption: 'Warm Turkish interior accents and modern architectural arches.',
      likes: 298,
      comments: 32,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 'g7',
      type: 'image',
      url: `${baseUrl}images/g7.jpg`,
      caption: 'Banquet table service prepared for family gatherings and celebrations.',
      likes: 275,
      comments: 29,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 'g8',
      type: 'image',
      url: `${baseUrl}images/g8.jpg`,
      caption: 'Our signature Adana Kabab and mixed grill feast served hot.',
      likes: 442,
      comments: 58,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 'g9',
      type: 'image',
      url: `${baseUrl}images/g9.jpg`,
      caption: 'Succulent spiced mutton seekh starters with mint toum and warm lavash.',
      likes: 389,
      comments: 45,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 'g10',
      type: 'image',
      url: `${baseUrl}images/g10.jpg`,
      caption: 'Traditional Turkish samovar brewing authentic hot saffron tea & Kahwa.',
      likes: 512,
      comments: 71,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 'g11',
      type: 'image',
      url: `${baseUrl}images/g11.jpg`,
      caption: 'Silky butter chicken gravy served with fresh tandoori garlic naans.',
      likes: 320,
      comments: 41,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 'g12',
      type: 'image',
      url: `${baseUrl}images/g12.jpg`,
      caption: 'Warm Kunafa pastry with stretchy cheese & sweet saffron syrup.',
      likes: 498,
      comments: 58,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 'g13',
      type: 'image',
      url: `${baseUrl}images/g13.jpg`,
      caption: 'Smoky grilled chicken tandoori cuts straight from the clay oven.',
      likes: 375,
      comments: 34,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 's3',
      type: 'image',
      url: `${baseUrl}images/s3.jpg`,
      caption: 'Dine under the warmth of modern Mediterranean lattices. Book your table.',
      likes: 540,
      comments: 78,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 's6',
      type: 'image',
      url: `${baseUrl}images/s6.jpg`,
      caption: 'Royal Zafrani dessert served chilled in authentic clay bowls.',
      likes: 398,
      comments: 41,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 's9',
      type: 'image',
      url: `${baseUrl}images/s9.jpg`,
      caption: 'Our ambient riverside wood structures. Designed for memorable dates.',
      likes: 512,
      comments: 63,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 's12',
      type: 'image',
      url: `${baseUrl}images/s12.jpg`,
      caption: 'Premium dining ambiance preview with guest smiles at The Bund Road.',
      likes: 954,
      comments: 184,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },

    // --- Meydani Cinematic 9:16 Video Reels ---
    {
      id: 's1',
      type: 'video',
      url: `${baseUrl}images/s1.mp4`,
      caption: 'Behind the scenes: Chef plating our signature Turkish kebabs & platters.',
      likes: 532,
      comments: 75,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 's2',
      type: 'video',
      url: `${baseUrl}images/s2.mp4`,
      caption: 'Sip the morning brew. Perfect Turkish coffee & espresso pours at the counter.',
      likes: 412,
      comments: 39,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 's4',
      type: 'video',
      url: `${baseUrl}images/s4.mp4`,
      caption: 'Pouring our Signature Saffron Cooler mocktail. Sparkling mint refreshment.',
      likes: 671,
      comments: 92,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 's5',
      type: 'video',
      url: `${baseUrl}images/s5.mp4`,
      caption: 'Sizzling charcoal flames roasting our juicy mutton seekhs & Adana kebabs.',
      likes: 812,
      comments: 110,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 's7',
      type: 'video',
      url: `${baseUrl}images/s7.mp4`,
      caption: 'Fresh artisan coffee beans ground for every rich cup on The Bund.',
      likes: 345,
      comments: 25,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 's8',
      type: 'video',
      url: `${baseUrl}images/s8.mp4`,
      caption: 'Food enthusiast tasting our tender Lamb Chops and Uzbeki Pulao.',
      likes: 912,
      comments: 142,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 's10',
      type: 'video',
      url: `${baseUrl}images/s10.mp4`,
      caption: 'Pouring traditional saffron mojito over compressed fresh mint and ice.',
      likes: 432,
      comments: 31,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 's11',
      type: 'video',
      url: `${baseUrl}images/s11.mp4`,
      caption: 'Our aesthetic cafe counter waiting for your afternoon dining visits.',
      likes: 412,
      comments: 29,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 's13',
      type: 'video',
      url: `${baseUrl}images/s13.mp4`,
      caption: 'Aesthetic corners. Turkish fine dining redefined in Srinagar.',
      likes: 480,
      comments: 39,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
    {
      id: 's14',
      type: 'video',
      url: `${baseUrl}images/s14.mp4`,
      caption: 'Steaming Dum Mutton Uzbeki Pulao opened fresh at the guest table.',
      likes: 1102,
      comments: 164,
      instagramUrl: 'https://www.instagram.com/meydani_cafe1/',
    },
  ], [baseUrl]);

  // Filter items based on selected category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return galleryItems;
    return galleryItems.filter((item) => item.type === activeCategory);
  }, [activeCategory, galleryItems]);

  const closeLightbox = () => {
    setLightboxIndex(null);
    if (window.location.hash.includes('?video=')) {
      window.location.hash = '#/gallery';
    }
  };

  // Select video from URL parameter / hash redirect
  useEffect(() => {
    const handleUrlParam = () => {
      const search = window.location.search || window.location.hash;
      const match = search.match(/[?&]video=([\w-]+)/);
      if (match) {
        const videoId = match[1];
        setActiveCategory('video');
        const videoItems = galleryItems.filter((item) => item.type === 'video');
        const idx = videoItems.findIndex((item) => item.id === videoId);
        if (idx !== -1) {
          setLightboxIndex(idx);
        }
      }
    };

    handleUrlParam();
    window.addEventListener('hashchange', handleUrlParam);
    return () => window.removeEventListener('hashchange', handleUrlParam);
  }, [galleryItems]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev === null || prev === 0 ? filteredItems.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === null || prev === filteredItems.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  // Video hover triggers
  const handleVideoMouseEnter = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  };

  const handleVideoMouseLeave = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1);
  };

  // Parallax 3D tilt effects
  const handleMouseMoveTilt = (e, itemId) => {
    const card = cardRefs.current[itemId];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    const maxTilt = 8;
    const rotateX = -normalizedY * maxTilt;
    const rotateY = normalizedX * maxTilt;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = '0 15px 35px rgba(255, 191, 0, 0.15)';
  };

  const handleMouseLeaveTilt = (itemId) => {
    const card = cardRefs.current[itemId];
    if (!card) return;

    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = 'none';
  };

  return (
    <div className="bg-[#141313] min-h-screen pt-28 pb-20 px-6">
      <SEOHead 
        title="Ambiance & Culinary Gallery" 
        description="Browse the complete visual gallery of Meydani Cafe. Check out our real dine-in ambiance on the Jhelum banks, Turkish grill courses, and guest reviews."
        path="/gallery"
      />

      <div className="max-w-[1200px] mx-auto space-y-10">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#ffbf00] font-bold">
            Visual Showcase
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-[#c8c6c5]">
            Ambiance &amp; Culinary Gallery
          </h1>
          <div className="w-16 h-[2px] bg-[#ffbf00] mx-auto mt-2" />
        </div>

        {/* Category Tabs */}
        <div className="gallery-tab-container">
          {[
            { id: 'all', label: 'All Media' },
            { id: 'image', label: 'Photos' },
            { id: 'video', label: 'Videos' },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`gallery-tab-btn ${activeCategory === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(tab.id);
                closeLightbox();
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid - Displays Filtered Items */}
        <div className="masonry-grid">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => { cardRefs.current[item.id] = el; }}
              className="masonry-item bg-[#1e1e1e] border border-[#2d2b2b] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 relative group"
              onMouseMove={(e) => handleMouseMoveTilt(e, item.id)}
              onMouseLeave={() => handleMouseLeaveTilt(item.id)}
              onClick={() => setLightboxIndex(index)}
              style={{
                transition: 'transform 0.15s ease, box-shadow 0.25s ease, border-color 0.25s ease',
              }}
            >
              {/* Visual Media Frame */}
              <div
                className="w-full relative overflow-hidden bg-black flex items-center"
                onMouseEnter={() => item.type === 'video' && handleVideoMouseEnter(item.id)}
                onMouseLeave={() => item.type === 'video' && handleVideoMouseLeave(item.id)}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.caption}
                    loading="lazy"
                    className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full relative flex items-center">
                    <video
                      ref={(el) => { videoRefs.current[item.id] = el; }}
                      src={item.url}
                      loop
                      muted
                      playsInline
                      className="w-full h-auto block"
                    />
                    {/* Play Badge Icon in Top-Right */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-full p-2.5 flex items-center justify-center text-white border border-white/20 z-10 group-hover:border-[#ffbf00] group-hover:text-[#ffbf00] transition-colors">
                      <Play size={14} fill="currentColor" />
                    </div>
                  </div>
                )}

                {/* Instagram Direct Link Pill */}
                {item.instagramUrl && (
                  <a
                    href={item.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-4 left-4 bg-[#141313]/90 hover:bg-[#ffbf00] hover:text-[#402d00] border border-[#2d2b2b] hover:border-[#ffbf00] text-[#c8c6c5] rounded-full px-3 py-1.5 text-[11px] font-bold flex items-center gap-1.5 transition-all z-10 shadow-lg"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                    Instagram
                  </a>
                )}
              </div>

              {/* Bottom Card Caption & Stats */}
              <div className="p-4 bg-[#1e1e1e] border-t border-[#2d2b2b] space-y-2">
                <p className="text-xs text-[#c8c6c5] leading-relaxed line-clamp-2">
                  {item.caption}
                </p>
                <div className="flex items-center gap-4 text-[11px] text-[#8e9192] font-semibold pt-1">
                  <span className="flex items-center gap-1 hover:text-[#ffbf00] transition-colors">
                    <Heart size={12} className="text-[#ffbf00]" />
                    {item.likes}
                  </span>
                  <span className="flex items-center gap-1 hover:text-[#ffbf00] transition-colors">
                    <MessageCircle size={12} className="text-[#ffbf00]" />
                    {item.comments}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div
            className="fixed inset-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-[#ffbf00] hover:text-[#402d00] text-white transition-all z-50 cursor-pointer"
              aria-label="Close lightbox"
            >
              <X size={22} />
            </button>

            {/* Previous Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-[#ffbf00] hover:text-[#402d00] text-white transition-all z-50 cursor-pointer"
              aria-label="Previous item"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Media Container */}
            <div
              className="max-w-[90vw] max-h-[85vh] flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {filteredItems[lightboxIndex].type === 'image' ? (
                <img
                  src={filteredItems[lightboxIndex].url}
                  alt={filteredItems[lightboxIndex].caption}
                  className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-[#2d2b2b]"
                />
              ) : (
                <video
                  ref={lightboxVideoRef}
                  src={filteredItems[lightboxIndex].url}
                  controls
                  autoPlay
                  playsInline
                  className="max-w-full max-h-[70vh] rounded-xl shadow-2xl border border-[#2d2b2b]"
                />
              )}

              {/* Caption & Info in Lightbox */}
              <div className="text-center max-w-xl space-y-2">
                <p className="text-sm text-[#c8c6c5] font-medium leading-relaxed">
                  {filteredItems[lightboxIndex].caption}
                </p>
                <div className="flex items-center justify-center gap-6 text-xs text-[#8e9192]">
                  <span className="flex items-center gap-1.5 text-[#ffbf00]">
                    <Heart size={14} />
                    {filteredItems[lightboxIndex].likes} Likes
                  </span>
                  <span className="flex items-center gap-1.5 text-[#ffbf00]">
                    <MessageCircle size={14} />
                    {filteredItems[lightboxIndex].comments} Comments
                  </span>
                  {filteredItems[lightboxIndex].instagramUrl && (
                    <a
                      href={filteredItems[lightboxIndex].instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ffbf00] hover:underline font-bold"
                    >
                      View on Instagram &rarr;
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-[#ffbf00] hover:text-[#402d00] text-white transition-all z-50 cursor-pointer"
              aria-label="Next item"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
