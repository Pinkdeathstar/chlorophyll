const features = [
    {
        icon: FiRefreshCw,
        title: "Einfacher Umtausch",
        description: "Tausche Produkte schnell und problemlos um."
    },
    {
        icon: FiRotateCcw,
        title: "Rückgabegarantie",
        description: "Nicht zufrieden? Schick deine Bestellung innerhalb 14 Tagen zurück."
    },
    {
        icon: FiHeadphones,
        title: "Bester Support",
        description: "Bei Fragen und Problemen helfen wir jederzeit."
    }
]
import React from 'react'
import { FiHeadphones, FiRefreshCw, FiRotateCcw } from 'react-icons/fi'
import SectionHeader from '../ui/SectionHeader'

export default function ShopWithUs() {
    return (
        <section className="py-12">
            <SectionHeader title="Warum solltest du bei uns bestellen?" subTitle="Wir sind überzeugt von der Qualität unserer Produkte und möchten auch dich von einem grünen Zuhause überzeugen." />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3py-6">
                {features.map((feature) => {
                    const Icon = feature.icon
                    return (
                        <div key={feature.title} className="rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                <Icon className="text-primary" size={30} />
                            </div>
                            <h3 className="mt-6 text-xl font-semibold text-foreground">
                                {feature.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                {feature.description}
                            </p>
                        </div>
                    )
                })}
            </div>

        </section>
    )
}
