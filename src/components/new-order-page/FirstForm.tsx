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

// TODO: auto fill-in customer after phone number is entered

// TODO:

const FirstForm = () => {
  const form = useForm<OrderFormType>({
    resolver: zodResolver(orderFormSchema),
  });

  const { district, ward, province } = useVietNamGeography();

  const onSubmit = (values: OrderFormType) => {
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

    if (values.district_id !== "" && values.ward_id !== "") {
      console.log(values);
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full mt-8 flex flex-col gap-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
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
          province={province}
          district={district}
          ward={ward}
          form={form}
        />
        <div className="w-full mt-10">
          <Button className="float-right" size={"lg"}>
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FirstForm;
