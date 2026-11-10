import { PaymentMethod } from "@/generated/prisma/enums";
import { getCurrentUser } from "../auth/getCurrentUser";

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
