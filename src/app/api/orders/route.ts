import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateOrderNumber } from '@/lib/utils';

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId: session.user.id },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      }),
      prisma.order.count({ where: { userId: session.user.id } }),
    ]);

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { items, shippingAddress, billingAddress, paymentMethod } = body;

    // Validate stock availability
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product || product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for product ${product?.name || item.productId}` },
          { status: 400 }
        );
      }
    }

    // Calculate totals
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 500 ? 0 : 50; // Free shipping over $500
    const total = subtotal + tax + shipping;

    // Create order and update stock in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          userId: session.user!.id,
          subtotal,
          tax,
          shipping,
          total,
          shippingAddress: JSON.stringify(shippingAddress),
          billingAddress: JSON.stringify(billingAddress),
          paymentMethod,
          paymentStatus: 'PENDING',
          items: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            create: items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      // Update stock for each product
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { userId: session.user!.id },
      });

      return newOrder;
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
