import OrderForm from "@/components/new-order-page/OrderBody";
import OrderProgress from "@/components/new-order-page/OrderProgress";

export default function NewOrderPage() {
  return (
    <div className="p-10 pt-6 w-full  bg-border">
      <div className="mb-4 flex justify-between w-full">
        <h1 className="font-bold text-3xl ">New Orders</h1>
      </div>
      <div className="w-full bg-background rounded-xl pl-[6%] pr-[10%] flex py-10">
        <div className="w-1/4 h-[calc(100vh-200px)] scale-90 pt-[80px]">
          <OrderProgress />
        </div>
        <div className="w-3/4 ">
          <div className="w-4/5 flex flex-col items-center">
            <h1 className="font-semibold text-2xl uppercase">
              Create an order
            </h1>
            <p className="text-gray-400 my-4">
              Fill out the form below to go to next step
            </p>
            <OrderForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
