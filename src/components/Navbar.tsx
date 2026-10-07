import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ShoppingBag, Phone, Globe, Menu, X } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  cartCount,
  onOpenCart
}) => {
  const t = TRANSLATIONS[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element Brand Wordmark */}
        <a 
          href="#" 
          className="text-base sm:text-xl font-bold sm:font-extrabold tracking-tight text-white font-display whitespace-nowrap shrink-0 hover:text-orange-400 transition-colors"
        >
          <span className="text-orange-500">Tedy's</span> Fast Food & Grill
        </a>

        {/* Zone 2: 4-6 Clean Text Navigation Links (Single-Line) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <a href="#menu" className="hover:text-orange-400 transition-colors whitespace-nowrap">
            {t.nav.menu}
          </a>
          <a href="#showcase" className="hover:text-orange-400 transition-colors whitespace-nowrap">
            3D Explorer
          </a>
          <a href="#reviews" className="hover:text-orange-400 transition-colors whitespace-nowrap">
            {t.nav.reviews}
          </a>
          <a href="#reserve" className="hover:text-orange-400 transition-colors whitespace-nowrap">
            {t.nav.reserve}
          </a>
          <a href="#location" className="hover:text-orange-400 transition-colors whitespace-nowrap">
            {t.nav.location}
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary Actions (Language, Cart, Call) */}
        <div className="flex items-center gap-2.5">
          {/* Dual Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-200 hover:text-white hover:border-neutral-700 transition-all cursor-pointer whitespace-nowrap"
            title={lang === 'en' ? 'Ndërro në Shqip' : 'Switch to English'}
          >
            <Globe className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang === 'en' ? 'SQ' : 'EN'}</span>
          </button>

          {/* Quick Call Direct */}
          <a
            href="tel:+355686073000"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-200 transition-colors whitespace-nowrap"
            title="+355 68 607 3000"
          >
            <Phone className="w-3.5 h-3.5 text-orange-500" />
            <span className="font-mono">+355 68 607 3000</span>
          </a>

          {/* Cart Basket Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white text-xs font-bold transition-all shadow-md shadow-orange-950 cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden xs:inline">{t.nav.order}</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-neutral-950 text-[11px] font-bold flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-neutral-900 text-neutral-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-neutral-300">
            <a 
              href="#menu" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-orange-400"
            >
              {t.nav.menu}
            </a>
            <a 
              href="#showcase" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-orange-400"
            >
              3D Explorer
            </a>
            <a 
              href="#reviews" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-orange-400"
            >
              {t.nav.reviews}
            </a>
            <a 
              href="#reserve" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-orange-400"
            >
              {t.nav.reserve}
            </a>
            <a 
              href="#location" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-orange-400"
            >
              {t.nav.location}
            </a>
          </nav>

          <div className="pt-2 border-t border-neutral-850 flex items-center justify-between">
            <a
              href="tel:+355686073000"
              className="flex items-center gap-2 text-xs font-semibold text-neutral-200"
            >
              <Phone className="w-4 h-4 text-orange-500" />
              <span>+355 68 607 3000</span>
            </a>
            <span className="text-[11px] text-emerald-400 font-medium">
              {t.nav.openUntil}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
