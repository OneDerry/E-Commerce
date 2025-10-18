import { Product } from "@/types";

export const CATEGORIES = [
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Computers & Accessories",
  "Kitchen & Dining",
  "Cell Phones & Accessories",
  "Grocery & Gourmet Food",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_ICONS: Record<Category, string> = {
  "Home & Kitchen": "🏠",
  "Beauty & Personal Care": "💄",
  "Computers & Accessories": "💻",
  "Kitchen & Dining": "🍽️",
  "Cell Phones & Accessories": "📱",
  "Grocery & Gourmet Food": "🛒",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  "Home & Kitchen": "from-blue-500 to-blue-600",
  "Beauty & Personal Care": "from-pink-500 to-pink-600",
  "Computers & Accessories": "from-purple-500 to-purple-600",
  "Kitchen & Dining": "from-orange-500 to-orange-600",
  "Cell Phones & Accessories": "from-green-500 to-green-600",
  "Grocery & Gourmet Food": "from-yellow-500 to-yellow-600",
};

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  "Home & Kitchen":
    "Transform your living space with our top-rated home essentials",
  "Beauty & Personal Care":
    "Discover the latest in beauty and personal care products",
  "Computers & Accessories":
    "Power up with cutting-edge technology and accessories",
  "Kitchen & Dining":
    "Elevate your culinary experience with premium kitchen tools",
  "Cell Phones & Accessories":
    "Stay connected with the latest mobile technology",
  "Grocery & Gourmet Food":
    "Savor the finest gourmet foods and specialty ingredients",
};

// Add this to your existing constants.ts file

// Dummy Products Data
export const DUMMY_PRODUCTS: Product[] = [
  // ✅ Cell Phones & Accessories
  {
    id: "prod_1",
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    image: "https://picsum.photos/400/400?random=1",
    category: "Cell Phones & Accessories",
    description:
      "High-quality wireless headphones with active noise cancellation and 30-hour battery life.",
    stock: 50,
    rating: 4.5,
    reviews: [],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "prod_7",
    name: "Wireless Charging Pad",
    price: 39.99,
    image: "https://picsum.photos/400/400?random=2",
    category: "Cell Phones & Accessories",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices.",
    stock: 60,
    rating: 4.2,
    reviews: [],
    createdAt: "2024-01-07T00:00:00Z",
    updatedAt: "2024-01-18T14:20:00Z",
  },
  {
    id: "prod_13",
    name: "MagSafe Power Bank",
    price: 59.99,
    image: "https://picsum.photos/400/400?random=3",
    category: "Cell Phones & Accessories",
    description: "Portable magnetic power bank with 10,000mAh capacity.",
    stock: 70,
    rating: 4.3,
    reviews: [],
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-02T00:00:00Z",
  },
  {
    id: "prod_14",
    name: "Noise Cancelling Earbuds",
    price: 129.99,
    image: "https://picsum.photos/400/400?random=4",
    category: "Cell Phones & Accessories",
    description:
      "True wireless earbuds with touch controls and water resistance.",
    stock: 90,
    rating: 4.6,
    reviews: [],
    createdAt: "2024-02-05T00:00:00Z",
    updatedAt: "2024-02-06T00:00:00Z",
  },
  {
    id: "prod_15",
    name: "Phone Tripod Stand",
    price: 24.99,
    image: "https://picsum.photos/400/400?random=5",
    category: "Cell Phones & Accessories",
    description: "Adjustable tripod stand with Bluetooth remote shutter.",
    stock: 120,
    rating: 4.1,
    reviews: [],
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-02-12T00:00:00Z",
  },

  // ✅ Kitchen & Dining
  {
    id: "prod_2",
    name: "Smart Coffee Maker",
    price: 149.99,
    image: "https://picsum.photos/400/400?random=6",
    category: "Kitchen & Dining",
    description:
      "Programmable smart coffee maker with app control and built-in grinder.",
    stock: 25,
    rating: 4.8,
    reviews: [],
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-16T08:15:00Z",
  },
  {
    id: "prod_10",
    name: "Stainless Steel Knife Set",
    price: 79.99,
    image: "https://picsum.photos/400/400?random=2",
    category: "Kitchen & Dining",
    description:
      "Professional-grade stainless steel knife set with wooden block.",
    stock: 35,
    rating: 4.5,
    reviews: [],
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-21T09:45:00Z",
  },
  {
    id: "prod_16",
    name: "Digital Air Fryer",
    price: 99.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Kitchen & Dining",
    description: "Oil-free air fryer with digital controls and 6L capacity.",
    stock: 40,
    rating: 4.7,
    reviews: [],
    createdAt: "2024-02-15T00:00:00Z",
    updatedAt: "2024-02-18T00:00:00Z",
  },
  {
    id: "prod_17",
    name: "Automatic Bread Maker",
    price: 129.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Kitchen & Dining",
    description:
      "Fully automatic bread maker with 12 programs and crust control.",
    stock: 30,
    rating: 4.4,
    reviews: [],
    createdAt: "2024-02-20T00:00:00Z",
    updatedAt: "2024-02-22T00:00:00Z",
  },
  {
    id: "prod_18",
    name: "Electric Kettle",
    price: 49.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Kitchen & Dining",
    description: "1.7L stainless steel kettle with temperature control.",
    stock: 55,
    rating: 4.5,
    reviews: [],
    createdAt: "2024-02-25T00:00:00Z",
    updatedAt: "2024-02-26T00:00:00Z",
  },

  // ✅ Beauty & Personal Care
  {
    id: "prod_3",
    name: "Organic Face Serum",
    price: 29.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Beauty & Personal Care",
    description: "Natural anti-aging serum with hyaluronic acid and vitamin C.",
    stock: 100,
    rating: 4.3,
    reviews: [],
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-13T20:45:00Z",
  },
  {
    id: "prod_8",
    name: "Professional Makeup Brush Set",
    price: 49.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Beauty & Personal Care",
    description:
      "Complete set of professional makeup brushes for flawless application.",
    stock: 80,
    rating: 4.7,
    reviews: [],
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-19T11:15:00Z",
  },
  {
    id: "prod_19",
    name: "Vitamin C Moisturizer",
    price: 34.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Beauty & Personal Care",
    description:
      "Brightening moisturizer with vitamin C and aloe for glowing skin.",
    stock: 90,
    rating: 4.4,
    reviews: [],
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-03T00:00:00Z",
  },
  {
    id: "prod_20",
    name: "Aloe Vera Gel",
    price: 19.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Beauty & Personal Care",
    description:
      "Pure aloe vera gel for soothing, moisturizing, and healing skin.",
    stock: 110,
    rating: 4.6,
    reviews: [],
    createdAt: "2024-02-06T00:00:00Z",
    updatedAt: "2024-02-07T00:00:00Z",
  },
  {
    id: "prod_21",
    name: "Hair Repair Mask",
    price: 27.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Beauty & Personal Care",
    description:
      "Deep conditioning hair mask with keratin and argan oil for dry hair.",
    stock: 85,
    rating: 4.8,
    reviews: [],
    createdAt: "2024-02-08T00:00:00Z",
    updatedAt: "2024-02-10T00:00:00Z",
  },

  // ✅ Computers & Accessories
  {
    id: "prod_4",
    name: "Gaming Mechanical Keyboard",
    price: 89.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Computers & Accessories",
    description:
      "RGB backlit mechanical keyboard with Cherry MX switches for gaming.",
    stock: 75,
    rating: 4.7,
    reviews: [],
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-17T16:20:00Z",
  },
  {
    id: "prod_9",
    name: 'Gaming Monitor 27"',
    price: 299.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Computers & Accessories",
    description:
      "27-inch 4K gaming monitor with 144Hz refresh rate and HDR support.",
    stock: 40,
    rating: 4.8,
    reviews: [],
    createdAt: "2024-01-09T00:00:00Z",
    updatedAt: "2024-01-20T16:30:00Z",
  },
  {
    id: "prod_22",
    name: "Ergonomic Gaming Mouse",
    price: 59.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Computers & Accessories",
    description: "Adjustable DPI RGB gaming mouse with programmable buttons.",
    stock: 100,
    rating: 4.5,
    reviews: [],
    createdAt: "2024-02-11T00:00:00Z",
    updatedAt: "2024-02-12T00:00:00Z",
  },
  {
    id: "prod_23",
    name: "USB-C Docking Station",
    price: 89.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Computers & Accessories",
    description:
      "10-in-1 USB-C docking station with HDMI, Ethernet, and USB 3.0 ports.",
    stock: 45,
    rating: 4.4,
    reviews: [],
    createdAt: "2024-02-14T00:00:00Z",
    updatedAt: "2024-02-16T00:00:00Z",
  },
  {
    id: "prod_24",
    name: "Laptop Cooling Pad",
    price: 49.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Computers & Accessories",
    description:
      "Cooling pad with 5 adjustable fans and RGB lighting for laptops.",
    stock: 70,
    rating: 4.6,
    reviews: [],
    createdAt: "2024-02-17T00:00:00Z",
    updatedAt: "2024-02-19T00:00:00Z",
  },

  // ✅ Home & Kitchen
  {
    id: "prod_5",
    name: "Smart Home Hub",
    price: 79.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Home & Kitchen",
    description:
      "Central hub for controlling all your smart home devices with voice commands.",
    stock: 30,
    rating: 4.4,
    reviews: [],
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-11T11:10:00Z",
  },
  {
    id: "prod_11",
    name: "Smart Air Purifier",
    price: 199.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Home & Kitchen",
    description:
      "HEPA air purifier with smart controls and air quality monitoring.",
    stock: 25,
    rating: 4.6,
    reviews: [],
    createdAt: "2024-01-11T00:00:00Z",
    updatedAt: "2024-01-22T13:20:00Z",
  },
  {
    id: "prod_25",
    name: "Robot Vacuum Cleaner",
    price: 249.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Home & Kitchen",
    description:
      "WiFi-connected robot vacuum with automatic charging and app control.",
    stock: 40,
    rating: 4.8,
    reviews: [],
    createdAt: "2024-02-21T00:00:00Z",
    updatedAt: "2024-02-23T00:00:00Z",
  },
  {
    id: "prod_26",
    name: "Smart LED Bulb Set",
    price: 39.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Home & Kitchen",
    description:
      "Color-changing smart bulbs compatible with Alexa and Google Home.",
    stock: 120,
    rating: 4.3,
    reviews: [],
    createdAt: "2024-02-25T00:00:00Z",
    updatedAt: "2024-02-26T00:00:00Z",
  },
  {
    id: "prod_27",
    name: "Smart Plug 4-Pack",
    price: 49.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Home & Kitchen",
    description:
      "Voice-controlled smart plugs for energy monitoring and scheduling.",
    stock: 75,
    rating: 4.5,
    reviews: [],
    createdAt: "2024-02-28T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },

  // ✅ Grocery & Gourmet Food
  {
    id: "prod_6",
    name: "Artisan Coffee Beans",
    price: 24.99,
    image: "https://picsum.photos/400/400?random=6",
    category: "Grocery & Gourmet Food",
    description: "Premium single-origin coffee beans roasted to perfection.",
    stock: 200,
    rating: 4.6,
    reviews: [],
    createdAt: "2024-01-06T00:00:00Z",
    updatedAt: "2024-01-10T09:30:00Z",
  },
  {
    id: "prod_12",
    name: "Organic Honey",
    price: 18.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Grocery & Gourmet Food",
    description: "Pure organic wildflower honey from local beekeepers.",
    stock: 150,
    rating: 4.4,
    reviews: [],
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-23T10:10:00Z",
  },
  {
    id: "prod_28",
    name: "Dark Chocolate Bar Pack",
    price: 14.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Grocery & Gourmet Food",
    description:
      "Assorted 70% cocoa dark chocolate bars made with organic cacao.",
    stock: 250,
    rating: 4.8,
    reviews: [],
    createdAt: "2024-02-02T00:00:00Z",
    updatedAt: "2024-02-05T00:00:00Z",
  },
  {
    id: "prod_29",
    name: "Cold Pressed Olive Oil",
    price: 22.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Grocery & Gourmet Food",
    description: "Extra virgin cold-pressed olive oil for cooking and salads.",
    stock: 180,
    rating: 4.7,
    reviews: [],
    createdAt: "2024-02-07T00:00:00Z",
    updatedAt: "2024-02-09T00:00:00Z",
  },
  {
    id: "prod_30",
    name: "Gluten-Free Pasta",
    price: 12.99,
    image: "https://picsum.photos/400/400?random=7",
    category: "Grocery & Gourmet Food",
    description:
      "Healthy gluten-free pasta made from chickpeas and brown rice.",
    stock: 160,
    rating: 4.5,
    reviews: [],
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-02-12T00:00:00Z",
  },
];

// Helper function to get products by category
export const getProductsByCategory = (category: Category): Product[] => {
  return DUMMY_PRODUCTS.filter((product) => product.category === category);
};

// Helper function to get best sellers by category
export const getBestSellersByCategory = (
  category: Category,
  maxProducts: number = 4
): Product[] => {
  return getProductsByCategory(category)
    .sort((a, b) => {
      // Sort by rating first, then by number of reviews
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.reviews.length - a.reviews.length;
    })
    .slice(0, maxProducts);
};
