"use client";

import { useNewLocations } from "@/hooks/useNewLocations";
import { Button } from "../ui/button";

export default function NewLocationButton() {
  const { onOpen } = useNewLocations();
  return <Button onClick={onOpen}>+ New Facility</Button>;
}
