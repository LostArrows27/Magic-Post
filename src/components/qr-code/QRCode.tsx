"use client";

import QRCode from "react-qr-code";

const QrCode = ({ value }: { value: string }) => {
  return <QRCode size={90} value={value} />;
};

export default QrCode;
