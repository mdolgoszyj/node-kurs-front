
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginFormFields } from "@/constants/loginFormFields";
import { useLogin } from "@/hooks/useLogin";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {message: "Password is required."}),
});

   
export function LoginForm() {

const {mutateAsync: login} = useLogin();
const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
      //console.log(values);
      await login(values);
      navigate("/");
    }
  
  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {loginFormFields.map((input) => (
            <FormField
              key={input.name}
              control={form.control}
              name={input.name as "email" | "password"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{input.label}</FormLabel>
                  <FormControl>
                    <Input
                      type={input.type}
                      placeholder={input.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit">Zaloguj się</Button>
        </form>
      </Form>
    );
  }
  