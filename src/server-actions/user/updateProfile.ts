"use server"

import { EditProfileFormValues } from "@/components/user/EditProfileForm";
import { getCurrentUser } from "../auth/getCurrentUser";
import { prisma } from "@/database/db";
import { revalidatePath } from "next/cache";

export async function updateProfile(data:EditProfileFormValues){
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser){
            return {
                success: false,
                message: "Nicht autorisiert"
            }
        }

        await prisma.$transaction(async (tx) => {
        //update user
        await tx.user.update({
            where:{id:currentUser.id},
            data:{
                name:data.name,
                phone:data.phone
            }
        });

        //get user default address
        const defaultAddress= await tx.address.findFirst({
            where:{
                id:currentUser.id,
                isDefault:true
            }
        });

        if(defaultAddress){
            await tx.address.update({
                where:{id:defaultAddress.id},
                data:{
                    firstName: data.firstname,
                    lastName: data.lastname,
                    phone: data.phone,
                    street: data.street,
                    postalCode: data.postalCode,
                    city: data.city,
                    country: data.country,
                }
            })
        } else {
            //create a default address if none exists
            await tx.address.create({
                data:{
                    firstName: data.firstname,
                    lastName: data.lastname,
                    phone: data.phone,
                    street: data.street,
                    postalCode: data.postalCode,
                    city: data.city,
                    country: data.country,
                    isDefault: true,
                    userId: currentUser.id,
                }
            })
        }
        });


        revalidatePath("/account");
        revalidatePath("/account/edit");

        return {
            success: true,
            message: "Profil erfolgreich aktualisiert."
        }
    } catch (error) {
        console.error("Profil konnte nicht aktualisiert werden:", error);

        return {
            success: false,
            message: "Profil konnte nicht aktualisiert werden."
        };
    }
}