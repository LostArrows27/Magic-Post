import { RiMoneyDollarCircleFill } from "react-icons/ri";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useOrderFormData } from "@/hooks/useOrderFormData";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParcelFormType, parcelFormSchema } from "@/schema/parcel-form-schema";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AiOutlineLoading } from "react-icons/ai";
import { useOrderFormProgress } from "@/hooks/useOrderFormProgress";
import { useDebounce } from "@/hooks/useDebounce";
import { getEstimatePrice } from "@/actions/get-estimate-price";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LastForm = () => {
  const [destinationID, setDestinationID] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadPrice, setLoadPrice] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<string>("");

  const { sender, receiver } = useOrderFormData();

  const { workLocation, userDetails } = useUser();

  const { supabaseClient } = useSessionContext();

  const router = useRouter();

  const { setCurrentStep } = useOrderFormProgress();

  const form = useForm<ParcelFormType>({
    resolver: zodResolver(parcelFormSchema),
  });

  const weight = form.watch("weight");

  const debouncedValue = useDebounce<string>(weight, 500);

  const onSubmit = async (values: ParcelFormType) => {
    try {
      setLoading(true);

      const estimate = await getEstimatePrice(
        sender?.province_id!,
        sender?.district_id!,
        receiver?.province_id!,
        receiver?.district_id!,
        parseInt(debouncedValue as string)
      );

      const money = estimate.split(" ")[0];

      const parcelData = {
        product_name: values.productName,
        sender_id: sender?.id,
        receiver_id: receiver?.id,
        origin_location_id: workLocation?.id,
        destination_location_id: destinationID,
        current_location_id: workLocation?.id,
        date_sent: new Date(),
        paid_fee: parseInt(money),
        weight: parseInt(values.weight),
        description: values.description,
        created_staff: userDetails?.id,
        height: values.height ? parseInt(values.height) : null,
        width: values.width ? parseInt(values.width) : null,
        length: values.length ? parseInt(values.length) : null,
      };

      const { data, error } = await supabaseClient
        .from("parcels")
        .insert(parcelData)
        .select();

      if (error) {
        throw error;
      }

      const { data: trackingData, error: trackingError } = await supabaseClient
        .from("trackings")
        .insert({
          parcel_id: data![0].id,
          location_id: workLocation?.id,
          status: "đã nhận từ khách hàng",
        });

      if (trackingError) {
        throw trackingError;
      }

      setLoading(false);
      toast.success("Created order successfully");
      router.push("/office/orders");
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const searchPrice = async () => {
      setLoadPrice(true);
      const data = await getEstimatePrice(
        sender?.province_id!,
        sender?.district_id!,
        receiver?.province_id!,
        receiver?.district_id!,
        parseInt(debouncedValue as string)
      );

      setEstimatedPrice(data);
      setLoadPrice(false);
    };

    if (debouncedValue && parseInt(debouncedValue) > 0) {
      searchPrice();
    }
  }, [
    debouncedValue,
    receiver?.district_id,
    receiver?.province_id,
    sender?.district_id,
    sender?.province_id,
  ]);

  useEffect(() => {
    const fetchLocation = async () => {
      const { data, error } = await supabaseClient
        .from("locations")
        .select("*")
        .eq("province_id", parseInt(receiver?.province_id as string))
        .eq("type", "giao_dich");

      if (error) {
        throw error;
      }

      const location = data?.find(
        (l) => l.district_id === parseInt(receiver?.district_id as string)
      );

      if (location) {
        setDestinationID(location.id);
      } else {
        const nearestLocation = data?.reduce((prev, curr) => {
          return Math.abs(
            parseInt(receiver?.district_id as string) -
              parseInt(curr.district_id as string)
          ) <
            Math.abs(
              parseInt(receiver?.district_id as string) -
                parseInt(prev?.district_id as string)
            )
            ? curr
            : prev;
        });

        if (nearestLocation) {
          setDestinationID(nearestLocation.id);
        }
      }
    };

    if (sender && receiver) {
      fetchLocation();
    }
  }, [sender, receiver, supabaseClient]);

  return (
    <Form {...form}>
      <form
        className="w-full mt-8 flex flex-col gap-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem className="flex-1 space-y-3">
              <Label className="mb-2">Product Name</Label>
              <FormControl>
                <Input
                  placeholder="Enter product name"
                  className="h-12 rounded-xl"
                  {...field}
                  disabled={loading}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex-1 flex justify-between gap-x-4">
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem className="flex-1 space-y-3">
                <Label className="mb-2">Weight</Label>
                <FormControl>
                  <Input
                    placeholder="Enter product weight (g)"
                    type="number"
                    min={0}
                    className="h-12 rounded-xl"
                    {...field}
                    disabled={loading}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem className="flex-1 space-y-3">
            <Label className="mb-2">Estimate Price and Time</Label>
            <div className="relative">
              {loadPrice ? (
                <AiOutlineLoading className="w-6 h-6 top-3  animate-spin rounded-md z-10 absolute text-muted-foreground right-3" />
              ) : (
                <RiMoneyDollarCircleFill className="w-6 h-6 rounded-md z-10 absolute top-1/2 text-muted-foreground transform -translate-y-1/2 right-3" />
              )}
              <Input
                disabled={loading}
                placeholder="Estimated price"
                className="h-12 rounded-xl pr-12"
                defaultValue={estimatedPrice}
                readOnly
              ></Input>
            </div>

            <FormMessage />
          </FormItem>
        </div>
        <div className="space-y-3">
          <Label className="mb-2">Product Size (optional)</Label>
          <div className="flex gap-x-3">
            <FormField
              disabled={loading}
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      min={0}
                      placeholder="width (cm)"
                      className="h-12 rounded-xl"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={loading}
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="height (cm)"
                      className="h-12 rounded-xl"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="length (cm)"
                      className="h-12 rounded-xl"
                      {...field}
                      disabled={loading}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex-1 space-y-3">
              <Label className="mb-2">Descritpion</Label>
              <FormControl>
                <Textarea
                  placeholder="Enter product description"
                  className="h-32 rounded-xl resize-none"
                  {...field}
                  disabled={loading}
                ></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full mt-10">
          <div className="flex items-center gap-x-4 float-right">
            <AlertDialog>
              <AlertDialogTrigger disabled={loading}>
                <Button
                  type="button"
                  disabled={loading}
                  variant={"outline"}
                  className="w-[120px]"
                  size={"lg"}
                >
                  Previous
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your changes will not be saved.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(a) => {
                      a.preventDefault();
                      setCurrentStep(2);
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button disabled={loading} className=" w-[120px]" size={"lg"}>
              {loading ? (
                <>
                  <span>Submit</span>
                  <AiOutlineLoading className="animate-spin text-base ml-3" />
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LastForm;
