
import { useQuery } from "@tanstack/react-query";
//import { ExternalToast, toast } from "sonner";



export const useGetUserInvoices = () => {
  const queryFn = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/invoice/invoices-by-user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${localStorage.getItem("token")}`,
          },
        credentials: "include",
      });

      const resJson = await response.json();
      //toast(resJson.message, {type: resJson.status} as ExternalToast);
      //console.log(resJson);
      return resJson;
    } catch (error) {
      //toast.error("Wystąpił błąd", {type: "error"} as ExternalToast);
      console.log(error);
    }
  };

  const query = useQuery(["userInvoices"],{
    queryFn,
  });

  return query;
};
