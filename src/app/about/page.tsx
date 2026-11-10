import React from 'react'
import FrontendLayout from '../../components/layouts/FrontendLayout'
import Image from 'next/image'

export default function AboutPage() {
    return (
        <FrontendLayout>
            <section className="py-16">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    {/* left contents */}
                    <div>
                        <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                            About Us
                        </span>

                        <h2 className="mt-4 text-4xl font-bold text-foreground sm:text-5xl">
                            Pflanzen für alle
                        </h2>

                        <p className="mt-6 leading-8 text-muted-foreground">
                            Wir sind davon úberzeugt, dass es fúr jede Person die richtige Pflanze gibt und wir helfen dir gerne dabei, genau die richtige für dich zu finden.
                        </p>

                        <p className="mt-4 leading-8 text-muted-foreground">
                            Wir bieten dir Qualität, Auswahl und ausgezeichneten Support.
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-3xl font-bold text-primary">
                                    1000+
                                </h3>
                                <p className="mt-1 text-muted-foreground">
                                    zufriedene Kund*innen
                                </p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-primary">
                                    vielfältige
                                </h3>
                                <p className="mt-1 text-muted-foreground">
                                    Premiumprodukte
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* right contents */}
                    <div className="overflow-hidden rounded-3xl">
                        <Image src="/images/plant8.jpg" alt="Grünpflanze in Topf" width={700} height={800} className="h-full w-full object-cover" />
                    </div>
                </div>
            </section>
        </FrontendLayout>
    )
}
