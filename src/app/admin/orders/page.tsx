import Link from "next/link"
import { FiEye } from "react-icons/fi"

const orders = [
    {
        id: "#1001",
        customer: "Marta Musterman",
        total: 45.98,
        items: 2,
        payment: "Bezahlt",
        status: "Geliefert",
        date: "17. Juli 2026"
    },
    {
        id: "#1002",
        customer: "Mario Musterman",
        total: 145.98,
        items: 5,
        payment: "Bezahlt",
        status: "Im Bearbeitung",
        date: "20. Juli 2026"
    },
    {
        id: "#1003",
        customer: "Martina Musterman",
        total: 25.99,
        items: 1,
        payment: "In Bearbeitung",
        status: "Im Bearbeitung",
        date: "23. Juli 2026"
    },
]

export default function OrdersPage() {
  return (
    <section>
        {/* header */}
    
        <div>
          <h2 className="text-3xl font-semibold text-primary">
            Bestellungen
          </h2>

          <p className="mt-2 text-muted-foreground">
            Sehe und verwalte Bestellungen von Kund*innen.
          </p>
        </div>

        {/* table */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-background">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="border-b border-border bg-surface">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Bestellung
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Kund*in
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Artikelmenge
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Gesamtpreis
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Bezahlung
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Datum
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Aktion
                </th>
              </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b border-border last:border-0 hover:bg-surface/50">
                                <td className="px-6 py-5">
                                    <div>
                                        <p className="font-medium">{order.id}</p>
                                        <p className="text-sm text-muted-foreground">{order.date}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    {order.customer}
                                </td>
                                <td className="px-6 py-5">
                                   {order.items} 
                                </td>
                                <td className="px-6 py-5">
                                    {order.total.toFixed(2)}€
                                </td>
                                <td className="px-6 py-5">
                                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${order.payment === "Bezahlt" ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400" : order.payment === "In Bearbeitung" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400" :"bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"}`}>
                                        {order.payment}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                   <span className="rounded-full px-3 py-1 text-xs font-medium">
                                    {order.status}
                                   </span>
                                </td>

                                <td className="px-6 py-5">
                                   {order.date} 
                                </td>
                                <td className="px-6 py-5">
                                   <Link href={`/admin/orders/orderId`}>
                                   <button className="rounded-lg p-4 transition hover:bg-surface">
                                    <FiEye />
                                    </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
      
    </section>
  )
}
