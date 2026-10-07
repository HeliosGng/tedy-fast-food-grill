import { MenuItem } from '../types';

import souvlakiImg from '../assets/images/tedys_souvlaki_gyros_1791391614895.jpg';
import pizzaImg from '../assets/images/tedys_woodfired_pizza_1791391631079.jpg';
import skepastiImg from '../assets/images/tedys_skepasti_burger_1791391642483.jpg';
import crepesImg from '../assets/images/tedys_sweet_crepes_1791391653045.jpg';
import restaurantImg from '../assets/images/tedys_restaurant_hero_1791391601156.jpg';
import tedysExteriorImg from '../assets/images/tedys_exterior_main.jpg';
import googleMapsPhotoImg from '../assets/images/google_maps_photo.jpg';
import homepageBgImg from '../assets/images/homepage_bg.jpg';

export { restaurantImg, tedysExteriorImg, googleMapsPhotoImg, homepageBgImg };

export const MENU_ITEMS: MenuItem[] = [
  // --- SOUVLAKIS & GYROS ---
  {
    id: 'souvlaki-pule',
    category: 'souvlakis',
    nameEn: 'Chicken Souvlaki (Sufllaqe Pule)',
    nameSq: 'Sufllaqe Pule me Pitë',
    descriptionEn: 'Tender marinated chicken rotisserie gyro wrapped in fresh fluffy warm pita, crispy french fries inside, sliced tomatoes, red onions & house tzatziki sauce.',
    descriptionSq: 'Mish pule i marinuar i pjekur në hell, mbështjellë me pitë të ngrohtë të butë, patate të skuqura brenda, domate të freskëta, qepë dhe salcë xaxiq.',
    price: 250,
    image: souvlakiImg,
    rating: 4.9,
    isPopular: true,
    isHouseSpecial: true,
    prepTimeMinutes: 8,
    highlightNotesEn: 'Best seller! Generous juicy chicken portion',
    highlightNotesSq: 'Më e shitura! Pjesë bujare pule lëngëse',
    optionGroups: [
      {
        id: 'sauce',
        titleEn: 'Choose Sauce',
        titleSq: 'Zgjidh Salcën',
        required: true,
        type: 'radio',
        choices: [
          { id: 'tzatziki', nameEn: 'Authentic Tzatziki (Xaxiq)', nameSq: 'Xaxiq Tradicional' },
          { id: 'tyrokafteri', nameEn: 'Spicy Feta (Tirokafteri)', nameSq: 'Tirokafteri Pikante (+30 ALL)', priceModifier: 30 },
          { id: 'pink-sauce', nameEn: 'Tedy\'s Special Sauce', nameSq: 'Salcë Speciale Tedy' },
          { id: 'ketchup-mayo', nameEn: 'Ketchup & Mayonnaise', nameSq: 'Ketchup & Majonezë' },
          { id: 'no-sauce', nameEn: 'No Sauce', nameSq: 'Pa Salcë' }
        ]
      },
      {
        id: 'vegetables',
        titleEn: 'Salads & Veggies',
        titleSq: 'Sallatë & Perime',
        required: false,
        type: 'checkbox',
        choices: [
          { id: 'onions', nameEn: 'Red Onions', nameSq: 'Qepë të kuqe' },
          { id: 'tomatoes', nameEn: 'Tomatoes', nameSq: 'Domate' },
          { id: 'fries-inside', nameEn: 'French Fries inside', nameSq: 'Patate të skuqura brenda' },
          { id: 'extra-cheese', nameEn: 'Grated Gouda / Feta', nameSq: 'Djathë Kaçkavall / Feta (+40 ALL)', priceModifier: 40 }
        ]
      }
    ]
  },
  {
    id: 'gyros-derri',
    category: 'souvlakis',
    nameEn: 'Pork Gyros (Sufllaqe Derri)',
    nameSq: 'Sufllaqe Derri Tradicionale',
    descriptionEn: 'Crisp-edged spiced pork gyro slow-roasted on the vertical rotisserie, wrapped with golden fries, fresh salad and traditional garlic tzatziki.',
    descriptionSq: 'Mish derri i pjekur ngadalë në hell vertikal me erëza mesdhetare, patate krokante, sallatë e freskët dhe xaxiq.',
    price: 260,
    image: souvlakiImg,
    rating: 4.8,
    isPopular: true,
    prepTimeMinutes: 8,
    optionGroups: [
      {
        id: 'sauce',
        titleEn: 'Choose Sauce',
        titleSq: 'Zgjidh Salcën',
        required: true,
        type: 'radio',
        choices: [
          { id: 'tzatziki', nameEn: 'Authentic Tzatziki', nameSq: 'Xaxiq' },
          { id: 'mustard-mayo', nameEn: 'Mustard Mayo Sauce', nameSq: 'Salcë Mustarde & Majonezë' },
          { id: 'spicy', nameEn: 'Spicy Chili Sauce', nameSq: 'Salcë Pikante Djegëse (+20 ALL)', priceModifier: 20 },
          { id: 'no-sauce', nameEn: 'No Sauce', nameSq: 'Pa Salcë' }
        ]
      },
      {
        id: 'extras',
        titleEn: 'Pita Additions',
        titleSq: 'Shtesa në Pitë',
        required: false,
        type: 'checkbox',
        choices: [
          { id: 'onions', nameEn: 'Red Onions', nameSq: 'Qepë' },
          { id: 'fries-inside', nameEn: 'Crispy Fries Inside', nameSq: 'Patate brenda' },
          { id: 'extra-meat', nameEn: 'Extra Gyros Meat (+80 ALL)', nameSq: 'Mish Shtesë (+80 ALL)', priceModifier: 80 }
        ]
      }
    ]
  },
  {
    id: 'souvlaki-mix',
    category: 'souvlakis',
    nameEn: 'Mix Gyros Pita (Pule & Derri)',
    nameSq: 'Sufllaqe e Përzier (Pulë & Derr)',
    descriptionEn: 'The best of both worlds: generous mix of seasoned rotisserie chicken and pork gyro, hot fries, fresh cut salad and chef sauce.',
    descriptionSq: 'Kombinim i shijshëm i mishit të pulës dhe derrit, patate të ngrohta, sallatë dhe salcë e zgjedhur.',
    price: 280,
    image: souvlakiImg,
    rating: 4.9,
    prepTimeMinutes: 9
  },
  {
    id: 'gyros-plate',
    category: 'souvlakis',
    nameEn: 'Gyros Platter Deluxe (Pjatë Gyros)',
    nameSq: 'Pjatë Gyros e Hapur',
    descriptionEn: 'Heaping platter of gyro cuts, 2 warm grilled pita breads, double portion of crispy golden fries, Greek salad, tzatziki dip and grilled pepper.',
    descriptionSq: 'Pjatë e madhe me mish gyros, 2 pita të pjekura në zgarë, patate të skuqura, sallatë greke, xaxiq dhe spec i pjekur.',
    price: 460,
    image: souvlakiImg,
    rating: 4.9,
    prepTimeMinutes: 12,
    highlightNotesEn: 'Super hearty! Perfect for big appetites',
    highlightNotesSq: 'Pjatë e bollshme për oreks të madh'
  },

  // --- SKEPASTI (CLUB GYROS) ---
  {
    id: 'skepasti-chicken',
    category: 'skepasti',
    nameEn: 'Chicken Skepasti Club',
    nameSq: 'Skepasti Pule me Djathë',
    descriptionEn: 'Signature Greek-Albanian covered pita sandwich: layered with succulent chicken gyros, melted gouda & cheddar cheese, tomato, bacon, fries and creamy sauce between two toasted pitas.',
    descriptionSq: 'Sanduiç klub mesdhetar me dy pita të pjekura: mbushur me mish pule, djathë kaçkavall të shkrirë, proshutë, domate, patate dhe salcë speciale.',
    price: 430,
    image: skepastiImg,
    rating: 4.9,
    isPopular: true,
    isHouseSpecial: true,
    prepTimeMinutes: 12,
    highlightNotesEn: 'Top rated in reviews! Crispy & cheesy',
    highlightNotesSq: 'E rekomanduar në vlerësime! Krokante & djathë i shkrirë',
    optionGroups: [
      {
        id: 'sauce-skepasti',
        titleEn: 'Signature Sauce',
        titleSq: 'Salca Kryesore',
        required: true,
        type: 'radio',
        choices: [
          { id: 'special-sauce', nameEn: 'House Skepasti Sauce', nameSq: 'Salcë Speciale Skepasti' },
          { id: 'tzatziki', nameEn: 'Tzatziki Dip', nameSq: 'Salcë Xaxiq' },
          { id: 'spicy', nameEn: 'Spicy Cheese Sauce (+30 ALL)', nameSq: 'Salcë Djathi Pikante (+30 ALL)', priceModifier: 30 }
        ]
      }
    ]
  },
  {
    id: 'skepasti-mixte',
    category: 'skepasti',
    nameEn: 'Tedy\'s Special Mix Skepasti',
    nameSq: 'Skepasti Mixte Speciale Tedy',
    descriptionEn: 'Double layer pork & chicken gyro, smoked pancetta bacon, double melted cheese blend, caramelized red onions and rich house dressing.',
    descriptionSq: 'Mish pule & derri, proshutë e tymosur, dyfish djathë i shkrirë, qepë të karamelizuara dhe salcë shtëpie.',
    price: 490,
    image: skepastiImg,
    rating: 5.0,
    isPopular: true,
    prepTimeMinutes: 14
  },

  // --- GRILL & BBQ ---
  {
    id: 'grilled-chicken',
    category: 'grill',
    nameEn: 'Charcoal Grilled Chicken (Pulë Zgare)',
    nameSq: 'Pulë e Pjekur në Zgarë me Qymyr',
    descriptionEn: 'Juicy, seasoned farm chicken cooked slowly over smoking charcoal embers. Served with grilled rustic pita, lemon wedge and fresh garden salad.',
    descriptionSq: 'Pjesë e lëngshme pule e marinuar me erëza, pjekur ngadalë mbi qymyr druri. Shoqërohet me pitë të ngrohtë, limon dhe sallatë.',
    price: 450,
    image: restaurantImg,
    rating: 4.9,
    isPopular: true,
    prepTimeMinutes: 15,
    highlightNotesEn: 'Juicy BBQ flavor, praised by Honest Local Guide',
    highlightNotesSq: 'Shije autentike zgare, lëngëse dhe e butë'
  },
  {
    id: 'qofte-traditional',
    category: 'grill',
    nameEn: 'Traditional Grilled Qofte (5 pcs)',
    nameSq: 'Qofte Tradicionale Zgare (5 copë)',
    descriptionEn: 'Authentic Albanian spiced minced beef meatballs grilled on open embers, served with fried potatoes, chili pepper and mustard dip.',
    descriptionSq: 'Qofte tradicionale me mish të grirë të erëzuar me rigon e qepë, pjekur mbi prush. Shoqërohet me patate, spec djegës dhe mustardë.',
    price: 360,
    image: skepastiImg,
    rating: 4.7,
    prepTimeMinutes: 10
  },
  {
    id: 'bbq-wings',
    category: 'grill',
    nameEn: 'Crispy BBQ Chicken Wings (8 pcs)',
    nameSq: 'Krahë Pule Kërcitës në Zgarë',
    descriptionEn: 'Charcoal smoked tender chicken wings coated with sweet and spicy barbecue rub, served with creamy dipping sauce and celery sticks.',
    descriptionSq: 'Krahë pule të thekura me lëkurë krokante dhe erëza BBQ, shoqëruar me salcë të butë.',
    price: 380,
    image: restaurantImg,
    rating: 4.8,
    prepTimeMinutes: 12
  },

  // --- PIZZAS ---
  {
    id: 'pizza-special',
    category: 'pizzas',
    nameEn: 'Tedy\'s Special Pizza',
    nameSq: 'Pica Speciale Tedy\'s',
    descriptionEn: 'House specialty: slow-fermented hand-tossed dough, aromatic San Marzano tomato sauce, fior di latte mozzarella, gyro meat, bacon, mushrooms and peppers.',
    descriptionSq: 'Brumë i butë i fermentuar me furrë guri, salcë domatesh aromatike, mocarelë fior di latte, mish gyros, proshutë, kërpudha dhe speca.',
    price: 490,
    image: pizzaImg,
    rating: 4.9,
    isPopular: true,
    isHouseSpecial: true,
    prepTimeMinutes: 14,
    highlightNotesEn: '"Delicious Pizza! You need to try it" - Franko Lici',
    highlightNotesSq: '"Picë e shkëlqyer, duhet ta provoni!" - Franko Lici'
  },
  {
    id: 'pizza-margherita',
    category: 'pizzas',
    nameEn: 'Pizza Margherita Classica',
    nameSq: 'Pica Margarita Klasike',
    descriptionEn: 'Italian culinary classic: San Marzano crushed tomato sauce, fresh creamy mozzarella, extra virgin olive oil and fragrant fresh basil.',
    descriptionSq: 'Klasikja italiane: salcë domatesh, mocarelë e butë, vaj ulliri ekstra i virgjër dhe borzilok i freskët.',
    price: 350,
    image: pizzaImg,
    rating: 4.8,
    isVegetarian: true,
    prepTimeMinutes: 11
  },
  {
    id: 'pizza-veggie',
    category: 'pizzas',
    nameEn: 'Veggie Garden Pizza',
    nameSq: 'Pica Vegjetariane me Perime',
    descriptionEn: 'Loaded with fire-roasted peppers, button mushrooms, sweet corn, sliced black olives, red onions, mozzarella and wild oregano.',
    descriptionSq: 'E pasur me speca të pjekur, kërpudha, misër të ëmbël, ullinj të zinj, qepë të kuqe, mocarelë dhe rigon mali.',
    price: 400,
    image: pizzaImg,
    rating: 4.7,
    isVegetarian: true,
    prepTimeMinutes: 12
  },
  {
    id: 'pizza-diavola',
    category: 'pizzas',
    nameEn: 'Pizza Diavola (Spicy Salami)',
    nameSq: 'Pica Diavola Pikante',
    descriptionEn: 'Rich tomato base, melted mozzarella, spicy Italian salami, crushed Calabrian chili flakes and hot peppers.',
    descriptionSq: 'Salcë domate, mocarelë, sallam pikant italian, spec djegës dhe vaj pikant.',
    price: 460,
    image: pizzaImg,
    rating: 4.8,
    isSpicy: true,
    prepTimeMinutes: 12
  },

  // --- BURGERS & SIDES ---
  {
    id: 'burger-classic',
    category: 'burgers',
    nameEn: 'Tedy\'s Classic Smash Burger & Fries',
    nameSq: 'Burger Klasik me Patate',
    descriptionEn: 'Juicy 100% beef patty grilled on high heat, cheddar cheese, crisp iceberg lettuce, tomato slice, pickle and secret sauce in toasted brioche bun.',
    descriptionSq: 'Mish viçi i pjekur në pllakë të nxehtë, djathë çedar, sallatë jeshile, domate, kastravec turshi dhe salcë speciale në bukë briohe.',
    price: 350,
    image: skepastiImg,
    rating: 4.8,
    isPopular: true,
    prepTimeMinutes: 10,
    highlightNotesEn: 'Classic favorite: only 350 ALL with fries!',
    highlightNotesSq: 'I preferuari i klientëve: 350 ALL me patate të përfshira!'
  },
  {
    id: 'double-bacon-burger',
    category: 'burgers',
    nameEn: 'Double Bacon Smash Burger',
    nameSq: 'Burger Dysh me Proshutë & Çedar',
    descriptionEn: 'Two seared beef patties, double melted cheddar, crispy smoked bacon slices, caramelized onions and BBQ glaze with side of golden fries.',
    descriptionSq: 'Dy qofte viçi, dyfish djathë çedar, proshutë krokante e tymosur, qepë të karamelizuara dhe salcë BBQ me patate.',
    price: 480,
    image: skepastiImg,
    rating: 4.9,
    prepTimeMinutes: 12
  },
  {
    id: 'crispy-fries',
    category: 'burgers',
    nameEn: 'Crispy French Fries Bowl',
    nameSq: 'Patate të Skuqura Kërce',
    descriptionEn: 'Generous basket of golden seasoned french fries dusted with Mediterranean oregano and served with garlic mayo dip.',
    descriptionSq: 'Pjatë me patate të skuqura krokante me rigon mesdhetar dhe salcë majonezë me hudhër.',
    price: 150,
    image: skepastiImg,
    rating: 4.7,
    isVegetarian: true,
    prepTimeMinutes: 5
  },
  {
    id: 'loaded-cheese-fries',
    category: 'burgers',
    nameEn: 'Loaded Cheese & Gyro Fries',
    nameSq: 'Patate me Djathë të Shkrirë & Gyros',
    descriptionEn: 'Golden french fries smothered in warm melted gouda cheese, gyro meat chunks, diced tomatoes and paprika seasoning.',
    descriptionSq: 'Patate të skuqura të mbuluara me djathë kaçkavall të shkrirë, copa mishi gyros dhe piper të ëmbël.',
    price: 240,
    image: skepastiImg,
    rating: 4.9,
    prepTimeMinutes: 7
  },

  // --- SWEET CREPES & DESSERTS ---
  {
    id: 'crepe-nutella-biscuit',
    category: 'crepes',
    nameEn: 'Nutella & Petit Beurre Crepe',
    nameSq: 'Krepë me Nutella & Biskotë',
    descriptionEn: 'Warm freshly spun golden crepe folded with heaping Nutella spread and crushed butter biscuit crumbs.',
    descriptionSq: 'Krepë e ngrohtë e sapopërgatitur, mbushur bujarisht me çokollatë Nutella dhe biskotë Petit Beurre të thërrmuar.',
    price: 220,
    image: crepesImg,
    rating: 4.8,
    isPopular: true,
    prepTimeMinutes: 6,
    highlightNotesEn: '"Recommend getting crepes afterwards:)" - dana dannaa',
    highlightNotesSq: '"Rekomandoj shumë të merrni krepat më pas :)"'
  },
  {
    id: 'crepe-nutella-fruits',
    category: 'crepes',
    nameEn: 'Nutella Banana & Strawberry Crepe',
    nameSq: 'Krepë Nutella me Banane & Luleshtrydhe',
    descriptionEn: 'Rich Nutella spread topped with freshly sliced ripe bananas, strawberries, crushed walnuts and cocoa dusting.',
    descriptionSq: 'Nutella e bollshme me feta bananeje të freskëta, luleshtrydhe dhe arra të thërrmuara.',
    price: 280,
    image: crepesImg,
    rating: 4.9,
    isPopular: true,
    prepTimeMinutes: 7
  },
  {
    id: 'crepe-white-oreo',
    category: 'crepes',
    nameEn: 'White Chocolate & Oreo Crepe',
    nameSq: 'Krepë me Çokollatë të Bardhë & Oreo',
    descriptionEn: 'Silky warm white hazelnut chocolate cream paired with crushed chocolate Oreo cookies and powdered sugar.',
    descriptionSq: 'Krem çokollate e bardhë me copëza biskotash Oreo dhe sheqer pluhur.',
    price: 260,
    image: crepesImg,
    rating: 4.8,
    prepTimeMinutes: 6
  },

  // --- DRINKS & REFRESHMENTS ---
  {
    id: 'drink-cola',
    category: 'drinks',
    nameEn: 'Coca-Cola / Zero (330ml)',
    nameSq: 'Coca-Cola / Zero (330ml)',
    descriptionEn: 'Ice-cold can of Coca-Cola Classic or Sugar-Free Zero.',
    descriptionSq: 'Kanaçe e ftohtë akull Coca-Cola Origjinale ose Zero pa sheqer.',
    price: 120,
    image: restaurantImg,
    rating: 4.9,
    prepTimeMinutes: 1
  },
  {
    id: 'drink-dhalle',
    category: 'drinks',
    nameEn: 'Traditional Dhallë (Ayran)',
    nameSq: 'Dhallë Tradicionale e Ftohtë',
    descriptionEn: 'Traditional Albanian salted cold yogurt drink, the ultimate refreshing pairing with gyros and grilled meat.',
    descriptionSq: 'Pije tradicionale shqiptare me kos dhe kripë të lehtë, kombinimi perfekt me sufllaqet dhe zgarën.',
    price: 90,
    image: restaurantImg,
    rating: 4.9,
    prepTimeMinutes: 1
  },
  {
    id: 'drink-beer-korca',
    category: 'drinks',
    nameEn: 'Birra Korça (330ml)',
    nameSq: 'Birra Korça e Ftohtë (330ml)',
    descriptionEn: 'Iconic crisp Albanian lager brewed in the mountains of Korça.',
    descriptionSq: 'Birrë tradicionale bionde shqiptare, e ftohur në akull.',
    price: 180,
    image: restaurantImg,
    rating: 4.8,
    prepTimeMinutes: 1
  },
  {
    id: 'drink-water',
    category: 'drinks',
    nameEn: 'Spring Water (Ujë Natyral 500ml)',
    nameSq: 'Ujë Natyral / me Gaz (500ml)',
    descriptionEn: 'Chilled natural mountain spring water.',
    descriptionSq: 'Ujë natyral mali i ftohtë.',
    price: 70,
    image: restaurantImg,
    rating: 4.9,
    prepTimeMinutes: 1
  }
];

export const CATEGORIES = [
  { id: 'all', nameEn: 'Full Menu', nameSq: 'Të Gjitha', count: MENU_ITEMS.length },
  { id: 'souvlakis', nameEn: 'Sufllaqe & Gyros', nameSq: 'Sufllaqe & Gyros', count: MENU_ITEMS.filter(i => i.category === 'souvlakis').length },
  { id: 'skepasti', nameEn: 'Skepasti Sandwiches', nameSq: 'Skepasti me Pitë', count: MENU_ITEMS.filter(i => i.category === 'skepasti').length },
  { id: 'grill', nameEn: 'Charcoal Grill', nameSq: 'Zgara me Qymyr', count: MENU_ITEMS.filter(i => i.category === 'grill').length },
  { id: 'pizzas', nameEn: 'Stone Oven Pizzas', nameSq: 'Pica në Furrë', count: MENU_ITEMS.filter(i => i.category === 'pizzas').length },
  { id: 'burgers', nameEn: 'Burgers & Fries', nameSq: 'Burger & Patate', count: MENU_ITEMS.filter(i => i.category === 'burgers').length },
  { id: 'crepes', nameEn: 'Sweet Crepes', nameSq: 'Krepa të Ëmbël', count: MENU_ITEMS.filter(i => i.category === 'crepes').length },
  { id: 'drinks', nameEn: 'Drinks & Beers', nameSq: 'Pije & Birra', count: MENU_ITEMS.filter(i => i.category === 'drinks').length }
];
