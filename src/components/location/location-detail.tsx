"use client"

import { useLocationDetail } from "@/hooks/useLocationDetail";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function LocationDetail() {
  const { isOpen, onClose, manager, hub_id, hub_type } = useLocationDetail((set) => set);

  const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
  ]

  return (
    <>
        <div className={cn(
            `space-y-4 fade-in mt-4`,
            isOpen ? "" : "hidden"
        )}>
            {/* Hub name */}
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-between space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight">
                        {hub_type === "tap_ket" ? (
                            <>Central Hub: {hub_id}</>
                        ) : (
                            <>Hub: {hub_id}</>
                        )}
                    </h3>
                </div>
                <Button variant="link" onClick={() => {onClose();}} className="text-xl font-bold tracking-tight">
                    ← Back to list
                </Button>
            </div>
            <div>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Index</TableHead>
                        <TableHead>Ful Name</TableHead>
                        <TableHead>Phone Number</TableHead>
                        {/* <TableHead>Role</TableHead> */}
                        <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                        <TableRow key={invoice.invoice}>
                            <TableCell className="font-medium">{invoice.invoice}</TableCell>
                            <TableCell>{invoice.paymentStatus}</TableCell>
                            <TableCell>{invoice.paymentMethod}</TableCell>
                            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
            <p>blahblahblah</p>
        </div>
    </>
  );
};
