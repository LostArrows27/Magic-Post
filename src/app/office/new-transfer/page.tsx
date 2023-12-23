import OrderList from "@/components/new-transfer/order-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function NewTransferPage() {
  return (
    <div className="p-10 w-full pt-6 h-full bg-border flex flex-col ">
     <div className="mb-4 flex justify-between w-full">
        <h1 className="font-bold text-3xl ">
          Create a Transfer 
        </h1>
     
     </div>
     <OrderList />
    </div>
  );
}
