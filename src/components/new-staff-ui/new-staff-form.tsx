"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { format, set } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { NewStaffSchema } from "@/schema/staff-schema";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TbMars, TbVenus } from "react-icons/tb";

import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { useNewStaffAccountModal } from "@/hooks/useNewStaffAccountModal";
export type tNewStaffSchema = z.infer<typeof NewStaffSchema>;
export default function NewStaffForm() {
  const [serverError, setServerError] = useState<string>("");
  const { onOpen } = useNewStaffAccountModal();
  const { userDetails } = useUser();
  const form = useForm<tNewStaffSchema>({
    resolver: zodResolver(NewStaffSchema),
    defaultValues: {
      dob: undefined,
      full_name: "",
      home_town: "",
      gender: "",
      phone_number: "",
    },
  });
  async function onSubmit(values: tNewStaffSchema) {
    //format the date to YYYY-MM-DD

    const res = await axios.post("/api/new-staff", values);

    if (res.data.error) {
      if (res.data.error === "Invalid login credentials") {
        setServerError(" Please check your email and password");
      } else {
        setServerError(res.data.error);
      }
    } else {
      onOpen({ email: res.data.data.email, password: res.data.data.password });
      toast.success(
        `Create a ${userDetails?.role.split("_")[0]}_staff account success`
      );
      //reset the form
      form.reset({
        full_name: "",
        home_town: "",
        phone_number: "",
        dob: undefined,
        gender: "",
      });

      setServerError("");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("w-[600px]  space-y-4 ")}
      >
        <h1 className="super text-4xl text-center  font-bold tracking-wider">
          New Staff
        </h1>
        <p className="italic text-base text-center text-muted-foreground !mb-10">
          Fill in the form below the add new Staff
        </p>
        {/* <Button
          onClick={() => {
            onOpen({ email: "faesfsef", password: "fsefsef" });
          }}
        >
          Hello
        </Button> */}
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter a full name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    defaultMonth={new Date(2000, 8)}
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date: Date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex gap-x-6">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">
                      <div className="flex gap-x-3">
                        <span className="text-xl text-blue-400">
                          <TbMars />
                        </span>{" "}
                        Male
                      </div>
                    </SelectItem>
                    <SelectItem value="female">
                      <div className="flex gap-x-3">
                        <span className="text-xl text-pink-400">
                          <TbVenus />
                        </span>
                        Female
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="home_town"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Home Town</FormLabel>
              <FormControl>
                <Input placeholder="Enter home town address" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {serverError && (
          <p className=" mt-0 font-bold tracking-wider text-center text-red-500">
            {serverError}
          </p>
        )}
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full  font-bold uppercase tracking-widest flex items-centers !mt-6 "
        >
          Add Staff
          {form.formState.isSubmitting && (
            <AiOutlineLoading3Quarters className="animate-spin  ml-3" />
          )}
        </Button>
      </form>
    </Form>
  );
}
