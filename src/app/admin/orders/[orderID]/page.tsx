import Button from "@/components/ui/Button"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Monstera variegata",
    category: "Pflanzen",
    quantity: 2,
    image: "/images/plantDummy.png",
    price: 22.99,
  },
  {
    id: 2,
    name: "Aloe Vera",
    category: "Pflanzen",
    quantity: 1,
    image: "/images/plantDummy.png",
    price: 11.99,
  },
]

export default function OrderPage() {
  return (
    <section>
        {/* header */}
        <div>
          <h2 className="text-3xl font-semibold text-primary">
            Bestellung #21212
          </h2>

          <p className="mt-2 text-muted-foreground">
            Bestellt am 17.Juli 2026.
          </p>
        </div>


        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
            {/* left side */}
            <div className="space-y-8">
                {/* customer */}
                <div className="rounded-2xl border border-border bg-background p-6">
                    <h2 className="text-lg font-semibold">
                        Kundeninformationen
                    </h2>

                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Name
                            </p>
                            <p className="mt-1 font-medium">
                                Marta Musterman
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Email
                            </p>
                            <p className="mt-1 font-medium">
                                beispiel@beispiel.de
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Telefon
                            </p>
                            <p className="mt-1 font-medium">
                                0123/456789
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Adresse
                            </p>
                            <p className="mt-1 font-medium">
                                Efeuweg 12
                                <br />
                                12345 Blumenhain
                            </p>
                        </div>
                    </div>
                </div>

                {/* products */}
                <div className="rounded-2xl border border-border bg-background p-6">
                    <div className="border-b border-border">
                        <h2 className="text-lg font-semibold">
                            Bestellte Artikel
                        </h2>

                        <div className="divide-y divide-border">
                            {products.map((product) => (
                                <div key={product.id} className="flex items-center gap-5 p-6">
                                    <Image src={product.image} alt={product.name} width={80} height={90} className="rounded-lg object-cover" />

                                    <div className="flex-1">
                                        <h3 className="font-semibold">
                                            {product.name}
                                        </h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Menge:{product.quantity}
                                        </p>
                                    </div>

                                    <div className="font-semibold">
                                        {(product.price * product.quantity).toFixed(2)}€
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* right side */}

            <div className="space-y-8">
                {/* status*/}
                <div className="rounded-2xl border border-border bg-background p-6">
                    <h2 className="text-lg font-semibold">
                        Bestellstatus
                    </h2>

                    <div className="mt-6">
                        <label className="mb-2 block text-sm font-medium">
                            Status
                        </label>

                        <select className="h-12 w-full rounded-lg border border-border bg-background px-4 outline-none focus:border-primary">
                           
                            <option>In Bearbeitung</option>
                            <option>Versandt</option>
                            <option>Zugestellt</option>
                            <option>Storniert</option>
                        </select>
                    </div>

                    <Button className="mt-6 w-full"> Bestellung aktualisieren</Button>
                </div>
                {/* summary */}
                <div className="rounded-2xl border border-border bg-background p-6">
                    <h2 className="text-lg font-semibold">
                        Bestellzusammenfassung
                    </h2>

                    <div className="mt-6 space-y-4">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">
                                Zwischensumme
                            </span>
                            <span>333€</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">
                                Versand
                            </span>
                            <span>0€</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">
                                MwSt.
                            </span>
                            <span>30€</span>
                        </div>

                        <div className="border-t border-border pt-4 flex justify-between text-lg font-semibold">
                            
                            <span>
                                Gesamtsumme
                            </span>
                            <span>363€</span>
                        
                        </div>
                    </div>
                </div>

                {/* payment */}
                <div className="rounded-2xl border border-border bg-background p-6">
                    <h2 className="text-lg font-semibold">
                        Bezahlung
                    </h2>
                    <div className="mt-5 flex items-center justify-between">
                        <span className="text-muted-foreground">
                            Zahlungsart
                        </span>
                        <span>Stripe</span>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                        <span className="text-muted-foreground">
                            Status
                        </span>
                        <span>Bezahlt</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
