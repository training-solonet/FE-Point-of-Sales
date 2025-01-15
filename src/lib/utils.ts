import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const rupiahFormat = (value: number) => {
  const roundedValue = Math.round(value);

  return "Rp " + roundedValue.toLocaleString("id-ID");
}

export const isUPC = (value: string) => /^[0-9]{12}$/.test(value);

export const getFormattedDate: () => string = () => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Date().toLocaleDateString("id-ID", options);
};

export const formatNumber = (value: number): string => {
  return value.toLocaleString("id-ID").replace(/,/g, ".");
};

export const parseNumber = (value: string): number => {
  return parseFloat(value.replace(/\./g, "")) || 0;
};