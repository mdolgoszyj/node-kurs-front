
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {IInvoiceData, InvoiceItem} from "@/constants/IInvoiceData";
import { DialogContext } from "@/context/DialogContext";
import { useDeleteInvoice } from "@/hooks/useDeleteInvoice";
import { useGeneratePdf } from "@/hooks/useGeneratePdf";
import { Loader2 } from "lucide-react";
import { useContext } from "react";
import {motion} from "framer-motion";

export function InvoiceCard({invoice, refetch}: IInvoiceData<IInvoiceData<"invoice">>) {

  const{mutateAsync: deleteCard} = useDeleteInvoice();
  const{mutateAsync: generatePdf, isLoading: generateLoading} = useGeneratePdf();

  const { openDialog } = useContext(DialogContext)

  const handleDelete = async (id: string) => {
    await deleteCard(id);
    refetch();
  }

  const handleOpen = (id: string) => {
    openDialog(
      "Faktura" + invoice.title,
      "Czy na pewno chcesz usunąć fakturę?",
      () => handleDelete(id)
    )
  }


  const handleGenerate = async () => {

    const pdfData = {
      title: invoice.title,
      buyer: invoice.buyer,
      seller: invoice.seller,
      name: invoice.items[0].name,
      totalPrice: invoice.items[0].totalPrice,
      pricePerItem: invoice.items[0].pricePerItem,
      quantity: invoice.items[0].quantity
    }

    await generatePdf(pdfData)
  }

  return (
    <motion.div 
      initial={{opacity:0, x:30}}
      animate={{opacity:1, x:0}}
      transition={{duration:0.8}}
      exit={{opacity:0, y:-30}}
    >
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Numer faktury: {invoice.title}</CardTitle>
          <div>
            <CardDescription>Kupujący: {invoice.buyer}</CardDescription>
            <CardDescription>Sprzedający: {invoice.seller}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle>Przedmioty</CardTitle>
              <div className="border-y-1 py-2 mt-2">
                  {invoice.items?.map((item: InvoiceItem) => (
                      <div key={item._id} className="mb-2">
                          <CardDescription>Nazwa: {item.name}</CardDescription>
                          <CardDescription>Ilość: {item.quantity}</CardDescription>
                          <CardDescription>Cena jednostkowa: {item.pricePerItem}</CardDescription>
                          <CardDescription>Do zapłaty: {item.totalPrice}</CardDescription>
                      </div>
                  ))}
              </div>
        </CardContent>
        <CardFooter className="flex justify-between">
        

          <Button disabled={generateLoading} onClick={()=>handleGenerate()} variant="outline">{ generateLoading && <Loader2 className="animate-spin" />}Utwórz PDF</Button>
          <Button onClick={()=>handleOpen(invoice._id)} variant="destructive">Usuń</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

