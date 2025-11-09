import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@solarmarket.com' },
    update: {},
    create: {
      email: 'admin@solarmarket.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const seller1 = await prisma.user.upsert({
    where: { email: 'seller1@example.com' },
    update: {},
    create: {
      email: 'seller1@example.com',
      name: 'Solar Pro Supplier',
      password: hashedPassword,
      role: 'SELLER',
    },
  });

  const seller2 = await prisma.user.upsert({
    where: { email: 'seller2@example.com' },
    update: {},
    create: {
      email: 'seller2@example.com',
      name: 'Green Energy Store',
      password: hashedPassword,
      role: 'SELLER',
    },
  });

  const buyer = await prisma.user.upsert({
    where: { email: 'buyer@example.com' },
    update: {},
    create: {
      email: 'buyer@example.com',
      name: 'John Buyer',
      password: hashedPassword,
      role: 'BUYER',
    },
  });

  console.log('Created users:', { admin, seller1, seller2, buyer });

  // Create categories
  const residential = await prisma.category.upsert({
    where: { slug: 'residential' },
    update: {},
    create: {
      name: 'Residential',
      slug: 'residential',
      description: 'Solar panels for home use',
    },
  });

  const commercial = await prisma.category.upsert({
    where: { slug: 'commercial' },
    update: {},
    create: {
      name: 'Commercial',
      slug: 'commercial',
      description: 'High-capacity panels for businesses',
    },
  });

  const portable = await prisma.category.upsert({
    where: { slug: 'portable' },
    update: {},
    create: {
      name: 'Portable',
      slug: 'portable',
      description: 'Portable solar panels for camping and travel',
    },
  });

  console.log('Created categories:', { residential, commercial, portable });

  // Create products
  const products = [
    {
      name: 'SunPower Maxeon 3 400W Solar Panel',
      description:
        'Premium monocrystalline solar panel with industry-leading efficiency of 22.6%. Perfect for residential installations with limited roof space.',
      price: 549.99,
      discountPrice: 499.99,
      wattage: 400,
      efficiency: 22.6,
      manufacturer: 'SunPower',
      warranty: 25,
      dimensions: '1690 x 1046 x 40 mm',
      weight: 19.5,
      cellType: 'Monocrystalline',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
        'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800',
      ]),
      stock: 50,
      featured: true,
      sellerId: seller1.id,
    },
    {
      name: 'LG NeON R 365W High Efficiency Solar Panel',
      description:
        'Advanced solar technology with excellent low-light performance. Ideal for areas with varying weather conditions.',
      price: 429.99,
      wattage: 365,
      efficiency: 21.4,
      manufacturer: 'LG',
      warranty: 25,
      dimensions: '1686 x 1016 x 40 mm',
      weight: 18.5,
      cellType: 'Monocrystalline',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800',
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
      ]),
      stock: 75,
      featured: true,
      sellerId: seller1.id,
    },
    {
      name: 'Canadian Solar 350W Poly PERC Panel',
      description:
        'Cost-effective polycrystalline panel with PERC technology for improved efficiency. Great value for large installations.',
      price: 299.99,
      discountPrice: 259.99,
      wattage: 350,
      efficiency: 19.8,
      manufacturer: 'Canadian Solar',
      warranty: 25,
      dimensions: '1992 x 996 x 40 mm',
      weight: 22.4,
      cellType: 'Polycrystalline',
      images: JSON.stringify(['https://images.unsplash.com/photo-1559302504-e6bd78d69a0a?w=800']),
      stock: 100,
      featured: false,
      sellerId: seller2.id,
    },
    {
      name: 'Trina Solar 445W Vertex Bifacial Module',
      description:
        'Cutting-edge bifacial technology captures sunlight from both sides, increasing energy generation by up to 25%.',
      price: 649.99,
      wattage: 445,
      efficiency: 21.2,
      manufacturer: 'Trina Solar',
      warranty: 25,
      dimensions: '2102 x 1040 x 35 mm',
      weight: 24.5,
      cellType: 'Monocrystalline',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
      ]),
      stock: 30,
      featured: true,
      sellerId: seller2.id,
    },
    {
      name: 'JinkoSolar Tiger Pro 380W Panel',
      description:
        'Reliable and efficient solar panel with excellent performance in high-temperature environments.',
      price: 349.99,
      wattage: 380,
      efficiency: 20.5,
      manufacturer: 'JinkoSolar',
      warranty: 25,
      dimensions: '1767 x 1041 x 35 mm',
      weight: 19.8,
      cellType: 'Monocrystalline',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800',
      ]),
      stock: 60,
      featured: false,
      sellerId: seller1.id,
    },
    {
      name: 'REC Solar Alpha Pure 405W',
      description:
        'Premium panel with industry-leading low-light performance and exceptional durability.',
      price: 579.99,
      discountPrice: 529.99,
      wattage: 405,
      efficiency: 21.7,
      manufacturer: 'REC Solar',
      warranty: 25,
      dimensions: '1821 x 1016 x 30 mm',
      weight: 21.0,
      cellType: 'Monocrystalline',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
      ]),
      stock: 45,
      featured: true,
      sellerId: seller2.id,
    },
    {
      name: 'Q CELLS Q.PEAK DUO BLK ML-G10+ 400W',
      description:
        'All-black aesthetic design with high performance. Perfect for residential installations where appearance matters.',
      price: 489.99,
      wattage: 400,
      efficiency: 20.6,
      manufacturer: 'Q CELLS',
      warranty: 25,
      dimensions: '1740 x 1030 x 32 mm',
      weight: 20.5,
      cellType: 'Monocrystalline',
      images: JSON.stringify(['https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800']),
      stock: 55,
      featured: false,
      sellerId: seller1.id,
    },
    {
      name: 'Panasonic EVERVOLT 370W Module',
      description:
        'Japanese engineering excellence with superior temperature coefficient and long-term reliability.',
      price: 519.99,
      wattage: 370,
      efficiency: 21.2,
      manufacturer: 'Panasonic',
      warranty: 25,
      dimensions: '1658 x 1040 x 35 mm',
      weight: 19.0,
      cellType: 'Monocrystalline',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
      ]),
      stock: 40,
      featured: false,
      sellerId: seller2.id,
    },
    {
      name: 'Silfab Solar SIL-380 NX',
      description:
        'North American manufactured panel with exceptional snow load and wind resistance ratings.',
      price: 399.99,
      wattage: 380,
      efficiency: 20.3,
      manufacturer: 'Silfab',
      warranty: 25,
      dimensions: '1755 x 1038 x 35 mm',
      weight: 21.5,
      cellType: 'Monocrystalline',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800',
      ]),
      stock: 70,
      featured: false,
      sellerId: seller1.id,
    },
    {
      name: 'Mission Solar 370W PERC Module',
      description:
        'American-made solar panel with high quality standards and excellent warranty coverage.',
      price: 439.99,
      discountPrice: 399.99,
      wattage: 370,
      efficiency: 19.9,
      manufacturer: 'Mission Solar',
      warranty: 25,
      dimensions: '1765 x 1048 x 35 mm',
      weight: 22.0,
      cellType: 'Monocrystalline',
      images: JSON.stringify(['https://images.unsplash.com/photo-1559302504-e6bd78d69a0a?w=800']),
      stock: 35,
      featured: false,
      sellerId: seller2.id,
    },
    {
      name: 'Axitec 400W AXIpremium HC',
      description:
        'German-engineered solar panel with outstanding efficiency and durability in harsh conditions.',
      price: 459.99,
      wattage: 400,
      efficiency: 20.8,
      manufacturer: 'Axitec',
      warranty: 25,
      dimensions: '1776 x 1052 x 35 mm',
      weight: 21.8,
      cellType: 'Monocrystalline',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
      ]),
      stock: 50,
      featured: false,
      sellerId: seller1.id,
    },
    {
      name: 'Astronergy CHSM 385W',
      description:
        'High-performance half-cut cell technology for reduced shading losses and improved efficiency.',
      price: 369.99,
      wattage: 385,
      efficiency: 20.1,
      manufacturer: 'Astronergy',
      warranty: 25,
      dimensions: '1776 x 1052 x 35 mm',
      weight: 20.8,
      cellType: 'Monocrystalline',
      images: JSON.stringify(['https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800']),
      stock: 65,
      featured: false,
      sellerId: seller2.id,
    },
  ];

  for (const product of products) {
    const created = await prisma.product.create({
      data: product,
    });
    console.log(`Created product: ${created.name}`);

    // Assign to residential category for all
    await prisma.productCategory.create({
      data: {
        productId: created.id,
        categoryId: residential.id,
      },
    });

    // Assign high-wattage panels to commercial
    if (created.wattage >= 400) {
      await prisma.productCategory.create({
        data: {
          productId: created.id,
          categoryId: commercial.id,
        },
      });
    }
  }

  // Create some sample reviews
  const sampleProducts = await prisma.product.findMany({ take: 3 });

  for (const product of sampleProducts) {
    await prisma.review.create({
      data: {
        rating: 5,
        title: 'Excellent quality solar panel!',
        comment:
          'This panel exceeded my expectations. Installation was easy and it has been generating great power for my home. Highly recommended!',
        userId: buyer.id,
        productId: product.id,
      },
    });
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
