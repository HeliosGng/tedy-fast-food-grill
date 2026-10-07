import React, { useState, useMemo } from 'react';
import { MenuItem, MenuCategoryId, Language } from '../types';
import { CATEGORIES } from '../data/menu';
import { TRANSLATIONS } from '../data/translations';
import { Card3DTilt } from './Card3DTilt';
import { Search, Flame, Plus, Sparkles, Clock, Check } from 'lucide-react';

interface MenuSectionProps {
  items: MenuItem[];
  lang: Language;
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  lang,
  onSelectItem,
  onQuickAdd
}) => {
  const t = TRANSLATIONS[lang];
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();
      const name = (lang === 'en' ? item.nameEn : item.nameSq).toLowerCase();
      const desc = (lang === 'en' ? item.descriptionEn : item.descriptionSq).toLowerCase();
      return name.includes(query) || desc.includes(query) || item.category.toLowerCase().includes(query);
    });
  }, [items, selectedCategory, searchQuery, lang]);

  const handleQuickAddClick = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    // If item has required options, open customize modal instead
    if (item.optionGroups && item.optionGroups.some(g => g.required)) {
      onSelectItem(item);
    } else {
      onQuickAdd(item);
      setJustAddedId(item.id);
      setTimeout(() => setJustAddedId(null), 1200);
    }
  };

  return (
    <section id="menu" className="py-10 md:py-20 px-3.5 sm:px-6 md:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-orange-500 mb-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>{lang === 'en' ? 'Fresh Every Day' : 'E Freskët Çdo Ditë'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white font-display">
            {t.menu.title}
          </h2>
          <p className="text-neutral-400 mt-1 sm:mt-2 text-xs sm:text-base max-w-xl">
            {t.menu.subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.menu.searchPlaceholder}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-4 py-2 sm:py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs (Interactive segmented tabs) */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 scrollbar-none">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as MenuCategoryId)}
            className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg shadow-orange-950/60'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
            }`}
          >
            <span>{lang === 'en' ? cat.nameEn : cat.nameSq}</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
              selectedCategory === cat.id ? 'bg-black/20 text-white' : 'bg-neutral-800 text-neutral-400'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Product Cards Grid: Strictly 3 Products Per Row */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 sm:py-20 bg-neutral-900/40 rounded-2xl sm:rounded-3xl border border-neutral-800">
          <p className="text-neutral-400 text-xs sm:text-sm">
            {lang === 'en' ? 'No dishes found matching your search.' : 'Nuk u gjet asnjë gatim për këtë kërkim.'}
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-3 sm:mt-4 px-4 py-2 rounded-xl bg-neutral-800 text-xs text-neutral-200 hover:text-white"
          >
            {lang === 'en' ? 'Reset Filters' : 'Pastro Filtrat'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
          {filteredItems.map(dish => (
            <Card3DTilt
              key={dish.id}
              maxTilt={5}
              className="h-full"
            >
              <div 
                onClick={() => onSelectItem(dish)}
                className="group relative h-full flex flex-col justify-between rounded-xl sm:rounded-2xl bg-neutral-900 border border-neutral-800/90 hover:border-neutral-700 transition-all duration-300 overflow-hidden cursor-pointer shadow-md hover:shadow-orange-950/20"
              >
                {/* Image Presentation */}
                <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-neutral-950">
                  <img
                    src={dish.image}
                    alt={lang === 'en' ? dish.nameEn : dish.nameSq}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/10 to-transparent" />

                  {/* Highlights badge */}
                  {dish.isHouseSpecial && (
                    <div className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 bg-red-600/95 backdrop-blur-md text-white text-[9px] sm:text-[11px] font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg shadow flex items-center gap-1">
                      <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300" />
                      <span className="hidden xs:inline">{t.menu.special}</span>
                    </div>
                  )}

                  {dish.isPopular && !dish.isHouseSpecial && (
                    <div className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 bg-orange-600/95 backdrop-blur-md text-white text-[9px] sm:text-[11px] font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg shadow flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-200" />
                      <span className="hidden xs:inline">{t.menu.popular}</span>
                    </div>
                  )}

                  {/* Prep time */}
                  <div className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 bg-black/75 backdrop-blur-md text-white text-[9px] sm:text-[11px] font-mono px-1.5 py-0.5 rounded-md sm:rounded-lg border border-white/10 hidden sm:flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-neutral-400" />
                    <span>~{dish.prepTimeMinutes || 10}m</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-2 sm:p-3.5 md:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata */}
                    <div className="hidden sm:flex items-center gap-1.5 text-[10px] sm:text-xs text-neutral-500 mb-1 uppercase font-medium tracking-wider">
                      <span>{dish.category}</span>
                      {dish.rating && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-400 flex items-center gap-0.5">
                            ★ {dish.rating}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="text-xs sm:text-base md:text-lg font-bold text-white group-hover:text-orange-400 transition-colors font-display mb-0.5 sm:mb-1 line-clamp-1 sm:line-clamp-2">
                      {lang === 'en' ? dish.nameEn : dish.nameSq}
                    </h3>

                    <p className="hidden md:block text-xs text-neutral-400 leading-relaxed line-clamp-2">
                      {lang === 'en' ? dish.descriptionEn : dish.descriptionSq}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-2 sm:pt-3 md:pt-4 mt-2 sm:mt-3 md:mt-4 border-t border-neutral-800/80 flex items-center justify-between gap-1">
                    <div>
                      <span className="hidden sm:block text-[10px] sm:text-xs text-neutral-500 leading-tight">
                        {lang === 'en' ? 'Price' : 'Çmimi'}
                      </span>
                      <span className="text-xs sm:text-base md:text-lg font-black text-white font-mono tabular-nums whitespace-nowrap">
                        {dish.price} <span className="text-[10px] sm:text-xs text-orange-400 font-medium">ALL</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleQuickAddClick(e, dish)}
                        className={`p-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                          justAddedId === dish.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white'
                        }`}
                        title={t.menu.quickAdd}
                      >
                        {justAddedId === dish.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span className="hidden lg:inline">{lang === 'en' ? 'Added!' : 'U Shtua!'}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 text-orange-400" />
                            <span className="hidden lg:inline">
                              {dish.optionGroups && dish.optionGroups.length > 0 ? t.menu.customize : t.menu.quickAdd}
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </Card3DTilt>
          ))}
        </div>
      )}

    </section>
  );
};
