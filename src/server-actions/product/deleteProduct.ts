"use server"

import { prisma } from "@/database/db";
import { requireAdmin } from "../auth/require-admin";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId:string){
    try {
        await requireAdmin();

        const product = await prisma.product.findUnique({
            where:{
                id:productId
            },
            include:{
                images: true
            }
        });

        if(!product){
            return {
                success: false,
                message: "Artikel konnte nicht gefunden werden."
            }
        }

        //delete product images from cloud
        await Promise.all(
            product.images.map((image) =>
            cloudinary.uploader.destroy(image.publicId)
        )
        )
        //delete the product
        await prisma.product.delete({
            where:{
                id:productId
            }
        });

        revalidatePath("/admin/products");

            return {
                success: true,
                message: "Artikel erfolgreich gelöscht.",
            };
        
    } catch (error) {
        console.error("Artikel konnte nicht gelöscht werden:", error);

        return {
            success: false,
            message: "Artikel konnte nicht gelöscht werden."
        };
        
    }
}