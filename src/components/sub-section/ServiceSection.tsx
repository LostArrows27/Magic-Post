import { FaBusinessTime } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { SiWebmoney } from "react-icons/si";
import { Button } from "../ui/button";
const ServiceSection = () => {
  return (
    <section className="container flex flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-6 lg:py-20">
      <h1 className="text-xl font-bold lg:text-4xl">Services</h1>
      <h2 className="text-lg font-light text-muted-foreground lg:text-2xl">
        Our services for you
      </h2>
      <div className="flex justify-center mt-10 gap-x-10">
        <div className="rounded-xl p-8 w-[350px] dark:bg-gray-900 bg-white shadow-xl flex flex-col center gap-y-4">
          <FaBusinessTime className="text-6xl text-primary dark:text-white" />
          <h3 className="font-bold text-primary dark:text-white text-base">
            Business Services
          </h3>
          <div className="my-5 text-left text-sm text-muted-foreground dark:text-white">
            We give you complete reliable delivery for your company. We will
            take full responsibility of the deliveries.
          </div>
          <div className="flex items-center  w-full justify-start">
            <div className="shrink-0 w-[6px] h-[6px] dark:bg-white rounded-full mr-3 bg-primary"></div>
            <p className="text-sm text-muted-foreground dark:text-white">
              Corporate goods
            </p>
          </div>
          <div className="flex items-center w-full justify-start">
            <div className="shrink-0 w-[6px] h-[6px] dark:bg-white rounded-full mr-3 bg-primary"></div>
            <p className="text-sm text-muted-foreground dark:text-white">
              Corporate goods
            </p>
          </div>
          <div className="flex items-center w-full justify-start">
            <div className="shrink-0 w-[6px] h-[6px] dark:bg-white rounded-full mr-3 bg-primary"></div>
            <p className="text-sm text-muted-foreground dark:text-white">
              Corporate goods
            </p>
          </div>
          <Button className="mt-7 w-full" size={"lg"}>
            Learn More
          </Button>
        </div>
        <div className="rounded-xl p-8 w-[350px] dark:bg-gray-900 bg-white shadow-xl flex flex-col center gap-y-4">
          <SiWebmoney className="text-6xl text-primary dark:text-white" />
          <h3 className="font-bold text-primary dark:text-white text-base">
            Statewide Services
          </h3>
          <div className="my-5 text-left text-sm text-muted-foreground dark:text-white">
            Offering home delivery around the city, where your products will be
            at your doorstep within 48-72 hours.
          </div>
          <div className="flex items-center  w-full justify-start">
            <div className="shrink-0 w-[6px] h-[6px] dark:bg-white rounded-full mr-3 bg-primary"></div>
            <p className="text-sm text-muted-foreground dark:text-white">
              Personal Items
            </p>
          </div>
          <div className="flex items-center w-full justify-start">
            <div className="shrink-0 w-[6px] h-[6px] dark:bg-white rounded-full mr-3 bg-primary"></div>
            <p className="text-sm text-muted-foreground dark:text-white">
              Percels
            </p>
          </div>
          <div className="flex items-center w-full justify-start">
            <div className="shrink-0 w-[6px] h-[6px] dark:bg-white rounded-full mr-3 bg-primary"></div>
            <p className="text-sm text-muted-foreground dark:text-white">
              Documents
            </p>
          </div>
          <Button className="mt-7 w-full" size={"lg"}>
            Learn More
          </Button>
        </div>
        <div className="rounded-xl p-8 w-[350px] dark:bg-gray-900 bg-white shadow-xl flex flex-col center gap-y-4">
          <FaStore className="text-6xl text-primary dark:text-white" />
          <h3 className="font-bold text-primary dark:text-white text-base">
            Personal Services
          </h3>
          <div className="my-5 text-left text-sm text-muted-foreground dark:text-white">
            You can trust us to safely deliver your most sensitive documents to
            the specific area in a short time.
          </div>
          <div className="flex items-center  w-full justify-start">
            <div className="shrink-0 w-[6px] h-[6px] dark:bg-white rounded-full mr-3 bg-primary"></div>
            <p className="text-sm text-muted-foreground dark:text-white">
              Gifts
            </p>
          </div>
          <div className="flex items-center w-full justify-start">
            <div className="shrink-0 w-[6px] h-[6px] dark:bg-white rounded-full mr-3 bg-primary"></div>
            <p className="text-sm text-muted-foreground dark:text-white">
              Package
            </p>
          </div>
          <div className="flex items-center w-full justify-start">
            <div className="shrink-0 w-[6px] h-[6px] dark:bg-white rounded-full mr-3 bg-primary"></div>
            <p className="text-sm text-muted-foreground dark:text-white">
              Documents
            </p>
          </div>
          <Button className="mt-7 w-full" size={"lg"}>
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
