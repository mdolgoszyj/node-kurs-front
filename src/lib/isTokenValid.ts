
import {jwtDecode} from "jwt-decode";

export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token) as { exp: number };
    if (exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
