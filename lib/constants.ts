import { Product } from "@/types";

import Bag from "@/public/Bag.jpeg";
import Kettle from "@/public/Kettle.jpeg";
import LaptopBag from "@/public/LaptopBag.jpeg";
import Pans from "@/public/Pans.jpeg";
import Pots from "@/public/Pots.jpeg";
import Shoes from "@/public/Shoes.jpeg";
import HeadPhones from "@/public/HeadPhones.jpeg";
import Sneakers from "@/public/Sneakers.jpeg";
import Toaster from "@/public/Toaster.jpeg";
import Watch from "@/public/Watch.jpeg";

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

// Dummy Products Data
export const DUMMY_PRODUCTS: Product[] = [
  // ✅ Cell Phones & Accessories
  {
    id: "prod_1",
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    image: HeadPhones.src,
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
    image: Bag.src,
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
    name: "Sneakers",
    price: 59.99,
    image: Shoes.src,
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
    image:
      "https://images.pexels.com/photos/3394663/pexels-photo-3394663.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image:
      "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Cell Phones & Accessories",
    description: "Adjustable tripod stand with Bluetooth remote shutter.",
    stock: 120,
    rating: 4.1,
    reviews: [],
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-02-12T00:00:00Z",
  },

  // Grocery and Gourmet Food

  {
    id: "prod_22",
    name: "Organic Granola Cereal",
    price: 9.99,
    image:
      "https://images.pexels.com/photos/590564/pexels-photo-590564.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Grocery & Gourmet Food",
    description:
      "Crunchy organic granola made with oats, honey, and nuts. Perfect for breakfast or snacking.",
    stock: 240,
    rating: 4.5,
    reviews: [],
    createdAt: "2024-03-01T00:00:00Z",
    updatedAt: "2024-03-03T00:00:00Z",
  },
  {
    id: "prod_23",
    name: "Premium Olive Oil Bottle",
    price: 14.99,
    image:
      "https://images.pexels.com/photos/4050434/pexels-photo-4050434.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Grocery & Gourmet Food",
    description:
      "Cold-pressed extra virgin olive oil sourced from the finest Mediterranean olives.",
    stock: 180,
    rating: 4.7,
    reviews: [],
    createdAt: "2024-03-05T00:00:00Z",
    updatedAt: "2024-03-06T00:00:00Z",
  },
  {
    id: "prod_24",
    name: "Gourmet Cheese Gift Box",
    price: 39.99,
    image:
      "https://images.pexels.com/photos/1769279/pexels-photo-1769279.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Grocery & Gourmet Food",
    description:
      "A curated selection of artisan cheeses perfect for gifting or special occasions.",
    stock: 75,
    rating: 4.8,
    reviews: [],
    createdAt: "2024-03-10T00:00:00Z",
    updatedAt: "2024-03-12T00:00:00Z",
  },
  {
    id: "prod_25",
    name: "Artisan Dark Chocolate",
    price: 5.49,
    image:
      "https://images.pexels.com/photos/206742/pexels-photo-206742.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Grocery & Gourmet Food",
    description:
      "Rich dark chocolate handcrafted with cocoa sourced from ethical farms.",
    stock: 320,
    rating: 4.6,
    reviews: [],
    createdAt: "2024-03-15T00:00:00Z",
    updatedAt: "2024-03-16T00:00:00Z",
  },
  {
    id: "prod_26",
    name: "Imported Coffee Beans",
    price: 17.99,
    image:
      "https://images.pexels.com/photos/357743/pexels-photo-357743.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Grocery & Gourmet Food",
    description:
      "Whole roasted Arabica coffee beans with a smooth, rich aroma and flavor.",
    stock: 200,
    rating: 4.9,
    reviews: [],
    createdAt: "2024-03-20T00:00:00Z",
    updatedAt: "2024-03-21T00:00:00Z",
  },

  // ✅ Kitchen & Dining
  {
    id: "prod_2",
    name: "Smart Coffee Maker",
    price: 149.99,
    image: Pots.src,
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
    image:
      "https://images.pexels.com/photos/60621/pexels-photo-60621.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image: Pots.src,
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
    image: Pans.src,

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
    image: Kettle.src,
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
    name: "Watch",
    price: 29.99,
    image: Watch.src,
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
    image:
      "https://images.pexels.com/photos/3373747/pexels-photo-3373747.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image:
      "https://images.pexels.com/photos/7766138/pexels-photo-7766138.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image:
      "https://images.pexels.com/photos/6621489/pexels-photo-6621489.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image:
      "https://images.pexels.com/photos/4465125/pexels-photo-4465125.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Beauty & Personal Care",
    description:
      "Deep conditioning hair mask with keratin and argan oil for dry hair.",
    stock: 85,
    rating: 4.8,
    reviews: [],
    createdAt: "2024-02-08T00:00:00Z",
    updatedAt: "2024-02-10T00:00:00Z",
  },

  // Computer Accesory
  {
    id: "prod_27",
    name: "Gaming Laptop 16″",
    price: 1299.99,
    image:
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
    category: "Computers & Accessories",
    description:
      "High-performance gaming laptop with NVIDIA GPU, 16GB RAM, and 1TB SSD storage.",
    stock: 45,
    rating: 4.6,
    reviews: [],
    createdAt: "2024-04-01T00:00:00Z",
    updatedAt: "2024-04-03T00:00:00Z",
  },
  {
    id: "prod_28",
    name: "Mechanical Keyboard RGB",
    price: 89.99,
    image:
      "https://images.pexels.com/photos/811190/pexels-photo-811190.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Computers & Accessories",
    description:
      "RGB backlit mechanical keyboard with customizable keys and durable switches.",
    stock: 160,
    rating: 4.5,
    reviews: [],
    createdAt: "2024-04-04T00:00:00Z",
    updatedAt: "2024-04-05T00:00:00Z",
  },
  {
    id: "prod_29",
    name: "Wireless Ergonomic Mouse",
    price: 49.99,
    image:
      "https://images.pexels.com/photos/3780396/pexels-photo-3780396.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Computers & Accessories",
    description:
      "Comfort-focused wireless mouse with adjustable DPI and silent click buttons.",
    stock: 250,
    rating: 4.4,
    reviews: [],
    createdAt: "2024-04-07T00:00:00Z",
    updatedAt: "2024-04-08T00:00:00Z",
  },
  {
    id: "prod_30",
    name: "Laptop Bag",
    price: 299.99,
    image: LaptopBag.src,
    category: "Computers & Accessories",
    description:
      "27-inch 4K UHD display with ultra-thin bezels and vibrant color accuracy.",
    stock: 70,
    rating: 4.7,
    reviews: [],
    createdAt: "2024-04-10T00:00:00Z",
    updatedAt: "2024-04-11T00:00:00Z",
  },
  {
    id: "prod_31",
    name: "USB-C Docking Station",
    price: 74.99,
    image: Sneakers.src,
    category: "Computers & Accessories",
    description:
      "Multi-port USB-C docking hub with HDMI, Ethernet, SD card, and USB 3.0 support.",
    stock: 130,
    rating: 4.3,
    reviews: [],
    createdAt: "2024-04-12T00:00:00Z",
    updatedAt: "2024-04-13T00:00:00Z",
  },

  //  Home & Kitchen
  {
    id: "prod_32",
    name: "Non-Stick Cookware Set",
    price: 129.99,
    image: Pans.src,
    category: "Home & Kitchen",
    description:
      "Durable 10-piece non-stick cookware set with heat-resistant handles and tempered glass lids.",
    stock: 85,
    rating: 4.6,
    reviews: [],
    createdAt: "2024-05-01T00:00:00Z",
    updatedAt: "2024-05-03T00:00:00Z",
  },
  {
    id: "prod_33",
    name: "Luxury Cotton Bedsheet Set",
    price: 59.99,
    image:
      "https://images.pexels.com/photos/545012/pexels-photo-545012.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Home & Kitchen",
    description:
      "Soft, breathable 100% cotton bedsheet set with 2 pillowcases for a cozy sleeping experience.",
    stock: 190,
    rating: 4.7,
    reviews: [],
    createdAt: "2024-05-05T00:00:00Z",
    updatedAt: "2024-05-06T00:00:00Z",
  },
  {
    id: "prod_34",
    name: "Stainless Steel Knife Block Set",
    price: 89.99,
    image: Pots.src,
    category: "Home & Kitchen",
    description:
      "Professional-grade kitchen knife set with wooden block for chefs and home cooking enthusiasts.",
    stock: 120,
    rating: 4.5,
    reviews: [],
    createdAt: "2024-05-10T00:00:00Z",
    updatedAt: "2024-05-12T00:00:00Z",
  },
  {
    id: "prod_35",
    name: "Toaster",
    price: 39.99,
    image: Toaster.src,
    category: "Home & Kitchen",
    description:
      "Ultrasonic essential oil diffuser with ambient LED lighting for a relaxing home atmosphere.",
    stock: 160,
    rating: 4.8,
    reviews: [],
    createdAt: "2024-05-15T00:00:00Z",
    updatedAt: "2024-05-17T00:00:00Z",
  },
  {
    id: "prod_36",
    name: "Compact Air Fryer",
    price: 99.99,
    image: Toaster.src,
    category: "Home & Kitchen",
    description:
      "Healthier cooking made easy with this compact air fryer that uses little to no oil.",
    stock: 140,
    rating: 4.6,
    reviews: [],
    createdAt: "2024-05-20T00:00:00Z",
    updatedAt: "2024-05-21T00:00:00Z",
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
