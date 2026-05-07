import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ShareBookingPopoverContent } from "@/components/ShareBookingPopoverContent";

export interface ShareBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSent?: () => void;
}

export const ShareBookingDialog = ({
  open,
  onOpenChange,
  onSent,
}: ShareBookingDialogProps): JSX.Element => {
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      if (document.body.style.pointerEvents === "none") {
        document.body.style.pointerEvents = "";
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="dialog-share-booking-global"
        onOpenAutoFocus={(e) => {
          if (document.body.style.pointerEvents === "none") {
            document.body.style.pointerEvents = "";
          }
        }}
        className="w-[440px] max-w-[95vw] gap-0 overflow-hidden rounded-[14px] border-none bg-white p-4 sm:max-w-[440px]"
      >
        <VisuallyHidden>
          <DialogTitle>Share booking link</DialogTitle>
          <DialogDescription>
            Choose a booking type and how you want to send the link.
          </DialogDescription>
        </VisuallyHidden>
        <ShareBookingPopoverContent
          idPrefix="share-booking-global"
          onCancel={() => onOpenChange(false)}
          onSend={() => {
            onOpenChange(false);
            onSent?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ShareBookingDialog;
