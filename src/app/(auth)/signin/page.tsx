"use client";

import FrontendLayout from "@/components/layouts/FrontendLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { authClient } from "@/lib/auth-client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import z from "zod";

const signinSchema = z.object({
  email: z.email(
    "Bitte gib eine gültige Emailadresse ein.",
  ),
  password: z
    .string()
    .min(
      8,
      "Das Passwort muss mindestens 8 Zeichen lang sein.",
    ),
});

type SignInFormValues = z.infer<typeof signinSchema>;

export default function SignInPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error(error.message as string);
      return;
    }

    toast.success("Anmeldung erfolgreich!");
    router.replace("/account");
  };
  return (
    <FrontendLayout>
      <section className="flex min-h-[70vh] items-center justify-center py-16">
        <div className="max-w-md w-full">
          {/* header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Willkommen zurück
            </h2>

            <p className="mt-3 text-muted-foreground">
              Logge dich ein um weiter einzukaufen.
            </p>
          </div>

          {/* form */}
          <form
            className="space-y-5 mt-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="Email Adresse"
              placeholder="musterman@beispiel.de"
              type="text"
              {...register("email")}
              error={errors.email?.message}
            />
            <Input
              label="Passwort"
              placeholder="********"
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />

            <Button fullWidth disabled={isSubmitting}>
              {isSubmitting ? "Einloggen..." : "Einloggen"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Du hast noch kein Kundenkonto?{" "}
            <Link href="/signup" className="font-semibold">
              Account erstellen
            </Link>
          </p>
        </div>
      </section>
    </FrontendLayout>
  );
}
