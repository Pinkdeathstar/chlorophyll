import FrontendLayout from "@/components/layouts/FrontendLayout";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Button from "@/components/ui/Button";
import { logout } from "@/server-actions/auth/logout";
import { getProfile } from "@/server-actions/user/getProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaUser } from "react-icons/fa6";
import {
  FiLogOut,
  FiMapPin,
  FiPackage,
  FiUser,
} from "react-icons/fi";

export default async function AccountPage() {
  const userProfile = await getProfile();

  if (!userProfile) {
    redirect("/signin");
  }

  const address = userProfile.addresses[0];
  return (
    <FrontendLayout>
      <section className="mx-auto max-w-5xl py-12">
        <div>
          <BreadCrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Account" },
            ]}
          />
          <p className="text-muted-foreground mt-2">
            Verwalte dein Profil, deine Bestellungen und
            deinen Account.
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {/* profile */}
          <div className="rounded-2xl border border-border p-6">
            <div className="mb-6 flex items-center gap-3">
              <FiUser className="text-primary" size={22} />
              <h2 className="text-xl font-semibold">
                Profil
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">
                  Vollständiger Name
                </p>
                <p className="font-medium">
                  {userProfile.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Email
                </p>
                <p className="font-medium">
                  {userProfile.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Telefonnummer
                </p>
                <p className="font-medium">
                  {userProfile.phone ?? "Nicht angegeben"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Profil besteht seit
                </p>
                <p className="font-medium">
                  {userProfile.createdAt.toLocaleDateString(
                    "de-DE",
                    { month: "long", year: "numeric" },
                  )}
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <Link href="/account/edit">
                <Button leftIcon={<FaUser />}>
                  Profil anpassen
                </Button>
              </Link>
              <Link href="/account/bestellungen">
                <Button
                  leftIcon={<FiPackage />}
                  variant="outline"
                >
                  Meine Bestellungen
                </Button>
              </Link>
            </div>

            <div className="flex justify-center mt-4">
              <Button
                onClick={logout}
                variant="outline"
                leftIcon={<FiLogOut />}
              >
                Ausloggen
              </Button>
            </div>
          </div>

          {/* address */}
          {address ? (
            <div className="rounded-xl border border-border p-6">
              <div className="flex items-center gap-3 mb-3">
                <FiMapPin
                  className="text-primary"
                  size={22}
                />

                <h2 className="text-zl font-semibold">
                  Versandadresse
                </h2>
              </div>

              <div className="space-y-1">
                <p>
                  {address.firstName} {address.lastName}
                </p>
                <p>{address.street}</p>
                <p>
                  {address.postalCode} {address.city}
                </p>
                <p>{address.country}</p>
                {address.phone && <p>{address.phone}</p>}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">
              Noch keine Versandadresse angegeben.
            </p>
          )}
        </div>
      </section>
    </FrontendLayout>
  );
}
