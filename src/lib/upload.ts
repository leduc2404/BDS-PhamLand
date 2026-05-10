import { uploadImageServerAction } from "@/actions/upload";

export async function uploadImageToImgBB(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  
  try {
    const url = await uploadImageServerAction(formData);
    return url;
  } catch (error) {
    console.error("Upload Error:", error);
    throw error;
  }
}

export async function uploadMultipleImages(
  files: File[]
): Promise<string[]> {
  const results = await Promise.allSettled(
    files.map((file) => uploadImageToImgBB(file))
  );

  const urls: string[] = [];
  for (const result of results) {
    if (result.status === "fulfilled") {
      urls.push(result.value);
    }
  }

  return urls;
}
