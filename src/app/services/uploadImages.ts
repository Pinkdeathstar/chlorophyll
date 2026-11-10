import cloudinary from "@/lib/cloudinary";

interface UploadImageResult {
    publicId:string,
    imageUrl:string
}

export async function uploadImages(images:File[]):Promise<UploadImageResult[]> {
    if(images.length <1 || images.length > 4){
        throw new Error(
            "Bitte lade zwischen 1 und 4 Bilder hoch."
        );
    }
    return Promise.all(
    images.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        return new Promise<UploadImageResult>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "chlorophyll",
                    transformation: [
                        {
                            format: "webp",
                        },
                    ],
                },
                (error, result) => {
                    if (error || !result) {
                        reject(error);
                        return;
                    }

                    resolve({
                        imageUrl: result.secure_url,
                        publicId: result.public_id,
                    });
                }
            );

            stream.end(buffer);
        })
    })
)
}

