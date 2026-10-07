import React, { useState } from 'react';
import { CartItem, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Phone, 
  Send, 
  MapPin, 
  User, 
  FileText, 
  CheckCircle2, 
  Navigation, 
  Crosshair, 
  Loader2, 
  ExternalLink, 
  RotateCw, 
  AlertCircle 
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  lang: Language;
  onClose: () => void;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

interface GPSCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  cart,
  lang,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [floorApt, setFloorApt] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [showOrderSubmitted, setShowOrderSubmitted] = useState(false);

  // GPS state
  const [gpsData, setGpsData] = useState<GPSCoordinates | null>(null);
  const [isFetchingGps, setIsFetchingGps] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Function to explicitly acquire client GPS coordinates
  const handleCaptureGps = () => {
    if (!navigator.geolocation) {
      setGpsError(lang === 'en' ? 'Geolocation not supported by browser.' : 'GPS nuk mbështetet nga ky shfletues.');
      return;
    }

    setIsFetchingGps(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords: GPSCoordinates = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp,
        };
        setGpsData(coords);
        setIsFetchingGps(false);

        // Auto-fill address via reverse geocode if address field is still empty
        if (!address.trim()) {
          try {
            const resp = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`,
              {
                headers: {
                  'Accept-Language': lang === 'sq' ? 'sq,en' : 'en',
                },
              }
            );
            if (resp.ok) {
              const data = await resp.json();
              if (data?.address) {
                const road = data.address.road || data.address.pedestrian || data.address.neighbourhood || '';
                const houseNumber = data.address.house_number ? ` Nr. ${data.address.house_number}` : '';
                const city = data.address.city || data.address.town || data.address.municipality || 'Tiranë';
                const formatted = road ? `${road}${houseNumber}, ${city}` : data.display_name?.split(',').slice(0, 2).join(', ');
                if (formatted) {
                  setAddress(formatted);
                }
              }
            }
          } catch {
            // Non-critical fallback
          }
        }
      },
      (err) => {
        setIsFetchingGps(false);
        if (err.code === 1) {
          setGpsError(t.cart.gpsDenied);
        } else {
          setGpsError(lang === 'en' ? 'Could not determine location. Please write address.' : 'Nuk u arrit marrja e GPS. Shkruani adresën.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10000,
      }
    );
  };

  const handleSendWhatsAppOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!fullName.trim() || !phone.trim() || (!address.trim() && !gpsData)) {
      alert(
        lang === 'en'
          ? 'Please provide your Name, Phone, and Delivery Address or GPS location.'
          : 'Ju lutemi plotësoni Emrin, Telefonin dhe Adresën ose vendndodhjen GPS.'
      );
      return;
    }

    // If client hasn't captured GPS yet, attempt a quick non-blocking fetch so courier gets the exact pin
    let activeGps = gpsData;
    if (!activeGps && navigator.geolocation) {
      setIsFetchingGps(true);
      try {
        activeGps = await new Promise<GPSCoordinates | null>((resolve) => {
          const timer = setTimeout(() => resolve(null), 2500);
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              clearTimeout(timer);
              resolve({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                accuracy: pos.coords.accuracy,
                timestamp: pos.timestamp,
              });
            },
            () => {
              clearTimeout(timer);
              resolve(null);
            },
            { enableHighAccuracy: true, timeout: 2500, maximumAge: 60000 }
          );
        });
        if (activeGps) {
          setGpsData(activeGps);
        }
      } catch {
        // Continue smoothly
      } finally {
        setIsFetchingGps(false);
      }
    }

    // Build the WhatsApp formatted message
    const orderItemsText = cart.map(item => {
      const itemName = lang === 'en' ? item.menuItem.nameEn : item.menuItem.nameSq;
      const opts = item.selectedOptions.map(o => lang === 'en' ? o.choiceNameEn : o.choiceNameSq).join(', ');
      const instructions = item.specialInstructions ? ` [Shënim: ${item.specialInstructions}]` : '';
      return `• ${item.quantity}x ${itemName}${opts ? ` (${opts})` : ''}${instructions} — ${item.totalPrice} ALL`;
    }).join('\n');

    const addressFull = address.trim() 
      ? (floorApt ? `${address.trim()} (Kati/Hyrja: ${floorApt.trim()})` : address.trim())
      : (lang === 'sq' ? 'Sipas koordinatave GPS të bashkëngjitura' : 'As per attached GPS coordinates');

    const gpsBlock = activeGps
      ? lang === 'sq'
        ? `\n📍 VENDNDODHJA E SAKTË GPS (PIN NË HARTË):\n🗺️ https://www.google.com/maps?q=${activeGps.latitude.toFixed(6)},${activeGps.longitude.toFixed(6)}\n📐 Saktësia: ±${Math.round(activeGps.accuracy)} metra`
        : `\n📍 EXACT GPS PIN LOCATION:\n🗺️ https://www.google.com/maps?q=${activeGps.latitude.toFixed(6)},${activeGps.longitude.toFixed(6)}\n📐 Accuracy: ±${Math.round(activeGps.accuracy)} meters`
      : '';

    const message = lang === 'sq'
      ? `👋 Përshëndetje Tedy's Fast Food & Grill!
Dëshiroj të bëj këtë porosi për dërgesë:

🍽️ ARTIKUJT:
${orderItemsText}

💰 TOTALI PËR PAGESË: ${subtotal} ALL
(Pagesë në dorëzim / Cash on Delivery)

📍 TË DHËNAT E KLIENTIT:
👤 Emri: ${fullName.trim()}
📞 Telefoni: ${phone.trim()}
🏠 Adresa: ${addressFull}${gpsBlock}
${orderNotes.trim() ? `📝 Shënime: ${orderNotes.trim()}\n` : ''}
Faleminderit!`
      : `👋 Hello Tedy's Fast Food & Grill!
I would like to place this delivery order:

🍽️ ITEMS:
${orderItemsText}

💰 TOTAL TO PAY: ${subtotal} ALL
(Cash on Delivery)

📍 DELIVERY DETAILS:
👤 Name: ${fullName.trim()}
📞 Phone: ${phone.trim()}
🏠 Address: ${addressFull}${gpsBlock}
${orderNotes.trim() ? `📝 Notes: ${orderNotes.trim()}\n` : ''}
Thank you!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/355686073000?text=${encoded}`;

    setShowOrderSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-600/20 text-orange-500 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white font-display text-lg">
                  {t.cart.title}
                </h3>
                <span className="text-xs text-neutral-400">
                  {totalItemsCount} {t.cart.itemsCount}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-neutral-500 hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                  title="Clear all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Content */}
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-neutral-800/80 text-neutral-600 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-1">
                {t.cart.emptyTitle}
              </h4>
              <p className="text-neutral-400 text-xs max-w-xs mb-6">
                {t.cart.emptySubtitle}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-medium text-xs shadow-md transition-all cursor-pointer"
              >
                {t.cart.startBrowsing}
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto divide-y divide-neutral-800/60 p-5 space-y-4">
              
              {/* Itemized List */}
              <div className="space-y-3">
                {cart.map(item => (
                  <div
                    key={item.cartItemId}
                    className="p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800/90 flex gap-3 relative group"
                  >
                    <img
                      src={item.menuItem.image}
                      alt={lang === 'en' ? item.menuItem.nameEn : item.menuItem.nameSq}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-semibold text-white text-xs truncate">
                          {lang === 'en' ? item.menuItem.nameEn : item.menuItem.nameSq}
                        </h5>
                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-neutral-500 hover:text-red-400 transition-colors p-0.5"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Chosen Options */}
                      {item.selectedOptions.length > 0 && (
                        <div className="text-[11px] text-orange-400/90 truncate mt-0.5">
                          {item.selectedOptions.map(o => lang === 'en' ? o.choiceNameEn : o.choiceNameSq).join(' · ')}
                        </div>
                      )}

                      {/* Special instructions */}
                      {item.specialInstructions && (
                        <div className="text-[11px] text-neutral-400 italic truncate mt-0.5">
                          "{item.specialInstructions}"
                        </div>
                      )}

                      {/* Price & Quantity Controls */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-neutral-850">
                        <span className="font-mono text-xs font-bold text-white tabular-nums">
                          {item.totalPrice} ALL
                        </span>

                        <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-5 h-5 flex items-center justify-center text-neutral-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold font-mono text-white w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-5 h-5 flex items-center justify-center text-neutral-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Delivery Information Form */}
              <form onSubmit={handleSendWhatsAppOrder} className="pt-4 space-y-3">
                <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  <span>{t.cart.orderFormTitle}</span>
                </div>

                <div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder={t.cart.fullName}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder={t.cart.phone + ' (p.sh. +355 69 ...)'}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* GPS Location Capture Card */}
                <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300">
                      <Navigation className={`w-3.5 h-3.5 ${gpsData ? 'text-emerald-400' : 'text-orange-500'}`} />
                      <span>{gpsData ? t.cart.gpsSuccess : t.cart.gpsButton}</span>
                    </div>
                    {gpsData && (
                      <button
                        type="button"
                        onClick={() => setGpsData(null)}
                        className="text-[10px] text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        {t.cart.gpsRemove}
                      </button>
                    )}
                  </div>

                  {!gpsData ? (
                    <div>
                      <button
                        type="button"
                        onClick={handleCaptureGps}
                        disabled={isFetchingGps}
                        className="w-full py-2 px-3 rounded-lg bg-orange-600/15 hover:bg-orange-600/25 border border-orange-500/30 text-orange-400 hover:text-orange-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
                      >
                        {isFetchingGps ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-400" />
                            <span>{t.cart.gpsFetching}</span>
                          </>
                        ) : (
                          <>
                            <Crosshair className="w-3.5 h-3.5 text-orange-400" />
                            <span>{t.cart.gpsButton}</span>
                          </>
                        )}
                      </button>
                      <p className="text-[10px] text-neutral-400 mt-1.5 leading-tight">
                        {t.cart.gpsTip}
                      </p>
                      {gpsError && (
                        <p className="text-[11px] text-red-400 mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{gpsError}</span>
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-lg p-2.5 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-emerald-300 font-medium">
                          📍 {gpsData.latitude.toFixed(5)}, {gpsData.longitude.toFixed(5)}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-medium">
                          {t.cart.gpsAccuracy}: ±{Math.round(gpsData.accuracy)}m
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-1.5 border-t border-emerald-500/20">
                        <a
                          href={`https://www.google.com/maps?q=${gpsData.latitude},${gpsData.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1"
                        >
                          <span>{t.cart.gpsViewPin}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          type="button"
                          onClick={handleCaptureGps}
                          disabled={isFetchingGps}
                          className="text-[10px] text-neutral-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <RotateCw className="w-2.5 h-2.5" />
                          <span>Rifresko / Refresh</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    required={!gpsData}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder={gpsData ? `${t.cart.address} (Opsionale me GPS)` : t.cart.address}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-3.5 pr-10 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={handleCaptureGps}
                    title={t.cart.gpsButton}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer"
                  >
                    {isFetchingGps ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Crosshair className={`w-3.5 h-3.5 ${gpsData ? 'text-emerald-400' : ''}`} />
                    )}
                  </button>
                </div>

                <div>
                  <input
                    type="text"
                    value={floorApt}
                    onChange={e => setFloorApt(e.target.value)}
                    placeholder={t.cart.floorApt}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <textarea
                    value={orderNotes}
                    onChange={e => setOrderNotes(e.target.value)}
                    placeholder={t.cart.notes}
                    rows={2}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* Subtotal Calculation Box */}
                <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 space-y-1.5 text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>{t.cart.subtotal}</span>
                    <span className="font-mono text-white">{subtotal} ALL</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>{t.cart.deliveryFee}</span>
                    <span className="text-emerald-400 font-medium">Falas / Free</span>
                  </div>
                  <div className="pt-2 border-t border-neutral-800 flex justify-between font-bold text-white text-sm">
                    <span>{t.cart.total}</span>
                    <span className="font-mono text-orange-400 text-base">{subtotal} ALL</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 pt-1">
                    {t.cart.freeDeliveryNote}
                  </div>
                </div>

                {/* Primary WhatsApp Order Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all cursor-pointer hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.cart.sendWhatsApp}</span>
                </button>

                <p className="text-[10px] text-neutral-400 text-center leading-tight">
                  {t.cart.whatsappTip}
                </p>

                {/* Direct Call Button Alternative */}
                <a
                  href="tel:+355686073000"
                  className="w-full py-2.5 px-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-orange-500" />
                  <span>{t.cart.callInstead}</span>
                </a>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
