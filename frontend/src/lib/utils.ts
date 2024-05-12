import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-hot-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleApiErrors(error: any): void {
  // Check if the error object contains a response with data
  if (error.response && error.response.data) {
    const errors = error.response.data;

    // Iterate over the keys in the error object and display each error message
    for (const field in errors) {
      if (Object.hasOwnProperty.call(errors, field)) {
        const errorMessage = errors[field];
        // Display the error message using toast.error or handle it differently as needed
        toast.error(errorMessage);
      }
    }
  } else {
    // Handle generic error case (no specific error message from server)
    toast.error("An unknown error occurred");
  }
}
