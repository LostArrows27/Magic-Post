import { IoLocationOutline } from "react-icons/io5";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { District, Province, Subward, Ward } from "@/types/geometry-type";
import { UseFormReturn } from "react-hook-form";
import { getSubwardBasedOnWard } from "@/actions/get-subward-based-on-ward";
import { AiOutlineLoading } from "react-icons/ai";

type Form = UseFormReturn<
  {
    address: string;
    full_name: string;
    phone_number: string;
    province_id: string;
    district_id: string;
    ward_id: string;
    email?: string | undefined;
    subward_id?: string | undefined;
  },
  any,
  undefined
>;

const AddressFormField = ({
  form,
  district,
  ward,
  province,
}: {
  form: Form;
  district: District[] | null;
  ward: Ward[] | null;
  province: Province[] | null;
}) => {
  const [loading, setLoading] = useState(true);
  const [subward, setSubward] = useState<Subward[] | null>(null);

  const selectedProvinceId = form.watch("province_id");

  const selectedDistrictId = form.watch("district_id");

  const selectedWardId = form.watch("ward_id");

  const selectedSubwardId = form.watch("subward_id");

  const districtData = useMemo(() => {
    if (selectedDistrictId) {
      return district?.find(
        (value) => value.DISTRICT_ID + "" === selectedDistrictId
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvinceId, district, selectedDistrictId]);

  const wardData = useMemo(() => {
    if (selectedWardId) {
      return ward?.find((value) => value.WARDS_ID + "" === selectedWardId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWardId, ward]);

  const subwardData = useMemo(() => {
    if (selectedSubwardId) {
      return subward?.find((value) => value.id + "" === selectedSubwardId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubwardId, subward]);

  useEffect(() => {
    if (selectedProvinceId) {
      form.setValue("district_id", "");
      form.setValue("ward_id", "");
      form.setValue("subward_id", "");
      setSubward(null);
    }
  }, [form, selectedProvinceId]);

  useEffect(() => {
    if (selectedDistrictId) {
      form.setValue("ward_id", "");
      form.setValue("subward_id", "");
      setSubward(null);
    }
  }, [form, selectedDistrictId]);

  useEffect(() => {
    const fetchSubWard = async () => {
      try {
        form.setValue("subward_id", "");
        setSubward(null);
        setLoading(true);
        const wardList = await getSubwardBasedOnWard(wardData?.LOCATION_CODE!);

        setSubward(wardList);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.log(error);
      }
    };

    if (selectedWardId) {
      fetchSubWard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, selectedWardId]);

  return (
    <>
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem className="flex-1 space-y-3">
            <Label className="mb-2">Address</Label>
            <div className="relative">
              <IoLocationOutline className="w-6 h-6 rounded-md z-10 absolute top-1/2 text-muted-foreground transform -translate-y-1/2 right-3" />
              <FormControl>
                <Input
                  placeholder="Enter your address (road, subward, ward, district, city)"
                  className="h-12 rounded-xl pr-12"
                  {...field}
                ></Input>
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex-1 my-4 flex justify-between gap-x-4">
        <FormField
          control={form.control}
          name="province_id"
          render={({ field }) => (
            <FormItem className="flex-1 space-y-3">
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose province name" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {province?.map((value) => (
                    <SelectItem
                      className="py-4"
                      key={value.PROVINCE_ID}
                      value={value.PROVINCE_ID + ""}
                    >
                      {value.PROVINCE_NAME}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district_id"
          render={({ field }) => {
            return (
              <FormItem className="flex-1 space-y-3">
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <span>
                        {selectedDistrictId && districtData
                          ? districtData.DISTRICT_NAME
                          : "Choose district name"}
                      </span>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedProvinceId &&
                      district?.map((value) => {
                        if (value.PROVINCE_ID + "" !== selectedProvinceId)
                          return null;

                        return (
                          <SelectItem
                            className="py-4"
                            key={value.DISTRICT_ID}
                            value={value.DISTRICT_ID + ""}
                          >
                            {value.DISTRICT_NAME}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>
      <div className="flex-1 flex justify-between gap-x-4">
        <FormField
          control={form.control}
          name="ward_id"
          render={({ field }) => {
            return (
              <FormItem className="flex-1 space-y-3">
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <span>
                        {selectedWardId && wardData
                          ? wardData.WARDS_NAME
                          : "Choose ward name"}
                      </span>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent
                    className={!selectedDistrictId ? "hidden" : ""}
                  >
                    {selectedDistrictId &&
                      ward?.map((value) => {
                        if (value.DISTRICT_ID + "" !== selectedDistrictId)
                          return null;
                        return (
                          <SelectItem
                            className="py-4"
                            key={value.WARDS_ID}
                            value={value.WARDS_ID + ""}
                          >
                            {value.WARDS_NAME}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="subward_id"
          render={({ field }) => {
            return (
              <FormItem className="flex-1 space-y-3">
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <span>
                        {selectedSubwardId && subwardData
                          ? subwardData.name
                          : "Choose subward name (optional)"}
                      </span>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {loading ? (
                      <div className="w-full h-[200px] center">
                        <AiOutlineLoading className="animate-spin text-2xl" />
                      </div>
                    ) : subward?.length === 0 ? (
                      <div className="w-full h-[200px] center">
                        <span>No results</span>
                      </div>
                    ) : (
                      subward?.map((value) => {
                        // if (value.id + "" !== selectedWardId) return null;
                        return (
                          <SelectItem
                            className="py-4"
                            key={value.id}
                            value={value.id + ""}
                          >
                            {value.name}
                          </SelectItem>
                        );
                      })
                    )}
                  </SelectContent>
                </Select>
              </FormItem>
            );
          }}
        />
      </div>
    </>
  );
};

export default AddressFormField;
