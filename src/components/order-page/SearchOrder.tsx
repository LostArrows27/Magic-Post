import { useState } from "react";
import { Input } from "../ui/input";
import { useAllOrder } from "@/hooks/useAllOrder";

const SearchOrder = () => {
  const [value, setValue] = useState("");

  const { allOrderOrigin, setAllOrder } = useAllOrder((state) => ({
    allOrderOrigin: state.allOrderOriginData,
    setAllOrder: state.setAllOrder,
  }));

  return (
    <Input
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        setAllOrder(
          allOrderOrigin.filter((order) => {
            return (
              order.product_name.includes(e.target.value) ||
              order.id.includes(e.target.value)
            );
          })
        );
      }}
      placeholder="Search order..."
      className="w-[300px] border-primary"
    />
  );
};

export default SearchOrder;
