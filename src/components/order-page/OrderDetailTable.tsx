import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAllOrder } from "@/hooks/useAllOrder";
import { useVietNamGeography } from "@/hooks/useVietNamGeography";
import convertLocationIdToString from "@/lib/convertLocationIdToString";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { convertParcelState } from "@/lib/convertParcelState";
import { ParcelStatus } from "@/types/supabase-table-type";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/*
1. Id
2. Name 
3. Destination
4. Weight
5. send date 
6. State: 5 state
7. Action 
*/

const OrderDetailTable = () => {
  const { allOrder, allOrderOrigin } = useAllOrder((state) => ({
    allOrder: state.allOrder,
    allOrderOrigin: state.allOrderOriginData,
  }));

  const { district, ward, province } = useVietNamGeography();

  return (
    <Table>
      <TableCaption>
        Showing {allOrder.length} of {allOrderOrigin.length} results
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead className="w-[250px]">Name</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Weight (kg)</TableHead>
          <TableHead className="text-right">Sent Date (GMT+7)</TableHead>
          <TableHead className="w-[250px] text-center">State</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allOrder.length > 0 ? (
          allOrder.map((order) => {
            const state = convertParcelState(order.state as ParcelStatus);

            const Icon = state.icon;

            return (
              <TableRow key={order.id}>
                <TableCell className="max-w-[100px] w-[100px] truncate">
                  {order.id}
                </TableCell>
                <TableCell className=" max-w-[250px] w-[250px] truncate">
                  {order.product_name}
                </TableCell>
                <TableCell className="truncate">
                  {convertLocationIdToString({
                    locationId: order.destination_location_id,
                    district,
                    province,
                    ward,
                  })}
                </TableCell>
                <TableCell className="truncate">{order.weight}</TableCell>
                <TableCell className="text-right">
                  {new Date(order.date_sent).toLocaleString()}
                </TableCell>
                <TableCell className="text-center inline-flex justify-center items-center w-[250px]">
                  <TooltipProvider>
                    <Tooltip delayDuration={50}>
                      <TooltipTrigger>
                        <div
                          className={`p-3 w-[150px] *:text-white rounded-lg center ${state.color}`}
                        >
                          <div className="flex items-center gap-x-2">
                            {<Icon className="text-sm"></Icon>}
                            <p className="text-sm">{state.label}</p>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{order.state}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div>
                        <BsThreeDotsVertical className="text-xl text-gray-500 cursor-pointer" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow className=" text text-center font-bold  ">
            <TableCell colSpan={8}>No order found.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default OrderDetailTable;
