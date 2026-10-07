import React, { useState } from 'react';
import { MenuItem, SelectedOption, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { X, Plus, Minus, Check, Flame, Clock } from 'lucide-react';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  lang: Language;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    selectedOptions: SelectedOption[],
    specialInstructions: string
  ) => void;
}

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({
  item,
  lang,
  onClose,
  onAddToCart
}) => {
  if (!item) return null;

  const t = TRANSLATIONS[lang];
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Track selected options
  const [radioSelections, setRadioSelections] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (item.optionGroups) {
      item.optionGroups.forEach(grp => {
        if (grp.type === 'radio' && grp.choices.length > 0) {
          initial[grp.id] = grp.choices[0].id;
        }
      });
    }
    return initial;
  });

  const [checkboxSelections, setCheckboxSelections] = useState<Record<string, string[]>>({});

  const toggleCheckbox = (groupId: string, choiceId: string) => {
    setCheckboxSelections(prev => {
      const current = prev[groupId] || [];
      if (current.includes(choiceId)) {
        return { ...prev, [groupId]: current.filter(id => id !== choiceId) };
      } else {
        return { ...prev, [groupId]: [...current, choiceId] };
      }
    });
  };

  // Calculate total price with option modifiers
  let extraCostPerUnit = 0;
  const compiledSelectedOptions: SelectedOption[] = [];

  if (item.optionGroups) {
    item.optionGroups.forEach(grp => {
      if (grp.type === 'radio') {
        const selectedId = radioSelections[grp.id];
        const choice = grp.choices.find(c => c.id === selectedId);
        if (choice) {
          const mod = choice.priceModifier || 0;
          extraCostPerUnit += mod;
          compiledSelectedOptions.push({
            groupId: grp.id,
            groupTitleEn: grp.titleEn,
            groupTitleSq: grp.titleSq,
            choiceId: choice.id,
            choiceNameEn: choice.nameEn,
            choiceNameSq: choice.nameSq,
            priceModifier: mod
          });
        }
      } else {
        const selectedIds = checkboxSelections[grp.id] || [];
        selectedIds.forEach(id => {
          const choice = grp.choices.find(c => c.id === id);
          if (choice) {
            const mod = choice.priceModifier || 0;
            extraCostPerUnit += mod;
            compiledSelectedOptions.push({
              groupId: grp.id,
              groupTitleEn: grp.titleEn,
              groupTitleSq: grp.titleSq,
              choiceId: choice.id,
              choiceNameEn: choice.nameEn,
              choiceNameSq: choice.nameSq,
              priceModifier: mod
            });
          }
        });
      }
    });
  }

  const unitTotal = item.price + extraCostPerUnit;
  const grandTotal = unitTotal * quantity;

  const handleConfirm = () => {
    onAddToCart(item, quantity, compiledSelectedOptions, specialInstructions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-neutral-900 border border-neutral-800 rounded-2xl sm:rounded-3xl w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative h-36 sm:h-52 shrink-0 overflow-hidden bg-neutral-950">
          <img
            src={item.image}
            alt={lang === 'en' ? item.nameEn : item.nameSq}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 sm:p-2 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="absolute bottom-2.5 left-4 right-4 sm:bottom-3 sm:left-6 sm:right-6">
            <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-orange-400">
              {item.category.toUpperCase()}
            </span>
            <h3 className="text-lg sm:text-2xl font-bold text-white font-display truncate">
              {lang === 'en' ? item.nameEn : item.nameSq}
            </h3>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 text-xs sm:text-sm">
          <p className="text-neutral-300 leading-relaxed">
            {lang === 'en' ? item.descriptionEn : item.descriptionSq}
          </p>

          {/* Option Groups */}
          {item.optionGroups && item.optionGroups.length > 0 && (
            <div className="space-y-6 divide-y divide-neutral-800/80">
              {item.optionGroups.map(grp => (
                <div key={grp.id} className="pt-4 first:pt-0">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">
                      {lang === 'en' ? grp.titleEn : grp.titleSq}
                    </h4>
                    {grp.required ? (
                      <span className="text-[11px] text-orange-400 font-medium">
                        {lang === 'en' ? 'Required' : 'E Detyrueshme'}
                      </span>
                    ) : (
                      <span className="text-[11px] text-neutral-500">
                        {lang === 'en' ? 'Optional' : 'Opsionale'}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    {grp.type === 'radio' ? (
                      grp.choices.map(choice => {
                        const isChecked = radioSelections[grp.id] === choice.id;
                        return (
                          <label
                            key={choice.id}
                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                              isChecked
                                ? 'bg-orange-500/10 border-orange-500 text-white'
                                : 'bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name={grp.id}
                                value={choice.id}
                                checked={isChecked}
                                onChange={() => setRadioSelections(prev => ({ ...prev, [grp.id]: choice.id }))}
                                className="accent-orange-500 w-4 h-4"
                              />
                              <span className="font-medium">
                                {lang === 'en' ? choice.nameEn : choice.nameSq}
                              </span>
                            </div>
                            {choice.priceModifier && choice.priceModifier > 0 ? (
                              <span className="text-xs font-mono font-bold text-orange-400">
                                +{choice.priceModifier} ALL
                              </span>
                            ) : null}
                          </label>
                        );
                      })
                    ) : (
                      grp.choices.map(choice => {
                        const isChecked = (checkboxSelections[grp.id] || []).includes(choice.id);
                        return (
                          <label
                            key={choice.id}
                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                              isChecked
                                ? 'bg-orange-500/10 border-orange-500 text-white'
                                : 'bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleCheckbox(grp.id, choice.id)}
                                className="accent-orange-500 w-4 h-4 rounded"
                              />
                              <span className="font-medium">
                                {lang === 'en' ? choice.nameEn : choice.nameSq}
                              </span>
                            </div>
                            {choice.priceModifier && choice.priceModifier > 0 ? (
                              <span className="text-xs font-mono font-bold text-orange-400">
                                +{choice.priceModifier} ALL
                              </span>
                            ) : null}
                          </label>
                        );
                      })
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Special Instructions Note */}
          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              {lang === 'en' ? 'Special Instructions / Notes' : 'Udhëzime të Veçanta / Shënime'}
            </label>
            <textarea
              value={specialInstructions}
              onChange={e => setSpecialInstructions(e.target.value)}
              placeholder={lang === 'en' ? 'e.g. Extra toasted pita, sauce on the side, allergies...' : 'p.sh. Pitë pak më e thekur, salcë veç, alergji...'}
              rows={2}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Footer with quantity and submit */}
        <div className="p-4 md:p-6 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl p-1">
            <button
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              disabled={quantity <= 1}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-neutral-300 hover:bg-neutral-800 disabled:opacity-30 cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold font-mono text-white text-base">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(prev => prev + 1)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-neutral-300 hover:bg-neutral-800 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-red-600 via-orange-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold text-sm shadow-lg shadow-orange-950 transition-all flex items-center justify-between cursor-pointer"
          >
            <span>{t.menu.quickAdd}</span>
            <span className="font-mono text-base tabular-nums">
              {grandTotal} ALL
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
