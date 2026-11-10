"use client";

import {
  Category,
  ProductType,
} from "@/generated/prisma/enums";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";
import { RiArrowDownDoubleFill } from "react-icons/ri";

interface ProductTypeFilterComponent {
  label: string;
  value: ProductType;
}

interface CategoryFilterComponent {
  label: string;
  value: Category;
}

const productTypes: ProductTypeFilterComponent[] = [
  { label: "Monstera", value: ProductType.MONSTERA },
  {
    label: "Philodendren",
    value: ProductType.PHILODENDREN,
  },
  { label: "Kakteen", value: ProductType.KAKTEEN },
  { label: "Sukkulenten", value: ProductType.SUKKULENTEN },
  { label: "Ton", value: ProductType.TON },
  { label: "Kunststoff", value: ProductType.KUNSTSTOFF },
  { label: "Erde", value: ProductType.ERDE },
  { label: "Werkzeug", value: ProductType.WERKZEUG },
];

const categories: CategoryFilterComponent[] = [
  { label: "Pflanzen", value: Category.PFLANZEN },
  { label: "Pflanztöpfe", value: Category.PFLANZTOEPFE },
  { label: "Zubehör", value: Category.ZUBEHOER },
];

export default function FilterOptions() {
  const [showFilter, setShowFilter] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategories =
    searchParams
      .get("category")
      ?.split(",")
      .filter(Boolean) ?? [];
  const selectedTypes =
    searchParams
      .get("productType")
      ?.split(",")
      .filter(Boolean) ?? [];

  const toggleFilter = (
    key: "category" | "productType",
    value: string,
  ) => {
    const params = new URLSearchParams(
      searchParams.toString(),
    );
    const values =
      params.get(key)?.split(",").filter(Boolean) ?? [];

    const updatedValues = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value];

    if (updatedValues.length === 0) {
      params.delete(key);
    } else {
      params.set(key, updatedValues.join(","));
    }

    router.replace(`/shop?${params.toString()}`);
  };

  return (
    <aside className="w-full sm:min-w-60 sm:max-w-60">
      <button
        onClick={() =>
          setShowFilter((showFilter) => !showFilter)
        }
        className="mb-4 flex items-center gap-2 text-xl font-semibold sm:cursor-default"
      >
        FILTERS
        <RiArrowDownDoubleFill
          className={`transition-transform duration-300 sm:hidden ${showFilter ? "rotate-90" : ""}`}
        />
      </button>

      {/* filters */}
      <div
        className={`space-y-6 sm:block ${showFilter ? "block" : "hidden"}`}
      >
        {/* Categories */}
        <div className="rounded-xl border border-border p-5">
          <h3 className="mb-4 text-sm font-semibold tracking-wide">
            KATEGORIEN
          </h3>

          <div className=" space-y-3 text-sm text-muted-foreground">
            {categories.map((category) => (
              <label
                key={category.value}
                className="flex items-center gap-3"
              >
                <input
                  checked={selectedCategories.includes(
                    category.value,
                  )}
                  onChange={() =>
                    toggleFilter("category", category.value)
                  }
                  type="checkbox"
                />
                <span>{category.label}</span>
              </label>
            ))}
          </div>
        </div>
        {/* ProductTypes */}
        <div className="rounded-xl border border-border p-5">
          <h3 className="mb-4 text-sm font-semibold tracking-wide">
            SPEZIFIKATIONEN
          </h3>

          <div className=" space-y-3 text-sm text-muted-foreground">
            {productTypes.map((type) => (
              <label
                key={type.value}
                className="flex items-center gap-3"
              >
                <input
                  checked={selectedTypes.includes(
                    type.value,
                  )}
                  onChange={() =>
                    toggleFilter("productType", type.value)
                  }
                  type="checkbox"
                />
                <span>{type.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
