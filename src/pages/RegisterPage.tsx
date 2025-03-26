
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthForm } from "@/components/custom/AuthForm";
import { NavLink } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-center">Zarejestruj się</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthForm/>
        </CardContent>
      </Card>
        <p className="mt-4">
            Masz już konto? 
            
            <NavLink
            to="/login"
            className="text-center ml-1 text-blue-500 hover:underline"
            >
            Zaloguj się
            </NavLink>
        </p>
    </div>
  );
}