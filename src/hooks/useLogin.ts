
import { useMutation } from "@tanstack/react-query";
import { ExternalToast, toast } from "sonner";

type LoginData = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const mutationFn = async (data: LoginData) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          //"Authorization":`Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      const resJson = await response.json();
      toast(resJson.message, {type: resJson.status} as ExternalToast);
        localStorage.setItem("token",resJson.token);

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
