
import { useMutation } from "@tanstack/react-query";
import { ExternalToast, toast } from "sonner";

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export const useRegister = () => {
  const mutationFn = async (data: RegisterData) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
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
