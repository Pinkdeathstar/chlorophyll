"use server";

import {
  PaymentMethod,
  PaymentStatus,
} from "@/generated/prisma/enums";
import { getCurrentUser } from "../auth/getCurrentUser";
import { createOrder } from "./createOrder";

interface PlaceOrderInput {
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

  paymentMethod: PaymentMethod;
}

export async function placeOrder(data: PlaceOrderInput) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "Bitte melde dich zuerst an.",
      };
    }

    if (data.cartItems.length === 0) {
      return {
        success: false,
        message: "Dein Warenkorb ist leer.",
      };
    }

    //create order
    const order = await createOrder({
      userId: currentUser.id,

      paymentMethod: data.paymentMethod,
      paymentStatus: PaymentStatus.IN_BEARBEITUNG,

      shippingAddress: data.shippingAddress,

      cartItems: data.cartItems,
    });

    return {
      success: true,
      orderNumber: order.orderNumber,
      message: "Bestellung wurde erfolgreich aufgegeben.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Bestellung kann nicht aufgegeben werden.",
    };
  }
}
