import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Phone, MapPin, Clock, Instagram, Navigation, Flame, Heart } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onOpenCart: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenCart }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="bg-neutral-950 border-t border-neutral-850 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 mb-8 sm:mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <a href="#" className="text-xl font-bold text-white font-display inline-block">
              <span className="text-orange-500">Tedy's</span> Fast Food & Grill
            </a>
            <p className="text-neutral-400 leading-relaxed text-xs">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-2 text-neutral-300">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-semibold text-orange-400">
                {t.footer.openingNotice}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#menu" className="hover:text-orange-400 transition-colors">
                  {t.nav.menu}
                </a>
              </li>
              <li>
                <button 
                  onClick={onOpenCart} 
                  className="hover:text-orange-400 transition-colors cursor-pointer text-left"
                >
                  {t.nav.order}
                </button>
              </li>
              <li>
                <a href="#reserve" className="hover:text-orange-400 transition-colors">
                  {t.nav.reserve}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-orange-400 transition-colors">
                  {t.nav.reviews}
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-orange-400 transition-colors">
                  {t.nav.location}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Direct Contact' : 'Kontakti'}
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="text-neutral-300 leading-snug">{t.footer.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <a href="tel:+355686073000" className="text-neutral-200 hover:text-white font-mono">
                  +355 68 607 3000
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-neutral-300">08:00 AM – 12:00 AM</span>
              </div>
            </div>
          </div>

          {/* Social & Maps */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Social & Navigation' : 'Rrjetet & Harta'}
            </h4>
            <div className="space-y-2">
              <a
                href="https://www.instagram.com/tedysgrill/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-200 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>Instagram @tedysgrill</span>
              </a>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=41.3293205,19.7827167"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-200 transition-colors"
              >
                <Navigation className="w-4 h-4 text-orange-500" />
                <span>Google Maps Directions</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar (Zero-pill, clean unboxed metadata) */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} Tedy's Fast Food & Grill. {t.footer.rights}
          </div>
          <div className="flex items-center gap-3">
            <span>Tiranë, Albania</span>
            <span aria-hidden="true">·</span>
            <span>Rruga Tom Plezha</span>
            <span aria-hidden="true">·</span>
            <span>Delivery & Dine-In</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
