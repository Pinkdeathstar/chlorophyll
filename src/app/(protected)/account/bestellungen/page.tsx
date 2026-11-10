import FrontendLayout from "@/components/layouts/FrontendLayout";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Image from "next/image";
import Link from "next/link";
import { FiEye } from "react-icons/fi";

const orders = [
  {
    id: "12344",
    image: "/images/potDummy.png",
    totalItems: 3,
    totalPrice: 67.97,
    date: "10.Februar 2026",
    status: "Abgeschlossen",
  },
  {
    id: "12345",
    image: "/images/plantDummy.png",
    totalItems: 1,
    totalPrice: 23.99,
    date: "12.Juni 2026",
    status: "In Bearbeitung",
  },
];

export default function OrdersPage() {
  return (
    <FrontendLayout>
      <section className="mx-auto max-w-6xl py-12">
        <BreadCrumb
          items={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Account",
              href: "/account",
            },
            {
              label: "Bestellungen",
            },
          ]}
        />

        <p className="text-muted-foreground mt-2">
          Verfolge deine letzten Bestellungen.
        </p>

        <div className="mt-10 space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-6 rounded-2xl border border-border p-5 transition hover:shadow-sm md:flex-row md:items-center"
            >
              <Image src={order.image} alt={order.id} width={110} height={130} className="rounded-xl object-cover" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-semibold text-lg">
                      Bestellung {order.id}
                    </h2>

                    <span className={`rounded-full px-3 py-1 text-xs font-medium bg-green-100 text-green-700`}>
                      Zugestellt
                    </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-5 text-sm md:grid-cols-3">
                  <div>
                    <p className="text-muted-foreground">
                      Bestellmenge
                    </p>
                    <p className="mt-1 font-semibold">
                      {order.totalItems}
                    </p>
                  </div>
                    
                  <div>
                    <p className="text-muted-foreground">
                      Bestellwert
                    </p>
                    <p className="mt-1 font-semibold">
                      {order.totalPrice.toFixed(2)}€
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">
                      Bestelldatum
                    </p>
                    <p className="mt-1 font-semibold">
                      {order.date}
                    </p>
                  </div>
                </div>

              </div>

              <Link href={"/account/bestellungen/${order.id"}>
              <button className="rounded-lg p-4 transition bg-surface cursor-pointer">
                <FiEye />
              </button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </FrontendLayout>
  );
}
