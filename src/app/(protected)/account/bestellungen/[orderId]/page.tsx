import FrontendLayout from "@/components/layouts/FrontendLayout";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { FiArrowLeft, FiMapPin, FiPackage } from "react-icons/fi";

const order = {
    id: "ORD-8FK2P9",
    createdAt: "10. Januar 2026",
    status: "IN BEARBEITUNG",
    paymentMethod: "Überweisung",
    paymentStatus: "Abgeschlossen",

    subtotal: 72.97,
    shipping: 0,
    tax: 10,
    total: 82.97,

    address: {
        firstName: "Marta",
        lastName: "Mustermann",
        phone: "0123/456789",
        street: "Efeuweg 3",
        city: "Blumenhain",
        country: "Deutschland"
    },

    items : [
        {
            id: 7,
            name: "Philodendron Gloriosum",
            image: "/images/plantDummy.png",
            price: 25.99,
            quantity: 1,
        },
        {
            id: 8,
            name: "Tontopf blau 30cm",
            image: "/images/potDummy.png",
            price: 45.99,
            quantity: 1,
        },
        {
            id: 9,
            name: "Topf, Kunststoff, 16cm, rosa",
            image: "/images/potDummy.png",
            price: 10.99,
            quantity: 1,
        }
    ]
}

export default function OrderPage() {
  return (
    <FrontendLayout>
        <section className="mx-auto max-w-7xl py-12">
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
                          href: "/account/bestellungen"
                        },
                        {
                            label:order.id
                        }
                      ]}
                    />
                    {/* header */}
                    <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-border p-6 md:flex-row md:items-center md:justify-between">
                        <div>
                           <Link href="/account/bestellungen">
                                <Button variant="outline" className="mb-5" leftIcon={<FiArrowLeft/>}>
                                    Zurück zu Bestellungen
                                </Button>
                            </Link>

                            <h2 className="text-3xl font-bold">
                                {order.id}
                            </h2>

                            <p className="mt-2 text-muted-foreground">
                                Bestellt am {order.createdAt}
                            </p>
                        </div>

                        <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                            In Bearbeitung
                        </span>
                    </div>

                    <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
                        {/* left */}
                        <div className="space-y-6">
                            {/* ordered items */}
                            <div className="rounded-2xl border border-border p-6">
                                <div className="flex items-center gap-3">
                                    <FiPackage className="text-primary" />

                                    <h2 className="text-xl font-semibold">
                                        Bestellte Artikel
                                    </h2>
                                </div>

                                <div className="mt-8 space-y-6">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex flex-col gap-5 rounded-xl border border-border p-5 sm:flex-row">
                                            <Image src={item.image} alt={item.name} width={130} height={160} className="rounded-xl object-cover"/>

                                            <div className="flex flex-1 justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold">
                                                        {item.name}
                                                    </h3>

                                                    <div className="mt-3 flex flex-wrap gap-2 text-sm">
                                                        <span className="rounded-full bg-surface px-3 py-1">
                                                            Menge: {item.quantity}
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className="text-xl font-bold">
                                                    {(item.price * item.quantity).toFixed(2)}€
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* right */}
                        <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
                            {/* summary */}
                            <div className="rounded-xl border border-border p-6">
                                <h2 className="text-2xl font-bold">
                                    Zusammenfassung
                                </h2>

                                <div className="mt-8 space-y-4">
                                    <div className="flex justify-between">
                                        <span>Zwischensumme</span>
                                        <span>{order.subtotal.toFixed(2)}€</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Versandkosten</span>
                                        <span>kostenlos</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>MwSt.</span>
                                        <span>{order.tax.toFixed(2)}€</span>
                                    </div>
                                    <div className="flex justify-between border-t border-border pt-4 text-xl font-bold">
                                        <span>Gesamtsumme</span>
                                        <span>{order.total.toFixed(2)}€</span>
                                    </div>
                                </div>
                            </div>

                            {/* shipping */}
                            <div className="rounded-2xl border border-border p-6">
                                <div className="flex items-center gap-3">
                                    <FiMapPin className="text-primary" />

                                    <h2 className="text-xl font-semibold">
                                        Versandadresse
                                    </h2>   
                                </div>

                                <div className="mt-5 space-y-2 text-muted-foreground">
                                    <p className="font-medium text-foreground">
                                        {order.address.firstName} {order.address.lastName}
                                    </p>
                                    <p>
                                        {order.address.phone}
                                    </p>
                                    <p>
                                       {order.address.street} 
                                    </p>
                                    <p>
                                        {order.address.city}
                                    </p>
                                    <p>
                                        {order.address.country}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-border p-6">
                                 <div className="flex items-center gap-3">
                                    <FaMoneyBill1Wave className="text-primary" />

                                    <h2 className="text-xl font-semibold">
                                        Bezahlung
                                    </h2>   
                                </div>     
                                <div className="mt-5 space-y-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Zahlungsart
                                        </p>
                                        <p className="font-semibold">
                                            {order.paymentMethod}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">
                                            Zahlungsstatus
                                        </p>
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                            {order.paymentStatus}
                                        </span>
                                    </div>
                                </div>  
                            </div>
                        </div>

                    </div>

        </section>
    </FrontendLayout>
  )
}
