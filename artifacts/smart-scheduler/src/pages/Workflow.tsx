import { useEffect, useState } from "react";
import { useFlowParam } from "../lib/flows";
import { AppShell } from "../components/AppShell";
import { Button, TextField, Select, MenuItem, IconButton } from "@ringcentral/spring-ui";
import { BookingFeatureDialog } from "../components/BookingFeatureDialog";
import {
  ArrowLeftMd,
  PlayMd,
  OverflowMd,
  Xmd,
  OverflowVerticalMd,
  SearchMd,
  ArrowDownMd,
  ArrowUpMd,
  TransferCallMd,
  RefreshMd,
  MessageMd,
  CalendarMd,
  VideoMd,
  ProfileMd,
  PhoneSettingsMd,
  EditMd
} from "@ringcentral/spring-icon";

type StepRow = {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  iconBg: string;
  hasIndicator?: boolean;
};

const genericSteps: StepRow[] = [
  {
    id: "repeat-each",
    title: "Repeat for each",
    description: "Repeat actions for each item in a list",
    icon: <TransferCallMd className="h-4 w-4 text-[#fe8624]" />,
    iconBg: "bg-[#fe86241a]",
  },
  {
    id: "repeat-while",
    title: "Repeat while",
    description: "Repeat actions based on conditions",
    icon: <RefreshMd className="h-4 w-4 text-[#fe8624]" />,
    iconBg: "bg-[#fe86241a]",
  },
];

const ringCentralSteps: StepRow[] = [
  {
    id: "send-sms",
    title: "Send SMS",
    description: "Send an SMS message from your number.",
    icon: <MessageMd className="h-4 w-4 text-cobranding-f" />,
    iconBg: "bg-cobranding-b/8",
  },
  {
    id: "send-chat",
    title: "Send chat message",
    description: "Send a team chat message to specified team ID in RingCentral App.",
    icon: <MessageMd className="h-4 w-4 text-cobranding-f" />,
    iconBg: "bg-cobranding-b/8",
  },
  {
    id: "send-booking",
    title: "Send booking link",
    description: "Send booking link via text, chat, or email",
    icon: <CalendarMd className="h-4 w-4 text-success-f" />,
    iconBg: "bg-[#16a9371a]",
    hasIndicator: true,
  },
  {
    id: "create-meeting",
    title: "Create a meeting",
    description: "Create a RingCentral video meeting.",
    icon: <VideoMd className="h-4 w-4 text-cobranding-f" />,
    iconBg: "bg-cobranding-b/8",
  },
];

const StepItem = ({
  step,
  onClick,
}: {
  step: StepRow;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full items-start gap-3 rounded-lg p-2 text-left hover:bg-neutral-b2"
    data-testid={`step-${step.id}`}
  >
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${step.iconBg}`}
    >
      {step.icon}
    </div>
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-semibold text-neutral-b2">{step.title}</span>
        {step.hasIndicator && (
          <span className="h-2 w-2 rounded-full bg-[#fe8624]" />
        )}
      </div>
      <span className="text-xs text-neutral-b1">{step.description}</span>
    </div>
  </button>
);

const FieldRow = ({
  icon,
  label,
  testId,
}: {
  icon: JSX.Element;
  label: string;
  testId: string;
}) => (
  <div
    className="flex items-center gap-2 rounded-md border border-neutral-b0-t20 bg-white px-2.5 py-1.5"
    data-testid={testId}
  >
    {icon}
    <span className="text-sm text-neutral-b2">{label}</span>
  </div>
);

export const Workflow = (): JSX.Element => {
  const [panelOpen, setPanelOpen] = useState(true);
  const [ringCentralOpen, setRingCentralOpen] = useState(true);
  const [filter, setFilter] = useState("all");
  const [bookingIntroOpen, setBookingIntroOpen] = useState(false);

  const handleStepClick = (stepId: string) => {
    if (stepId === "send-booking") {
      setBookingIntroOpen(true);
    }
  };

  const flow = useFlowParam();

  useEffect(() => {
    if (flow === "after-workflow-send-link") {
      setBookingIntroOpen(true);
      setPanelOpen(true);
      setRingCentralOpen(true);
    }
  }, [flow]);

  return (
    <AppShell activeNav="More">
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Page header */}
        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-b0-t20 bg-white px-3 py-3 sm:px-4">
          <div className="flex min-w-0 items-center gap-2">
            <IconButton
              symbol={ArrowLeftMd as any}
              variant="icon"
              color="neutral"
              size="medium"
              aria-label="Back"
              data-testid="button-back"
            />
            <h2
              className="truncate text-title text-neutral-b2"
              data-testid="text-workflow-title"
            >
              Untitled workflow
            </h2>
            <span
              className="rounded-md bg-neutral-b2 px-2 py-0.5 text-xs font-semibold text-neutral-b1"
              data-testid="status-draft"
            >
              Draft
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              color="primary"
              className="h-8 px-3"
              data-testid="button-publish"
            >
              <ProfileMd className="mr-1.5 h-4 w-4" />
              Publish
            </Button>
            <IconButton
              symbol={PlayMd as any}
              variant="icon"
              color="neutral"
              size="medium"
              aria-label="Run"
              data-testid="button-run"
            />
            <IconButton
              symbol={OverflowMd as any}
              variant="icon"
              color="neutral"
              size="medium"
              aria-label="More"
              data-testid="button-header-more"
            />
          </div>
        </header>

        {/* Body: canvas with floating panel overlay */}
        <div className="relative flex min-h-0 flex-1 flex-col">
          {/* Add a step floating panel */}
          {panelOpen && (
            <aside
              className="z-20 mx-3 mt-3 flex w-80 shrink-0 flex-col rounded-xl border border-neutral-b0-t20 bg-white shadow-md md:absolute md:left-4 md:top-4 md:mx-0 md:mt-0 md:h-[calc(100%-32px)]"
              data-testid="panel-add-step"
            >
              <div className="flex flex-col items-center pt-2">
                <button
                  type="button"
                  className="cursor-grab text-neutral-b1"
                  aria-label="Drag panel"
                  data-testid="button-drag-panel"
                >
                  <OverflowVerticalMd className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between px-4 pb-2 pt-1">
                <h3 className="text-title text-neutral-b2">
                  Add a step
                </h3>
                <IconButton
                  symbol={Xmd as any}
                  variant="icon"
                  color="neutral"
                  size="small"
                  onClick={() => setPanelOpen(false)}
                  aria-label="Close panel"
                  data-testid="button-close-panel"
                />
              </div>
              <p className="px-4 pb-3 text-xs text-neutral-b1">
                Click a node to add a step, or drag one to a specific spot in
                the flow.
              </p>
              <div className="flex items-center gap-2 px-4 pb-3">
                <TextField
                  placeholder="Search"
                  className="flex-1 h-8 text-sm"
                  data-testid="input-search-steps"
                />
                <Select value={filter} onChange={(e) => setFilter(e.target.value as string)} className="w-[80px]">
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="generic">Generic</MenuItem>
                  <MenuItem value="ringcentral">RingCentral</MenuItem>
                </Select>
              </div>

              <div className="flex-1 overflow-y-auto px-2 pb-4">
                <div className="flex flex-col gap-1">
                  {genericSteps.map((step) => (
                    <StepItem
                      key={step.id}
                      step={step}
                      onClick={() => handleStepClick(step.id)}
                    />
                  ))}
                </div>
                <div className="mt-2 px-2 py-2">
                  <button
                    type="button"
                    onClick={() => setRingCentralOpen((p) => !p)}
                    className="flex w-full items-center gap-1 text-sm font-semibold text-neutral-b2"
                    data-testid="button-toggle-ringcentral-group"
                  >
                    {ringCentralOpen ? (
                      <ArrowDownMd className="h-4 w-4" />
                    ) : (
                      <ArrowUpMd className="h-4 w-4" />
                    )}
                    RingCentral
                  </button>
                </div>
                {ringCentralOpen && (
                  <div className="flex flex-col gap-1">
                    {ringCentralSteps.map((step) => (
                      <StepItem
                        key={step.id}
                        step={step}
                        onClick={() => handleStepClick(step.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </aside>
          )}

          {/* Canvas */}
          <div
            className="relative flex min-h-0 flex-1 overflow-auto bg-[#fafbfc] lg:pl-[344px]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #00000026 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
            data-testid="canvas-workflow"
          >
            <div className="relative mx-auto flex w-full max-w-[600px] flex-col items-center gap-0 px-4 py-8">
              {/* Top arrow */}
              <ArrowDownMd className="h-5 w-5 text-neutral-b1" />

              {/* Start node */}
              <div
                className="mt-2 flex w-full max-w-[360px] items-center gap-2 rounded-lg border border-[#fe8624] bg-[#fff4eb] px-3 py-2.5 shadow-sm"
                data-testid="node-start"
              >
                <PlayMd className="h-4 w-4 shrink-0 fill-[#fe8624] text-[#fe8624]" />
                <span className="flex-1 text-sm font-semibold text-neutral-b2">
                  Start
                </span>
                <IconButton
                  symbol={ArrowDownMd as any}
                  variant="icon"
                  color="neutral"
                  size="small"
                  aria-label="Toggle start"
                  data-testid="button-start-toggle"
                />
                <IconButton
                  symbol={OverflowMd as any}
                  variant="icon"
                  color="neutral"
                  size="small"
                  aria-label="Start options"
                  data-testid="button-start-more"
                />
              </div>

              {/* Connector */}
              <div className="my-1 h-6 w-px bg-neutral-b3" />

              {/* HubSpot node */}
              <div
                className="flex w-full max-w-[360px] flex-col rounded-lg border border-neutral-b0-t20 bg-white shadow-sm"
                data-testid="node-hubspot"
              >
                <div className="flex items-center gap-2 border-b border-neutral-b0-t20 px-3 py-2.5">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#ff7a59] text-[10px] font-bold text-white">
                    H
                  </div>
                  <span className="flex-1 truncate text-sm font-semibold text-neutral-b2">
                    HubSpot: Get Contact
                  </span>
                  <IconButton
                    symbol={ArrowUpMd as any}
                    variant="icon"
                    color="neutral"
                    size="small"
                    aria-label="Toggle node"
                    data-testid="button-hubspot-toggle"
                  />
                  <IconButton
                    symbol={OverflowMd as any}
                    variant="icon"
                    color="neutral"
                    size="small"
                    aria-label="Node options"
                    data-testid="button-hubspot-more"
                  />
                </div>
                <div className="flex flex-col gap-2 px-3 py-2.5">
                  <span className="text-xs font-semibold text-neutral-b1">
                    Input
                  </span>
                  <FieldRow
                    icon={<ProfileMd className="h-4 w-4 text-neutral-b1" />}
                    label="Name"
                    testId="field-input-name"
                  />
                  <FieldRow
                    icon={<PhoneSettingsMd className="h-4 w-4 text-neutral-b1" />}
                    label="Number"
                    testId="field-input-number"
                  />
                  <span className="mt-1 text-xs font-semibold text-neutral-b1">
                    Output
                  </span>
                  <FieldRow
                    icon={<EditMd className="h-4 w-4 text-neutral-b1" />}
                    label="Contact ID"
                    testId="field-output-contact-id"
                  />
                </div>
              </div>

              {/* Connector */}
              <div className="my-1 h-6 w-px bg-neutral-b3" />

              {/* Branching node */}
              <div
                className="flex w-full max-w-[360px] items-center gap-2 rounded-lg border border-neutral-b0-t20 bg-white px-3 py-2.5 shadow-sm"
                data-testid="node-branch"
              >
                <div className="h-4 w-4 shrink-0 rotate-45 border border-neutral-b0-t10" />
                <span className="flex-1 text-sm font-semibold text-neutral-b2">
                  Condition
                </span>
                <IconButton
                  symbol={ArrowDownMd as any}
                  variant="icon"
                  color="neutral"
                  size="small"
                  aria-label="Toggle branch"
                  data-testid="button-branch-toggle"
                />
                <IconButton
                  symbol={OverflowMd as any}
                  variant="icon"
                  color="neutral"
                  size="small"
                  aria-label="Branch options"
                  data-testid="button-branch-more"
                />
              </div>

              {/* Else branch */}
              <div className="relative mt-1 flex w-full max-w-[360px] flex-col items-end">
                <div className="h-6 w-px bg-neutral-b3" />
                <div
                  className="rounded-full border border-neutral-b0-t20 bg-white px-3 py-1 text-xs font-semibold text-neutral-b1 shadow-sm"
                  data-testid="label-else-branch"
                >
                  Else
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <BookingFeatureDialog
        open={bookingIntroOpen}
        onOpenChange={setBookingIntroOpen}
      />
    </AppShell>
  );
};
