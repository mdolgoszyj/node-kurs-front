
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/custom/LoginForm";
import { NavLink } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-center">Logowanie</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm/>
        </CardContent>
      </Card>

        <p className="mt-4">
            Nie masz konta? 
            
            <NavLink
            to="/register"
            className="text-center ml-1 text-blue-500 hover:underline"
            >
                Zarejestruj się
            </NavLink>
        </p>

    </div>
  );
}