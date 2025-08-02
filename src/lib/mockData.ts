// منتجات ورش التعديل
const mworkshopProducts: Product[] = [
  {
    id: "workshop1",
    name: "ورشة تعديل السيارات",
    description: "ورشة متخصصة في تعديل السيارات امتلكها لمدة شهر.",
    price: 15,
    images: ["https://i.ibb.co/7NRgv7d1/8fa7c083d2ec66c409738d921c7b1e38ac3a3c3b.jpg"],
    category: "mworkshop",
    rating: 4.9,
    reviews: 8,
    inStock: true,
    tags: ["تعديل", "سيارات"],
    features: ["تعديل محركات", "تزويد قطع"],
    stockCount: 5,
    freeShipping: false,
    offer: false,
    discount: 0
  }
];
// منتجات محطات الوقود
const fuelshopsProducts: Product[] = [
  {
    id: "fuel1",
    name: "محطة وقود ",
    description: "محطة وقود لمدة شهر استثمر في متجرها.",
    price: 15,
    images: ["https://i.ibb.co/BVJF2LX3/imag1313e.png"],
    category: "fuelshops",
    rating: 4.7,
    reviews: 12,
    inStock: true,
    tags: ["وقود", "خدمات"],
    features: ["بنزين", "ديزل", "خدمات سريعة"],
    stockCount: 10,
    freeShipping: false,
    offer: false,
    discount: 0
  }
];
import { Product, Category } from "@/types";

// المنتجات الإلكترونية
// const electronicsProducts: Product[] = [ ... ];

// منتجات الموضة والأزياء
// const fashionProducts: Product[] = [ ... ];

// منتجات المنزل والمطبخ
// const homeProducts: Product[] = [ ... ];

// الكتب والمنشورات
// const bookProducts: Product[] = [ ... ];

// منتجات الرياضة واللياقة
// const sportsProducts: Product[] = [ ... ];

// منتجات العناية والجمال
// const beautyProducts: Product[] = [ ... ];

// منتجات السيارات
const carsProducts: Product[] = [
  {
    id: "bmw-x6-f86-m-performance",
    name: "Bmw X6 F86 M-Performance",
    description: `BMW X6 F86 M-Performance إصدار خاص يجمع بين القوة والفخامة والتقنيات الحديثة.\n\nاستمتع بتجربة قيادة رياضية مع محرك قوي ونظام تعليق متطور، تصميم خارجي جريء مع خطوط ديناميكية، ومقصورة داخلية فاخرة مزودة بأحدث وسائل الراحة والتقنيات.\n\nميزات رئيسية:\n- محرك V8 تيربو\n- نظام دفع رباعي xDrive\n- مقاعد جلدية فاخرة\n- شاشة عرض رقمية عالية الدقة\n- نظام صوتي احترافي\n- أنظمة أمان متقدمة\n- تصميم رياضي مميز\n- جنوط M-Performance أصلية\n- إضاءة LED كاملة\n- نظام ملاحة متطور\n`,
    price: 20,
    images: [
      "https://i.ibb.co/KchwYNKC/1478737592-1476085174-357380-11.jpg",
      "https://i.ibb.co/RpVbN7XC/1478737592-1476085240-357381-7.jpg",
      "https://i.ibb.co/M38F1Ns/1478737592-1476085241-357382-8.jpg",
      "https://i.ibb.co/b5ytTJ0W/1478737592-1476085420-357383-13.jpg"
    ],
    category: "cars",
    rating: 5.0,
    reviews: 0,
    inStock: true,
    tags: ["BMW", "X6", "M-Performance", "فاخرة", "رياضية"],
    features: [
      "محرك V8 تيربو",
      "نظام دفع رباعي xDrive",
      "مقاعد جلدية فاخرة",
      "شاشة عرض رقمية",
      "نظام صوتي احترافي"
    ],
    stockCount: 5,
    freeShipping: false,
    offer: false,
    discount: 0
  },
  {
    id: "ferrari-fxxk-2015",
    name: "2015 Ferrari FXXK",
    description: "سيارة فيراري FXXK 2015 عالية الأداء بتصميم رياضي مميز.",
    price: 15,
    images: [
      "https://i.ibb.co/8LfTdNwq/1453608889-12631162-540882132742817-1928556170-o.jpg",
      "https://i.ibb.co/FL3StK3Q/1453608889-gallery75.jpg",
      "https://i.ibb.co/wNStHV3L/1474301362-gta-sa-2016-09-19-21-44-33-17.jpg",
      "https://i.ibb.co/MyFwZKDG/1474301362-gta-sa-2016-09-19-22-14-19-86.jpg",
      "https://i.ibb.co/YxJ0B4c/1474301362-gta-sa-2016-09-19-22-26-13-46.jpg"
    ],
    category: "cars",
    rating: 5.0,
    reviews: 0,
    inStock: true,
    tags: ["Ferrari", "FXXK", "2015", "رياضية"],
    features: ["أداء عالي", "تصميم رياضي"],
    stockCount: 5,
    freeShipping: false,
    offer: false,
    discount: 0
  },
  {
    id: "dodge-challenger-srt",
    name: "Dodge Challenger SRT",
    description: "سيارة دودج تشالنجر SRT عالية الأداء بتصميم عضلي مميز.",
    price: 20,
    images: [
      "https://i.ibb.co/LD6qsWYw/1458669585-gta-sa-2016-03-22-14-23-38-96.jpg",
      "https://i.ibb.co/7J0Mv5d6/1458669585-gta-sa-2016-03-22-14-24-00-08.jpg",
      "https://i.ibb.co/N2BL6HFk/1458669585-gta-sa-2016-03-22-14-39-41-42.jpg"
    ],
    category: "cars",
    rating: 5.0,
    reviews: 0,
    inStock: true,
    tags: ["Dodge", "Challenger", "SRT", "رياضية"],
    features: ["أداء عالي", "تصميم عضلي"],
    stockCount: 5,
    freeShipping: false,
    offer: false,
    discount: 0
  },
];

// منتجات الحمولات
const loadsProducts: Product[] = [
  {
    id: "kenworth-big-head",
    name: "راس مقطوره كينورث كبير",
    description: "رأس مقطورة كينورث كبير عالي التحمل.",
    price: 25,
    images: ["https://i.ibb.co/VYwpHLtr/388460-gta-sa-2017-03-05-19-59-59-20.jpg"],
    category: "trucks",
    rating: 5.0,
    reviews: 0,
    inStock: true,
    tags: ["رأس مقطورة", "كينورث", "كبير"],
    features: ["عالي التحمل"],
    stockCount: 10,
    freeShipping: false,
    offer: false,
    discount: 0
  },
  {
    id: "mercedes-head",
    name: "راس مقطوره مرسيدس",
    description: "رأس مقطورة مرسيدس عالي الجودة.",
    price: 20,
    images: ["https://i.ibb.co/W4k8c6nM/mercedes-benz-actros-1697296588-443212.jpg"],
    category: "trucks",
    rating: 5.0,
    reviews: 0,
    inStock: true,
    tags: ["رأس مقطورة", "مرسيدس"],
    features: ["عالي الجودة"],
    stockCount: 10,
    freeShipping: false,
    offer: false,
    discount: 0
  },
  {
    id: "trailer-350kg",
    name: "براد وزن 350Kg",
    description: "براد مقطورة بوزن 350 كجم.",
    price: 20,
    images: ["https://i.ibb.co/SS6YzH0/1554525879-2638-schmitz-trailer-pack-1.jpg"],
    category: "trucks",
    rating: 5.0,
    reviews: 0,
    inStock: true,
    tags: ["براد", "350Kg"],
    features: ["وزن 350 كجم"],
    stockCount: 10,
    freeShipping: false,
    offer: false,
    discount: 0
  },
];

// اجعل جميع منتجات الرواعي في قسم بطاقات مميزة
const membershipProducts: Product[] = [
  {
    id: "bronze-sponsor",
    name: "راعي برونزي 🥉",
    description: `📦 إعفاء من رسوم وضرائب الميناء\n💲 250 ألف دولار داخل الخادم 💸\n📉 تخفيض على المخالفات\n🌐 2500 نقطة خبرة\n💎 رول ديسكورد مميزة 💎\n👤 شخصية CJ\n🚀 لوحة تحكم CJ جديدة 🛠️\n⚙️ خصائص CJ (نحيف - سمين - معضل)` ,
    price: 10,
    images: ["https://i.ibb.co/5h2zMZWy/1.png"],
    category: "vip-membership",
    rating: 5.0,
    reviews: 0,
    inStock: true,
    tags: ["راعي", "برونزي"],
    features: ["مزايا برونزية"],
    stockCount: 100,
    freeShipping: true,
    offer: false,
    discount: 0
  },
  {
    id: "silver-sponsor",
    name: "راعي فضي 🥈",
    description: `📦 إعفاء من رسوم وضرائب الميناء\n💲 750 ألف دولار داخل الخادم 💸\n📉 تخفيض على المخالفات\n🌐 5000 نقطة خبرة\n💎 رول ديسكورد مميزة 💎\n👤 شخصية CJ\n🚀 لوحة تحكم CJ جديدة 🛠️\n⚙️ خصائص CJ (نحيف - سمين - معضل)` ,
    price: 20,
    images: ["https://i.ibb.co/spb7qGtq/2.png"],
    category: "vip-membership",
    rating: 5.0,
    reviews: 0,
    inStock: true,
    tags: ["راعي", "فضي"],
    features: ["مزايا فضية"],
    stockCount: 100,
    freeShipping: true,
    offer: false,
    discount: 0
  },
  {
    id: "gold-sponsor",
    name: "راعي ذهبي 🥇",
    description: `📦 إعفاء من رسوم وضرائب الميناء\n💲 1 مليون دولار داخل الخادم 💸\n📉 تخفيض على المخالفات\n🌐 7500 نقطة خبرة\n💎 رول ديسكورد مميزة 💎\n👤 شخصية CJ\n🚀 لوحة تحكم CJ جديدة 🛠️\n⚙️ خصائص CJ (نحيف - سمين - معضل)` ,
    price: 30,
    images: ["https://i.ibb.co/hRmDJLMq/3.png"],
    category: "vip-membership",
    rating: 5.0,
    reviews: 0,
    inStock: true,
    tags: ["راعي", "ذهبي"],
    features: ["مزايا ذهبية"],
    stockCount: 100,
    freeShipping: true,
    offer: false,
    discount: 0
  },
  {
    id: "strategic-sponsor",
    name: "راعي استراتيجي 🏵️",
    description: `📦 إعفاء من رسوم وضرائب الميناء\n💲 2.5 مليون دولار داخل الخادم 💸\n📉 تخفيض على المخالفات\n🌐 10.000 نقطة خبرة\n💎 رول ديسكورد مميزة 💎\n👤 شخصية CJ\n🚀 لوحة تحكم CJ جديدة 🛠️\n⚙️ خصائص CJ (نحيف - سمين - معضل)` ,
    price: 40,
    images: ["https://i.ibb.co/rKSyGpVH/5.png"],
    category: "vip-membership",
    rating: 5.0,
    reviews: 0,
    inStock: true,
    tags: ["راعي", "استراتيجي"],
    features: ["مزايا استراتيجية"],
    stockCount: 100,
    freeShipping: true,
    offer: false,
    discount: 0
  },
  {
    id: "main-sponsor",
    name: "راعي أساسي 🎊",
    description: `📦 إعفاء من رسوم وضرائب الميناء\n💲 3.5 مليون دولار داخل الخادم 💸\n📉 تخفيض على المخالفات\n🌐 12500 نقطة خبرة\n💎 رول ديسكورد مميزة 💎\n👤 شخصية CJ\n🚀 لوحة تحكم CJ جديدة 🛠️\n⚙️ خصائص CJ (نحيف - سمين - معضل)` ,
    price: 50,
    images: ["https://i.ibb.co/7tK6rVp6/4.png"],
    category: "vip-membership",
    rating: 5.0,
    reviews: 0,
    inStock: true,
    tags: ["راعي", "أساسي"],
    features: ["مزايا أساسية"],
    stockCount: 100,
    freeShipping: true,
    offer: false,
    discount: 0
  }
];

// منتجات الباكدجات
const specialIdsProducts: Product[] = [
  {
    id: "special-id-1",
    name: "ايدي مميز 123",
    description: "ايدي مميز وفريد يمكنك امتلاكه داخل السيرفر.",
    price: 30,
    images: ["https://i.ibb.co/s9pMwD7g/2.png"],
    category: "special-ids",
    rating: 5.0,
    reviews: 0,
    inStock: true,
    tags: ["ايدي", "مميز"],
    features: ["ايدي فريد", "قابل للتخصيص"],
    stockCount: 10,
    freeShipping: false,
    offer: false,
    discount: 0
  }
];

const packagesProducts: Product[] = [
  {
    id: "package1",
    name: "قريباً باكدجات مميزة",
    description: `قريباً باكدجات مميزة`,
    price: 50,
    images: [
      "https://i.ibb.co/0p1KX4m1/empty.png",
    ],
    category: "packages",
    rating: 4.8,
    reviews: 67,
    inStock: true,
    featured: true,
    tags: ["family", "comprehensive", "discount"],
    features: [
      "منتجات متنوعة من جميع الفئات",
      "خصم 30% على السعر الإجمالي",
      "خدمة تركيب مجانية",
      "ضمان شامل"
    ],
    stockCount: 15,
    freeShipping: true,
    offer: false,
    discount: 0
  },
];

// منتجات المتاجر
const storesProducts: Product[] = [
  {
    id: "store-14d",
    name: "متجر لمدة 14 يوم",
    description: "متجرك الخاص لأضافة الاغراض وبيعها وربح منها المال",
    price: 5,
    images: ["https://i.ibb.co/G3sg8fBs/the-4-season.png"],
    category: "stores",
    rating: 4.9,
    reviews: 12,
    inStock: true,
    featured: false,
    tags: ["متجر", "14 يوم", "بيع"],
    features: ["مدة 14 يوم", "إدارة كاملة", "دعم فني"],
    stockCount: 100,
    freeShipping: false,
    offer: false,
    discount: 0
  },
  {
    id: "store-1m",
    name: "متجر لمدة شهر",
    description: "متجرك الخاص لأضافة الاغراض وبيعها وربح منها المال",
    price: 10,
    images: ["https://i.ibb.co/G3sg8fBs/the-4-season.png"],
    category: "stores",
    rating: 5.0,
    reviews: 20,
    inStock: true,
    featured: false,
    tags: ["متجر", "شهر", "بيع"],
    features: ["مدة شهر", "إدارة كاملة", "دعم فني"],
    stockCount: 100,
    freeShipping: false,
    offer: false,
    discount: 0
  },
  {
    id: "store-2m",
    name: "متجر لمدة شهرين",
    description: "متجرك الخاص لأضافة الاغراض وبيعها وربح منها المال",
    price: 15,
    images: ["https://i.ibb.co/G3sg8fBs/the-4-season.png"],
    category: "stores",
    rating: 5.0,
    reviews: 8,
    inStock: true,
    featured: false,
    tags: ["متجر", "شهرين", "بيع"],
    features: ["مدة شهرين", "إدارة كاملة", "دعم فني"],
    stockCount: 100,
    freeShipping: false,
    offer: false,
    discount: 15
  },
  {
    id: "store-3m",
    name: "متجر لمدة 3 شهور",
    description: "متجرك الخاص لأضافة الاغراض وبيعها وربح منها المال",
    price: 20,
    images: ["https://i.ibb.co/G3sg8fBs/the-4-season.png"],
    category: "stores",
    rating: 5.0,
    reviews: 5,
    inStock: true,
    featured: false,
    tags: ["متجر", "3 شهور", "بيع"],
    features: ["مدة 3 شهور", "إدارة كاملة", "دعم فني"],
    stockCount: 100,
    freeShipping: false,
    offer: false,
    discount: 0
  }
];

// أضف منتجات دعم الفور سيزون في الأعلى في قسم خدمات اخرى
const otherServicesProducts: Product[] = [
  {
    id: "support-5",
    name: "اموال (مليون) داخل اللعبه",
    description: "اموال (مليون) داخل اللعبه",
    price: 10,
    images: ["https://i.ibb.co/YF62ZHgH/GTAonline-Nov-Money.jpg"],
    category: "other-services",
    rating: 5.0,
    reviews: 0,
    inStock: true,
    tags: ["دعم", "الفور سيزون"],
    features: ["دعم الخادم"],
    stockCount: 100,
    freeShipping: false,
    offer: false,
    discount: 0
  },
  {
    id: "support-15",
    name: "اموال حمرا 1 مليون ( داخل اللعبه )",
    description: "اموال حمرا 1 مليون ( داخل اللعبه )",
    price: 15,
    images: ["https://i.ibb.co/39zdHqyc/bf438eb8-1544-4f86-b872-85176e30c939-1000x946.jpg"],
    category: "other-services",
    rating: 5.0,
    reviews: 0,
    inStock: true,
    tags: ["دعم", "الفور سيزون"],
    features: ["دعم الخادم"],
    stockCount: 100,
    freeShipping: false,
    offer: false,
    discount: 0
  },
  {
    id: "support-25",
    name: "ادعم الفور سيزون 15$",
    description: "بطاقة دعم خادم الفور سيزون بقيمة 15$",
    price: 15,
    images: ["https://i.ibb.co/LDP50hRk/istockphoto-995710774-612x612.jpg"],
    category: "other-services",
    rating: 5.0,
    reviews: 0,
    inStock: true,
    tags: ["دعم", "الفور سيزون"],
    features: ["دعم الخادم"],
    stockCount: 100,
    freeShipping: false,
    offer: false,
    discount: 0
  },
];

// تجميع كل المنتجات
export const featuredProducts: Product[] = [
  ...carsProducts.filter(p => p.featured),
  ...loadsProducts.filter(p => p.featured),
  ...membershipProducts.filter(p => p.featured),
  ...packagesProducts.filter(p => p.featured),
  ...specialIdsProducts.filter(p => p.featured)
];

// جميع المنتجات
// أضف خاصية firstImage لكل منتج
export const allProducts: Product[] = [
  ...carsProducts,
  ...loadsProducts,
  ...membershipProducts,
  ...packagesProducts,
  ...storesProducts,
  ...specialIdsProducts,
  ...otherServicesProducts,
  ...mworkshopProducts,
  ...fuelshopsProducts
].map(p => ({
  ...p,
  firstImage: p.images && p.images.length > 0 ? p.images[0] : ""
}));
// مصفوفة تعرض أول صورة من كل منتج
export const allProductsFirstImages: string[] = allProducts.map(p => p.images && p.images.length > 0 ? p.images[0] : "");

// احذف قسم بطاقات عضوية من الكاتيجوريز
export const categories: Category[] = [
  {
    id: "cars",
    name: "مركبات",
    image: "https://i.ibb.co/KchwYNKC/1478737592-1476085174-357380-11.jpg",
    productsCount: carsProducts.length
  },
  {
    id: "trucks",
    name: "حمولات",
    image: "https://i.ibb.co/W4k8c6nM/mercedes-benz-actros-1697296588-443212.jpg",
    productsCount: loadsProducts.length
  },
  {
    id: "fuelshops",
    name: "محطات الوقود",
    image: "https://i.ibb.co/BVJF2LX3/imag1313e.png",
    productsCount: fuelshopsProducts.length
  },
  {
    id: "mworkshop",
    name: "ورش التعديل",
    image: "https://i.ibb.co/7NRgv7d1/8fa7c083d2ec66c409738d921c7b1e38ac3a3c3b.jpg",
    productsCount: mworkshopProducts.length
  },
  {
    id: "stores",
    name: "المتاجر",
    image: "https://i.ibb.co/G3sg8fBs/the-4-season.png",
    productsCount: storesProducts.length
  },
  {
    id: "packages",
    name: "باكدجات",
    image: "https://i.ibb.co/0p1KX4m1/empty.png",
    productsCount: packagesProducts.length
  },
  {
    id: "vip-membership",
    name: "بطاقات مميزة",
    image: "https://i.ibb.co/5h2zMZWy/1.png",
    productsCount: membershipProducts.length
  },
  {
    id: "special-ids",
    name: "ايديهات مميزة",
    image: "https://i.ibb.co/s9pMwD7g/2.png",
    productsCount: specialIdsProducts.length
  },
  {
    id: "other-services",
    name: "خدمات اخرى",
    image: "https://i.ibb.co/YF62ZHgH/GTAonline-Nov-Money.jpg",
    productsCount: otherServicesProducts.length
  }
];
