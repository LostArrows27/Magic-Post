import { useAllTransfer } from "@/hooks/useAllTransfer";
import { Separator } from "../ui/separator";
import FilterOrder from "./FilterOrder";
import FilterRange from "./FilterRange";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterTransferByLocation } from "@/lib/filterTransferData";
import { useUser } from "@/hooks/useUser";
const FilterTransfer = () => {
  const { setAllTransfers, allTransferOriginData } = useAllTransfer((set) => ({
    allTransferOriginData: set.allTransferOriginData,
    setAllTransfers: set.setAllTransfer,
  }));

  const { workLocation } = useUser();

  return (
    <>
      <div className="flex items-center justify-end gap-x-8">
        <FilterRange />
        <Select
          onValueChange={(value) => {
            const newData = filterTransferByLocation(
              value,
              allTransferOriginData,
              workLocation.id
            );

            setAllTransfers(newData);
          }}
        >
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
