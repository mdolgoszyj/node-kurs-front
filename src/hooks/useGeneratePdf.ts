import { useMutation } from "@tanstack/react-query";
import { ExternalToast, toast } from "sonner";

type PdfData = {
  title: string;
  buyer: string;
  seller: string;
  name: string;
  totalPrice: string;
  pricePerItem: string;
  quantity: string;
};

export const useGeneratePdf = () => {
  const mutationFn = async (data: PdfData) => {
    try {

 const response = await fetch(
        "http://localhost:5000/api/document/generate-pdf",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        }
      );

if (response.ok) {
        const blob = await response.blob();
        const pdfFile = new File([blob], "document.pdf", { type: "application/pdf" });
        if (pdfFile.size > 0) {
          const url = window.URL.createObjectURL(pdfFile);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "document.pdf");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.error("Plik PDF jest pusty");
        }
      } else {
        console.error("Błąd generowania PDF");
      }
    
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