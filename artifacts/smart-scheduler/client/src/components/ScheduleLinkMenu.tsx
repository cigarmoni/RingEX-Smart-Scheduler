import type { ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Calendar, Lightbulb } from "lucide-react";

export interface ScheduleLinkMenuProps {
  children: ReactNode;
  onShareBookingLink: () => void;
  onScheduleMeeting?: () => void;
  onAddToReminders?: () => void;
  className?: string;
  testIdPrefix?: string;
}

export const ScheduleLinkMenu = ({
  children,
  onShareBookingLink,
  onScheduleMeeting,
  onAddToReminders,
  className,
  testIdPrefix = "schedule-link",
}: ScheduleLinkMenuProps) => {
  const { toast } = useToast();

  const handleScheduleMeeting = () => {
    if (onScheduleMeeting) {
      onScheduleMeeting();
      return;
    }
    toast({ description: "Scheduling a meeting…" });
  };

  const handleAddToReminders = () => {
    if (onAddToReminders) {
      onAddToReminders();
      return;
    }
    toast({ description: "Added to reminders" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={
            "inline cursor-pointer text-sui-cobranding underline decoration-dotted underline-offset-[3px] hover:decoration-solid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sui-cobranding/40 focus-visible:rounded-sm" +
            (className ? " " + className : "")
          }
          data-testid={`${testIdPrefix}-trigger`}
        >
          {children}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={6}
        className="w-[220px] rounded-xl border border-[var(--sui-colors-neutral-b4)] bg-white p-1 shadow-lg"
        data-testid={`${testIdPrefix}-menu`}
      >
        <DropdownMenuItem
          onSelect={handleScheduleMeeting}
          className="flex items-center gap-2 rounded-md px-2 py-1.5 font-main-text text-[length:var(--main-text-font-size)] text-[var(--sui-colors-neutral-b0)] focus:bg-[var(--sui-colors-neutral-b5)] focus:text-[var(--sui-colors-neutral-b0)]"
          data-testid={`${testIdPrefix}-item-schedule-meeting`}
        >
          <Calendar className="h-4 w-4 text-[var(--sui-colors-neutral-b1)]" />
          <span>Schedule a meeting</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={handleAddToReminders}
          className="flex items-center gap-2 rounded-md px-2 py-1.5 font-main-text text-[length:var(--main-text-font-size)] text-[var(--sui-colors-neutral-b0)] focus:bg-[var(--sui-colors-neutral-b5)] focus:text-[var(--sui-colors-neutral-b0)]"
          data-testid={`${testIdPrefix}-item-add-reminder`}
        >
          <Bell className="h-4 w-4 text-[var(--sui-colors-neutral-b1)]" />
          <span>Add to reminders</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={onShareBookingLink}
          className="flex items-center gap-2 rounded-md px-2 py-1.5 font-main-text text-[length:var(--main-text-font-size)] text-[var(--sui-colors-neutral-b0)] focus:bg-[var(--sui-colors-neutral-b5)] focus:text-[var(--sui-colors-neutral-b0)]"
          data-testid={`${testIdPrefix}-item-share-booking`}
        >
          <Lightbulb className="h-4 w-4 text-[var(--sui-colors-neutral-b1)]" />
          <span>Share a booking link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ScheduleLinkMenu;
