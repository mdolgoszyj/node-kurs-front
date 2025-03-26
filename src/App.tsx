
import "./App.css";
//import useGetData from "./hooks/useGetData";
//import { Button } from "@/components/ui/button"
//import {AuthForm} from  "@/components/custom/AuthForm"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from "sonner";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./lib/ProtectedRoute";
import { DialogProvider } from "./context/DialogContext";


const queryClient = new QueryClient();
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter> 
        <DialogProvider>
          <Routes>
            <Route element={<ProtectedRoute />} >
              <Route path="/" element={<HomePage />} />
            </Route>
            
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </DialogProvider>
      </BrowserRouter>
      <Toaster richColors position="top-right"/>
    </QueryClientProvider>
  );
}

export default App;
