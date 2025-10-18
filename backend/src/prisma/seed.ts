import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/auth";

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const phonesCategory = await prisma.category.upsert({
    where: { slug: "phones" },
    update: {},
    create: {
      name: "Smartphones",
      slug: "phones",
    },
  });

  const laptopsCategory = await prisma.category.upsert({
    where: { slug: "laptops" },
    update: {},
    create: {
      name: "Laptops",
      slug: "laptops",
    },
  });

  const headphonesCategory = await prisma.category.upsert({
    where: { slug: "headphones" },
    update: {},
    create: {
      name: "Headphones",
      slug: "headphones",
    },
  });

  // Create admin user
  const adminPassword = await hashPassword("password");
  const admin = await prisma.user.upsert({
    where: { email: "admin@vdmstore.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@vdmstore.com",
      phone: "+2341234567890",
      passwordHash: adminPassword,
      isAdmin: true,
    },
  });

  // Create regular user
  const userPassword = await hashPassword("password");
  const user = await prisma.user.upsert({
    where: { email: "john@example.com" },
    update: {},
    create: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+2341234567891",
      passwordHash: userPassword,
      isAdmin: false,
    },
  });

  // Create products
  const iphone = await prisma.product.upsert({
    where: { sku: "IPHONE15PRO" },
    update: {},
    create: {
      sku: "IPHONE15PRO",
      name: "iPhone 15 Pro",
      slug: "iphone-15-pro",
      description:
        "The latest iPhone with advanced camera system and A17 Pro chip",
      priceCents: 99900, // $999
      images: {
        primary: "https://picsum.photos/400/400?random=1",
        gallery: [
          "https://picsum.photos/400/400?random=1",
        ],
      },
      categoryId: phonesCategory.id,
    },
  });

  const macbook = await prisma.product.upsert({
    where: { sku: "MACBOOK16PRO" },
    update: {},
    create: {
      sku: "MACBOOK16PRO",
      name: 'MacBook Pro 16"',
      slug: "macbook-pro-16",
      description: "Powerful laptop with M3 Pro chip for professional work",
      priceCents: 249900, // $2499
      images: {
        primary: "https://picsum.photos/400/400?random=2",
        gallery: [
          "https://picsum.photos/400/400?random=2",
        ],
      },
      categoryId: laptopsCategory.id,
    },
  });

  const headphones = await prisma.product.upsert({
    where: { sku: "SONYWH1000XM5" },
    update: {},
    create: {
      sku: "SONYWH1000XM5",
      name: "Sony WH-1000XM5",
      slug: "sony-wh-1000xm5",
      description: "Premium noise-canceling wireless headphones",
      priceCents: 39900, // $399
      images: {primary: "https://picsum.photos/400/400?random=3",
        gallery: [
          "https://picsum.photos/400/400?random=3",
        ],
      },
      categoryId: headphonesCategory.id,
    },
  });

  // Create inventory
  await prisma.inventory.upsert({
    where: { productId: iphone.id },
    update: {},
    create: {
      productId: iphone.id,
      inStock: 50,
      reserved: 0,
    },
  });

  await prisma.inventory.upsert({
    where: { productId: macbook.id },
    update: {},
    create: {
      productId: macbook.id,
      inStock: 25,
      reserved: 0,
    },
  });

  await prisma.inventory.upsert({
    where: { productId: headphones.id },
    update: {},
    create: {
      productId: headphones.id,
      inStock: 100,
      reserved: 0,
    },
  });

  // Create reviews
  await prisma.review.createMany({
    data: [
      {
        userId: user.id,
        productId: iphone.id,
        rating: 5,
        comment: "Amazing phone! The camera quality is outstanding.",
      },
      {
        userId: admin.id,
        productId: macbook.id,
        rating: 5,
        comment: "Perfect for development work. Super fast and reliable.",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
