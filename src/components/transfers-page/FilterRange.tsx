import { CalendarIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { convertRangeToString } from "@/lib/convertRangeToString";
import { useEffect, useState } from "react";
import { useAllTransfer } from "@/hooks/useAllTransfer";
import { useUser } from "@/hooks/useUser";
import { filterTransferByRange } from "@/lib/filterTransferData";

const FilterRange = () => {
  const [date, setDate] = useState<{
    from: Date | undefined;
    to?: Date | undefined;
  }>();

  const [open, setOpen] = useState(false);

  const { setAllTransfers, allTransferOriginData } = useAllTransfer((set) => ({
    allTransferOriginData: set.allTransferOriginData,
    setAllTransfers: set.setAllTransfer,
  }));

  const { workLocation } = useUser();

  useEffect(() => {
    if (!open) {
      const newData = filterTransferByRange(
        date ? date.from : undefined,
        date ? date.to : undefined,
        allTransferOriginData
      );

      setAllTransfers(newData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date?.from?.toISOString(), date?.to?.toISOString(), open]);

  return (
    <Popover
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal border border-gray-500",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {convertRangeToString(date)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          numberOfMonths={2}
          mode="range"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default FilterRange;
