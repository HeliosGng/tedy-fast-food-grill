import React, { useState, useRef, useEffect } from 'react';
import { MenuItem, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Flame, Sparkles, Rotate3d, Plus, Check, ChevronLeft, ChevronRight, Layers, ShieldCheck } from 'lucide-react';

interface Dish3DShowcaseProps {
  items: MenuItem[];
  lang: Language;
  onSelectCustomize: (item: MenuItem) => void;
}

export const Dish3DShowcase: React.FC<Dish3DShowcaseProps> = ({
  items,
  lang,
  onSelectCustomize
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rotationY, setRotationY] = useState(12);
  const [rotationX, setRotationX] = useState(8);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startRot = useRef({ x: 0, y: 0 });

  const activeDish = items[selectedIndex] || items[0];

  useEffect(() => {
    if (!isAutoSpinning || isDragging) return;
    const interval = setInterval(() => {
      setRotationY(prev => (prev + 0.4) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isAutoSpinning, isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setIsAutoSpinning(false);
    startPos.current = { x: e.clientX, y: e.clientY };
    startRot.current = { x: rotationX, y: rotationY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    setRotationY(startRot.current.y + deltaX * 0.5);
    setRotationX(Math.max(-25, Math.min(30, startRot.current.x - deltaY * 0.3)));
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const resetAngle = () => {
    setRotationX(8);
    setRotationY(12);
    setIsAutoSpinning(true);
  };

  return (
    <section className="relative py-10 md:py-16 px-3.5 sm:px-6 md:px-8 border-y border-neutral-800 bg-gradient-to-b from-neutral-950 via-neutral-900/60 to-neutral-950 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-orange-400 mb-1.5">
              <Rotate3d className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              <span>3D Dish Explorer · 360° Perspective</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-display">
              {t.showcase3d.title}
            </h2>
            <p className="text-neutral-400 mt-1 sm:mt-2 max-w-xl text-xs sm:text-base">
              {t.showcase3d.subtitle}
            </p>
          </div>

          {/* Dish Selector Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 scrollbar-none">
            {items.map((dish, idx) => (
              <button
                key={dish.id}
                onClick={() => {
                  setSelectedIndex(idx);
                  setIsAutoSpinning(true);
                }}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedIndex === idx
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-orange-950'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
                }`}
              >
                {lang === 'en' ? dish.nameEn.split('(')[0] : dish.nameSq.split('(')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Main 3D Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-neutral-900/80 border border-neutral-800/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 backdrop-blur-xl relative">
          
          {/* Left/Center: 3D Turntable Viewport */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing select-none perspective-1000 py-2 sm:py-4"
              style={{ perspective: '1100px' }}
              title={t.showcase3d.rotateTip}
            >
              {/* Radial turntable ring base */}
              <div 
                className="absolute inset-4 sm:inset-8 rounded-full border border-orange-500/20 bg-gradient-to-b from-neutral-900 to-neutral-950 shadow-2xl pointer-events-none"
                style={{
                  transform: 'rotateX(68deg) translateZ(-60px)',
                  boxShadow: '0 30px 60px -15px rgba(0,0,0,0.9), inset 0 0 40px rgba(234, 88, 12, 0.15)'
                }}
              />

              {/* Glowing Charcoal Ember Base */}
              <div 
                className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-red-600/25 to-orange-500/20 blur-xl pointer-events-none"
                style={{ transform: 'translateZ(-40px)' }}
              />

              {/* 3D Container with transform */}
              <div
                className="relative w-full h-full flex items-center justify-center transform-style-3d transition-transform duration-75"
                style={{
                  transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* 3D Floating Dish Image - Scaled down for mobile */}
                <div 
                  className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-br from-neutral-800 to-neutral-950 border border-neutral-700 shadow-2xl overflow-hidden pointer-events-none"
                  style={{
                    transform: 'translateZ(40px)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 35px -5px rgba(234, 88, 12, 0.25)'
                  }}
                >
                  <img
                    src={activeDish.image}
                    alt={lang === 'en' ? activeDish.nameEn : activeDish.nameSq}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full"
                  />
                  {/* Glare reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-full" />
                </div>

                {/* Floating 3D Badge 1: Fresh Grill */}
                <div
                  className="absolute -top-1 sm:-top-2 right-2 sm:right-4 bg-neutral-900/90 border border-orange-500/40 text-orange-400 text-[10px] sm:text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl shadow-xl backdrop-blur-md flex items-center gap-1 sm:gap-1.5 pointer-events-none"
                  style={{ transform: 'translateZ(90px) rotateY(-10deg)' }}
                >
                  <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" />
                  <span className="font-semibold">{lang === 'en' ? 'Freshly Grilled' : 'Pjekur në Çast'}</span>
                </div>

                {/* Floating 3D Badge 2: Price */}
                <div
                  className="absolute bottom-2 sm:bottom-4 -left-1 sm:-left-2 bg-neutral-950/95 border border-red-500/40 text-white text-[10px] sm:text-xs px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-1 sm:gap-1.5 pointer-events-none"
                  style={{ transform: 'translateZ(100px) rotateY(8deg)' }}
                >
                  <span className="text-neutral-400">{lang === 'en' ? 'Price' : 'Çmimi'}:</span>
                  <span className="font-bold text-orange-400 font-mono text-xs sm:text-sm">{activeDish.price} ALL</span>
                </div>

                {/* Floating 3D Badge 3: Rating */}
                {activeDish.rating && (
                  <div
                    className="absolute top-1/2 -right-3 sm:-right-6 bg-neutral-900/90 border border-neutral-700 text-amber-400 text-[10px] sm:text-xs px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl shadow-xl backdrop-blur-md flex items-center gap-1 pointer-events-none"
                    style={{ transform: 'translateZ(75px) rotateY(-15deg)' }}
                  >
                    <span>★</span>
                    <span className="font-bold text-white">{activeDish.rating}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Turntable Control Bar */}
            <div className="flex items-center gap-3 mt-4 text-xs text-neutral-400">
              <button
                onClick={() => setRotationY(prev => prev - 45)}
                className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                title="Rotate Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsAutoSpinning(prev => !prev)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isAutoSpinning
                    ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                    : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white'
                }`}
              >
                {isAutoSpinning ? (lang === 'en' ? 'Pause Spin' : 'Ndalo Rrotullimin') : (lang === 'en' ? 'Auto Spin' : 'Rrotullim Automatik')}
              </button>

              <button
                onClick={resetAngle}
                className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                title="Reset Angle"
              >
                Reset
              </button>

              <button
                onClick={() => setRotationY(prev => prev + 45)}
                className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                title="Rotate Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-neutral-500 mt-2">
              {t.showcase3d.rotateTip}
            </p>
          </div>

          {/* Right: Dish Specs, Story & Quick Order */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-orange-500">
                  {lang === 'en' ? activeDish.category : activeDish.category}
                </span>
                <span className="text-neutral-600">·</span>
                <span className="text-xs text-neutral-400 font-mono">
                  ~{activeDish.prepTimeMinutes || 10} {t.menu.time}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white font-display mb-3">
                {lang === 'en' ? activeDish.nameEn : activeDish.nameSq}
              </h3>

              <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                {lang === 'en' ? activeDish.descriptionEn : activeDish.descriptionSq}
              </p>

              {/* Highlight review tag */}
              {(activeDish.highlightNotesEn || activeDish.highlightNotesSq) && (
                <div className="p-3 rounded-xl bg-orange-950/40 border border-orange-800/40 text-orange-200 text-xs mb-4 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>
                    {lang === 'en' ? activeDish.highlightNotesEn : activeDish.highlightNotesSq}
                  </span>
                </div>
              )}

              {/* Craft Points / Ingredients */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  {t.showcase3d.ingredientsTitle}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2 bg-neutral-950/60 p-2 rounded-lg border border-neutral-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>{lang === 'en' ? 'Fresh Warm Pita' : 'Pitë e Ngrohtë e Butë'}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-950/60 p-2 rounded-lg border border-neutral-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>{lang === 'en' ? 'Flame-kissed Meat' : 'Mish i Pjekur në Zgarë'}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-950/60 p-2 rounded-lg border border-neutral-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>{lang === 'en' ? 'Crisp Golden Fries' : 'Patate të Skuqura Kërce'}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-950/60 p-2 rounded-lg border border-neutral-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{lang === 'en' ? 'Handcrafted Tzatziki' : 'Xaxiq Tradicional'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price & Add to Cart Action */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs text-neutral-500">{lang === 'en' ? 'Portion Price' : 'Çmimi për Porcion'}</div>
                <div className="text-2xl font-black text-white font-mono tabular-nums">
                  {activeDish.price} <span className="text-sm font-medium text-orange-400">ALL</span>
                </div>
              </div>

              <button
                onClick={() => onSelectCustomize(activeDish)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-orange-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-semibold text-sm shadow-lg shadow-orange-950 transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus className="w-4 h-4" />
                <span>{t.showcase3d.orderThisItem}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
