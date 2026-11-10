import AdminLayout from "@/components/layouts/AdminLayout";
import { FiPackage, FiShoppingBag, FiUsers } from "react-icons/fi";

const stats = [
  {
    title: "Kund*innen insgesamt",
    value: "1,245",
    icon: FiUsers,
  },
  {
    title: "Artikel insgesamt",
    value: "156",
    icon: FiPackage
  },
  {title: "Bestellungen insgesamt",
    value: "428",
    icon: FiShoppingBag
  }
];


export default function DashboardPage() {
  return (
    <section>
      <div>
        <h2 className="text-3xl font-semibold text-primary">
          Dashboard
        </h2>

        <p className="mt-2 text-muted-foreground">
          Willkommen zurück! Hier ist eine Übersicht über deinen Shop.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="rounded-2xl border border-border bg-background p-6 transition hover:border-primary/40 hover:shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {stat.title}
                  </p>
                  <h3 className="mt-3 text-4xl font-semibold">
                    {stat.value}
                  </h3>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={26} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
