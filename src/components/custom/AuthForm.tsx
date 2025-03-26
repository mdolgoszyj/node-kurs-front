import { authFormFields } from "@/constants/authFormFields"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { useRegister } from "@/hooks/useRegister"
import { useNavigate } from "react-router-dom"
import { useLogin } from "@/hooks/useLogin"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().regex(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Hasło musi zawierać przynajmniej 8 znaków, dużą literę, cyfrę i znak specjalny"
  ),
});

 
export function AuthForm() {

  const {mutateAsync: register} = useRegister();
  const {mutateAsync: login} = useLogin();
  const navigate = useNavigate();
  //console.log(register);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await register(values);
    await login({email: values.email, password: values.password});
    navigate("/");
  }



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {authFormFields.map((input) => (
          <FormField
            key={input.name}
            control={form.control}
            name={input.name as "name" | "email" | "password"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{input.label}</FormLabel>
                <FormControl>
                  <Input type={input.type} placeholder={input.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}