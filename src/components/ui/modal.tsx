"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ReactNode } from "react";

type props = {
  title: string;
  description?: string;
  trigger: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function Modal({
  title,
  description,
  trigger,
  children,
  footer,
  className,
  open,
  onOpenChange,
}: props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={cn("sm:max-w-[1200px] px-0 pb-0", className)}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="px-4 display flex flex-row items-center justify-between">
          <DialogTitle>{title}</DialogTitle>
          <DialogClose
            className={cn(
              "rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground !mt-0"
            )}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="border-t grid gap-4 p-4 px-8 overflow-y-auto overflow-x-hidden">
          {description && <DialogDescription>{description}</DialogDescription>}
          <div>{children}</div>
        </div>
        {footer && <DialogFooter className="px-8">{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
