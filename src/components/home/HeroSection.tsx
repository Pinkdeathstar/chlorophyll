import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HeroSection() {
  return (
    <section>
      <div className="mx-auto flex flex-col-reverse mt-6 lg:mt-0 items-center gap-12 lg:grid lg:min-h-[calc(100vh-64px)] lg:grid-cols-2 lg:px-8">
        {/* content */}
        <div className="max-w-xl text-center lg:text-left">
          <span className="inline-flex rounded-full bg-surface px-4 py-2 text-sm font-medium text-muted-foreground">
            Neuzugänge
          </span>
          <h2 className="mt-6 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Bring Grün in dein Leben!
          </h2>

          <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Entdecke unsere Pflanzen, Töpfe und alles was du
            sonst brauchst um deinen grünen Daumen zu
            entdecken.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/shop"
              className="rounded-lg bg-primary px-8 py-4 text-center font-semibold text-primary-foreground transition hover:bg-primary-hover"
            >
              Schau dich um
            </Link>

            <Link
              href="/about"
              className="rounded-lg border border-border px-8 py-4 text-center font-semibold text-foreground transition hover:bg-surface"
            >
              Mehr über uns
            </Link>
          </div>
        </div>

        {/* hero-image */}
        <div className="relative w-full max-w-md lg:max-w-none">
          <div className="absolute inset-0 rounded-3xl bg-surface" />

          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src="/images/plant2.jpg"
              alt="Bild einer Grünpflkanze in einem weißen Topf"
              width={700}
              height={800}
              priority
              className="h-auto w-full object-cover lg:h-130"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
