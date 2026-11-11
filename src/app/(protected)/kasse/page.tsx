import CheckoutPageComponent from "@/components/checkout/CheckoutPageComponent";
import { getProfile } from "@/server-actions/user/getProfile";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
  const user = await getProfile();

  if (!user) {
    redirect("/signin");
  }
  return <CheckoutPageComponent user={user} />;
}
