import { useEffect, useState } from "react";
import { useFlowParam, useIsBookingPurchased } from "@/lib/flows";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Play,
  MoreVertical,
  X,
  GripHorizontal,
  Search,
  ChevronDown,
  ChevronUp,
  Repeat,
  RotateCw,
  MessageSquare,
  MessageCircle,
  Calendar,
  Video,
  ArrowDown,
  User,
  Plus,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingFeatureDialog } from "@/components/BookingFeatureDialog";

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
    icon: <Repeat className="h-4 w-4 text-[#fe8624]" />,
    iconBg: "bg-[#fe86241a]",
  },
  {
    id: "repeat-while",
    title: "Repeat while",
    description: "Repeat actions based on conditions",
    icon: <RotateCw className="h-4 w-4 text-[#fe8624]" />,
    iconBg: "bg-[#fe86241a]",
  },
];

const ringCentralSteps: StepRow[] = [
  {
    id: "send-sms",
    title: "Send SMS",
    description: "Send an SMS message from your number.",
    icon: <MessageSquare className="h-4 w-4 text-[#0040dd]" />,
    iconBg: "bg-[#0040dd1a]",
  },
  {
    id: "send-chat",
    title: "Send chat message",
    description: "Send a team chat message to specified team ID in RingCentral App.",
    icon: <MessageCircle className="h-4 w-4 text-[#0040dd]" />,
    iconBg: "bg-[#0040dd1a]",
  },
  {
    id: "send-booking",
    title: "Send booking link",
    description: "Send booking link via text, chat, or email",
    icon: <Calendar className="h-4 w-4 text-[#16a937]" />,
    iconBg: "bg-[#16a9371a]",
  },
  {
    id: "create-meeting",
    title: "Create a meeting",
    description: "Create a RingCentral video meeting.",
    icon: <Video className="h-4 w-4 text-[#0040dd]" />,
    iconBg: "bg-[#0040dd1a]",
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
    className="flex w-full items-start gap-3 rounded-lg p-2 text-left hover:bg-[#f5f6f9]"
    data-testid={`step-${step.id}`}
  >
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${step.iconBg}`}
    >
      {step.icon}
    </div>
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-semibold text-black">{step.title}</span>
        {step.hasIndicator && (
          <span className="h-2 w-2 rounded-full bg-[#fe8624]" />
        )}
      </div>
      <span className="text-xs text-[#56585e]">{step.description}</span>
    </div>
  </button>
);

export const Workflow = (): JSX.Element => {
  const [panelOpen, setPanelOpen] = useState(true);
  const [ringCentralOpen, setRingCentralOpen] = useState(true);
  const [filter, setFilter] = useState("all");
  const [bookingIntroOpen, setBookingIntroOpen] = useState(false);
  const isPurchased = useIsBookingPurchased();
  const [sendBookingStepAdded, setSendBookingStepAdded] = useState(false);
  const [configPanelOpen, setConfigPanelOpen] = useState(false);
  const [cfgBookingType, setCfgBookingType] = useState("therapy-session-natalie");
  const [cfgSendVia, setCfgSendVia] = useState("text");
  const [cfgRecipient, setCfgRecipient] = useState("");
  const [cfgFrom, setCfgFrom] = useState("");
  const [cfgMessage, setCfgMessage] = useState("");

  const handleStepClick = (stepId: string) => {
    if (stepId !== "send-booking") return;
    if (isPurchased) {
      setSendBookingStepAdded(true);
      setConfigPanelOpen(true);
      setPanelOpen(false);
    } else {
      setBookingIntroOpen(true);
    }
  };

  const flow = useFlowParam();

  useEffect(() => {
    if (flow === "after-workflow-send-link") {
      setBookingIntroOpen(false);
      setPanelOpen(true);
      setRingCentralOpen(true);
      setConfigPanelOpen(false);
      setSendBookingStepAdded(false);
    } else {
      setConfigPanelOpen(false);
      setSendBookingStepAdded(false);
    }
  }, [flow]);

  return (
    <AppShell activeNav="More">
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Page header */}
        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-[#dddfe5] bg-white px-3 py-3 sm:px-4">
          <div className="flex min-w-0 items-center gap-2">
            <Button
              variant="ghost"
              className="h-8 w-8 rounded-full p-0 hover:bg-[#f5f6f9]"
              aria-label="Back"
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5 text-black" />
            </Button>
            <h2
              className="truncate font-title text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] leading-[var(--title-line-height)] tracking-[var(--title-letter-spacing)] text-black [font-style:var(--title-font-style)]"
              data-testid="text-workflow-title"
            >
              Untitled workflow
            </h2>
            <span
              className="rounded-md bg-[#dddfe5] px-2 py-0.5 text-xs font-semibold text-[#323439]"
              data-testid="status-draft"
            >
              Draft
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              className="h-8 rounded-[10px] bg-[#0040dd] px-3 font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)] tracking-[var(--subtitle-letter-spacing)] text-white hover:bg-[#0037be] [font-style:var(--subtitle-font-style)]"
              data-testid="button-publish"
            >
              <User className="mr-1.5 h-4 w-4" />
              Publish
            </Button>
            <Button
              variant="ghost"
              className="h-8 w-8 rounded-full p-0 hover:bg-[#f5f6f9]"
              aria-label="Run"
              data-testid="button-run"
            >
              <Play className="h-4 w-4 text-black" />
            </Button>
            <Button
              variant="ghost"
              className="h-8 w-8 rounded-full p-0 hover:bg-[#f5f6f9]"
              aria-label="More"
              data-testid="button-header-more"
            >
              <MoreVertical className="h-4 w-4 text-black" />
            </Button>
          </div>
        </header>

        {/* Body: canvas with floating panel overlay */}
        <div className="relative flex min-h-0 flex-1 flex-col">
          {/* Add a step floating panel */}
          {panelOpen && (
            <aside
              className="z-20 mx-3 mt-3 flex w-80 shrink-0 flex-col rounded-xl border border-[#dddfe5] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:absolute md:left-4 md:top-4 md:mx-0 md:mt-0 md:h-[calc(100%-32px)]"
              data-testid="panel-add-step"
            >
              <div className="flex flex-col items-center pt-2">
                <button
                  type="button"
                  className="cursor-grab text-[#56585e]"
                  aria-label="Drag panel"
                  data-testid="button-drag-panel"
                >
                  <GripHorizontal className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between px-4 pb-2 pt-1">
                <h3 className="font-title text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] leading-[var(--title-line-height)] tracking-[var(--title-letter-spacing)] text-black [font-style:var(--title-font-style)]">
                  Add a step
                </h3>
                <button
                  type="button"
                  onClick={() => setPanelOpen(false)}
                  className="rounded-full p-1 text-[#56585e] hover:bg-[#f5f6f9]"
                  aria-label="Close panel"
                  data-testid="button-close-panel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="px-4 pb-3 text-xs text-[#56585e]">
                Click a node to add a step, or drag one to a specific spot in
                the flow.
              </p>
              <div className="flex items-center gap-2 px-4 pb-3">
                <div className="flex h-8 flex-1 items-center gap-2 rounded-md border border-[#dddfe5] bg-white px-2.5">
                  <Search className="h-4 w-4 text-[#56585e]" />
                  <Input
                    placeholder="Search"
                    className="h-auto flex-1 border-0 bg-transparent p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                    data-testid="input-search-steps"
                  />
                </div>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger
                    className="h-8 w-[80px] rounded-md border border-[#dddfe5] text-sm"
                    data-testid="select-step-filter"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="generic">Generic</SelectItem>
                    <SelectItem value="ringcentral">RingCentral</SelectItem>
                  </SelectContent>
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
                    className="flex w-full items-center gap-1 text-sm font-semibold text-black"
                    data-testid="button-toggle-ringcentral-group"
                  >
                    {ringCentralOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
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
            className={`relative flex min-h-0 flex-1 overflow-auto bg-[#fafbfc] ${panelOpen ? "lg:pl-[344px]" : ""} ${configPanelOpen && sendBookingStepAdded ? "lg:pr-[344px]" : ""}`}
            style={{
              backgroundImage:
                "radial-gradient(circle, #00000026 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
            data-testid="canvas-workflow"
          >
            <div className="relative mx-auto flex w-full max-w-[600px] flex-col items-center gap-0 px-4 py-8">
              {/* Top arrow */}
              <ArrowDown className="h-5 w-5 text-[#56585e]" />

              {/* Start node */}
              <div
                className="mt-2 flex w-full max-w-[240px] items-center gap-2 rounded-lg border border-[#fe8624] bg-[#fff4eb] px-3 py-2.5 shadow-sm"
                data-testid="node-start"
              >
                <Play className="h-4 w-4 shrink-0 fill-[#fe8624] text-[#fe8624]" />
                <span className="flex-1 text-sm font-semibold text-black">
                  Start
                </span>
                <button
                  type="button"
                  className="rounded p-0.5 text-[#56585e] hover:bg-white/60"
                  aria-label="Start options"
                  data-testid="button-start-more"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              {/* Connector */}
              <div className="h-12 w-px bg-[#0000004d]" />

              {sendBookingStepAdded ? (
                <button
                  type="button"
                  onClick={() => setConfigPanelOpen(true)}
                  className={`flex w-full max-w-[240px] items-center gap-2 rounded-[10px] border bg-white px-3 py-2.5 text-left shadow-[0_2px_4px_rgba(0,0,0,0.2)] ${
                    configPanelOpen ? "border-[#0040dd] ring-2 ring-[#0040dd33]" : "border-[#dddfe5]"
                  }`}
                  data-testid="node-send-booking"
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#16a9371a]">
                    <Calendar className="h-3.5 w-3.5 text-[#16a937]" />
                  </div>
                  <span className="flex-1 text-sm font-semibold text-black">
                    Send booking link
                  </span>
                  <MoreVertical className="h-4 w-4 text-[#56585e]" />
                </button>
              ) : (
                <button
                  type="button"
                  className="flex w-full max-w-[240px] items-center justify-center gap-1.5 rounded-[10px] border border-dashed border-[#0040dd] bg-[#0040dd26]/15 px-3 py-2.5 text-sm font-semibold text-[#0040dd]"
                  style={{ backgroundColor: "rgba(0, 111, 172, 0.15)" }}
                  data-testid="node-add-step"
                  aria-label="Add step"
                >
                  <Plus className="h-4 w-4" />
                  Add step
                </button>
              )}

            </div>
          </div>

          {configPanelOpen && sendBookingStepAdded && (
            <aside
              className="z-20 mx-3 mt-3 flex w-80 shrink-0 flex-col rounded-xl border border-[#dddfe5] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:absolute md:right-4 md:top-4 md:mx-0 md:mt-0 md:h-[calc(100%-32px)]"
              data-testid="panel-step-config"
            >
              <div className="flex items-center justify-between border-b border-[#dddfe5] px-4 py-3">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#16a9371a]">
                    <Calendar className="h-4 w-4 text-[#16a937]" />
                  </div>
                  <h3 className="truncate font-title text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] leading-[var(--title-line-height)] tracking-[var(--title-letter-spacing)] text-black [font-style:var(--title-font-style)]">
                    Send booking link
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setConfigPanelOpen(false)}
                  className="rounded-full p-1 text-[#56585e] hover:bg-[#f5f6f9]"
                  aria-label="Close configuration"
                  data-testid="button-close-config-panel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="wf-cfg-type" className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black">
                    Booking type
                  </Label>
                  <Select value={cfgBookingType} onValueChange={setCfgBookingType}>
                    <SelectTrigger id="wf-cfg-type" className="h-9 rounded-md border border-[#dddfe5] bg-white px-3 text-sm text-black" data-testid="select-cfg-booking-type">
                      <SelectValue placeholder="Select a booking type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="therapy-session-natalie">Therapy session with Natalie</SelectItem>
                      <SelectItem value="initial-consultation">Initial consultation</SelectItem>
                      <SelectItem value="follow-up-15">15 min follow-up</SelectItem>
                      <SelectItem value="discovery-call-30">30 min discovery call</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="wf-cfg-via" className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black">
                    Send via
                  </Label>
                  <Select value={cfgSendVia} onValueChange={setCfgSendVia}>
                    <SelectTrigger id="wf-cfg-via" className="h-9 rounded-md border border-[#dddfe5] bg-white px-3 text-sm text-black" data-testid="select-cfg-send-via">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="chat">Chat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {cfgSendVia === "text" && (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="wf-cfg-message" className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black">
                        Text message
                      </Label>
                      <Textarea
                        id="wf-cfg-message"
                        value={cfgMessage}
                        onChange={(e) => setCfgMessage(e.target.value)}
                        placeholder="Enter text message"
                        className="min-h-[80px] rounded-md border border-[#dddfe5] bg-white p-2 text-sm text-black"
                        data-testid="textarea-cfg-message"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="wf-cfg-to" className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black">
                        To
                      </Label>
                      <Input
                        id="wf-cfg-to"
                        value={cfgRecipient}
                        onChange={(e) => setCfgRecipient(e.target.value)}
                        placeholder="(555) 555-5555"
                        className="h-9 rounded-md border border-[#dddfe5] bg-white px-3 text-sm text-black"
                        data-testid="input-cfg-to"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="wf-cfg-from" className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black">
                        From
                      </Label>
                      <Input
                        id="wf-cfg-from"
                        value={cfgFrom}
                        onChange={(e) => setCfgFrom(e.target.value)}
                        placeholder="(555) 555-5555"
                        className="h-9 rounded-md border border-[#dddfe5] bg-white px-3 text-sm text-black"
                        data-testid="input-cfg-from"
                      />
                    </div>
                  </>
                )}
                {cfgSendVia === "chat" && (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="wf-cfg-conversation" className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black">
                        Conversation
                      </Label>
                      <Input
                        id="wf-cfg-conversation"
                        value={cfgRecipient}
                        onChange={(e) => setCfgRecipient(e.target.value)}
                        placeholder="Select conversation"
                        className="h-9 rounded-md border border-[#dddfe5] bg-white px-3 text-sm text-black"
                        data-testid="input-cfg-conversation"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="wf-cfg-message" className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black">
                        Message
                      </Label>
                      <Textarea
                        id="wf-cfg-message"
                        value={cfgMessage}
                        onChange={(e) => setCfgMessage(e.target.value)}
                        placeholder="Enter message"
                        className="min-h-[80px] rounded-md border border-[#dddfe5] bg-white p-2 text-sm text-black"
                        data-testid="textarea-cfg-message"
                      />
                    </div>
                  </>
                )}
                {cfgSendVia === "email" && (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="wf-cfg-email" className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black">
                        Email
                      </Label>
                      <Input
                        id="wf-cfg-email"
                        value={cfgRecipient}
                        onChange={(e) => setCfgRecipient(e.target.value)}
                        placeholder="name@example.com"
                        className="h-9 rounded-md border border-[#dddfe5] bg-white px-3 text-sm text-black"
                        data-testid="input-cfg-email"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="wf-cfg-message" className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-semibold text-black">
                        Message
                      </Label>
                      <Textarea
                        id="wf-cfg-message"
                        value={cfgMessage}
                        onChange={(e) => setCfgMessage(e.target.value)}
                        placeholder="Enter message"
                        className="min-h-[80px] rounded-md border border-[#dddfe5] bg-white p-2 text-sm text-black"
                        data-testid="textarea-cfg-message"
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-end gap-2 border-t border-[#dddfe5] px-4 py-3">
                <Button
                  variant="outline"
                  onClick={() => setConfigPanelOpen(false)}
                  className="h-8 rounded-[10px] border border-[#dddfe5] bg-white px-3 text-sm text-black hover:bg-[#f5f6f9]"
                  data-testid="button-cfg-cancel"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setConfigPanelOpen(false)}
                  className="h-8 rounded-[10px] bg-[#0040dd] px-3 text-sm text-white hover:bg-[#0037be]"
                  data-testid="button-cfg-save"
                >
                  Save
                </Button>
              </div>
            </aside>
          )}
        </div>
      </div>

      <BookingFeatureDialog
        open={bookingIntroOpen}
        onOpenChange={setBookingIntroOpen}
      />
    </AppShell>
  );
};

