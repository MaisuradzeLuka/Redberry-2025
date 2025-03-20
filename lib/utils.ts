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
  isDirty: boolean,
  value: string,
  min: number,
  type: "min" | "max" | "letters"
) => {
  const trimmedValue = value.trim();

  if (isDirty) {
    if (type === "min") {
      return value.replace(/\s/g, "").length < min
        ? "!text-red"
        : "!text-green-500";
    }

    if (type === "max") {
      return value.replace(/\s/g, "").length > 255 || trimmedValue.length === 0
        ? "!text-red"
        : "!text-green-500";
    }

    if (type === "letters") {
      return /^[a-zA-Zა-ჰ\s]+$/.test(trimmedValue)
        ? "!text-green-500"
        : "!text-red";
    }
  }

  return "text-[#6C757D]";
};

export const formatDate = (isoString: string, shortFormat: boolean = false) => {
  const date = new Date(isoString);

  if (shortFormat) {
    return date
      .toLocaleString("ka-GE", {
        weekday: "short",
        day: "2-digit",
        month: "numeric",
        year: "numeric",
      })
      .replace(",", " -")
      .replace(/\./g, "/");
  }

  return date.toLocaleString("ka-GE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const trimDepartments = (department: string) => {
  switch (department) {
    case "მედიის დეპარტამენტი":
      return { name: "მედია", color: "bg-purple-500" };

    case "ტექნოლოგიების დეპარტამენტი":
      return { name: "ინფ. ტექ.", color: "bg-blue-500" };

    case "ლოჯოსტიკის დეპარტამენტი":
      return { name: "ლოჯისტიკა", color: "bg-green-500" };

    case "გაყიდვები და მარკეტინგის დეპარტამენტი":
      return { name: "მარკეტინგი", color: "bg-yellow-500" };

    case "ფინანსების დეპარტამენტი":
      return { name: "ფინანსები", color: "bg-red-500" };

    case "ადამიანური რესურსების დეპარტამენტი":
      return { name: "ადმნ. რეს.", color: "bg-pink-500" };

    case "ადმინისტრაციის დეპარტამენტი":
      return { name: "ადმინისტრაცია", color: "bg-gray-500" };

    default:
      return { name: department, color: "" };
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
