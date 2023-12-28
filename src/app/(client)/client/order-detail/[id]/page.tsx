import { FaTruckFast } from "react-icons/fa6";
import { getEstimatePrice } from "@/actions/get-estimate-price";
import BarCode from "@/components/bar-code/BarCode";
import QrCode from "@/components/qr-code/QRCode";
import { convertAddress } from "@/lib/convertAddress";
import { Customer, Parcel } from "@/types/supabase-table-type";
import { supabaseServer } from "@/utils/supabaseServer";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { TiContacts } from "react-icons/ti";
type Props = {
  params: {
    id: string;
  };
};

type ParcelWithInfor = Parcel & {
  receiver: Customer;
  sender: Customer;
  destination: Location;
};

const OrderDetail = async ({ params: { id } }: Props) => {
  const supabase = supabaseServer();

  const time = new Date(parseInt(id)).toISOString();

  const { data: fetchData, error } = await supabase
    .from("parcels")
    .select(
      "*, receiver:customers!parcels_receiver_id_fkey(*), sender:customers!parcels_sender_id_fkey(*), destination:locations!parcels_destination_location_id_fkey(*)"
    )
    .eq("date_sent", time)
    .returns<ParcelWithInfor[]>();

  if (!fetchData) return null;

  const data = fetchData?.[0];

  if (error || !data) {
    console.log(error);

    redirect("/");
  }

  const estimateFee = getEstimatePrice(
    data.sender.address_meta_data.province.PROVINCE_ID + "",
    data.sender.address_meta_data.district.DISTRICT_ID + "",
    data.receiver.address_meta_data.province.PROVINCE_ID + "",
    data.receiver.address_meta_data.district.DISTRICT_ID + "",
    data.weight
  );

  const duration = (await estimateFee).split("- ")[1];

  console.log(data);
  0;
  return (
    <div className="w-full font-['Times_New_Roman'] h-full bg-white">
      <div className="m-auto flex flex-col p-5 mt-1 relative border-2 border-black w-[8.7in] h-[6.5in]">
        <div className="w-full flex">
          <div className="rounded-full w-5 h-5 border border-black center">
            <span className="text-sm font-bold">1</span>
          </div>
          <div className="px-5 mr-5">
            <BarCode value={id} />
          </div>
          <div className="flex-col mt-5 font-bold flex items-center gap-y-0">
            <h1 className="my-0 p-0 uppercase text-lg">Phiếu gửi</h1>
            <div>BILL OF CONSIGNMENT</div>
          </div>
          <div className="ml-auto mt-2">
            <div className="font-sans tracking-wider text-primary font-bold text-4xl">
              MAGIC
            </div>
            <div className="font-sans tracking-wider text-lg font-semibold float-right">
              post
            </div>
          </div>
        </div>
        <div className="w-full relative *:text-[10px] flex flex-1 border-2 border-black">
          <div className="absolute top-0 left-0 right-0 bottom-0 center">
            <FaTruckFast className="text-[200px] mr-10 text-primary/30" />
          </div>
          <div className="w-2/5 relative z-10 border-r-2 border-black">
            <div className="border-b-2 pt-[2px] pl-4 relative h-1/4  border-black w-full">
              <div className="absolute top-0 left-0 w-3 h-3 bg-black text-white center">
                <span className="text-[10px]">1</span>
              </div>
              <div className="font-bold">Người gửi</div>
              <div>
                <span className="font-bold">Họ tên người gửi:</span>{" "}
              </div>
              <div className="mt-1">{data.sender?.full_name}</div>
              <div className="w-full mt-5 line-clamp-1">
                <span className="font-bold">Địa chỉ: </span>{" "}
                {data.sender?.address},{" "}
                {convertAddress(data.sender.address_meta_data)}
              </div>
              <div className="w-full line-clamp-1">
                <span className="font-bold">Điện thoại:</span>{" "}
                {data.sender?.phone_number.substring(0, 2) +
                  "*".repeat(6) +
                  data.sender?.phone_number.substring(7)}
              </div>
            </div>
            <div className="border-b-2 h-1/4 pl-4 relative border-black w-full">
              <div className="absolute top-0 left-0 w-3 h-3 bg-black text-white center">
                <span className="text-[10px]">2</span>
              </div>
              <div className="font-bold">Người nhận</div>
              <div>
                <span className="font-bold">Họ tên người nhận:</span>{" "}
              </div>
              <div className="mt-1">{data.receiver?.full_name}</div>
              <div className="w-full mt-5 line-clamp-1">
                <span className="font-bold">Địa chỉ:</span>{" "}
                {data.receiver?.address},{" "}
                {convertAddress(data.receiver.address_meta_data)}
              </div>
              <div className="w-full line-clamp-1">
                <span className="font-bold">Điện thoại:</span>{" "}
                {data.receiver?.phone_number.substring(0, 2) +
                  "*".repeat(6) +
                  data.receiver?.phone_number.substring(7)}
              </div>
            </div>
            <div className="border-b-2 h-1/2 pl-4 relative w-full">
              <div className="absolute top-0 left-0 w-3 h-3 bg-black text-white center">
                <span className="text-[10px]">4</span>
              </div>
              <div className="font-bold">Nội dung hàng hóa</div>
              <div className="mt-2">{data.product_name}</div>
              <div className="italic mt-2">Mô tả: {data.description}</div>
            </div>
            d
          </div>
          <div className="w-3/5">
            <div className="border-b-2 pl-4 relative h-1/2 border-black w-full">
              <div className="absolute top-0 left-0 w-3 h-3 bg-black text-white center">
                <span className="text-[10px]">3</span>
              </div>
              <div className="font-bold">Địa chỉ</div>
              <div className="mt-1 italic -ml-2">Tỉnh/TP: </div>
              <div className="font-bold text-lg">
                {data.receiver?.address_meta_data.province.PROVINCE_NAME}
              </div>
              <div className="mt-2 italic -ml-2">Quận/Huyện: </div>
              <div className="font-bold text-lg">
                {data.receiver?.address_meta_data.district.DISTRICT_NAME}
              </div>
              <div className="mt-2 italic -ml-2">Phường/Xã/Địa chỉ: </div>
              <div className="font-bold text-lg">
                {data.receiver?.address_meta_data.ward
                  ? data.receiver.address_meta_data.ward.WARDS_NAME
                  : "Không có"}
              </div>
              <div className="mt-2 italic -ml-2">Địa chỉ: </div>
              <div className="font-bold text-lg">{data.receiver.address}</div>
            </div>
            <div className="h-1/2 w-full">
              <div className="w-full h-1/2 flex border-b-2 border-black">
                <div className="w-1/2 h-full relative pl-4  border-r-2 border-black">
                  <div className="absolute top-0 left-0 w-3 h-3 bg-black text-white center">
                    <span className="text-[10px]">5</span>
                  </div>
                  <div className="font-bold">Dịch vụ cộng thêm</div>

                  <div className="mt-6">Giao dự kiến trong: {duration}</div>
                </div>
                <div className="w-1/2 relative pl-4 h-full">
                  <div className="absolute top-0 left-0 w-3 h-3 bg-black text-white center">
                    <span className="text-[10px]">6</span>
                  </div>
                  <div className="">
                    <span className="font-bold">Cước phí</span>
                  </div>
                  <div className="mt-2">
                    <span className="font-bold ">Trọng lượng: </span>
                    {data.weight / 1000} kg
                  </div>
                  <div className="mt-2">
                    <span className="font-bold ">Kích thước: </span>
                    {data.width ? data.width : "?"} x{" "}
                    {data.height ? data.height : "?"} x{" "}
                    {data.length ? data.length : "?"} cm
                  </div>
                  <div className="mt-2">
                    <span className="font-bold ">Thanh toán cước: </span>
                    {data.paid_fee} VNĐ
                  </div>
                </div>
              </div>
              <div className="h-1/2 w-full flex">
                <div className="w-1/3 h-full border-r-2 center border-black">
                  <div className="w-4/5 h-4/5 center">
                    {/* TODO: merge Tuan Anh tracking page + fix middleware */}
                    <QrCode
                      value={`${process.env.NEXT_PUBLIC_DEPLOY_URL}/tracking/${id}`}
                    />
                  </div>
                </div>
                <div className="w-1/3 h-full pl-4 relative border-r-2 border-black">
                  <div className="absolute top-0 left-0 w-3 h-3 bg-black text-white center">
                    <span className="text-[10px]">7</span>
                  </div>
                  <div className="font-bold">Ngày giờ gửi</div>
                  <div className="-ml-4">
                    <div className="w-full text-center">
                      {format(new Date(data.date_sent), "P pp")}
                    </div>
                    <div className="w-full font-bold text-center">
                      Họ tên, chữ ký người gửi
                    </div>
                  </div>
                </div>
                <div className="w-1/3 h-full pl-4 relative ">
                  <div className="absolute top-0 left-0 w-3 h-3 bg-black text-white center">
                    <span className="text-[10px]">8</span>
                  </div>

                  <div className="font-bold">Ngày, giờ nhận</div>
                  <div className="w-full text-center">
                    ...h.../....../....../20......
                  </div>
                  <div className="w-full font-bold text-center">
                    Họ tên, chữ ký người nhận
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-8 mt-1 flex gap-x-8">
          <div className="flex gap-x-2">
            <TiContacts className="text-5xl" />
            <div className="flex italic flex-col">
              <div className="text-lg font-bold">1900 0091</div>
              <div className="text-xs font-semibold">
                https://magic-post-office.vercel.app
              </div>
            </div>
          </div>
          <div className="italic text-[7px]">
            <div className="font-bold">Lưu ý:</div>
            <ol type="1" className=" leading-[1.3]">
              <li>
                Magic Post là đơn vị trung gian vận chuyển, không chịu trách
                nhiệm về chất lượng hàng hóa
              </li>
              <li>
                Hàng hóa sẽ được chuyển qua 2 điểm tập kết tương ứng với địa chỉ
                người gửi và nhận
              </li>
              <li>
                Người nhận sẽ phải ra điểm giao dịch gần nhất để lấy hàng nếu
                nhân viên giao hàng không liên hệ để gửi hàng cho người nhận
              </li>
              <li>
                Người gửi tra cứu quá trình vận đơn bằng cách quét mã QR trên
                màn hình hoặc Bar Code
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
