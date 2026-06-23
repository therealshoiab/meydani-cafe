import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import RatingBadge from './RatingBadge';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#141313] border-t border-[#2d2b2b] pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Brand Details */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <UtensilsCrossed className="w-6 h-6 text-[#ffbf00]" />
            <span className="font-display text-xl font-bold tracking-wider text-[#c8c6c5]">
              MEYDANI CAFE
            </span>
          </Link>
          <p className="text-sm text-[#8e9192] leading-relaxed">
            Experience the rich culinary heritage of Turkey and the Middle East, beautifully situated on the scenic banks of the Jhelum in Srinagar.
          </p>
          <div className="pt-2 flex gap-3">
            <a 
              href="https://www.instagram.com/meydani_cafe1/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-[#1e1e1e] border border-[#2d2b2b] text-[#8e9192] hover:text-[#ffbf00] hover:border-[#ffbf00] rounded-full transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://www.facebook.com/meydanicafe1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-[#1e1e1e] border border-[#2d2b2b] text-[#8e9192] hover:text-[#ffbf00] hover:border-[#ffbf00] rounded-full transition-all duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm uppercase tracking-[0.15em] text-[#ffbf00] font-semibold mb-6">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <Link to="/menu" className="text-sm text-[#8e9192] hover:text-[#ffbf00] transition-colors">
                View Menu
              </Link>
            </li>
            <li>
              <Link to="/reservations" className="text-sm text-[#8e9192] hover:text-[#ffbf00] transition-colors">
                Book a Table
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="text-sm text-[#8e9192] hover:text-[#ffbf00] transition-colors">
                Photo Gallery
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-sm text-[#8e9192] hover:text-[#ffbf00] transition-colors">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/offers" className="text-sm text-[#8e9192] hover:text-[#ffbf00] transition-colors">
                Special Offers
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-sm uppercase tracking-[0.15em] text-[#ffbf00] font-semibold mb-6">
            Visit Us
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-sm text-[#8e9192]">
              <MapPin className="w-5 h-5 text-[#ffbf00] shrink-0" />
              <span>
                The Bund Road, Residency Road, near Chai Jai, Poloview, Srinagar, JK 190001
              </span>
            </li>
            <li className="flex items-center gap-3 text-sm text-[#8e9192]">
              <Phone className="w-4 h-4 text-[#ffbf00] shrink-0" />
              <a href="tel:+918899058697" className="hover:text-[#ffbf00] transition-colors">
                +91 8899058697
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm text-[#8e9192]">
              <Mail className="w-4 h-4 text-[#ffbf00] shrink-0" />
              <a href="mailto:info@meydanicafe.com" className="hover:text-[#ffbf00] transition-colors">
                info@meydanicafe.com
              </a>
            </li>
          </ul>
        </div>

        {/* Ratings & Status */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm uppercase tracking-[0.15em] text-[#ffbf00] font-semibold mb-6">
              Our Trust Score
            </h3>
            <RatingBadge type="google" rating={4.7} count={1325} className="w-full" />
            <div className="mt-3">
              <RatingBadge type="zomato" rating={4.2} count={46} className="w-full" />
            </div>
          </div>
          <div className="bg-[#1e1e1e] border border-[#2d2b2b] p-4 rounded-xl">
            <p className="text-xs text-[#ffbf00] font-semibold uppercase tracking-wider mb-1">
              Open Daily
            </p>
            <p className="text-xs text-[#8e9192]">
              Mon - Fri, Sun: 10:00 AM - 9:00 PM<br />
              Saturday: 10:00 AM - 9:30 PM
            </p>
          </div>
        </div>

      </div>

      {/* Copyright Strip */}
      <div className="max-w-[1200px] mx-auto px-6 border-t border-[#2d2b2b] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#8e9192]">
          © {currentYear} Meydani Cafe. All rights reserved.
        </p>
        <p className="text-xs text-[#8e9192]">
          Crafted with passion in Srinagar
        </p>
      </div>
    </footer>
  );
}
