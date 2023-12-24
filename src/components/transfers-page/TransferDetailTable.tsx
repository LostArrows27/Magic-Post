import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAllTransfer } from "@/hooks/useAllTransfer";
import { Button } from "../ui/button";
import { convertLocationToString } from "@/lib/convertLocationToString";
import { convertTransferState } from "@/lib/convertTransferState";
import { useUser } from "@/hooks/useUser";

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
];

/*
1. id
2. from 
3. to
4. total parcel
5. total weight
6. state
7. view more
*/

const TransferDetailTable = () => {
  const allTransfer = useAllTransfer((set) => set.allTransfer);

  const { workLocation } = useUser();

  return (
    <Table>
      <TableCaption>Showing </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px] text-sm">ID</TableHead>
          <TableHead className="text-sm w-[250px]">FROM </TableHead>
          <TableHead className="text-sm w-[250px]">TO</TableHead>
          <TableHead className="text-sm w-[160px] text-center">
            TOTAL PARCELS
          </TableHead>
          <TableHead className="text-sm text-center w-[160px]">
            TOTAL WEIGHTS
          </TableHead>
          <TableHead className="text-sm text-center">STATE</TableHead>
          <TableHead className="text-sm w-[150px]">VIEW MORE</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allTransfer.map((transfer, index) => (
          <TableRow key={index}>
            <TableCell className="text-sm">
              {transfer.id.slice(0, 12)}...
            </TableCell>
            <TableCell className="text-sm w-[250px]">
              <div className="mb-2">{transfer.from.id},</div>
              <div>{convertLocationToString(transfer.from)}</div>
            </TableCell>
            <TableCell className="text-sm w-[250px]">
              <div className="mb-2">{transfer.to.id},</div>
              <div>{convertLocationToString(transfer.to)}</div>
            </TableCell>
            <TableCell className="text-sm w-[160px] text-center">
              {transfer.transfer_details.length}
            </TableCell>
            <TableCell className="text-sm text-center w-[160px]">
              {transfer.transfer_details.reduce((acc, cur) => {
                return cur.parcels.weight + acc;
              }, 0)}{" "}
              g
            </TableCell>
            <TableCell className="text-sm text-center">
              {convertTransferState(transfer, workLocation.id)}
            </TableCell>
            <TableCell className="text-sm w-[150px]">
              <Button>View More</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransferDetailTable;
