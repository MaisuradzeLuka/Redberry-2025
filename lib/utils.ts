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

export const generateValidationStyles = (
  value: string,
  min: number,
  max: number
) => {
  if (!value) return "text-[#6C757D]";
  if (value.length < min || value.length > 255) return "text-red";
  return "text-green-500";
};

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  return date.toLocaleString("ka-GE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const trimDepartments = (department: string) => {
  switch (department) {
    case "მედიის დეპარტამენტი":
      return "მედია";

    case "ტექნოლოგიების დეპარტამენტი":
      return "ინფ. ტექ.";

    case "ლოჯოსტიკის დეპარტამენტი":
      return "ლოჯისტიკა";

    case "გაყიდვები და მარკეტინგის დეპარტამენტი":
      return "მარკეტინგი";

    case "ფინანსების დეპარტამენტი":
      return "ფინანსები";

    case "ადამიანური რესურსების დეპარტამენტი":
      return "ადმნ. რეს.";

    case "ადმინისტრაციის დეპარტამენტი":
      return "ადმინისტრაცია";

    default:
      return department;
  }
};

export const trimDescription = (description: string) => {
  if (description.trim().length > 100) {
    const newDescription = description.slice(0, 99) + "...";
    return newDescription;
  } else {
    return description;
  }
};
