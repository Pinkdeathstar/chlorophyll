"use client";

import FrontendLayout from "@/components/layouts/FrontendLayout";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { FaMoneyBillWave, FaStripe } from "react-icons/fa6";
import z from "zod";
import Button from "../ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getProfile } from "@/server-actions/user/getProfile";
import { useCartStore } from "@/store/cart-store";

interface CheckoutPageComponentProps {
  user: Awaited<ReturnType<typeof getProfile>>;
}

const checkoutSchema = z.object({
  firstName: z
    .string()
    .min(
      2,
      "Vorname muss mindestens zwei Zeichen lang sein.",
    ),

  lastName: z
    .string()
    .min(
      2,
      "Nachname muss mindestens zwei Zeichen lang sein.",
    ),

  email: z.email(
    "Bitte gib eine gültige Emailadresse ein.",
  ),

  phone: z
    .string()
    .min(9, "Bitte gib eine gültige Telefonnummer an."),

  country: z.string().min(2, "Pflichtfeld"),

  city: z.string().min(2, "Pflichtfeld"),

  address: z.string().min(5, "Pflichtfeld"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPageComponent({
  user,
}: CheckoutPageComponentProps) {
  const { cartItems, clearCart, total } = useCartStore();
  const address = user?.addresses[0];
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: address?.firstName ?? "",
      lastName: address?.lastName ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      country: address?.country ?? "",
      city: address?.city ?? "",
      address: address?.street ?? "",
    },
  });
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<
    "überweisung" | "stripe"
  >("überweisung");

  const onSubmit = async (data: CheckoutFormValues) => {
    console.log({
      ...data,
      paymentMethod,
    });
  };

  const shipping = 0;
  const tax = total() * 0.19;
  const subtotal = total() - tax - shipping;

  return (
    <FrontendLayout>
      <section className="mx-auto max-w-7xl py-12">
        <div className="mb-10">
          <BreadCrumb
            items={[
              {
                label: "Home",
                href: "/",
              },
              {
                label: "Einkaufswagen",
                href: "einkaufswagen",
              },
              {
                label: "Kasse",
              },
            ]}
          />

          <p className="mt-2 text-muted-foreground">
            Schließe deine Bestellung sicher ab.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-10 lg:grid-cols-[2fr_1fr]"
        >
          {/* left */}
          <div className="space-y-8">
            {/* Versandadresse */}
            <div className="rounded-2xl border border-border p-6">
              <h2 className="font-semibold text-2xl">
                Versandadresse
              </h2>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <Input
                  label="Vorname"
                  placeholder="Marta"
                  {...register("firstName")}
                  error={errors.firstName?.message}
                />
                <Input
                  label="Nachname"
                  placeholder="Musterman"
                  {...register("lastName")}
                  error={errors.lastName?.message}
                />
                <Input
                  label="Email"
                  placeholder="beispiel@beispiel.de"
                  {...register("email")}
                  error={errors.email?.message}
                />
                <Input
                  label="Telefonnummer"
                  placeholder="0123/..."
                  {...register("phone")}
                  error={errors.phone?.message}
                />
                <Input
                  label="Land"
                  {...register("country")}
                  error={errors.country?.message}
                />
                <Input
                  label="Ort mit PLZ"
                  {...register("city")}
                  error={errors.city?.message}
                />
                <div>
                  <Input
                    label="Straße und Hausnummer"
                    variant="textarea"
                    {...register("address")}
                    error={errors.address?.message}
                  />
                </div>
              </div>
            </div>
            {/* Zahlungsart */}
            <div className="rounded-2xl border border-border p-6">
              <h2 className="text-xl font-semibold">
                Zahlungsart
              </h2>

              <div className="mt-6 space-y-4">
                <button
                  type="button"
                  onClick={() =>
                    setPaymentMethod("überweisung")
                  }
                  className={`flex w-full items-center rounded-xl border p-5 text-left transition ${paymentMethod === "überweisung" ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${paymentMethod === "überweisung" ? "border-primary" : "border-border"}`}
                    >
                      {paymentMethod === "überweisung" && (
                        <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                      )}
                    </div>

                    <FaMoneyBillWave
                      className="text-green-600"
                      size={24}
                    />

                    <div>
                      <p className="font-semibold">
                        Überweisung
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Deine Bestellung wird verschickt
                        sobald deine Bezahlung bei uns
                        eingegangen ist.
                      </p>
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("stripe")}
                  className={`flex w-full items-center rounded-xl border p-5 text-left transition ${paymentMethod === "stripe" ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${paymentMethod === "stripe" ? "border-primary" : "border-border"}`}
                    >
                      {paymentMethod === "stripe" && (
                        <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                      )}
                    </div>

                    <FaStripe
                      className="text-indigo-600"
                      size={30}
                    />

                    <div>
                      <p className="font-semibold">
                        Mit Stripe bezahlen
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Visa, Mastercard, etc.
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="rounded-xl border border-border p-6 h-fit">
            <h2 className="text-2xl font-bold">
              Zusammenfassung
            </h2>

            <div className="mt-6 space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.cartKey}
                  className="flex gap-4"
                >
                  <Image
                    src={item.image}
                    alt={item.image}
                    width={70}
                    height={85}
                    className="rounded-lg"
                  />

                  <div className="flex flex-1 justify-between">
                    <div>
                      <p className="font-medium">
                        {item.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Menge: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      {(item.price * item.quantity).toFixed(
                        2,
                      )}
                      €
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span>Zwischensumme</span>
                <span>{subtotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span>Versandkosten</span>
                <span>kostenlos</span>
              </div>
              <div className="flex justify-between">
                <span>MwSt.</span>
                <span>{tax.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between border-t border-border pt-4 text-xl font-bold">
                <span>Gesamtsumme</span>
                <span>{total().toFixed(2)}€</span>
              </div>
            </div>

            <Button
              fullWidth
              className="mt-8"
              onClick={() => router.push("/kasse")}
            >
              {paymentMethod === "überweisung"
                ? "Zahlungspflichtig Bestellen"
                : "Weiter zu Stripe"}
            </Button>

            <Link
              href="/shop"
              className="mt-5 block text-center text-sm font-medium text-primary hover:underline"
            >
              Weiter Einkaufen
            </Link>
          </div>
        </form>
      </section>
    </FrontendLayout>
  );
}
