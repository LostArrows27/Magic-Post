import { useTransferOrdersList } from "@/hooks/useTransferOrdersList";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

export default function SearchOrder() {
  const { orders, displayOrders, setDisplayOrders, setOrders } =
    useTransferOrdersList();
  const [searchValue, setSearchValue] = useState("");
  //filter orders

  useEffect(() => {
    //search order by name or id but when delete all it return to original

    if (searchValue !== "") {
      const newOrders = orders.filter((order) => {
        return (
          order.id.includes(searchValue) ||
          order.product_name.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setDisplayOrders(newOrders);
    } else {
      setDisplayOrders(orders);
    }
  }, [searchValue]);
  return (
    <Input
      placeholder="Search order..."
      value={searchValue}
      onChange={(e) => {
        setSearchValue(e.target.value);
      }}
      className="w-[300px] border-primary"
    />
  );
}
