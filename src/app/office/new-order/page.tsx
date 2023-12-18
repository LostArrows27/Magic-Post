import OrderForm from "@/components/new-order-page/OrderBody";
import OrderProgress from "@/components/new-order-page/OrderProgress";

export default function NewOrderPage() {
  return (
    <div className="w-full h-full px-[10%] flex py-10">
      <div className="w-1/4 h-[calc(100vh-200px)] pt-[102px]">
        <OrderProgress />
      </div>
      <div className="w-3/4 ">
        <div className="w-full  flex flex-col items-center">
          <h1 className="font-semibold text-2xl uppercase">Create an order</h1>
          <p className="text-gray-400 my-4">
            Fill out the form below to go to next step
          </p>
          <OrderForm />
        </div>
      </div>
    </div>
  );
}
