import React, { useState } from 'react';
import { Language } from '../types';
import { REVIEWS_DATA, REVIEW_TAGS } from '../data/reviews';
import { TRANSLATIONS } from '../data/translations';
import { Star, ThumbsUp, MessageSquare, ExternalLink, ShieldCheck, Camera } from 'lucide-react';

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const filteredReviews = REVIEWS_DATA.filter(rev => {
    if (selectedTag === 'all') return true;
    return rev.foodType === selectedTag;
  });

  return (
    <section id="reviews" className="py-10 md:py-20 px-3.5 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-neutral-800">
      
      {/* Header & Rating Breakdown */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-6 sm:mb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-amber-400 mb-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{lang === 'en' ? 'Authentic Google Reviews' : 'Vlerësime të Verifikuara në Google'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white font-display">
            {t.reviews.title}
          </h2>
          <p className="text-neutral-400 mt-1 sm:mt-2 text-xs sm:text-base max-w-xl">
            {t.reviews.subtitle}
          </p>
        </div>

        {/* Google Maps Score Badge & Write Review Action */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 bg-neutral-900 border border-neutral-800 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
              4.0
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-amber-400">
                {[1, 2, 3, 4].map(i => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
                <Star className="w-3.5 h-3.5 text-amber-400/40" />
              </div>
              <div className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">
                {t.reviews.reviewsCount}
              </div>
            </div>
          </div>

          <div className="hidden sm:block h-8 w-px bg-neutral-800" />

          <a
            href="https://www.google.com/maps/place/Tedy's+Fast+Food+%26+Grill/@41.3293205,19.7827167,17z/data=!4m16!1m9!3m8!1s0x13503145802175d3:0x9e71c70bd932346a!2sTedy's+Fast+Food+%26+Grill!8m2!3d41.3293205!4d19.7827167!9m1!1b1!16s%2Fg%2F11g0l4nv70!3m5!1s0x13503145802175d3:0x9e71c70bd932346a!8m2!3d41.3293205!4d19.7827167!16s%2Fg%2F11g0l4nv70?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
            <span>{t.reviews.writeReview}</span>
          </a>
        </div>
      </div>

      {/* Review Filter Tags (Interactive tabs) */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2.5 mb-6 sm:mb-8 scrollbar-none">
        {REVIEW_TAGS.map(tag => (
          <button
            key={tag.id}
            onClick={() => setSelectedTag(tag.id)}
            className={`px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-medium whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              selectedTag === tag.id
                ? 'bg-neutral-100 text-neutral-900 font-semibold'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            <span>{lang === 'en' ? tag.labelEn : tag.labelSq}</span>
            <span className="text-[10px] text-neutral-500 font-mono">({tag.count})</span>
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredReviews.slice(0, visibleCount).map(review => (
          <div
            key={review.id}
            className="p-4 sm:p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 flex flex-col justify-between shadow-md"
          >
            <div>
              {/* Reviewer Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {review.author}
                  </h4>
                  {review.role && (
                    <div className="text-[11px] text-neutral-400">
                      {review.role}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              {/* Review Date */}
              <div className="text-[11px] text-neutral-500 mb-3">
                {lang === 'en' ? review.dateEn : review.dateSq}
              </div>

              {/* Review Text */}
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                "{lang === 'en' ? review.textEn : review.textSq}"
              </p>
            </div>

            {/* Owner Response or Footer Likes */}
            <div className="mt-4 pt-3 border-t border-neutral-800/60">
              {review.ownerReply ? (
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs mt-1">
                  <div className="font-semibold text-orange-400 text-[11px] flex items-center gap-1.5 mb-1">
                    <MessageSquare className="w-3 h-3" />
                    <span>{t.reviews.ownerResponse}</span>
                    <span className="text-neutral-500 font-normal">· {lang === 'en' ? review.ownerReply.dateEn : review.ownerReply.dateSq}</span>
                  </div>
                  <p className="text-neutral-300 text-[11px] italic">
                    "{lang === 'en' ? review.ownerReply.textEn : review.ownerReply.textSq}"
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between text-[11px] text-neutral-500">
                  <div className="flex items-center gap-1 text-neutral-400">
                    <ThumbsUp className="w-3 h-3 text-orange-500/70" />
                    <span>{review.likes || 1} {lang === 'en' ? 'people found helpful' : 'e vlerësuan'}</span>
                  </div>
                  <span className="text-emerald-400 font-medium">{lang === 'en' ? 'Verified Dine-In' : 'Klient i Verifikuar'}</span>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredReviews.length && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="px-6 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 text-xs font-semibold transition-all cursor-pointer hover:bg-neutral-850"
          >
            {lang === 'en' ? 'Load More Reviews' : 'Shfaq Më Shumë Vlerësime'}
          </button>
        </div>
      )}

    </section>
  );
};
