import FrontendLayout from "../../components/layouts/FrontendLayout";
import FilterOptions from "../../components/shop/FilterOptions";
import {
  Category,
  ProductType,
} from "@/generated/prisma/enums";
import { Suspense } from "react";
import ShopProducts from "@/components/shop/ShopProducts";
import SortOptions from "@/components/shop/SortOptions";
import ProductCardSkeleton from "@/components/loading/skeletons/ProductCardSkeleton";

interface ShopPageProps {
  searchParams: Promise<{
    categoriy?: Category;
    productType?: ProductType;
    sort?: "low-high" | "high-low" | "newest" | "oldest";
  }>;
}

export default async function page({
  searchParams,
}: ShopPageProps) {
  const params = await searchParams;
  return (
    <FrontendLayout>
      <div className="flex flex-col sm:flex-row gap-5 my-10">
        <FilterOptions />
        <div className="flex-1">
          <SortOptions />
          <Suspense
            fallback={
              <ProductCardSkeleton number={8} shop={true} />
            }
          >
            <ShopProducts searchParams={params} />
          </Suspense>
        </div>
      </div>
    </FrontendLayout>
  );
}
