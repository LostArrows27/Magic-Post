import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingPage = () => {
  return (
    <div className="p-10 w-full h-full bg-border">
      <div className="bg-background center w-full h-full rounded-xl">
        <AiOutlineLoading3Quarters className="animate-spin text-primary text-5xl" />
      </div>
    </div>
  );
};

export default LoadingPage;
