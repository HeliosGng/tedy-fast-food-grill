import { ReviewItem } from '../types';

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'The Honest Local Guide',
    role: 'Local Guide · 203 reviews · 8,498 photos',
    rating: 5,
    dateEn: '2 years ago',
    dateSq: '2 vite më parë',
    foodType: 'grill',
    textEn: 'Amazing bbq food in Tirana. Grilled chicken was juicy, pita and salad were great too.',
    textSq: 'Ushqim fantastik zgare në Tiranë. Pula e pjekur ishte shumë lëngëse, pita dhe sallata ishin të shkëlqyera gjithashtu.',
    likes: 14
  },
  {
    id: 'rev-2',
    author: 'W Robertson',
    role: 'Local Guide · 464 reviews · 456 photos',
    rating: 5,
    dateEn: '3 years ago',
    dateSq: '3 vite më parë',
    foodType: 'pizza',
    textEn: 'Very good service and food. Went with plenty of friends and enjoyed the food. Inexpensive and tasty. Good pizza!.. Recommended !!',
    textSq: 'Shërbim dhe ushqim shumë i mirë. Shkova me shumë miq dhe e shijuam pafund ushqimin. Çmime të arsyeshme dhe tepër e shijshme. Picë fantastike!.. E rekomanduar!!',
    likes: 18
  },
  {
    id: 'rev-3',
    author: 'Franko Lici',
    role: 'Local Guide · 38 reviews · 11 photos',
    rating: 5,
    dateEn: '8 months ago',
    dateSq: '8 muaj më parë',
    foodType: 'pizza',
    textEn: 'Delicious Pizza 🍕 You need to try it. Friendly Service and normal Price.',
    textSq: 'Picë e shijshme 🍕 Duhet ta provoni patjetër. Shërbim miqësor dhe çmime normale.',
    likes: 9
  },
  {
    id: 'rev-4',
    author: 'dana dannaa',
    role: '3 reviews',
    rating: 5,
    dateEn: '1 year ago',
    dateSq: '1 vit më parë',
    foodType: 'crepes',
    textEn: 'Amazing food, prices are good and the portions are perfect. Gyros were delicious, recommend getting crepes afterwards:)',
    textSq: 'Ushqim i mrekullueshëm, çmimet janë shumë të mira dhe porcionet perfekte. Gyros ishin shumë të shijshëm, rekomandoj patjetër të merrni krepa më pas :)',
    likes: 7
  },
  {
    id: 'rev-5',
    author: 'G Videomaker',
    role: 'Local Guide · 29 reviews · 112 photos',
    rating: 5,
    dateEn: '1 month ago',
    dateSq: '1 muaj më parë',
    foodType: 'souflaki',
    textEn: 'Every time I return to Albania I always try the sufllaqe (pita). I liked this one quite a bit too. I ate my meal sitting on chairs, but at the back exit there\'s a quiet garden, and if you want, you can go there in peace. Prices are normal for the area.',
    textSq: 'Sa herë kthehem në Shqipëri provoj gjithmonë sufllaqet. Kjo më pëlqeu shumë. Në dalje nga mbrapa ka një kopsht shumë të qetë ku mund të uleni në paqe. Çmimet normale për zonën.',
    likes: 11
  },
  {
    id: 'rev-6',
    author: 'Roberta Martelloni',
    role: 'Local Guide · 9 reviews · 39 photos',
    rating: 5,
    dateEn: '11 months ago',
    dateSq: '11 muaj më parë',
    foodType: 'pizza',
    textEn: 'Excellent service I ate there practically every day and the pizza was delicious, as an Italian I give it 5 stars!!',
    textSq: 'Shërbim i shkëlqyer, kam ngrënë aty pothuajse çdo ditë dhe pica ishte e mrekullueshme, si italiane i jap 5 yje!!',
    likes: 15
  },
  {
    id: 'rev-7',
    author: 'Juho Tommola',
    role: 'Local Guide · 40 reviews',
    rating: 5,
    dateEn: '7 years ago',
    dateSq: '7 vite më parë',
    foodType: 'souflaki',
    textEn: 'We stopped here in Tirana on our way to the airport and boy was that the right decision. Eating here didn\'t break the bank (burger and fries went for 350 ALL / 2.80€). Super delicious.',
    textSq: 'Ndaluam këtu në Tiranë rrugës për në aeroport dhe ishte vendimi më i mirë! Ushqimi me çmime fantastike (burger dhe patate për 350 ALL). Jashtëzakonisht e shijshme.',
    likes: 21,
    ownerReply: {
      dateEn: '7 years ago',
      dateSq: '7 vite më parë',
      textEn: 'Thank You very much Juho Tommola for your review! Hope when you come back to Albania you visit us again! Till then all the best!',
      textSq: 'Faleminderit shumë Juho Tommola për vlerësimin tuaj! Shpresojmë që kur të ktheheni në Shqipëri të na vizitoni sërish! Gjithë të mirat!'
    }
  },
  {
    id: 'rev-8',
    author: 'Maximilian Zabel',
    role: '3 reviews · 7 photos',
    rating: 5,
    dateEn: '2 months ago',
    dateSq: '2 muaj më parë',
    foodType: 'service',
    textEn: 'A very pleasant atmosphere and super friendly, attentive, and efficient service. We especially appreciated how easily our special dietary needs were accommodated. We felt completely at ease and will gladly return!',
    textSq: 'Atmosferë shumë e këndshme dhe shërbim miqësor, i vëmendshëm dhe efikas. Na ndihmuan menjëherë me preferencat e veçanta ushqimore. Do të kthehemi me shumë kënaqësi!',
    likes: 8
  },
  {
    id: 'rev-9',
    author: 'sara likaj',
    role: 'Local Guide · 40 reviews · 20 photos',
    rating: 4,
    dateEn: '3 years ago',
    dateSq: '3 vite më parë',
    foodType: 'skepasti',
    textEn: 'Yummmmy fast food with fresh ingredients and the cooking staff is generous with the food portions. I\'d recommend the souvlakis and skepasti.',
    textSq: 'Ushqim i shpejtë shumë i shijshëm me përbërës të freskët dhe staf bujar me porcionet. Rekomandoj pa masë sufllaqet dhe skepastitë.',
    likes: 12
  },
  {
    id: 'rev-10',
    author: 'Vjogen Stërgu',
    role: 'Local Guide · 44 reviews · 40 photos',
    rating: 5,
    dateEn: '5 years ago',
    dateSq: '5 vite më parë',
    foodType: 'service',
    textEn: 'Friendly service, accurate door delivery, delicious food, cheap prices. Our favorite fast-food! Great job, guys!',
    textSq: 'Shërbim miqësor, dërgim i saktë deri tek dera, ushqim i shijshëm, çmime të lira. Fast-foodi ynë i preferuar! Punë e shkëlqyer djema!',
    likes: 16
  },
  {
    id: 'rev-11',
    author: 'Dalila Buturas',
    role: '9 reviews',
    rating: 5,
    dateEn: '1 year ago',
    dateSq: '1 vit më parë',
    foodType: 'pizza',
    textEn: 'Delicious pizza, better than in Italy, friendly and welcoming staff, and a cozy atmosphere. If you\'re in Tirana, you absolutely must eat at Tedy\'s.',
    textSq: 'Picë shumë e shijshme, staf mikpritës dhe atmosferë komode. Nëse jeni në Tiranë, duhet patjetër të hani tek Tedy\'s.',
    likes: 19
  },
  {
    id: 'rev-12',
    author: 'Doris Karapici',
    role: 'Local Guide · 740 reviews · 4,304 photos',
    rating: 5,
    dateEn: '8 years ago',
    dateSq: '8 vite më parë',
    foodType: 'souflaki',
    textEn: 'Delicious souvlakis and other fast foods. Very fast, good prices. If you\'re near this area would highly recommend. Good job!!!',
    textSq: 'Sufllaqe shumë të shijshme dhe ushqime të tjera të shpejta. Shumë e shpejtë, çmime të mira. E rekomandoj me gjithë zemër!',
    likes: 24,
    ownerReply: {
      dateEn: '8 years ago',
      dateSq: '8 vite më parë',
      textEn: 'Thank you very much Doris Karapici!',
      textSq: 'Faleminderit shumë Doris Karapici!'
    }
  }
];

export const REVIEW_TAGS = [
  { id: 'all', labelEn: 'All Reviews', labelSq: 'Të Gjitha', count: 76 },
  { id: 'souflaki', labelEn: 'Souflaki & Pita', labelSq: 'Sufllaqe & Pitë', count: 28 },
  { id: 'gyros', labelEn: 'Gyros Platter', labelSq: 'Pjatë Gyros', count: 19 },
  { id: 'pizza', labelEn: 'Stone Oven Pizza', labelSq: 'Pica në Furrë', count: 24 },
  { id: 'grill', labelEn: 'Charcoal BBQ', labelSq: 'Zgara & Pulë', count: 18 },
  { id: 'crepes', labelEn: 'Sweet Crepes', labelSq: 'Krepa të Ëmbël', count: 12 },
  { id: 'service', labelEn: 'Service & Garden', labelSq: 'Shërbimi & Kopshti', count: 22 }
];
