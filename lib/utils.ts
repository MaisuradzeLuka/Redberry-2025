import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleFileChange = (fileProp: File | undefined) => {
  return new Promise((resolve, reject) => {
    const file = fileProp;
    if (file) {
      if (file.size > 600 * 1024) {
        reject("Image is too large");
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    } else {
      reject("No file provided");
    }
  });
};
