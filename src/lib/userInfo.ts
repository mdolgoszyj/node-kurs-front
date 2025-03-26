
import {jwtDecode} from "jwt-decode";

export const userInfo = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const userToken = jwtDecode(token);
    return userToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
