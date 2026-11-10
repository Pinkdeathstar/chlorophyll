import { logout } from "@/server-actions/auth/logout";
import Link from "next/link";
import {
  FiBox,
  FiHome,
  FiLogOut,
  FiPackage,
  FiShoppingBag,
} from "react-icons/fi";
import { LuCirclePlus } from "react-icons/lu";

interface SidebarContentProps {
  pathname: string;
  closeSidebar: () => void;
}

const navigation = [
  {
    title: "MAIN",
    items: [
      {
        href: "/admin",
        label: "Dashboard",
        icon: FiHome,
      },
    ],
  },
  {
    title: "KATALOG",
    items: [
      {
        href: "/admin/products",
        label: "Artikel",
        icon: FiPackage,
      },
      {
        href: "/admin/add-product",
        label: "Artikel erstellen",
        icon: LuCirclePlus,
      },
    ],
  },
  {
    title: "VERKÄUFE",
    items: [
      {
        href: "/admin/orders",
        label: "Verkäufe",
        icon: FiBox,
      },
    ],
  },
];

export default function SidebarContent({
  pathname,
  closeSidebar,
}: SidebarContentProps) {
  return (
    <>
      <div className="border-b border-border px-6 py-6">
        <Link
          href="/admin"
          className="text-2xl font-semibold text-primary"
        >
          Admin Panel
        </Link>
      </div>

      {/* navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {navigation.map((section) => (
          <div key={section.title} className="mb-8">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                const isActive = pathname === item.href;
                return (
                  <Link
                    href={item.href}
                    key={item.href}
                    onClick={() => closeSidebar()}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-surface hover:text-foreground"}`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* bottom */}
      <div className="border-t border-border p-4">
        <Link
          href="/shop"
          className="text-primary mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-surface"
        >
          <FiShoppingBag size={18} />
          Shop ansehen
        </Link>

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-destructive transition hover:bg-destructive/10"
        >
          <FiLogOut size={18} />
          Ausloggen
        </button>
      </div>
    </>
  );
}
