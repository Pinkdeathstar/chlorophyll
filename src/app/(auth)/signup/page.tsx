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

const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name muss mindestens zwei Zeichen lang sein."),
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

type SignUpFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error(error.message as string);
      return;
    }

    toast.success("Kundenkonto erfolgreich erstellt");
    router.replace("/account");
  };
  return (
    <FrontendLayout>
      <section className="flex min-h-[70vh] items-center justify-center py-16">
        <div className="max-w-md w-full">
          {/* header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Kundenkonto erstellen
            </h2>

            <p className="mt-3 text-muted-foreground">
              Erstelle dein Konto und adoptiere deine neue
              Lieblingspflanze.
            </p>
          </div>

          {/* form */}
          <form
            className="space-y-5 mt-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="Vor- und Nachname"
              placeholder="Marta Mustermann"
              type="text"
              {...register("name")}
              error={errors.name?.message}
            />
            <Input
              label="Email Adresse"
              placeholder="musterman@beispiel.de"
              type="text"
              {...register("email")}
              error={errors.email?.message}
            />
            <Input
              label="Passwort"
              placeholder="Erstelle ein Passwort"
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />

            <Button fullWidth disabled={isSubmitting}>
              {isSubmitting
                ? "Erstelle Kundenkonto..."
                : "Kundenkonto erstellen"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Du hast bereits ein Kundenkonto?{" "}
            <Link href="/signin" className="font-semibold">
              Einloggen
            </Link>
          </p>
        </div>
      </section>
    </FrontendLayout>
  );
}
