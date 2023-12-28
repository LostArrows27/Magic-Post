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
import { Parcel, ParcelStatus } from "@/types/supabase-table-type";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useViewParcelInformations } from "@/hooks/useViewParcelInformations";
import { useState } from "react";
import { toast } from "sonner";
import { wait } from "@/lib/wait";
import {
  convertParcelDatabaseState,
  convertUpdateParcelState,
} from "@/lib/convertUpdateParcelState";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/utils/supabaseClient";
import { useUser } from "@/hooks/useUser";

/*
1. Id
2. Name 
3. Destination
4. Weight
5. send date 
6. State: 5 state
7. Action 
*/

/* Action
    1. xác nhận giao hàng 
    2. xác nhận giao thành công 
    3. xác nhận giao thất bại
    4. xem thông tin hàng 
  */

/* State
    1. đã nhận từ khách hàng -> kho: 1 + 4
    2. đã nhận từ điểm tập kết đích -> kho: 1 + 4
    3. sẵn sàng giao hàng -> đang giao: 2 + 3 + 4
    4. đã giao -> thành công: 4
    5. đã trả lại điểm giao dịch đích: 2 + 4
  */

const OrderDetailTable = () => {
  const { allOrder, allOrderOrigin } = useAllOrder((state) => ({
    allOrder: state.allOrder,
    allOrderOrigin: state.allOrderOriginData,
  }));

  const [loading, setLoading] = useState<boolean>(false);

  const [open, setOpen] = useState<{
    open: boolean;
    type: "delivery" | "confirm-sent" | "confirm-fail" | "";
  }>({
    open: false,
    type: "",
  });

  const { district, ward, province } = useVietNamGeography();

  const { workLocation } = useUser();

  const { onOpen } = useViewParcelInformations();

  const supabase = useSupabase();

  const router = useRouter();

  const updateParcelState = async (
    action: "delivery" | "confirm-sent" | "confirm-fail",
    parcel: Parcel
  ) => {
    try {
      setLoading(true);
      const { start, end } = convertUpdateParcelState(action);
      toast.promise(
        async () => {
          const updateParcel = supabase
            .from("parcels")
            .update({
              state: convertParcelDatabaseState(action),
            })
            .eq("id", parcel.id);

          const createTracking = supabase.from("trackings").insert({
            status: convertParcelDatabaseState(action),
            location_id: workLocation.id,
            parcel_id: parcel.id,
          });

          const [updateRes, createRes] = await Promise.all([
            updateParcel,
            createTracking,
          ]);

          if (updateRes.error) {
            throw updateRes.error;
          }

          if (createRes.error) {
            throw createRes.error;
          }

          router.refresh();
        },
        {
          loading: start,
          success: () => {
            return end;
          },
          error: "Error updating",
        }
      );
    } catch (error: any) {
      setLoading(false);
      toast(error.message);
    }
  };

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
                      <DropdownMenuLabel>Parcel Action</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          onOpen(order);
                        }}
                      >
                        View Information
                      </DropdownMenuItem>
                      {(order.state === "đã nhận từ điểm tập kết đích" ||
                        order.state === "đã nhận từ khách hàng") && (
                        <DropdownMenuItem
                          onClick={async () => {
                            setOpen({
                              open: true,
                              type: "delivery",
                            });
                            await updateParcelState("delivery", order);
                          }}
                        >
                          Delivery This
                        </DropdownMenuItem>
                      )}
                      {(order.state === "đã trả lại điểm giao dịch đích" ||
                        order.state === "sẵn sàng giao hàng") && (
                        <DropdownMenuItem
                          onClick={async () => {
                            setOpen({
                              open: true,
                              type: "confirm-sent",
                            });
                            await updateParcelState("confirm-sent", order);
                          }}
                        >
                          Confirm Sent Success
                        </DropdownMenuItem>
                      )}
                      {order.state === "sẵn sàng giao hàng" && (
                        <DropdownMenuItem
                          onClick={async () => {
                            setOpen({
                              open: true,
                              type: "confirm-fail",
                            });
                            await updateParcelState("confirm-fail", order);
                          }}
                        >
                          Confirm Sent Fail
                        </DropdownMenuItem>
                      )}
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
