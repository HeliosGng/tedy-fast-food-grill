/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, MenuItem, CartItem, SelectedOption } from './types';
import { MENU_ITEMS } from './data/menu';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Dish3DShowcase } from './components/Dish3DShowcase';
import { MenuSection } from './components/MenuSection';
import { ItemCustomizeModal } from './components/ItemCustomizeModal';
import { CartDrawer } from './components/CartDrawer';
import { ReservationSection } from './components/ReservationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationAndHours } from './components/LocationAndHours';
import { InstagramSection } from './components/InstagramSection';
import { Footer } from './components/Footer';
import { ShoppingBag, Phone, Send } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('sq');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Restore language or cart if saved
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('tedys_lang') as Language;
      if (savedLang === 'en' || savedLang === 'sq') {
        setLang(savedLang);
      }
      const savedCart = localStorage.getItem('tedys_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem('tedys_cart', JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  const toggleLanguage = () => {
    setLang(prev => {
      const next = prev === 'en' ? 'sq' : 'en';
      try {
        localStorage.setItem('tedys_lang', next);
      } catch {
        // Ignore
      }
      return next;
    });
  };

  // Add customized item to cart
  const handleAddToCart = (
    item: MenuItem,
    quantity: number,
    selectedOptions: SelectedOption[],
    specialInstructions: string
  ) => {
    const extraPerUnit = selectedOptions.reduce((sum, opt) => sum + (opt.priceModifier || 0), 0);
    const unitPrice = item.price + extraPerUnit;
    const totalPrice = unitPrice * quantity;

    const cartItemId = `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;

    const newItem: CartItem = {
      cartItemId,
      menuItem: item,
      quantity,
      selectedOptions,
      specialInstructions,
      unitPrice,
      totalPrice
    };

    setCart(prev => [...prev, newItem]);
    setIsCartOpen(true);
  };

  // Quick add without customization
  const handleQuickAdd = (item: MenuItem) => {
    const cartItemId = `${item.id}-${Date.now()}`;
    const newItem: CartItem = {
      cartItemId,
      menuItem: item,
      quantity: 1,
      selectedOptions: [],
      specialInstructions: '',
      unitPrice: item.price,
      totalPrice: item.price
    };
    setCart(prev => [...prev, newItem]);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(it => {
        if (it.cartItemId === cartItemId) {
          return {
            ...it,
            quantity: newQty,
            totalPrice: it.unitPrice * newQty
          };
        }
        return it;
      })
    );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(it => it.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalCartAmount = cart.reduce((sum, i) => sum + i.totalPrice, 0);

  // Filter 5 signature items for 3D showcase
  const showcaseDishes = MENU_ITEMS.filter(item => 
    ['souvlaki-pule', 'skepasti-chicken', 'pizza-special', 'grilled-chicken', 'crepe-nutella-biscuit'].includes(item.id)
  );

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-orange-600 selection:text-white">
      
      {/* Navigation */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          lang={lang}
          onOpenCart={() => setIsCartOpen(true)}
          onScrollToMenu={scrollToMenu}
        />

        {/* 3D Menu Showcase */}
        <div id="showcase">
          <Dish3DShowcase
            items={showcaseDishes.length > 0 ? showcaseDishes : MENU_ITEMS.slice(0, 5)}
            lang={lang}
            onSelectCustomize={setCustomizingItem}
          />
        </div>

        {/* Full Categorized Menu */}
        <MenuSection
          items={MENU_ITEMS}
          lang={lang}
          onSelectItem={setCustomizingItem}
          onQuickAdd={handleQuickAdd}
        />

        {/* Real Reviews Section */}
        <ReviewsSection lang={lang} />

        {/* Table & Garden Reservation */}
        <ReservationSection lang={lang} />

        {/* Location, Google Maps & Operating Hours */}
        <LocationAndHours lang={lang} />

        {/* Instagram Grid Feed */}
        <InstagramSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Item Customization Modal */}
      <ItemCustomizeModal
        item={customizingItem}
        lang={lang}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart & WhatsApp Ordering Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        lang={lang}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Sticky Mobile Floating Order Bar (under 15% viewport height constraint) */}
      {cart.length > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-30 md:hidden animate-in slide-in-from-bottom-4 duration-200">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 via-orange-600 to-orange-500 text-white font-bold text-sm shadow-2xl shadow-orange-950 flex items-center justify-between cursor-pointer border border-orange-400/30"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-white text-neutral-950 flex items-center justify-center text-xs font-mono">
                {totalCartCount}
              </div>
              <span>{lang === 'en' ? 'View Delivery Basket' : 'Shiko Shportën'}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-base tabular-nums">
              <span>{totalCartAmount}</span>
              <span className="text-xs font-sans text-orange-200">ALL</span>
            </div>
          </button>
        </div>
      )}

    </div>
  );
}
