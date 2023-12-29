import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "../ui/button";
import SearchOrder from "./SearchOrder";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import ChooseState from "./ChooseState";
import { useState } from "react";
import { useAllOrder } from "@/hooks/useAllOrder";
import { filterOrderBySort } from "@/lib/filterOrder";

const FilterOrder = () => {
  const router = useRouter();

  const [direction, setDirection] = useState<"asc" | "desc">("asc");

  const [sortType, setSortType] = useState<
    "weight" | "fee" | "time" | "name" | "state"
  >("name");

  const { allOrder, setAllOrder } = useAllOrder((state) => ({
    allOrder: state.allOrder,
    setAllOrder: state.setAllOrder,
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <SearchOrder />
        <div className="flex items-center gap-x-3">
          <Button
            onClick={() => {
              router.push("/office/new-order");
            }}
          >
            <AiOutlinePlus className="text-lg  mr-2" />
            <span>New Order</span>
          </Button>
          <Select
            onValueChange={(
              value: "weight" | "fee" | "time" | "state" | "name"
            ) => {
              const sortOrder = filterOrderBySort(value, allOrder, direction);
              setSortType(value);
              setAllOrder(sortOrder);
            }}
          >
            <SelectTrigger className="w-[18p0px] bg-primary text-primary-foreground">
              <SelectValue placeholder="Choose filter" />
            </SelectTrigger>
            <SelectContent className="bg-primary text-primary-foreground">
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="weight">Weight</SelectItem>
              <SelectItem value="fee">Fee</SelectItem>
              <SelectItem value="time">Time</SelectItem>
              <SelectItem value="state">State</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => {
              setDirection(direction === "asc" ? "desc" : "asc");

              const sortOrder = filterOrderBySort(
                sortType,
                allOrder,
                direction
              );
              setAllOrder(sortOrder);
            }}
            size={"icon"}
          >
            {
              {
                asc: "↑",
                desc: "↓",
              }[direction]
            }
          </Button>
        </div>
      </div>
      <Separator className="w-full my-10" />
      <ChooseState />
    </>
  );
};

export default FilterOrder;
