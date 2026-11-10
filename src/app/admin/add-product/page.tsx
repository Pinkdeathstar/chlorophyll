"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  Category,
  ProductType,
} from "@/generated/prisma/enums";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";
import { LuPlus } from "react-icons/lu";

const categories: Category[] = [
  Category.PFLANZEN,
  Category.PFLANZTOEPFE,
  Category.ZUBEHOER,
];

const productTypes: ProductType[] = [
  ProductType.MONSTERA,
  ProductType.PHILODENDREN,
  ProductType.KAKTEEN,
  ProductType.SUKKULENTEN,
  ProductType.KUNSTSTOFF,
  ProductType.TON,
  ProductType.ERDE,
  ProductType.WERKZEUG,
];

type ProductFormValues = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Category;
  productType: ProductType;
};

export default function AddProductPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "PFLANZEN",
      productType: "MONSTERA",
    },
  });
  const [images, setImages] = useState<File[]>([]);
  const [bestSeller, setBestSeller] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setImages((prev) => [...prev, ...files].slice(0, 4));

    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateProduct = async (
    data: ProductFormValues,
  ) => {
    if (images.length === 0) {
      return toast.error(
        "Bitte lade mindestens ein Bild hoch.",
      );
    }

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    formData.append("productType", data.productType);
    formData.append("category", data.category);

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        return toast.error(result.message);
      }

      toast.success(result.message);

      reset();

      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Da ist etwas schief gegangen.");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleCreateProduct)}
      className="mx-auto max-w-5xl space-y-8"
    >
      {/* header */}
      <div>
        <h2 className="text-3xl font-semibold text-primary">
          Artikel hinzufügen
        </h2>

        <p className="mt-2 text-muted-foreground">
          Lege einen neuen Artikel für dein Geschäft an.
        </p>
      </div>

      {/* images */}
      <section className="rounded-2xl border border-border bg-background p-6">
        <h2 className="mb-5 text-lg font-semibold">
          Produktbilder
        </h2>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              {images[index] ? (
                <div className="relative aspect-square overflow-hidden rounded-xl border border-border">
                  <img
                    src={URL.createObjectURL(images[index])}
                    alt="ausgewähltes Bild"
                    className="w-full h-full ovject-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background shadow transition hover:bg-destructive hover:text-white"
                  >
                    <FiX />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="flex aspect-square w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-border transition hover:border-primary hover:bg-surface"
                >
                  <LuPlus
                    size={30}
                    className="text-muted-foreground"
                  />
                  <span className="mt-3 text-sm text-muted-foreground">
                    Bild hochladen
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>

        <input
          hidden
          ref={inputRef}
          multiple
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <p className="mt-4 text-sm text-muted-foreground">
          Lade zwischen 1 und 4 Produktbildern hoch.
        </p>
      </section>

      {/* product information */}
      <section className="space-y-5 rounded-2xl border border-border bg-background p-6">
        <h2 className="text-lg font-semibold">
          Produktinformation
        </h2>
        <Input
          label="Name"
          {...register("name")}
          placeholder="Monstera"
        />
        <Input
          variant="textarea"
          {...register("description")}
          label="Beschreibung"
          placeholder="Beschreibe den Artikel ausführlich..."
        />

        <div className="grid gap-5 md:grid-cols-3">
          <Input
            label="Preis"
            placeholder="0.99€"
            {...register("price")}
          />
          <Input
            label="Menge auf Lager"
            placeholder="50"
            {...register("stock")}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Kategorie
            </label>
            <select
              {...register("category")}
              className="h-12 w-full rounded-lg border border-border bg-background px-4 outline-none transition focus:border-primary"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Produkttyp
            </label>
            <select
              {...register("productType")}
              className="h-12 w-full rounded-lg border border-border bg-background px-4 outline-none transition focus:border-primary"
            >
              {productTypes.map((productType) => (
                <option
                  key={productType}
                  value={productType}
                >
                  {productType}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <Button disabled={isSubmitting}>
          {isSubmitting
            ? "Artikel wird gespeichert..."
            : "Artikel speichern"}
        </Button>
      </div>
    </form>
  );
}
