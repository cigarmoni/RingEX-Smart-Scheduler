import { AvaUpsellDialog } from "@/components/AvaUpsellDialog";

export const BookingFeatureDialog = ({
  open,
  onOpenChange,
  onFreeTrial,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFreeTrial?: () => void;
}) => (
  <AvaUpsellDialog
    open={open}
    onOpenChange={onOpenChange}
    onFreeTrial={onFreeTrial}
  />
);
