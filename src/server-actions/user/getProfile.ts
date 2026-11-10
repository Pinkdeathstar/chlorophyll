"use server"

import { prisma } from "@/database/db";
import { getCurrentUser } from "../auth/getCurrentUser";

export async function getProfile(){
    try{
        const currentUser = await getCurrentUser();

        if(!currentUser){
            return null;
        }

        const user = await prisma.user.findUnique({
            where:{id:currentUser.id},
            include:{
                addresses:{
                    where:{
                        isDefault:true
                    },
                    take:1
                }
            }
        });
        return user;
    } catch(error) {
        console.error("Profil konnte nicht geladen werden:", error);
        return null;
    }
}