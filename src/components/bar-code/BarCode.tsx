"use client";

import Barcode from "react-barcode";

const BarCode = ({ value }: { value: string }) => {
  return (
    <Barcode
      width={1.7}
      fontSize={14}
      height={60}
      font="Times New Roman"
      value={value}
    />
  );
};

export default BarCode;
