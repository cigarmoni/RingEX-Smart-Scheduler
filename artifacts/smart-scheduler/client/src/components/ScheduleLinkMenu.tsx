import { useState, type ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "lucide-react";
import { UpgradeIndicator } from "@/components/UpgradeIndicator";

export interface ScheduleLinkMenuProps {
  children: ReactNode;
  onShareBookingLink: () => void;
  onScheduleMeeting?: () => void;
  onAddToReminders?: () => void;
  className?: string;
  testIdPrefix?: string;
  showShareUpgradeIndicator?: boolean;
  preventCloseAutoFocus?: boolean;
}

export const ScheduleLinkMenu = ({
  children,
  onShareBookingLink,
  onScheduleMeeting,
  onAddToReminders,
  className,
  testIdPrefix = "schedule-link",
  showShareUpgradeIndicator = false,
  preventCloseAutoFocus = false,
}: ScheduleLinkMenuProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleScheduleMeeting = () => {
    setOpen(false);
    if (onScheduleMeeting) {
      onScheduleMeeting();
      return;
    }
    toast({ description: "Scheduling a meeting…" });
  };

  const handleAddToReminders = () => {
    setOpen(false);
    if (onAddToReminders) {
      onAddToReminders();
      return;
    }
    toast({ description: "Added to reminders" });
  };

  const handleShareBookingSelect = (event: Event) => {
    event.preventDefault();
    setOpen(false);
    onShareBookingLink();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={!preventCloseAutoFocus}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={
            "inline-flex items-center gap-1 align-middle cursor-pointer text-sui-cobranding focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sui-cobranding/40 focus-visible:rounded-sm" +
            (className ? " " + className : "")
          }
          data-testid={`${testIdPrefix}-trigger`}
        >
          <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {children}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={6}
        className="z-[200] w-[220px] rounded-xl border border-[var(--sui-colors-neutral-b4)] bg-white p-1 shadow-lg"
        data-testid={`${testIdPrefix}-menu`}
        onCloseAutoFocus={
          preventCloseAutoFocus ? (event) => event.preventDefault() : undefined
        }
      >
        <DropdownMenuItem
          onSelect={handleScheduleMeeting}
          className="flex items-center gap-2 rounded-md px-2 py-1.5 font-main-text text-[length:var(--main-text-font-size)] text-[var(--sui-colors-neutral-b0)] focus:bg-[var(--sui-colors-neutral-b5)] focus:text-[var(--sui-colors-neutral-b0)]"
          data-testid={`${testIdPrefix}-item-schedule-meeting`}
        >
          <span>Schedule a meeting</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={handleAddToReminders}
          className="flex items-center gap-2 rounded-md px-2 py-1.5 font-main-text text-[length:var(--main-text-font-size)] text-[var(--sui-colors-neutral-b0)] focus:bg-[var(--sui-colors-neutral-b5)] focus:text-[var(--sui-colors-neutral-b0)]"
          data-testid={`${testIdPrefix}-item-add-reminder`}
        >
          <span>Add to reminders</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={handleShareBookingSelect}
          className="flex items-center gap-2 rounded-md px-2 py-1.5 font-main-text text-[length:var(--main-text-font-size)] text-[var(--sui-colors-neutral-b0)] focus:bg-[var(--sui-colors-neutral-b5)] focus:text-[var(--sui-colors-neutral-b0)]"
          data-testid={`${testIdPrefix}-item-share-booking`}
        >
          <span>Share a booking link</span>
          {showShareUpgradeIndicator && (
            <UpgradeIndicator className="ml-auto" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ScheduleLinkMenu;
