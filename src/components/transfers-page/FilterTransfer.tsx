import { Separator } from "../ui/separator";
import FilterOrder from "./FilterOrder";
import FilterRange from "./FilterRange";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const FilterTransfer = () => {
  return (
    <>
      <div className="flex items-center justify-end gap-x-8">
        <FilterRange />
        <Select>
          <SelectTrigger className="w-[180px] border border-gray-500">
            <SelectValue placeholder="Select location type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup defaultValue={"all"}>
              <SelectItem value="all">All locations</SelectItem>
              <SelectItem value="send">Sending Location</SelectItem>
              <SelectItem value="receive">Receiving Location</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="w-full my-10" />
      <FilterOrder />
    </>
  );
};

export default FilterTransfer;
