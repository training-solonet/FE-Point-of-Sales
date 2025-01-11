import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const rupiahFormat = (value: number) => {
  const roundedValue = Math.round(value);

  return "Rp " + roundedValue.toLocaleString("id-ID");
}

export const isUPC = (value: string) => /^[0-9]+$/.test(value);

export const getFormattedDate: () => string = () => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Date().toLocaleDateString("id-ID", options);
};