import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Reservations', path: '/reservations' },
  { name: 'About Us', path: '/about' },
  { name: 'Offers', path: '/offers' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#141313]/95 backdrop-blur-md border-b border-[#2d2b2b] py-3 shadow-lg' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <UtensilsCrossed className="w-6 h-6 text-[#ffbf00] group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-display text-xl font-bold tracking-wider text-[#c8c6c5] group-hover:text-[#ffbf00] transition-colors">
              MEYDANI
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-sans font-medium tracking-wide transition-colors relative py-1 ${
                    isActive 
                      ? 'text-[#ffbf00]' 
                      : 'text-[#c8c6c5] hover:text-[#ffbf00]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="navActiveLine"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ffbf00]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Reserve Table CTA */}
          <div className="hidden lg:block">
            <Link
              to="/reservations"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#ffbf00] text-[#402d00] text-sm font-semibold tracking-wider uppercase hover:bg-[#ffbf00]/90 transition-all duration-200 shadow-md shadow-[#ffbf00]/15"
            >
              Reserve Table
            </Link>
          </div>

          {/* Hamburger Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#c8c6c5] hover:text-[#ffbf00] transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-0 z-30 pt-20 pb-8 px-6 bg-[#141313]/98 backdrop-blur-xl border-b border-[#2d2b2b] shadow-2xl flex flex-col gap-6 lg:hidden"
          >
            <nav className="flex flex-col gap-5 text-center">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-lg font-sans font-medium transition-colors ${
                      isActive ? 'text-[#ffbf00]' : 'text-[#c8c6c5] hover:text-[#ffbf00]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <Link
              to="/reservations"
              className="w-full text-center py-3.5 rounded-lg bg-[#ffbf00] text-[#402d00] text-sm font-bold tracking-wider uppercase hover:bg-[#ffbf00]/90 transition-colors shadow-lg shadow-[#ffbf00]/10"
            >
              Reserve Table
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
