
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { invoiceFormFields } from "@/constants/invoiceFormFields";
import { Input } from "@/components/ui/input";
import { useCreateInvoice } from "@/hooks/useCreateInvoice";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const formSchema = z.object({
  title: z.string({
    message: "Please enter a valid name.",
  }),

  items: z.object({
    name: z.string().min(1, {
      message: "item name is required",
    }),
    quantity: z.string().min(1, {
      message: "quantity is required",
    }),
    pricePerItem: z.string().min(1, {
      message: "pricePerItem is required",
    }),
    totalPrice: z.string().min(1, {
      message: "totalPrice is required",
    }),
  }),

  buyer: z.string({
    message: "Please enter a valid name.",
  }),
  seller: z.string({
    message: "Please enter a valid name.",
  }),
});



interface IFromProps{
    userId: string;
    refetch: () => void;
}

export function InvoiceForm({userId, refetch}: IFromProps) {
    const { mutateAsync: pInvoice } = useCreateInvoice();
    const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
            title: "",
            items: {
              name: "",
              quantity: "",
              pricePerItem: "",
              totalPrice: "",
            },
            buyer: "",
            seller: "",
          },
        });
    async function onSubmit(values: z.infer<typeof formSchema>) {
      //console.log(values);
      //console.log(userId);
      
      //navigate("/");
      const newInvoice = {
        ...values,
        userId
      };
      await pInvoice(newInvoice);
      refetch();

      console.log(newInvoice);
    }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="mt-12" variant="outline">Utwórz dokument</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Nowa faktura</SheetTitle>
          <SheetDescription>
            Uzupełnij odpowiednie pola i kliknij zapisz.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 p-4">
         {/*formularz do tworzenia nowej faktury*/}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {invoiceFormFields.map((input) => (

                <FormField
                  key={input.name}
                  control={form.control}
                  name={input.name as "title" | "items" | "buyer" | "seller"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{input.label}</FormLabel>
                      <FormControl>
                         {/* @ts-expect-error chwilowe */}
                        <Input type={input.type} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                ))}
                <SheetClose asChild>
                    <Button className="w-full" type="submit">Zapisz</Button>
                </SheetClose>
                </form>
            </Form>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
