"use client";

import { useNewStaffAccountModal } from "@/hooks/useNewStaffAccountModal";
import Modal from "../modals/Modal";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
export default function NewStaffAccountModal() {
  const { onClose, isOpen, email, password } = useNewStaffAccountModal();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  const onCopy = (text: string, type: "email" | "password") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => {
        setCopiedEmail(false);
      }, 1000);
    }
    if (type === "password") {
      setCopiedPassword(true);
      setTimeout(() => {
        setCopiedPassword(false);
      }, 1000);
    }
  };
  return (
    <Modal isOpen={isOpen} onChange={onChange} className="">
      <DialogHeader>
        <DialogTitle>Account Information</DialogTitle>
        <DialogDescription>
          This is the email and password for your new staff account.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <div className="gap-x-2 flex items-center">
          <Input
            id="email"
            readOnly
            className="bg-zinc-300/50 focus-visible:ring-0 focus-visible:ring-offset-0 text-black border-0"
            value={email}
          />
          <Button
            onClick={() => {
              onCopy(email, "email");
            }}
          >
            {copiedEmail ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <div className="gap-x-2 flex items-center">
          <Input
            id="password"
            readOnly
            className="bg-zinc-300/50 focus-visible:ring-0 focus-visible:ring-offset-0 text-black border-0"
            value={password}
          />
          <Button
            onClick={() => {
              onCopy(password, "password");
            }}
          >
            {copiedPassword ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </Modal>
  );
}
