"use server";

import { prisma } from "@/database/db";

export async function getProduct(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!product) {
      return null;
    }

    return {
      ...product,
      price: Number(product.price),
    };
  } catch (error) {
    console.error(
      "Artikel konnte nicht geladen werden:",
      error,
    );

    return null;
  }
}
