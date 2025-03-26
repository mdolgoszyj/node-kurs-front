
import { InvoiceForm } from "@/components/custom/InvoiceForm";
import { Navbar } from "@/components/custom/Navbar";
import { JwtPayload } from "jwt-decode";
import { userInfo } from "@/lib/userInfo"
import { InvoiceCard } from "@/components/custom/InvoiceCard";
import { useGetUserInvoices } from "@/hooks/useGetUserInvoices";
import { InvoiceType } from "@/constants/IInvoiceData";
import { motion } from "framer-motion";


interface UserJwt extends JwtPayload{
  email?: string;
  name?: string;
  _id?: string;
}

export default function HomePage() {

  const user: UserJwt | null = userInfo();
  const {data: invoices, isLoading, isError, refetch } = useGetUserInvoices();


  //console.log("test: ",invoices);
  //console.log(user);

  if (!user) return;
  
  return (
    <>
    <div className="container mx-auto mt-6">

        <p className="mt-4">
            Welcome my frjent, {user?.email} {user?.name}
        </p>
        <Navbar/>
        <InvoiceForm refetch={refetch} userId={user?._id as string}/>

    </div>
    <motion.div 
    className="flex flex-wrap gap-5 mx-auto mt-6"
    animate={{x:30}}
    >
      {(isError && !isLoading) ? <p className="font-semibold text-sm text-red-600">Wystapił błąd, ponnieważ wystąpił błąd</p> : null}
      {(!invoices?.data.length && !isLoading && !isError) ? <p className="font-semibold text-sm">Nie dodałeś jeszcze żadnej faktury</p> : null}

        {
          invoices?.data.map((invoice: InvoiceType) => (
            <InvoiceCard refetch={refetch} key={invoice._id} invoice={invoice} />
          ))
        }
    </motion.div>
    </>
  );
}