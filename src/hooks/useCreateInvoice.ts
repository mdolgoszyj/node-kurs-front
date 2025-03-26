
import { useMutation } from "@tanstack/react-query";
import { ExternalToast, toast } from "sonner";

type InvoiceData = {
  title: string,
  items: {
    name: string,
    quantity: string,
    pricePerItem: string,
    totalPrice: string,
  },
  buyer: string,
  seller: string,
  userId: string,
};

export const useCreateInvoice = () => {
  const mutationFn = async (data: InvoiceData) => {
    try {
      const response = await fetch("http://localhost:5000/api/invoice/create-invoice", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      const resJson = await response.json();
      toast(resJson.message, {type: resJson.status} as ExternalToast);
      

    } catch (error) {
      toast.error("Wystąpił błąd", {type: "error"} as ExternalToast);
      console.log(error);
    }
  };

  const mutation = useMutation({
    mutationFn,
  });

  return mutation;
};
