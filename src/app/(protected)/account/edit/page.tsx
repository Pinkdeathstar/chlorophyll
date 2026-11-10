import FrontendLayout from "@/components/layouts/FrontendLayout";
import BreadCrumb from "@/components/ui/BreadCrumb";

import EditProfileForm from "@/components/user/EditProfileForm";
import { getProfile } from "@/server-actions/user/getProfile";

export default async function EditProfilePage() {
  const userProfile = await getProfile();
  return (
    <FrontendLayout>
      <section className="mx-auto max-w-4xl p-12">
        <BreadCrumb
          items={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "Account",
              href: "/account",
            },
            {
              label: "Anpassen",
            },
          ]}
        />

        <p className="text-muted-foreground mt-2">
          Passe dein Profil an.
        </p>

        <EditProfileForm userProfile={userProfile} />
      </section>
    </FrontendLayout>
  );
}
