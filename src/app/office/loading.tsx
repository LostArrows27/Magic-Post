import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingPage = () => {
  return (
    <div className="p-10 pt-6 w-full">
      <div className="mb-4 flex justify-between w-full">
        <h1 className="font-bold text-3xl text-transparent">Loading</h1>
      </div>
      <div className="bg-background center w-full h-[600px] rounded-xl">
        <AiOutlineLoading3Quarters className="animate-spin text-primary text-5xl" />
      </div>
    </div>
  );
};

export default LoadingPage;
