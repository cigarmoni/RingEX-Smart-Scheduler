import { useEffect, useState } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CaretRightMd, PlusMd } from "@ringcentral/spring-icon";
import { useSmartSchedulerPurchased } from "@/lib/smartScheduler";
import { BookingFeatureDialog } from "@/components/BookingFeatureDialog";
import { ShareBookingDialog } from "@/components/ShareBookingDialog";
import { UpgradeIndicator } from "@/components/UpgradeIndicator";
import { useFlowParam } from "@/lib/flows";
import { useToast } from "@/hooks/use-toast";

const itemRowClass =
  "group flex min-h-10 w-full cursor-default select-none items-center px-3 py-2.5 text-left text-black outline-none data-[highlighted]:bg-[#f5f6f9] data-[state=open]:bg-[#f5f6f9]";

const labelClass =
  "flex-1 font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-[number:var(--subtitle-mini-font-weight)] leading-[var(--subtitle-mini-line-height)] tracking-[var(--subtitle-mini-letter-spacing)] [font-style:var(--subtitle-mini-font-style)]";

const menuContentClass =
  "z-50 min-w-[220px] overflow-hidden rounded-[10px] border border-solid border-[#00000033] bg-white py-2 shadow-[0_4px_16px_rgba(0,0,0,0.15)]";

interface MenuRowProps {
  label: string;
  testId?: string;
  trailing?: React.ReactNode;
  onSelect?: (event: Event) => void;
}

const MenuRow = ({ label, testId, trailing, onSelect }: MenuRowProps) => (
  <DropdownMenuPrimitive.Item
    className={itemRowClass}
    onSelect={onSelect}
    data-testid={testId}
  >
    <span className={labelClass}>{label}</span>
    {trailing ? <span className="ml-2 flex shrink-0 items-center">{trailing}</span> : null}
  </DropdownMenuPrimitive.Item>
);

interface SubRowProps {
  label: string;
  testId?: string;
  children: React.ReactNode;
}

const SubRow = ({ label, testId, children }: SubRowProps) => (
  <DropdownMenuPrimitive.Sub>
    <DropdownMenuPrimitive.SubTrigger
      className={itemRowClass}
      data-testid={testId}
    >
      <span className={labelClass}>{label}</span>
      <CaretRightMd
        className="ml-2 h-4 w-4 shrink-0 text-[#56585e]"
        fill="currentColor"
        aria-hidden="true"
      />
    </DropdownMenuPrimitive.SubTrigger>
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        sideOffset={4}
        className={menuContentClass}
      >
        {children}
      </DropdownMenuPrimitive.SubContent>
    </DropdownMenuPrimitive.Portal>
  </DropdownMenuPrimitive.Sub>
);

export interface AppBarAddMenuProps {
  testIdPrefix?: string;
}

export const AppBarAddMenu = ({
  testIdPrefix = "appbar-add",
}: AppBarAddMenuProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [bookingIntroOpen, setBookingIntroOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [isPurchased] = useSmartSchedulerPurchased();
  const flow = useFlowParam();
  const { toast } = useToast();

  useEffect(() => {
    if (flow === "global-add-menu") setOpen(true);
  }, [flow]);

  const handleShareBookingLink = (event: Event) => {
    event.preventDefault();
    setOpen(false);
    if (!isPurchased) {
      window.setTimeout(() => setBookingIntroOpen(true), 50);
      return;
    }
    window.setTimeout(() => setShareDialogOpen(true), 50);
  };

  const noop = (event: Event) => {
    event.preventDefault();
    setOpen(false);
  };

  return (
    <>
      <DropdownMenuPrimitive.Root open={open} onOpenChange={setOpen}>
        <DropdownMenuPrimitive.Trigger asChild>
          <button
            type="button"
            aria-label="New"
            data-testid={`${testIdPrefix}-trigger`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[14px] bg-white p-0 text-[#0040dd] hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <PlusMd className="h-5 w-5" fill="currentColor" />
          </button>
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="end"
            sideOffset={6}
            collisionPadding={8}
            className={menuContentClass}
            data-testid={`${testIdPrefix}-menu`}
          >
            <MenuRow
              label="New message"
              testId={`${testIdPrefix}-new-message`}
              onSelect={noop}
            />
            <MenuRow
              label="Create team"
              testId={`${testIdPrefix}-create-team`}
              onSelect={noop}
            />
            <SubRow
              label="Schedule time"
              testId={`${testIdPrefix}-schedule-time`}
            >
              <MenuRow
                label="Start a video meeting"
                testId={`${testIdPrefix}-start-video-meeting`}
                onSelect={noop}
              />
              <MenuRow
                label="Schedule a video meeting"
                testId={`${testIdPrefix}-schedule-video-meeting`}
                onSelect={noop}
              />
              <MenuRow
                label="Share booking link"
                testId={`${testIdPrefix}-share-booking-link`}
                onSelect={handleShareBookingLink}
                trailing={
                  !isPurchased ? (
                    <UpgradeIndicator testId={`${testIdPrefix}-share-booking-link-upgrade`} />
                  ) : undefined
                }
              />
              <MenuRow
                label="Start a conference call"
                testId={`${testIdPrefix}-start-conference-call`}
                onSelect={noop}
              />
            </SubRow>
            <MenuRow
              label="Create webinar"
              testId={`${testIdPrefix}-create-webinar`}
              onSelect={noop}
            />
            <MenuRow
              label="Send text"
              testId={`${testIdPrefix}-send-text`}
              onSelect={noop}
            />
            <MenuRow
              label="Send voicemail"
              testId={`${testIdPrefix}-send-voicemail`}
              onSelect={noop}
            />
            <MenuRow
              label="Send fax"
              testId={`${testIdPrefix}-send-fax`}
              onSelect={noop}
            />
            <SubRow
              label="Invite to RingCentral"
              testId={`${testIdPrefix}-invite`}
            >
              <MenuRow
                label="By email"
                testId={`${testIdPrefix}-invite-email`}
                onSelect={noop}
              />
              <MenuRow
                label="By text"
                testId={`${testIdPrefix}-invite-text`}
                onSelect={noop}
              />
              <MenuRow
                label="By sharing a link"
                testId={`${testIdPrefix}-invite-link`}
                onSelect={noop}
              />
            </SubRow>
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>

      <BookingFeatureDialog
        open={bookingIntroOpen}
        onOpenChange={setBookingIntroOpen}
      />

      <ShareBookingDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        onSent={() => toast({ description: "Booking link sent" })}
      />
    </>
  );
};

export default AppBarAddMenu;
