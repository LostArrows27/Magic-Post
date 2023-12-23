"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SearchOrder from "./search-order";
import FilterOrder from "./filter-order";
import { Button } from "../ui/button";

export default function OrderList() {
  return (
    <section className="bg-background w-full rounded-xl flex-1 flex flex-col justify-center items-center p-5">
      <div className="flex w-full pb-5  justify-between">
        <SearchOrder />
        <FilterOrder />
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="mt-auto flex justify-between w-full pt-5 items-center">
        <h2 className="flex text-xl font-bold">Total Weight: 100 kg</h2>
        <Button className="text-lg" size={'lg'}>
            Confirm
        </Button>
      </div>
    </section>
  );
}
