import { prisma } from "@/database/db";
import { requireAdmin } from "../auth/require-admin";

export async function getProducts(){
    try {
        await requireAdmin();

        const products = await prisma.product.findMany({
            include:{
                images:{
                    take:1,
                    orderBy:{
                        createdAt:"asc"
                    }
                }
            },
            orderBy:{
                createdAt:"desc"
            }
        });

        return products;
    } catch (error) {
        console.error("Artikel konnten nicht geladen werden.", error);

        return [];
    }
}