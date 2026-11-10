export default function ProductPageSkeleton() {
  return (
    <section className="animate-pulse py-12">
      {/* Breadcrumb */}

      <div className="h-4 w-64 rounded bg-surface" />
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* images */}
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          {/* gallery images */}
          <div className="flex gap-3 md:flex-col">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-24 w-20 object-cover md:h-28 md:w-24"
              />
            ))}
          </div>
          {/* main image */}
          <div className="relative h-87.5 w-full  rounded-2xl bg-surface sm:h-125"></div>
        </div>
        {/* Product details */}
        <div>
          {/* title */}
          <div className="h-10 w-3/4 rounded bg-surface" />

          {/* rating */}

          <div className="mt-5 h-5 w-40 rounded bg-surface" />

          {/* price */}
          <div className="mt-6 h-8 w-28 rounded bg-surface" />

          {/* description */}
          <div className="mt-6 space-y-3">
            <div className="h-4 w-full rounded bg-surface" />
            <div className="h-4 w-11/12 rounded bg-surface" />
            <div className="h-4 w-9/12 rounded bg-surface" />
          </div>

          {/* buttons */}
          <div className="mt-8 h-12 flex-1 rounded-xl w-full sm:w-[50%] bg-surface" />
        </div>
      </div>
    </section>
  );
}
