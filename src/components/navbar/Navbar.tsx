"use client";
import { useSearchStore } from "@/store/search-store";
import {
  usePathname,
  useRouter,
} from "next/dist/client/components/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi";
import { IoBagOutline, IoSearch } from "react-icons/io5";
import CartCount from "./CartCount";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Über uns" },
  { href: "/contact", label: "Kontakt" },
];

export default function Navbar() {
  const { openSearch } = useSearchStore();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <header className="border-b border-border bg-background">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-bold tracking-tight text-foreground"
        >
          Chlorophyll
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                className={`relative text-sm font-medium uppercase transition-colors ${isActive ? "text-forground" : "text-muted-foreground hover:text-foreground"}`}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Buttons */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            onClick={() => openSearch()}
            className="rounded-full p-2 text-foreground transition-colors hover:bg-surface"
          >
            <IoSearch size={22} />
          </button>

          {/* User */}
          <button
            className="rounded-full p-2 text-foreground transition-colors hover:bg-surface"
            onClick={() => router.push("/signin")}
          >
            <FaRegUser size={22} />
          </button>

          {/*cart badge*/}
          <button
            className="relative rounded-full p-2 text-foreground transition-colors hover:bg-surface"
            onClick={() => router.push("/einkaufswagen")}
          >
            <IoBagOutline size={23} />

            <CartCount />
          </button>

          {/* mobile menu button */}
          <button
            className="text-2x1 text-foreground md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <Link
                className="rounded-md px-2 py-3 text-muted-foreground transition hover:bg-surface hover:text-foreground"
                href={link.href}
                key={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              className="mt-4 rounded-lg bg-primary py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover"
              onClick={() => router.push("/signin")}
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
