import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { restaurantImg, tedysExteriorImg, googleMapsPhotoImg, homepageBgImg } from '../data/menu';
import souvlakiImg from '../assets/images/tedys_souvlaki_gyros_1791391614895.jpg';
import pizzaImg from '../assets/images/tedys_woodfired_pizza_1791391631079.jpg';
import skepastiImg from '../assets/images/tedys_skepasti_burger_1791391642483.jpg';
import { Card3DTilt } from './Card3DTilt';
import { Flame, MapPin, Phone, Send, Navigation, Star, Clock, Utensils, Instagram } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenCart: () => void;
  onScrollToMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onOpenCart,
  onScrollToMenu
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <section className="relative pt-4 pb-10 sm:pt-10 sm:pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Home Page Background using the requested photo with noticeable presence */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <img
          src={homepageBgImg}
          alt="Tedy's Fast Food & Grill restaurant background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-65 md:opacity-55 scale-100 transition-opacity duration-300"
        />
        {/* Balanced dark gradients to keep the photo distinct while protecting text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/45 to-neutral-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/30 to-neutral-950/70" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-orange-600/15 via-red-600/10 to-transparent blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Unboxed Metadata Trust Line (Zero-Pill Discipline, responsive wrap) */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 text-[11px] sm:text-xs text-neutral-400 mb-3 sm:mb-5">
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.0</span>
            <span className="text-neutral-400 font-normal">(76 {lang === 'en' ? 'Google Reviews' : 'vlerësime në Google'})</span>
          </div>
          <span aria-hidden="true" className="text-neutral-600 hidden xs:inline">·</span>
          <span className="font-mono text-neutral-300">ALL 1–500 {lang === 'en' ? 'per person' : 'për person'}</span>
          <span aria-hidden="true" className="text-neutral-600 hidden sm:inline">·</span>
          <div className="flex items-center gap-1 text-emerald-400">
            <Clock className="w-3 h-3" />
            <span>{lang === 'en' ? 'Open · Closes 12 AM' : 'Hapur · Mbyllet në 12 AM'}</span>
          </div>
          <span aria-hidden="true" className="text-neutral-600 hidden md:inline">·</span>
          <div className="hidden md:flex items-center gap-1 text-neutral-400">
            <MapPin className="w-3 h-3 text-orange-500" />
            <span>Rruga Tom Plezha 1001, Tiranë</span>
          </div>
        </div>

        {/* Hero Grid: Left Content / Right Visual 3D Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Proposition & Actions */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            
            <div className="space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-orange-500">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>{lang === 'en' ? "Tirana's Beloved Street Grill & Fast Food" : "Zgara & Fast-Foodi i Preferuar në Tiranë"}</span>
              </div>

              <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold sm:font-black tracking-tight text-white font-display leading-[1.12] text-balance">
                {lang === 'en' ? (
                  <>
                    Authentic Charcoal <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-amber-500">Grill, Souvlakis</span> & Artisan Pizza
                  </>
                ) : (
                  <>
                    Zgarë me Qymyr, <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-amber-500">Sufllaqe Autentike</span> & Pica në Furrë
                  </>
                )}
              </h1>
            </div>

            <p className="text-xs sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
              {t.hero.subheadline}
            </p>

            {/* Service Capabilities */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-neutral-300 py-0.5">
              <div className="flex items-center gap-1.5 bg-neutral-900/80 border border-neutral-800 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg">
                <Utensils className="w-3 h-3 text-orange-400" />
                <span>{t.hero.highlights.dineIn}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-neutral-900/80 border border-neutral-800 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg">
                <Clock className="w-3 h-3 text-red-400" />
                <span>{t.hero.highlights.delivery}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-neutral-900/80 border border-neutral-800 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>{t.hero.highlights.driveThrough}</span>
              </div>
            </div>

            {/* CTAs: Responsive 2x2 grid on mobile, fluid flex row on desktop */}
            <div className="pt-1 grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
              {/* 1. Order Online / WhatsApp */}
              <button
                onClick={onOpenCart}
                className="py-2.5 px-3 sm:py-3.5 sm:px-6 rounded-xl bg-gradient-to-r from-red-600 via-orange-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-950/60 transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="truncate">{t.hero.orderNow}</span>
              </button>

              {/* 2. Direct Call to Order */}
              <a
                href="tel:+355686073000"
                className="py-2.5 px-3 sm:py-3.5 sm:px-5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-neutral-850"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
                <span className="truncate">{t.hero.callOrder}</span>
              </a>

              {/* 3. Google Maps Directions */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=41.3293205,19.7827167"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 sm:py-3.5 sm:px-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 sm:gap-2"
                title="Get Directions on Google Maps"
              >
                <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
                <span className="truncate">{t.hero.getDirections}</span>
              </a>

              {/* 4. Instagram Direct */}
              <a
                href="https://www.instagram.com/tedysgrill/"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 sm:py-3.5 sm:px-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 sm:gap-2"
                title="Follow @tedysgrill on Instagram"
              >
                <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500" />
                <span className="truncate">@tedysgrill</span>
              </a>
            </div>

          </div>

          {/* Right Column: High-Impact Visual Food & Storefront Montage */}
          <div className="lg:col-span-5 relative mt-2 lg:mt-0">
            <Card3DTilt maxTilt={8} className="relative z-10">
              
              {/* Main Feature Photo Card */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl group">
                <div className="aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-neutral-950 relative">
                  <img
                    src={googleMapsPhotoImg}
                    alt="Tedy's Fast Food & Grill official Google Maps photo"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  {/* Real Photo credit / link as requested */}
                  <a
                    href="https://maps.app.goo.gl/HGXrTNv8GFjSo7uB6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 text-[10px] sm:text-[11px] bg-black/70 hover:bg-black text-white/90 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-white/10 transition-colors flex items-center gap-1"
                  >
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-400" />
                    <span>Google Maps Photo</span>
                  </a>

                  {/* Overlaid Badge */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                    <div className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-orange-400">
                      Rruga Tom Plezha 1001, Tiranë
                    </div>
                    <div className="text-sm sm:text-lg font-bold text-white font-display">
                      Tedy's Fast Food & Grill
                    </div>
                    <div className="text-[10px] sm:text-xs text-neutral-300 mt-0.5 truncate">
                      {lang === 'en' ? 'Charcoal BBQ, Sufllaqe & Quiet Backyard Garden' : 'Zgarë me Qymyr, Sufllaqe & Kopsht i Qetë Mbrapa'}
                    </div>
                  </div>
                </div>

                {/* Micro Thumbnail Food Strip */}
                <div className="p-2 sm:p-3 bg-neutral-950 border-t border-neutral-800/80 grid grid-cols-3 gap-1.5 sm:gap-2">
                  <div 
                    onClick={onScrollToMenu}
                    className="cursor-pointer group/item flex flex-col items-center text-center p-1.5 sm:p-2 rounded-xl bg-neutral-900/60 hover:bg-neutral-850 border border-neutral-800/60 transition-all"
                  >
                    <img 
                      src={souvlakiImg} 
                      alt="Sufllaqe Pule" 
                      referrerPolicy="no-referrer" 
                      className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg object-cover mb-1 shadow"
                    />
                    <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-200 group-hover/item:text-orange-400 truncate w-full">
                      Sufllaqe Pule
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-neutral-400 font-mono">250 ALL</span>
                  </div>

                  <div 
                    onClick={onScrollToMenu}
                    className="cursor-pointer group/item flex flex-col items-center text-center p-1.5 sm:p-2 rounded-xl bg-neutral-900/60 hover:bg-neutral-850 border border-neutral-800/60 transition-all"
                  >
                    <img 
                      src={skepastiImg} 
                      alt="Skepasti Special" 
                      referrerPolicy="no-referrer" 
                      className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg object-cover mb-1 shadow"
                    />
                    <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-200 group-hover/item:text-orange-400 truncate w-full">
                      Skepasti Club
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-neutral-400 font-mono">430 ALL</span>
                  </div>

                  <div 
                    onClick={onScrollToMenu}
                    className="cursor-pointer group/item flex flex-col items-center text-center p-1.5 sm:p-2 rounded-xl bg-neutral-900/60 hover:bg-neutral-850 border border-neutral-800/60 transition-all"
                  >
                    <img 
                      src={pizzaImg} 
                      alt="Stone Oven Pizza" 
                      referrerPolicy="no-referrer" 
                      className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg object-cover mb-1 shadow"
                    />
                    <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-200 group-hover/item:text-orange-400 truncate w-full">
                      Pica Speciale
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-neutral-400 font-mono">490 ALL</span>
                  </div>
                </div>

              </div>

            </Card3DTilt>

            {/* Ambient Floating Trust Tag */}
            <div className="absolute -bottom-3 -left-3 bg-neutral-900/95 border border-orange-500/30 rounded-xl p-2.5 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2.5 z-20">
              <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-500 flex items-center justify-center font-bold text-xs">
                4.0★
              </div>
              <div>
                <div className="text-[11px] font-bold text-white">
                  {lang === 'en' ? 'Highly Rated on Google Maps' : 'I Vlerësuar Lart në Google'}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {lang === 'en' ? '76 Verified Customer Reviews' : '76 Vlerësime të Verifikuara'}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
