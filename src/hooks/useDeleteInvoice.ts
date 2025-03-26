
import { useMutation } from "@tanstack/react-query";
import { ExternalToast, toast } from "sonner";

export const useDeleteInvoice = () => {
  const mutationFn = async (id: string) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/invoice/delete-invoice?id="+id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        }
      );
      const resJson = await response.json();
      toast(resJson.message, { type: resJson.status } as ExternalToast);
  
    } catch (error) {
      toast.error("Wystąpił błąd", { type: "error" } as ExternalToast);
      console.log(error);
    }
  };

  const mutation = useMutation({
    mutationFn,
  });

  return mutation;
};
