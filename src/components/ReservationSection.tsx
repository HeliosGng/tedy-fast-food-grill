import React, { useState } from 'react';
import { Language, ReservationData } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Calendar, Clock, Users, Send, Phone, CheckCircle2, Trees, UtensilsCrossed, Sparkles } from 'lucide-react';

interface ReservationSectionProps {
  lang: Language;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const todayStr = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState<ReservationData>({
    fullName: '',
    phone: '',
    date: todayStr,
    time: '19:30',
    guests: 2,
    seatingArea: 'garden',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      alert(lang === 'en' ? 'Please provide your Name and Phone number.' : 'Ju lutemi plotësoni Emrin dhe Telefonin tuaj.');
      return;
    }

    const areaName = formData.seatingArea === 'garden'
      ? (lang === 'en' ? 'Quiet Backyard Garden Terrace' : 'Kopshti i Qetë Mbrapa')
      : (lang === 'en' ? 'Indoor Dining Hall' : 'Salla e Brendshme');

    const message = lang === 'sq'
      ? `👋 Përshëndetje Tedy's Fast Food & Grill!
Dëshiroj të bëj një rezervim tavoline:

📅 DATA: ${formData.date}
⏰ ORA: ${formData.time}
👥 NUMRI I PERSONAVE: ${formData.guests} persona
🌿 ZONA E TAVOLINËS: ${areaName}

👤 EMRI: ${formData.fullName.trim()}
📞 TELEFONI: ${formData.phone.trim()}
${formData.notes.trim() ? `📝 SHËNIME: ${formData.notes.trim()}\n` : ''}
Ju lutem më konfirmoni nëse tavolina është e disponueshme. Faleminderit!`
      : `👋 Hello Tedy's Fast Food & Grill!
I would like to reserve a table:

📅 DATE: ${formData.date}
⏰ TIME: ${formData.time}
👥 GUESTS: ${formData.guests} people
🌿 SEATING AREA: ${areaName}

👤 NAME: ${formData.fullName.trim()}
📞 PHONE: ${formData.phone.trim()}
${formData.notes.trim() ? `📝 NOTES: ${formData.notes.trim()}\n` : ''}
Please confirm table availability. Thank you!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/355686073000?text=${encoded}`;

    setSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 300);
  };

  return (
    <section id="reserve" className="py-10 md:py-20 px-3.5 sm:px-6 md:px-8 border-t border-neutral-800 bg-neutral-950 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-orange-400 mb-1.5">
            <UtensilsCrossed className="w-3.5 h-3.5 text-orange-500" />
            <span>{lang === 'en' ? 'Table Reservation' : 'Rezervim Tavoline'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white font-display">
            {t.reservation.title}
          </h2>
          <p className="text-neutral-400 mt-1 sm:mt-2 text-xs sm:text-base">
            {t.reservation.subtitle}
          </p>
        </div>

        {/* Reservation Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            
            {/* Top Row: Full Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  {t.reservation.name} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder={lang === 'en' ? 'e.g. Arben Hoxha' : 'p.sh. Arben Hoxha'}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                  {t.reservation.phone} *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+355 69 ..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            {/* Middle Row: Date, Time, Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-orange-500" />
                  <span>{t.reservation.date}</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-orange-500" />
                  <span>{t.reservation.time}</span>
                </label>
                <select
                  value={formData.time}
                  onChange={e => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="11:30">11:30 (Lunch)</option>
                  <option value="12:00">12:00 (Lunch)</option>
                  <option value="12:30">12:30 (Lunch)</option>
                  <option value="13:00">13:00 (Lunch)</option>
                  <option value="13:30">13:30 (Lunch)</option>
                  <option value="14:00">14:00 (Lunch)</option>
                  <option value="18:30">18:30 (Dinner Grill)</option>
                  <option value="19:00">19:00 (Dinner Grill)</option>
                  <option value="19:30">19:30 (Dinner Grill)</option>
                  <option value="20:00">20:00 (Dinner Grill)</option>
                  <option value="20:30">20:30 (Dinner Grill)</option>
                  <option value="21:00">21:00 (Dinner Grill)</option>
                  <option value="21:30">21:30 (Dinner Grill)</option>
                  <option value="22:00">22:00 (Late Night)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-orange-500" />
                  <span>{t.reservation.guests}</span>
                </label>
                <select
                  value={formData.guests}
                  onChange={e => setFormData({ ...formData, guests: Number(e.target.value) })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 font-mono"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map(n => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? (lang === 'en' ? 'Person' : 'Person') : (lang === 'en' ? 'Guests' : 'Persona')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Seating Area Selection: Indoor vs Garden */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                {t.reservation.areaLabel}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    formData.seatingArea === 'garden'
                      ? 'bg-orange-500/10 border-orange-500 text-white shadow-md'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="seatingArea"
                    value="garden"
                    checked={formData.seatingArea === 'garden'}
                    onChange={() => setFormData({ ...formData, seatingArea: 'garden' })}
                    className="accent-orange-500 w-4 h-4 mt-0.5"
                  />
                  <div>
                    <div className="font-bold flex items-center gap-1.5 text-sm">
                      <Trees className="w-4 h-4 text-emerald-400" />
                      <span>{t.reservation.garden}</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      {lang === 'en'
                        ? 'Secluded back garden terrace surrounded by peaceful shade.'
                        : 'Kopsht i qetë në pjesën e pasme, ambient i freskët dhe larg zhurmës.'}
                    </p>
                  </div>
                </label>

                <label
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    formData.seatingArea === 'indoor'
                      ? 'bg-orange-500/10 border-orange-500 text-white shadow-md'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="seatingArea"
                    value="indoor"
                    checked={formData.seatingArea === 'indoor'}
                    onChange={() => setFormData({ ...formData, seatingArea: 'indoor' })}
                    className="accent-orange-500 w-4 h-4 mt-0.5"
                  />
                  <div>
                    <div className="font-bold flex items-center gap-1.5 text-sm">
                      <UtensilsCrossed className="w-4 h-4 text-orange-400" />
                      <span>{t.reservation.indoor}</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      {lang === 'en'
                        ? 'Air-conditioned main hall right next to the sizzling open grill.'
                        : 'Sallë me ajër të kondicionuar pranë aromës së shijshme të zgarës.'}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                {t.reservation.notes}
              </label>
              <textarea
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                placeholder={lang === 'en' ? 'e.g., Birthday gathering, high chair for child, dietary intolerances...' : 'p.sh. Festë e vogël, karrige për fëmijë, alergji...'}
                rows={2}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            {/* Actions: WhatsApp confirmation & Call Option */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                className="w-full sm:flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all cursor-pointer hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>{t.reservation.submitWhatsApp}</span>
              </button>

              <a
                href="tel:+355686073000"
                className="w-full sm:w-auto py-4 px-6 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-200 font-semibold text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-orange-500" />
                <span>{t.reservation.orCall}</span>
              </a>
            </div>

            <p className="text-xs text-neutral-500 text-center">
              {t.reservation.noteNotice}
            </p>

          </form>

        </div>

      </div>
    </section>
  );
};
