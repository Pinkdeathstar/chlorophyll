import React from 'react'
import FrontendLayout from '../../components/layouts/FrontendLayout'
import Image from 'next/image'

export default function page() {
    return (
        <FrontendLayout>
            <section className="py-16">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    {/* left contents */}
                    <div className="overflow-hidden rounded-3xl">
                        <Image src="/images/plant8.jpg" alt="Grünpflanze in Topf" width={700} height={800} className="h-full w-full object-cover" />
                    </div>

                    {/* right contents */}
                    <div>
                        <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                            Tritt mit uns in Kontakt
                        </span>

                        <h2 className="mt-4 text-4xl font-bold text-foreground sm:text-5xl">
                            Wir freuen uns von dir zu hören
                        </h2>

                        <p className="mt-6 leading-8 text-muted-foreground">
                            Egal ob du eine Frage zu einer Bestellung hast, du Hilfe bei der Auswahl benötigst oder uns Feedback geben möchtest, wir freuen uns, von dir zu hören.
                        </p>

                        <h3 className="mt-6 text-xl font-bold text-foreground">
                            Adresse
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                            Blumenstraße 99
                            <br />
                            12345 Grüningen
                        </p>

                        <h3 className="mt-6 text-xl font-bold text-foreground">
                            Telefon
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                            +49(0)123/456789
                        </p>

                        <h3 className="mt-6 text-xl font-bold text-foreground">
                            Email
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                            support@chlorophyll.com
                        </p>



                    </div>
                </div>
            </section>
        </FrontendLayout>
    )
}
