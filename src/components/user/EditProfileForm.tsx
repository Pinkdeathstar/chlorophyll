"use client";

import Input from "../ui/Input";
import Button from "../ui/Button";
import { getProfile } from "@/server-actions/user/getProfile";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateProfile } from "@/server-actions/user/updateProfile";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface EditProfileFormProps {
  userProfile: Awaited<ReturnType<typeof getProfile>>;
}

export const editProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name muss mindestens zwei Zeichen lang sein.")
    .max(100, "Name ist zu lang."),

  phone: z
    .string()
    .trim()
    .min(10, "Bitte gib eine gültige Telefonnummer an")
    .max(20, "Telefonnummer ist zu lang")
    .optional(),

  email: z.email(),

  firstname: z.string().trim().min(2, "Pflichtfeld"),

  lastname: z.string().trim().min(2, "Pflichtfeld"),

  country: z.string().trim().min(2, "Pflichtfeld"),

  city: z.string().trim().min(2, "Pflichtfeld"),

  postalCode: z.string().trim().min(2, "Pflichtfeld"),

  street: z.string().trim().min(5, "Pflichtfeld"),
});

export type EditProfileFormValues = z.infer<
  typeof editProfileSchema
>;

export default function EditProfileForm({
  userProfile,
}: EditProfileFormProps) {
  const router = useRouter();
  const address = userProfile?.addresses[0];
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: userProfile?.name ?? "",
      phone: userProfile?.phone ?? "",
      email: userProfile?.email ?? "",

      country: address?.country ?? "",
      firstname: address?.firstName ?? "",
      lastname: address?.lastName ?? "",
      city: address?.city ?? "",
      postalCode: address?.postalCode ?? "",
      street: address?.street ?? "",
    },
  });
  const onSubmit = async (data: EditProfileFormValues) => {
    const result = await updateProfile(data);

    if (!result.success) {
      return toast.error(result.message);
    }

    toast.success(result.message);

    router.refresh();
  };
  return (
    <form
      className="mt-10 space-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* personal information */}
      <div className="rounded-2xl border border-border p-6">
        <h2 className="text-xl font-semibold">
          Persönliche Informationen
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Input
            {...register("name")}
            label="Vollständiger Name"
            placeholder="Marta Mustermann"
            error={errors.name?.message}
          />
          <Input
            {...register("phone")}
            label="Telefonnummer"
            placeholder="+49 123 456789"
            error={errors.phone?.message}
          />
          <div className="md:col-span-2">
            <Input
              {...register("email")}
              label="Emailadresse"
              placeholder="beispiel@beispiel.de"
              error={errors.email?.message}
            />
          </div>
        </div>
      </div>

      {/* shipping adress */}
      <div className="rounded-2xl border border-border p-6">
        <h2 className="text-xl font-semibold">
          Versandadresse
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Input
            label="Vorname"
            {...register("firstname")}
            error={errors.firstname?.message}
          />
          <Input
            label="Nachname"
            {...register("lastname")}
            error={errors.lastname?.message}
          />
          <Input
            label="Land"
            {...register("country")}
            error={errors.country?.message}
          />
          <Input
            label="Postleitzahl"
            {...register("postalCode")}
            error={errors.postalCode?.message}
          />
          <Input
            label="Ort"
            {...register("city")}
            error={errors.city?.message}
          />
          <Input
            label="Straße und Hausnummer"
            {...register("street")}
            error={errors.street?.message}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button disabled={isSubmitting}>
          {isSubmitting
            ? "Speichern..."
            : "Änderungen speichern"}
        </Button>
      </div>
    </form>
  );
}
