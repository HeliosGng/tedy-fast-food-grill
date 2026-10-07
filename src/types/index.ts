export type Language = 'en' | 'sq';

export type MenuCategoryId = 
  | 'all'
  | 'souvlakis'
  | 'skepasti'
  | 'grill'
  | 'pizzas'
  | 'burgers'
  | 'crepes'
  | 'drinks';

export interface CustomOptionChoice {
  id: string;
  nameEn: string;
  nameSq: string;
  priceModifier?: number; // ALL
}

export interface CustomOptionGroup {
  id: string;
  titleEn: string;
  titleSq: string;
  required: boolean;
  type: 'radio' | 'checkbox';
  choices: CustomOptionChoice[];
}

export interface MenuItem {
  id: string;
  category: MenuCategoryId;
  nameEn: string;
  nameSq: string;
  descriptionEn: string;
  descriptionSq: string;
  price: number; // In Albanian Lekë (ALL)
  image: string;
  fallbackGradient?: string;
  rating?: number;
  isPopular?: boolean;
  isHouseSpecial?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  prepTimeMinutes?: number;
  highlightNotesEn?: string;
  highlightNotesSq?: string;
  optionGroups?: CustomOptionGroup[];
}

export interface SelectedOption {
  groupId: string;
  groupTitleEn: string;
  groupTitleSq: string;
  choiceId: string;
  choiceNameEn: string;
  choiceNameSq: string;
  priceModifier: number;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: SelectedOption[];
  specialInstructions: string;
  unitPrice: number;
  totalPrice: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  role?: string;
  rating: number;
  dateEn: string;
  dateSq: string;
  textEn: string;
  textSq: string;
  foodType?: 'souflaki' | 'gyros' | 'pizza' | 'crepes' | 'grill' | 'skepasti' | 'service';
  likes?: number;
  photosCount?: number;
  ownerReply?: {
    dateEn: string;
    dateSq: string;
    textEn: string;
    textSq: string;
  };
}

export interface ReservationData {
  fullName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'indoor' | 'garden';
  notes: string;
}
