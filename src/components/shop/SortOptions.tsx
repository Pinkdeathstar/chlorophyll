"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function SortOptions() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") ?? "newest";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    params.set("sort", value);

    router.replace(`/shop?${params.toString()}`);
  };
  return (
    <div className="flex justify-between items-center text-base sm:text-2xl mb-4">
      <h2 className="text-primary font-semibold">Shop</h2>

      <select
        value={sort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="border border-border text-sm p-3"
      >
        <option value="low-high">Preis aufsteigend</option>
        <option value="high-low">Preis absteigend</option>
        <option value="newest">Neueste zuerst</option>
        <option value="oldest">Älteste zuerst</option>
      </select>
    </div>
  );
}
