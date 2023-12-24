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
import { useEffect, useState } from "react";
import { Subward } from "@/types/geometry-type";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { AiOutlineLoading } from "react-icons/ai";
import { useOrderFormProgress } from "@/hooks/useOrderFormProgress";
import { useOrderFormData } from "@/hooks/useOrderFormData";

const FirstForm = () => {
  const form = useForm<OrderFormType>({
    resolver: zodResolver(orderFormSchema),
  });

  const [subward, setSubward] = useState<Subward[] | null>(null);
  const [loading, setLoading] = useState(false);

  const { district, ward, province } = useVietNamGeography();

  const { setSender, sender } = useOrderFormData();

  const { supabaseClient } = useSessionContext();

  const { setCurrentStep, currentStep } = useOrderFormProgress();

  useEffect(() => {
    if (sender && currentStep === 1) {
      form.setValue("phone_number", sender.phone_number);
      form.setValue("full_name", sender.full_name);
      if (sender.email) {
        form.setValue("email", sender.email);
      }
      form.setValue("province_id", sender.province_id);
      form.setValue("district_id", sender.district_id);
      form.setValue("ward_id", sender.ward_id!);
      if (sender.subward_id) {
        form.setValue("subward_id", sender.subward_id);
      }
      if (sender.address) {
        form.setValue("address", sender.address);
      }
    }
  }, [form, sender, currentStep]);

  const onSubmit = async (values: OrderFormType) => {
    if (values.district_id === "") {
      form.setError("district_id", {
        type: "manual",
        message: "Please select a district",
      });
    }

    if (values.district_id !== "") {
      try {
        setLoading(true);

        const addedData = {
          ...values,
          ward_id: values.ward_id === "" ? null : values.ward_id,
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
        setSender(data![0]);
        setCurrentStep(2);
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
                    value={field.value ?? ""}
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
                    value={field.value ?? ""}
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
                    value={field.value ?? ""}
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
          <Button
            disabled={loading}
            className="float-right w-[120px]"
            size={"lg"}
          >
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
      </form>
    </Form>
  );
};

export default FirstForm;
