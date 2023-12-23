"use client";

import { ArrowBigUpDash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterOrder() {
  return (
    <div className="flex gap-x-3">
      <Button size={"icon"}>
        <ArrowBigUpDash />
      </Button>
      <Select>
        <SelectTrigger className="w-[180px] bg-primary text-primary-foreground">
          <SelectValue placeholder="Choose filter" />
        </SelectTrigger>
        <SelectContent className="bg-primary text-primary-foreground">
          <SelectItem value="weight">Weight</SelectItem>
          <SelectItem value="fee">Fee</SelectItem>
          <SelectItem value="time">Time</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
