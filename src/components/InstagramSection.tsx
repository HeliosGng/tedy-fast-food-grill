import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { restaurantImg } from '../data/menu';
import souvlakiImg from '../assets/images/tedys_souvlaki_gyros_1791391614895.jpg';
import pizzaImg from '../assets/images/tedys_woodfired_pizza_1791391631079.jpg';
import skepastiImg from '../assets/images/tedys_skepasti_burger_1791391642483.jpg';
import crepesImg from '../assets/images/tedys_sweet_crepes_1791391653045.jpg';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';

interface InstagramSectionProps {
  lang: Language;
}

export const InstagramSection: React.FC<InstagramSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const posts = [
    {
      id: 'ig-1',
      image: souvlakiImg,
      captionEn: 'Warm pita, tender rotisserie chicken & golden fries inside! 🔥 #sufllaqe #tiranafood',
      captionSq: 'Pitë e butë, mish pule në hell dhe patate të skuqura brenda! 🔥 #sufllaqe #tirana',
      likes: 248,
      comments: 18
    },
    {
      id: 'ig-2',
      image: pizzaImg,
      captionEn: 'Bubbly melted mozzarella and blistered crust straight from our oven 🍕 #woodfiredpizza',
      captionSq: 'Mocarelë e shkrirë dhe kore kërcitëse sapo dalë nga furra 🍕 #pica #tirana',
      likes: 312,
      comments: 24
    },
    {
      id: 'ig-3',
      image: skepastiImg,
      captionEn: 'Skepasti loaded with gyro meat, melted gouda and house dressing. Hungry yet? 🤤',
      captionSq: 'Skepasti speciale me dyfeqe mishi e djathë kaçkavall të shkrirë! Ju erdhi uria? 🤤',
      likes: 295,
      comments: 15
    },
    {
      id: 'ig-4',
      image: restaurantImg,
      captionEn: 'Did you know about our quiet garden terrace at the back exit? Peace & good food 🌿',
      captionSq: 'A e dinit që kemi një kopsht shumë të qetë mbrapa restorantit? Qetësi & ushqim i mirë 🌿',
      likes: 184,
      comments: 12
    },
    {
      id: 'ig-5',
      image: crepesImg,
      captionEn: 'Sweet finish: warm Nutella, banana & biscuit crepe! 🍓🍫 #crepes #dessert',
      captionSq: 'Mbyllje e ëmbël: krepë e ngrohtë me Nutella, banane & biskotë! 🍓🍫 #krepa',
      likes: 420,
      comments: 31
    }
  ];

  return (
    <section className="py-10 md:py-20 px-3.5 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-neutral-800">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-pink-500 mb-1.5">
            <Instagram className="w-3.5 h-3.5 text-pink-500" />
            <span>@tedysgrill on Instagram</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white font-display">
            {t.instagram.title}
          </h2>
          <p className="text-neutral-400 mt-1 sm:mt-2 text-xs sm:text-base">
            {t.instagram.subtitle}
          </p>
        </div>

        <a
          href="https://www.instagram.com/tedysgrill/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-orange-500 hover:from-pink-500 hover:to-orange-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-rose-950 transition-all shrink-0 hover:scale-[1.02]"
        >
          <Instagram className="w-3.5 h-3.5" />
          <span>{t.instagram.followBtn}</span>
        </a>
      </div>

      {/* Grid of 5 Posts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
        {posts.map(post => (
          <a
            key={post.id}
            href="https://www.instagram.com/tedysgrill/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 block shadow-md"
          >
            <img
              src={post.image}
              alt="Tedy's grill instagram food"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Hover scrim overlay */}
            <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4 text-white">
              <div className="flex justify-end">
                <ExternalLink className="w-4 h-4 text-pink-400" />
              </div>

              <div>
                <p className="text-[11px] text-neutral-200 line-clamp-3 mb-3 leading-snug">
                  {lang === 'en' ? post.captionEn : post.captionSq}
                </p>
                <div className="flex items-center gap-4 text-xs font-mono font-medium text-neutral-300">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

    </section>
  );
};
