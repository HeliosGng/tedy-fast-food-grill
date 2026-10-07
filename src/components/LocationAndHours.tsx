import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { googleMapsPhotoImg } from '../data/menu';
import { MapPin, Clock, Phone, Navigation, Copy, Check, ExternalLink, Instagram, Share2, Compass, Camera } from 'lucide-react';

interface LocationAndHoursProps {
  lang: Language;
}

export const LocationAndHours: React.FC<LocationAndHoursProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<'map' | 'photo'>('map');

  const googleMapsUrl = "https://www.google.com/maps/place/Tedy's+Fast+Food+%26+Grill/@41.3293205,19.7827167,17z/data=!4m16!1m9!3m8!1s0x13503145802175d3:0x9e71c70bd932346a!2sTedy's+Fast+Food+%26+Grill!8m2!3d41.3293205!4d19.7827167!9m1!1b1!16s%2Fg%2F11g0l4nv70!3m5!1s0x13503145802175d3:0x9e71c70bd932346a!8m2!3d41.3293205!4d19.7827167!16s%2Fg%2F11g0l4nv70?entry=ttu";
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=41.3293205,19.7827167";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("Rruga Tom Plezha 1001, Tiranë, Albania");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="location" className="py-10 md:py-20 px-3.5 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-neutral-800">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
        <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-red-500 mb-1.5">
          <Compass className="w-3.5 h-3.5 text-red-500" />
          <span>{lang === 'en' ? 'Directions & Hours' : 'Vendndodhja & Orari'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white font-display">
          {t.location.title}
        </h2>
        <p className="text-neutral-400 mt-1 sm:mt-2 text-xs sm:text-base">
          {t.location.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Column: Details Cards, Popular Times, Contact */}
        <div className="lg:col-span-6 space-y-4 sm:space-y-6">
          
          {/* Address Card */}
          <div className="p-4 sm:p-6 rounded-2xl bg-neutral-900 border border-neutral-800/80 shadow-md">
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              <div className="flex items-start gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base">
                    {t.location.addressTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-0.5 sm:mt-1 font-medium">
                    {t.location.addressText}
                  </p>
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    {t.location.plusCode}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyAddress}
                className="p-1.5 sm:p-2 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-neutral-300 hover:text-white transition-colors cursor-pointer shrink-0"
                title={t.location.copyAddress}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Quick Action Buttons for Location */}
            <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-neutral-800 flex flex-wrap gap-2 sm:gap-3">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 shadow-md shadow-orange-950 transition-all"
              >
                <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="truncate">{t.location.directionsBtn}</span>
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 sm:py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3 h-3 text-orange-400" />
                <span>Google Maps</span>
              </a>
            </div>
          </div>

          {/* Opening Hours & Popular Times Card */}
          <div className="p-4 sm:p-6 rounded-2xl bg-neutral-900 border border-neutral-800/80 shadow-md">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-600/20 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  {t.location.hoursTitle}
                </h3>
                <p className="text-sm text-emerald-400 font-semibold mt-1">
                  {t.location.hoursText}
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  {t.location.popularTimes}
                </p>
              </div>
            </div>

            {/* Visual Popular Times Histogram (Authentic from Google Maps data) */}
            <div className="mt-4 pt-4 border-t border-neutral-800">
              <div className="text-xs font-semibold text-neutral-400 mb-2 flex items-center justify-between">
                <span>{lang === 'en' ? 'Daily Customer Traffic Pattern' : 'Fluksi Ditor i Klientëve'}</span>
                <span className="text-[11px] text-orange-400">{lang === 'en' ? 'Busier at 1-2 PM & 7-10 PM' : 'Më i lartë 13-14 & 19-22'}</span>
              </div>

              <div className="h-20 flex items-end gap-1.5 pt-2">
                {[
                  { hour: '8a', val: 15 },
                  { hour: '10a', val: 25 },
                  { hour: '12p', val: 75 },
                  { hour: '1p', val: 90 },
                  { hour: '2p', val: 65 },
                  { hour: '4p', val: 35 },
                  { hour: '6p', val: 70 },
                  { hour: '8p', val: 98 },
                  { hour: '9p', val: 92 },
                  { hour: '10p', val: 60 },
                  { hour: '11p', val: 30 }
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-t transition-all ${
                        item.val > 80
                          ? 'bg-gradient-to-t from-red-600 to-orange-500'
                          : 'bg-neutral-750 hover:bg-neutral-600'
                      }`}
                      style={{ height: `${item.val}%` }}
                      title={`${item.hour}: ~${item.val}% traffic`}
                    />
                    <span className="text-[10px] text-neutral-500 font-mono">{item.hour}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phone & Instagram Contact Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="tel:+355686073000"
              className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-600/20 text-orange-500 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <span className="text-xs text-neutral-400 block">{t.location.phoneTitle}</span>
                <span className="text-sm font-bold text-white font-mono">{t.location.phoneNumber}</span>
              </div>
            </a>

            <a
              href="https://www.instagram.com/tedysgrill/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-600/20 text-pink-500 flex items-center justify-center shrink-0">
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <span className="text-xs text-neutral-400 block">Instagram</span>
                <span className="text-sm font-bold text-white">@tedysgrill</span>
              </div>
            </a>
          </div>

        </div>

        {/* Right Column: Interactive Map Preview */}
        <div className="lg:col-span-6">
          <div className="rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl relative">
            {/* View Switcher Bar */}
            <div className="p-3 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
                <button
                  type="button"
                  onClick={() => setActiveView('map')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeView === 'map'
                      ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Live Map' : 'Harta në Çast'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('photo')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeView === 'photo'
                      ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Google Maps Photo' : 'Foto e Lokalit në Google'}</span>
                </button>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-400 hover:text-orange-400 flex items-center gap-1 transition-colors"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            
            {/* Map Frame or Storefront Photo */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full bg-neutral-950 overflow-hidden">
              {activeView === 'map' ? (
                <iframe
                  title="Tedy's Fast Food & Grill Map"
                  src="https://maps.google.com/maps?q=41.3293205,19.7827167&hl=en&z=16&output=embed"
                  width="100%"
                  height="100%"
                  className="w-full h-full border-0 filter invert contrast-125 brightness-90 grayscale-[30%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={googleMapsPhotoImg}
                    alt="Tedy's Fast Food & Grill official Google Maps storefront photo"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                </div>
              )}

              {/* Floating Pin Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-neutral-950/95 border border-neutral-800 p-4 rounded-2xl backdrop-blur-md flex items-center justify-between shadow-2xl">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">
                    Tedy's Fast Food & Grill
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Rruga Tom Plezha 1001, Tiranë
                  </p>
                </div>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Navigate' : 'Navigo'}</span>
                </a>
              </div>
            </div>

            {/* Fast Takeaway / Delivery Neighborhoods */}
            <div className="p-4 bg-neutral-950 border-t border-neutral-800 text-xs text-neutral-400 flex flex-wrap items-center justify-between gap-2">
              <span>{lang === 'en' ? 'Quick Delivery Zones:' : 'Zonat e Dërgesës së Shpejtë:'}</span>
              <span className="text-neutral-300 font-medium">
                Kombinat · Yzberisht · 21 Dhjetori · Astir · Unaza e Re
              </span>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
