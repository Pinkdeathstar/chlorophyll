import { uploadImages } from "@/app/services/uploadImages";
import { prisma } from "@/database/db";
import { Category, ProductType } from "@/generated/prisma/enums";
import { requireAdmin } from "@/server-actions/auth/require-admin";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    try{
        await requireAdmin();

        const formData = await request.formData();

        const name= formData.get("name") as string;
        const description = formData.get("description")as string;
        const price = Number(formData.get("price"));
        const stock = Number(formData.get("stock"));
        const category= formData.get("category") as Category;
        const productType = formData.get("productType") as ProductType;
        

        const images = formData.getAll("images") as File[];

        //upload the images
        const imageUrls = await uploadImages(images);

        //save the product
        const product = await prisma.product.create({
            data:{
                name,
                description,
                price,
                category,
                productType,
                stock,

                images:{
                    create:imageUrls.map((image) => ({
                        imageUrl:image.imageUrl,
                        publicId:image.publicId
                    }))
                }
            }
        });

        return NextResponse.json({
            success: true,
            message: "Artikel erfolgreich erstellt.",
            productId: product.id,
        },{
            status:201
        })

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Da ist etwas schief gegangen."
            },
            {status: 500}
        );
    }
}