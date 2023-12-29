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
import { format } from "date-fns";
import { useViewTransferModal } from "@/hooks/useViewTransferModal";
import { convertLocationID } from "@/lib/convertLocationID";

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
  const { allTransfer, allTransferOriginData } = useAllTransfer((set) => ({
    allTransferOriginData: set.allTransferOriginData,
    allTransfer: set.allTransfer,
  }));

  const { workLocation } = useUser();

  const onOpen = useViewTransferModal((set) => set.onOpen);

  return (
    <Table>
      <TableCaption>
        Showing {allTransfer.length} out of {allTransferOriginData.length}{" "}
        results
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[70px] text-sm">ID</TableHead>
          <TableHead className="text-sm w-[230px]">FROM </TableHead>
          <TableHead className="text-sm w-[230px]">TO</TableHead>
          <TableHead className="text-sm w-[150px]">TRANSFER DATE</TableHead>
          <TableHead className="text-sm w-[130px] text-center">
            TOTAL PARCELS
          </TableHead>
          <TableHead className="text-sm text-center w-[130px]">
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
              {transfer.id.slice(0, 6)}...
            </TableCell>
            <TableCell className="text-sm w-[230px]">
              <div className="mb-2">{convertLocationID(transfer.from.id)},</div>
              <div>{convertLocationToString(transfer.from)}</div>
            </TableCell>
            <TableCell className="text-sm w-[230px]">
              <div className="mb-2">{convertLocationID(transfer.to.id)},</div>
              <div>{convertLocationToString(transfer.to)}</div>
            </TableCell>
            <TableCell className="text-sm">
              {format(new Date(transfer.date_transferred), "p P")}
            </TableCell>
            <TableCell className="text-sm w-[130px] text-center">
              {transfer.transfer_details.length}
            </TableCell>
            <TableCell className="text-sm text-center w-[130px]">
              {transfer.transfer_details.reduce((acc, cur) => {
                return cur.parcels.weight + acc;
              }, 0)}{" "}
              g
            </TableCell>
            <TableCell className="text-sm text-center">
              {convertTransferState(transfer, workLocation.id)}
            </TableCell>
            <TableCell className="text-sm w-[150px]">
              <Button
                onClick={() => {
                  onOpen(transfer);
                }}
              >
                View More
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransferDetailTable;
