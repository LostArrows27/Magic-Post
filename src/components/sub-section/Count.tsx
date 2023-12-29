import { CiMap, CiTrophy, CiUser, CiBank } from "react-icons/ci";
import { CiDeliveryTruck } from "react-icons/ci";
const Count = () => {
  return (
    <section className="container flex flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-6 lg:py-20">
      <div className="flex items-center w-full justify-center gap-x-[160px]">
        <div className="center flex-col gap-y-4">
          <CiTrophy className="text-6xl" />
          <div className="font-bold text-4xl text-primary">26+</div>
          <div className="text-sm font-semibold">Awards won</div>
        </div>
        <div className="center flex-col gap-y-4">
          <CiMap className="text-6xl" />
          <div className="font-bold text-4xl text-primary">65+</div>
          <div className="text-sm font-semibold">States covered</div>
        </div>
        <div className="center flex-col gap-y-4">
          <CiUser className="text-6xl" />
          <div className="font-bold text-4xl text-primary">689K+</div>
          <div className="text-sm font-semibold">Happy clients</div>
        </div>
        <div className="center flex-col gap-y-4">
          <CiDeliveryTruck className="text-6xl" />
          <div className="font-bold text-4xl text-primary">130M+</div>
          <div className="text-sm font-semibold">Goods delivered</div>
        </div>
        <div className="center flex-col gap-y-4">
          <CiBank className="text-6xl" />
          <div className="font-bold text-4xl text-primary">130M+</div>
          <div className="text-sm font-semibold">Business hours</div>
        </div>
      </div>
    </section>
  );
};

export default Count;
