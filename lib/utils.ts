import { format, differenceInDays } from "date-fns";

export const formatDate = (
  date: string | Date,
  formatStr: string = "MMM dd, yyyy"
): string => {
  if (!date) return "N/A";

  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return "Invalid Date";
    }
    return format(parsedDate, formatStr);
  } catch (error) {
    return "Invalid Date";
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};

export const calculateNights = (checkIn: string, checkOut: string): number => {
  return differenceInDays(new Date(checkOut), new Date(checkIn));
};

export const calculateTotalPrice = (
  pricePerNight: number,
  checkIn: string,
  checkOut: string
): number => {
  const nights = calculateNights(checkIn, checkOut);
  return pricePerNight * nights;
};

export const cn = (
  ...classes: (string | boolean | undefined | null)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

export const formatApiDate = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};
