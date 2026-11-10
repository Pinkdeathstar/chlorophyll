import { prisma } from "@/database/db";
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@/generated/prisma/enums";
import { da } from "zod/v4/locales";

interface CreateOrderInput {
  userId: string;

  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status?: OrderStatus;

  shippingAddress: {
    firstName: string;
    lastName: string;
    phone: string;
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };

  cartItems: {
    productId: string;
    quantity: number;
  }[];

  stripeSessionId?: string | null;
}

export async function createOrder(data: CreateOrderInput) {
  const productIds = [
    ...new Set(
      data.cartItems.map((item) => item.productId),
    ),
  ];

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  if (products.length !== productIds.length) {
    throw new Error(
      "Ein oder mehr Artikel sind nicht mehr verfügbar.",
    );
  }

  let total = 0;

  const orderItems = data.cartItems.map((item) => {
    const product = products.find(
      (p) => p.id === item.productId,
    );

    if (!product) {
      throw new Error("Artikel wurde nicht gefunden.");
    }

    if (product.stock < item.quantity) {
      throw new Error(
        `${product.name} ist nicht verfügbar.`,
      );
    }

    const price = Number(product.price);

    total += price * item.quantity + shipping;

    return {
      productId: product.id,
      quantity: item.quantity,
      price,
    };
  });

  const tax = total * 0.19;
  const subtotal = total - tax;
  const shipping = 0;

  function generateOrderNumber() {
    const year = new Date().getFullYear();

    const random = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    return `ORD-${year}-${random}`;
  }

  //create a transaction
  const order = await prisma.$transaction(async (tx) => {
    let address = await tx.address.findFirst({
      where: { userId: data.userId, isDefault: true },
    });

    if (!address) {
      //create address for user
      address = await tx.address.create({
        data: {
          firstName: data.shippingAddress.firstName,
          lastName: data.shippingAddress.lastName,
          phone: data.shippingAddress.phone,
          street: data.shippingAddress.street,
          postalCode: data.shippingAddress.postalCode,
          city: data.shippingAddress.city,
          country: data.shippingAddress.country,
          isDefault: true,
          userId: data.userId,
        },
      });
    }

    for (const item of orderItems) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    const createdOrder = await tx.order.create({
      data: {
        orderNumber: generateOrderNumber(),

        stripeSessionId: data.stripeSessionId,

        subtotal,
        shipping,
        tax,
        total,

        paymentMethod: data.paymentMethod,
        paymentStatus: data.paymentStatus,
        status: data.status ?? OrderStatus.IN_BEARBEITUNG,

        userId: data.userId,
        addressId: address.id,

        items: {
          create: orderItems,
        },
      },
    });

    return createdOrder;
  });

  return order;
}
