"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAllTransfer } from "@/hooks/useAllTransfer";

export function FilterLocation() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { allTransfer } = useAllTransfer();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between line-clamp-1"
        >
          {value
            ? allTransfer.find((framework) => framework.id === value)?.id
            : "Search transfers id..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search transfers id..." className="h-9" />
          <CommandEmpty>No transfers id found.</CommandEmpty>
          <CommandGroup>
            {allTransfer.map((framework) => (
              <CommandItem
                key={framework.id}
                value={framework.id}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {framework.id}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4 line-clamp-1",
                    value === framework.id ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
