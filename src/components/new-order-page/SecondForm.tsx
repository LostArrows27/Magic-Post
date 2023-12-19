import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrderFormType, orderFormSchema } from "@/schema/order-form-schema";
import ImageNew from "../new-image/Image";
import { useVietNamGeography } from "@/hooks/useVietNamGeography";
import AddressFormField from "./AddressFormField";
import { Button } from "../ui/button";
import { useState } from "react";
import { Subward } from "@/types/geometry-type";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { AiOutlineLoading } from "react-icons/ai";
import { useOrderFormProgress } from "@/hooks/useOrderFormProgress";
import { useOrderFormData } from "@/hooks/useOrderFormData";
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

const SecondForm = () => {
  const form = useForm<OrderFormType>({
    resolver: zodResolver(orderFormSchema),
  });

  const [subward, setSubward] = useState<Subward[] | null>(null);
  const [loading, setLoading] = useState(false);

  const { district, ward, province } = useVietNamGeography();

  const { setReceiver, sender } = useOrderFormData();

  const { supabaseClient } = useSessionContext();

  const { setCurrentStep } = useOrderFormProgress();

  const onSubmit = async (values: OrderFormType) => {
    if (values.ward_id === "" || values.district_id === "") {
      form.setError("ward_id", {
        type: "manual",
        message: "Please select a ward",
      });
    }

    if (values.district_id === "") {
      form.setError("district_id", {
        type: "manual",
        message: "Please select a district",
      });
    }

    console.log(sender?.phone_number);

    console.log(values.phone_number);

    if (sender?.phone_number === values.phone_number) {
      form.setError("phone_number", {
        type: "manual",
        message: "Sender and receiver phone number cannot be the same",
      });
    }

    if (
      values.district_id !== "" &&
      values.ward_id !== "" &&
      sender?.phone_number !== values.phone_number
    ) {
      try {
        setLoading(true);

        const addedData = {
          ...values,
          subward_id: values.subward_id === "" ? null : values.subward_id,
          email: values.email === "" ? null : values.email,
          address_meta_data: {
            subward: subward?.find((s) => s.id + "" === values.subward_id),
            district: district?.find(
              (d) => d.DISTRICT_ID + "" === values.district_id
            ),
            ward: ward?.find((w) => w.WARDS_ID + "" === values.ward_id),
            province: province?.find(
              (p) => p.PROVINCE_ID + "" === values.province_id
            ),
          },
        };

        const { data, error } = await supabaseClient
          .from("customers")
          .upsert(addedData, {
            onConflict: "phone_number",
          })
          .select();

        if (error) {
          throw error;
        }
        setLoading(false);
        setReceiver(data![0]);
        setCurrentStep(3);
        toast.success("Sender information saved");
      } catch (error: any) {
        toast.error(error.message);
        setLoading(false);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full mt-8 flex flex-col gap-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          disabled={loading}
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem className="flex-1 space-y-3">
              <Label className="mb-2">Phone Number</Label>
              <div className="relative">
                <ImageNew
                  src="/images/vietnam.webp"
                  className="w-6 h-auto rounded-md z-10 absolute top-1/2 transform -translate-y-1/2 left-3"
                />
                <FormControl className="relative">
                  <Input
                    placeholder="Enter phone number to auto fill-in information"
                    className="h-12 rounded-xl pl-12"
                    {...field}
                  ></Input>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex-1 flex justify-between gap-x-4">
          <FormField
            disabled={loading}
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem className="flex-1 space-y-3">
                <Label className="mb-2">Full Name</Label>
                <FormControl className="relative">
                  <Input
                    placeholder="Enter your full name"
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
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1 space-y-3">
                <Label className="mb-2">Email (optional)</Label>
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    className="h-12 rounded-xl"
                    {...field}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <AddressFormField
          loading={loading}
          subward={subward}
          setSubward={setSubward}
          province={province}
          district={district}
          ward={ward}
          form={form}
        />
        <div className="w-full mt-10">
          <div className="flex items-center gap-x-4 float-right">
            <AlertDialog>
              <AlertDialogTrigger>
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
                      setCurrentStep(1);
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
                  <span>Next</span>
                  <AiOutlineLoading className="animate-spin text-base ml-3" />
                </>
              ) : (
                "Next"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SecondForm;
