"use client";

import Image from "next/image";
import { useState } from "react";
import BreadCrumb from "../ui/BreadCrumb";
import Button from "../ui/Button";
import { IoBagAddOutline } from "react-icons/io5";
import { getProduct } from "@/server-actions/product/getProduct";
import { useCartStore } from "@/store/cart-store";
import toast from "react-hot-toast";

interface ProductPageComponentProps {
  product: Awaited<ReturnType<typeof getProduct>>;
}

export default function ProductPageComponent({
  product,
}: ProductPageComponentProps) {
  const { addToCart } = useCartStore();
  const [selectedImage, setSelectedImage] = useState(
    product?.images[0].imageUrl ?? "",
  );

  const isOutOfStock = (product?.stock ?? 0) <= 0;

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    if (isOutOfStock) {
      return toast.error(
        "Dieser Artikel ist leider ausverkauft.",
      );
    }

    addToCart({
      cartKey: product.id,
      productId: product.id,
      name: product.name,
      image: product.images[0]?.imageUrl ?? "",
      price: product.price,
      quantity: 1,
    });

    toast.success(
      `${product.name} zum Warenkorb hinzugefügt`,
    );
  };
  return (
    <section className="py-12">
      <BreadCrumb
        items={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Shop",
            href: "/shop",
          },
          {
            label: product?.name ?? "",
          },
        ]}
      />
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* images */}
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          {/* gallery images */}
          <div className="flex gap-3 overflow-x-auto md:flex-col md:overflow-visible">
            {product?.images.map((image) => (
              <button
                key={image.id}
                className={`shrink-0 overflow-hidden rounded-xl border-2 transition ${selectedImage === image.imageUrl ? "border-primary" : "border-border"}`}
                onClick={() =>
                  setSelectedImage(image.imageUrl)
                }
              >
                <Image
                  src={image.imageUrl}
                  alt="product"
                  width={90}
                  height={110}
                  className="h-24 w-20 object-cover md:h-28 md:w-24"
                />
              </button>
            ))}
          </div>
          {/* main image */}
          <div className="relative h-87.5 w-full overflow-hidden rounded-2xl bg-surface sm:h-125">
            <Image
              src={selectedImage}
              alt="{product?.name}"
              fill
              className="object-cover"
            />
          </div>
        </div>
        {/* Product details */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <h2 className="text-3xl font-bold sm:text-4xl">
            {product?.name}
          </h2>

          <p className="mt-6 text-2xl font-bold sm:text-3xl">
            {product?.price.toFixed(2)}€
          </p>

          <p
            className={`mt-2 font-medium ${isOutOfStock ? "text-red-600" : "text-green-600"}`}
          >
            {isOutOfStock
              ? "Ausverkauft"
              : `Verfügbar (${product?.stock} auf Lager)`}
          </p>

          <p className="mt-6 leading-8 text-muted-foreground">
            {product?.description}
          </p>
        </div>

        <div className="mt-8">
          <Button
            className="w-full sm:w-fit"
            leftIcon={<IoBagAddOutline size={20} />}
            paddingX="px-20"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </section>
  );
}
