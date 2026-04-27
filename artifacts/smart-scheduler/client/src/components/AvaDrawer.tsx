import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import { SquarePen, MoreVertical, X, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AvaUpsellDialog } from "@/components/AvaUpsellDialog";
import { useFlowParam, useIsBookingPurchased } from "@/lib/flows";
import {
  addBookingType,
  useBookingTypes,
  type BookingType,
} from "@/lib/bookingTypes";

interface AvaDrawerProps {
  open: boolean;
  onClose: () => void;
}

const suggestedPrompts = [
  "Help me create a booking page",
  "How to share my booking link to a customer",
];

const AVA_REPLY =
  "Bookings can help with that.\nYou can create booking pages and share links via SMS, email or message, so customers can choose a time based on your availability.";

type ShareChannel = "sms" | "email" | "message";

type ShareDestination = {
  fromNumber?: string;
  toNumber?: string;
  emailAddress?: string;
  conversationId?: string;
  conversationName?: string;
};

type ShareEntry =
  | { kind: "user"; id: string; text: string }
  | {
      kind: "ava-prompt";
      id: string;
      recipient: string | null;
      time: string;
    }
  | { kind: "form"; id: string; recipient: string | null }
  | {
      kind: "ava-confirm";
      id: string;
      time: string;
      recipient: string | null;
      bookingTitle: string;
      message: string;
      channel: ShareChannel;
      destination: ShareDestination;
    }
  | { kind: "ava-cancel"; id: string; time: string };

const SHARE_FROM_NUMBERS: Array<{ value: string; label: string }> = [
  { value: "+1 (650) 555-0143", label: "+1 (650) 555-0143 — Main" },
  { value: "+1 (415) 555-0192", label: "+1 (415) 555-0192 — Sales" },
];

const SHARE_CONVERSATIONS: Array<{ id: string; name: string }> = [
  { id: "michael-scott", name: "Michael, Scott" },
  { id: "uylp", name: "UYLP Participants" },
  { id: "amanda-brown", name: "Amanda Brown" },
  { id: "colin-bain", name: "Colin Bain" },
  { id: "roger-smith", name: "Roger Smith" },
];

const CHANNEL_LABELS: Record<ShareChannel, string> = {
  sms: "SMS",
  email: "Email",
  message: "Message",
};

type CreateField = "description" | "duration" | "location";
type CreateStep = CreateField | "summary" | "done";

type CreateDraft = {
  description: string;
  duration: string;
  location: string;
};

type CreateEntry =
  | { kind: "user"; id: string; text: string }
  | { kind: "ava-step"; id: string; field: CreateField; time: string }
  | {
      kind: "ava-confirm";
      id: string;
      time: string;
      bookingTitle: string;
      bookingUrl: string;
    };

type DrawerView =
  | { kind: "empty" }
  | { kind: "promoted"; prompt: string; replyTime: string }
  | {
      kind: "share";
      recipient: string | null;
      entries: ShareEntry[];
      active: boolean;
    }
  | {
      kind: "create";
      step: CreateStep;
      draft: CreateDraft;
      entries: CreateEntry[];
    };

const formatTime = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  return `${hours}:${minutes} ${ampm}`;
};

const SHARE_INTENT_REGEX =
  /\bbooking\s*link\b|\b(?:share|send|forward|give|email|text)\b[^.?!]*\bbook(?:ing)?\b|\bbook(?:ing)?\b[^.?!]*\b(?:link|share|send)\b/i;

const CREATE_INTENT_REGEX =
  /\b(?:create|make|set\s*up|setup|build|new|add)\b[^.?!]*\bbooking\s*(?:page|link|type)?\b|\bbooking\s*(?:page|link|type)\b[^.?!]*\b(?:create|make|set\s*up|setup|build|new|add)\b/i;

const CREATE_STEP_PROMPTS: Record<CreateField, string> = {
  description:
    "Sure — I can help with that. To get started, please describe what this booking page is for and when you're typically available.",
  duration: "Got it. How long should each booking be?",
  location: "Where will the booking take place?",
};

const CREATE_STEP_CHIPS: Record<CreateField, string[]> = {
  description: [],
  duration: ["15 min", "30 min", "45 min", "60 min"],
  location: ["RingEX video", "Phone call", "In‑person"],
};

const CREATE_STEP_PLACEHOLDERS: Partial<Record<CreateField, string>> = {
  description:
    "e.g. Discovery calls for new customers, weekday mornings",
};

const CREATE_STEP_LABELS: Record<CreateField, string> = {
  description: "Description",
  duration: "Duration",
  location: "Location",
};

const NEXT_FIELD: Record<CreateField, CreateField | "summary"> = {
  description: "duration",
  duration: "location",
  location: "summary",
};

const deriveBookingName = (description: string): string => {
  const cleaned = description.trim();
  if (!cleaned) return "New booking";
  const firstChunk = cleaned.split(/[.,;\n]/)[0]?.trim() || cleaned;
  if (firstChunk.length <= 40) return firstChunk;
  return `${firstChunk.slice(0, 40).trimEnd()}…`;
};

const RECIPIENT_STOPWORDS = new Set([
  "a",
  "an",
  "the",
  "this",
  "that",
  "these",
  "those",
  "some",
  "any",
  "my",
  "your",
  "our",
  "their",
  "share",
  "create",
  "send",
  "book",
  "make",
  "build",
  "set",
  "schedule",
  "manage",
  "help",
  "show",
  "customer",
  "customers",
  "client",
  "clients",
  "contact",
  "contacts",
  "someone",
  "anyone",
]);

const extractRecipient = (text: string): string | null => {
  const regex = /\bwith\s+([a-zA-Z][\w'’-]*(?:\s+[a-zA-Z][\w'’-]*)?)/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    const captured = match[1];
    if (!captured) continue;
    const candidate = captured.trim();
    const firstWord = candidate.split(/\s+/)[0]?.toLowerCase() ?? "";
    if (RECIPIENT_STOPWORDS.has(firstWord)) continue;
    return candidate
      .split(/\s+/)
      .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  }
  return null;
};

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 24) || "booking";

export const AvaDrawer = ({ open, onClose }: AvaDrawerProps): JSX.Element | null => {
  const [message, setMessage] = useState("");
  const [view, setView] = useState<DrawerView>({ kind: "empty" });
  const [upsellOpen, setUpsellOpen] = useState(false);
  const isPurchased = useIsBookingPurchased();
  const flow = useFlowParam();
  const bookingTypesSnapshot = useBookingTypes();
  const lastFlowRef = useRef<string | null>(flow);
  const [, navigate] = useLocation();

  useEffect(() => {
    if (lastFlowRef.current !== flow) {
      lastFlowRef.current = flow;
      setView({ kind: "empty" });
      setMessage("");
    }
  }, [flow]);

  if (!open) return null;

  const resetToEmpty = () => {
    setView({ kind: "empty" });
    setMessage("");
  };

  const startShareFlow = (text: string) => {
    const recipient = extractRecipient(text);
    const now = formatTime(new Date());
    const id = `${Date.now()}`;
    setView({
      kind: "share",
      recipient,
      active: true,
      entries: [
        { kind: "user", id: `u-${id}`, text },
        { kind: "ava-prompt", id: `p-${id}`, recipient, time: now },
        { kind: "form", id: `f-${id}`, recipient },
      ],
    });
  };

  const appendShareUserMessage = (text: string) => {
    if (view.kind !== "share") return;
    setView({
      ...view,
      entries: [...view.entries, { kind: "user", id: `u-${Date.now()}`, text }],
    });
  };

  const startCreateFlow = (text: string) => {
    const now = formatTime(new Date());
    const id = `${Date.now()}`;
    setView({
      kind: "create",
      step: "description",
      draft: { description: "", duration: "", location: "" },
      entries: [
        { kind: "user", id: `u-${id}`, text },
        { kind: "ava-step", id: `s-${id}-description`, field: "description", time: now },
      ],
    });
  };

  const advanceCreateStep = (value: string) => {
    if (view.kind !== "create") return;
    const trimmed = value.trim();
    if (!trimmed) return;
    const currentStep = view.step;
    if (currentStep === "summary" || currentStep === "done") return;
    const field = currentStep;
    const draft: CreateDraft = { ...view.draft, [field]: trimmed };
    const next = NEXT_FIELD[field];
    const id = `${Date.now()}`;
    const newEntries: CreateEntry[] = [
      ...view.entries,
      { kind: "user", id: `u-${id}`, text: trimmed },
    ];
    if (next !== "summary") {
      newEntries.push({
        kind: "ava-step",
        id: `s-${id}-${next}`,
        field: next,
        time: formatTime(new Date()),
      });
    }
    setView({ ...view, step: next, draft, entries: newEntries });
  };

  const restartCreateFlow = () => {
    if (view.kind !== "create") return;
    const now = formatTime(new Date());
    const id = `${Date.now()}`;
    setView({
      kind: "create",
      step: "description",
      draft: { description: "", duration: "", location: "" },
      entries: [
        ...view.entries,
        { kind: "ava-step", id: `s-${id}-description`, field: "description", time: now },
      ],
    });
  };

  const finalizeCreateFlow = () => {
    if (view.kind !== "create" || view.step !== "summary") return;
    const { description, duration, location } = view.draft;
    const name = deriveBookingName(description);
    const slug = slugify(name);
    const newType: BookingType = {
      id: `${slug}-${Date.now().toString(36)}`,
      title: `${name} — ${duration}`,
      duration,
      description: `${location} · ${description}`,
      dateTime: description,
    };
    addBookingType(newType);
    const now = formatTime(new Date());
    setView({
      ...view,
      step: "done",
      entries: [
        ...view.entries,
        {
          kind: "ava-confirm",
          id: `done-${Date.now()}`,
          time: now,
          bookingTitle: name,
          bookingUrl: `book.ringcentral.com/${slug}`,
        },
      ],
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;
    setMessage("");
    if (
      view.kind === "create" &&
      (view.step === "description" || view.step === "duration" || view.step === "location")
    ) {
      advanceCreateStep(trimmed);
      return;
    }
    if (view.kind === "share" && view.active) {
      appendShareUserMessage(trimmed);
      return;
    }
    if (isPurchased && CREATE_INTENT_REGEX.test(trimmed)) {
      startCreateFlow(trimmed);
      return;
    }
    if (isPurchased && SHARE_INTENT_REGEX.test(trimmed)) {
      startShareFlow(trimmed);
      return;
    }
    setView({ kind: "promoted", prompt: trimmed, replyTime: formatTime(new Date()) });
  };

  const handlePromptClick = (prompt: string) => {
    if (isPurchased && CREATE_INTENT_REGEX.test(prompt)) {
      startCreateFlow(prompt);
      return;
    }
    if (isPurchased && SHARE_INTENT_REGEX.test(prompt)) {
      startShareFlow(prompt);
      return;
    }
    setView({ kind: "promoted", prompt, replyTime: formatTime(new Date()) });
  };

  const handleFormCancel = (formId: string) => {
    if (view.kind !== "share") return;
    const next = view.entries
      .filter((e) => e.id !== formId)
      .concat({
        kind: "ava-cancel",
        id: `c-${Date.now()}`,
        time: formatTime(new Date()),
      });
    setView({ ...view, entries: next, active: false });
  };

  const handleFormContinue = (
    formId: string,
    bookingTitle: string,
    extraMessage: string,
    channel: ShareChannel,
    destination: ShareDestination,
  ) => {
    if (view.kind !== "share") return;
    const next = view.entries
      .filter((e) => e.id !== formId)
      .concat({
        kind: "ava-confirm",
        id: `done-${Date.now()}`,
        time: formatTime(new Date()),
        recipient: view.recipient,
        bookingTitle,
        message: extraMessage.trim(),
        channel,
        destination,
      });
    setView({ ...view, entries: next, active: false });
  };

  const subtitle =
    view.kind === "share" && view.active
      ? `Booking link sharing for ${view.recipient ?? "customers"}`
      : view.kind === "create" && view.step !== "done"
        ? "Creating a new booking page"
        : null;

  return (
    <>
      <aside
        data-testid="drawer-ava"
        className="relative z-30 flex w-[400px] shrink-0 flex-col border-l border-[#dddfe5] bg-white"
      >
        <header className="flex items-start gap-2 px-4 py-2">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <div className="relative flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full [background:radial-gradient(50%_50%_at_60%_62%,rgba(255,92,0,1)_13%,rgba(255,92,0,0.1)_80%,rgba(255,92,0,0)_100%),linear-gradient(0deg,rgba(255,122,0,1)_0%,rgba(255,122,0,1)_100%)]">
              <img className="h-3.5 w-3.5" alt="Ava" src="/figmaAssets/aisparklefilled.svg" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <h3 className="truncate font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)] tracking-[var(--subtitle-letter-spacing)] text-black [font-style:var(--subtitle-font-style)]">
                Ask AVA
              </h3>
              {subtitle && (
                <p
                  data-testid="text-ava-subtitle"
                  className="truncate text-[12px] leading-4 text-[#6e7079]"
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              className="h-8 w-8 rounded-full p-0 hover:bg-[#0000000a]"
              aria-label="New chat"
              onClick={resetToEmpty}
              data-testid="button-ava-new-chat"
            >
              <SquarePen className="h-4 w-4 text-black" />
            </Button>
            <Button
              variant="ghost"
              className="h-8 w-8 rounded-full p-0 hover:bg-[#0000000a]"
              aria-label="History"
              data-testid="button-ava-history"
            >
              <MoreVertical className="h-4 w-4 text-black" />
            </Button>
            <Separator orientation="vertical" className="mx-1 h-5 bg-[#0000001a]" />
            <Button
              variant="ghost"
              className="h-8 w-8 rounded-full p-0 hover:bg-[#0000000a]"
              aria-label="Close Ava"
              onClick={onClose}
              data-testid="button-ava-close"
            >
              <X className="h-4 w-4 text-black" />
            </Button>
          </div>
        </header>
        <Separator className="bg-[#0000001a]" />

        {view.kind === "empty" ? (
          <div className="flex flex-1 flex-col items-center overflow-y-auto px-4 pt-16">
            <div className="relative h-24 w-24">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-[#dddfe580]">
                <img className="h-full w-full object-cover" alt="Ava avatar" src="/figmaAssets/ava-avatar.png" />
              </div>
              <div className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-white [background:radial-gradient(50%_50%_at_60%_62%,rgba(255,92,0,1)_13%,rgba(255,92,0,0.1)_80%,rgba(255,92,0,0)_100%),linear-gradient(0deg,rgba(255,122,0,1)_0%,rgba(255,122,0,1)_100%)]">
                <img className="h-5 w-5" alt="" src="/figmaAssets/aisparklefilled.svg" />
              </div>
            </div>
            <h4 className="mt-4 text-center font-headline text-[20px] font-semibold leading-7 tracking-[-0.2px] text-black">
              What can I help with?
            </h4>

            <div className="mt-4 flex w-full flex-col gap-2">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={prompt}
                  type="button"
                  data-testid={`chip-prompt-${i}`}
                  onClick={() => handlePromptClick(prompt)}
                  className="flex min-h-[44px] w-full items-center gap-1.5 rounded-2xl border-[1.2px] border-solid border-[#00000033] px-3.5 py-2.5 text-left hover:bg-[#f5f6f9]"
                >
                  <span className="pr-1 text-base font-semibold leading-5 tracking-[-0.2px] text-[#323439]">👉</span>
                  <span className="flex-1 font-descriptor-mini text-[12px] font-medium leading-[17px] text-black">
                    {prompt}
                  </span>
                </button>
              ))}
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  data-testid="button-ava-view-more-prompts"
                  className="flex items-center gap-1 rounded px-1 text-[12px] font-medium leading-[17px] text-[#0040dd] hover:underline"
                >
                  View more prompts
                  <span aria-hidden className="inline-block">↗</span>
                </button>
              </div>
            </div>
          </div>
        ) : view.kind === "promoted" ? (
          <div
            data-testid="ava-conversation"
            className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4"
          >
            <div className="flex justify-end">
              <div
                data-testid="bubble-user-prompt"
                className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#0040dd] px-3 py-2 text-[14px] leading-5 text-white"
              >
                {view.prompt}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-[#dddfe580]">
                <img className="h-full w-full object-cover" alt="Ava" src="/figmaAssets/ava-avatar.png" />
              </div>
              <span className="text-[14px] font-semibold leading-5 text-black">AVA</span>
              <span className="text-[#dddfe5]">|</span>
              <span data-testid="text-ava-time" className="text-[12px] leading-4 text-[#6e7079]">
                {view.replyTime}
              </span>
            </div>
            <p
              data-testid="text-ava-reply"
              className="whitespace-pre-line text-[14px] leading-5 text-black"
            >
              {AVA_REPLY}
            </p>
            <div className="flex items-center justify-end gap-2 pt-1">
              <Button
                variant="outline"
                onClick={resetToEmpty}
                data-testid="button-ava-not-now"
                className="h-8 rounded-full border border-solid border-[#0040dd] bg-white px-4 py-0 text-[14px] font-medium leading-5 text-[#0040dd] hover:bg-[#eef2ff] hover:text-[#0040dd]"
              >
                Not now
              </Button>
              <Button
                variant="outline"
                onClick={() => setUpsellOpen(true)}
                data-testid="button-ava-find-out-more"
                className="h-8 rounded-full border border-solid border-[#0040dd] bg-white px-4 py-0 text-[14px] font-medium leading-5 text-[#0040dd] hover:bg-[#eef2ff] hover:text-[#0040dd]"
              >
                Find out more
              </Button>
            </div>
          </div>
        ) : view.kind === "share" ? (
          <div
            data-testid="ava-conversation-share"
            className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4"
          >
            {view.entries.map((entry) => {
              if (entry.kind === "user") {
                return (
                  <div key={entry.id} className="flex justify-end">
                    <div
                      data-testid={`bubble-user-${entry.id}`}
                      className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#0040dd] px-3 py-2 text-[14px] leading-5 text-white"
                    >
                      {entry.text}
                    </div>
                  </div>
                );
              }
              if (entry.kind === "ava-prompt") {
                const recipient = entry.recipient;
                const recipientPhrase = recipient ? ` with ${recipient}` : "";
                return (
                  <div key={entry.id} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-[#dddfe580]">
                        <img className="h-full w-full object-cover" alt="Ava" src="/figmaAssets/ava-avatar.png" />
                      </div>
                      <span className="text-[14px] font-semibold leading-5 text-black">AVA</span>
                      <span className="text-[#dddfe5]">|</span>
                      <span className="text-[12px] leading-4 text-[#6e7079]">{entry.time}</span>
                    </div>
                    <p
                      data-testid="text-ava-share-prompt"
                      className="text-[14px] leading-5 text-black"
                    >
                      Sure — I can help you share your Bookings link{recipientPhrase}. Pick the channel you'd like to use and the booking type to share, then I'll take care of the rest.
                    </p>
                  </div>
                );
              }
              if (entry.kind === "form") {
                return (
                  <ShareBookingForm
                    key={entry.id}
                    onCancel={() => handleFormCancel(entry.id)}
                    onContinue={(title, msg, ch, dest) =>
                      handleFormContinue(entry.id, title, msg, ch, dest)
                    }
                  />
                );
              }
              if (entry.kind === "ava-cancel") {
                return (
                  <div key={entry.id} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-[#dddfe580]">
                        <img className="h-full w-full object-cover" alt="Ava" src="/figmaAssets/ava-avatar.png" />
                      </div>
                      <span className="text-[14px] font-semibold leading-5 text-black">AVA</span>
                      <span className="text-[#dddfe5]">|</span>
                      <span className="text-[12px] leading-4 text-[#6e7079]">{entry.time}</span>
                    </div>
                    <p
                      data-testid="text-ava-share-cancel"
                      className="text-[14px] leading-5 text-black"
                    >
                      No problem — let me know if you'd like to share a booking link later.
                    </p>
                  </div>
                );
              }
              // ava-confirm
              const recipient = entry.recipient;
              const channel = entry.channel ?? "sms";
              const destination = entry.destination ?? {};
              const channelLabel = CHANNEL_LABELS[channel];
              const destFallback = recipient ?? "your contact";
              let destinationText = "";
              if (channel === "sms") {
                const to = destination.toNumber ?? destFallback;
                const from = destination.fromNumber;
                destinationText = from
                  ? ` via SMS to ${to} from ${from}`
                  : ` via SMS to ${to}`;
              } else if (channel === "email") {
                destinationText = ` via email to ${destination.emailAddress ?? destFallback}`;
              } else {
                destinationText = ` via Message in ${destination.conversationName ?? destFallback}`;
              }
              const recipientPhrase = recipient ? ` with ${recipient}` : "";
              const followUpHref =
                channel === "sms"
                  ? "/text"
                  : channel === "message"
                    ? "/chat"
                    : null;
              const followUpLabel =
                channel === "sms"
                  ? "View sent SMS in Text"
                  : channel === "message"
                    ? "View in Message"
                    : null;
              return (
                <div key={entry.id} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-[#dddfe580]">
                      <img className="h-full w-full object-cover" alt="Ava" src="/figmaAssets/ava-avatar.png" />
                    </div>
                    <span className="text-[14px] font-semibold leading-5 text-black">AVA</span>
                    <span className="text-[#dddfe5]">|</span>
                    <span className="text-[12px] leading-4 text-[#6e7079]">{entry.time}</span>
                  </div>
                  <p
                    data-testid="text-ava-share-confirm"
                    data-channel={entry.channel}
                    className="text-[14px] leading-5 text-black"
                  >
                    Done — I shared your <span className="font-semibold">{entry.bookingTitle}</span> Bookings link{recipientPhrase}{destinationText}.
                    {entry.message
                      ? ` I included your note: “${entry.message}”.`
                      : ""}
                  </p>
                  {followUpHref && followUpLabel && (
                    <button
                      type="button"
                      onClick={() => {
                        navigate(followUpHref);
                        onClose();
                      }}
                      data-testid="link-ava-share-followup"
                      data-href={followUpHref}
                      className="self-start text-[14px] font-medium leading-5 text-[#0040dd] underline-offset-2 hover:underline focus:underline focus:outline-none"
                    >
                      {followUpLabel}
                    </button>
                  )}
                  <span className="sr-only" data-testid="text-ava-share-channel">{channelLabel}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            data-testid="ava-conversation-create"
            className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4"
          >
            {view.entries.map((entry) => {
              if (entry.kind === "user") {
                return (
                  <div key={entry.id} className="flex justify-end">
                    <div
                      data-testid={`bubble-user-${entry.id}`}
                      className="max-w-[85%] rounded-2xl rounded-tr-sm bg-[#0040dd] px-3 py-2 text-[14px] leading-5 text-white"
                    >
                      {entry.text}
                    </div>
                  </div>
                );
              }
              if (entry.kind === "ava-step") {
                const isCurrent = view.step === entry.field;
                return (
                  <div key={entry.id} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-[#dddfe580]">
                        <img className="h-full w-full object-cover" alt="Ava" src="/figmaAssets/ava-avatar.png" />
                      </div>
                      <span className="text-[14px] font-semibold leading-5 text-black">AVA</span>
                      <span className="text-[#dddfe5]">|</span>
                      <span className="text-[12px] leading-4 text-[#6e7079]">{entry.time}</span>
                    </div>
                    <p
                      data-testid={`text-ava-create-${entry.field}`}
                      className="text-[14px] leading-5 text-black"
                    >
                      {CREATE_STEP_PROMPTS[entry.field]}
                    </p>
                    {isCurrent && CREATE_STEP_CHIPS[entry.field].length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {CREATE_STEP_CHIPS[entry.field].map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            data-testid={`chip-create-${entry.field}-${slugify(chip)}`}
                            onClick={() => advanceCreateStep(chip)}
                            className="flex min-h-[36px] items-center rounded-full border border-solid border-[#00000033] bg-white px-3 text-[13px] leading-5 text-black hover:bg-[#f5f6f9]"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}
                    {isCurrent && CREATE_STEP_CHIPS[entry.field].length === 0 && CREATE_STEP_PLACEHOLDERS[entry.field] && (
                      <p
                        data-testid={`hint-create-${entry.field}`}
                        className="text-[12px] leading-4 text-[#6e7079]"
                      >
                        {CREATE_STEP_PLACEHOLDERS[entry.field]}
                      </p>
                    )}
                  </div>
                );
              }
              // ava-confirm
              return (
                <div key={entry.id} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full bg-[#dddfe580]">
                      <img className="h-full w-full object-cover" alt="Ava" src="/figmaAssets/ava-avatar.png" />
                    </div>
                    <span className="text-[14px] font-semibold leading-5 text-black">AVA</span>
                    <span className="text-[#dddfe5]">|</span>
                    <span className="text-[12px] leading-4 text-[#6e7079]">{entry.time}</span>
                  </div>
                  <p
                    data-testid="text-ava-create-confirm"
                    className="text-[14px] leading-5 text-black"
                  >
                    Done — your <span className="font-semibold">{entry.bookingTitle}</span> booking page is ready. Here's your link:{" "}
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      data-testid="link-ava-create-booking-url"
                      className="break-all text-[#0040dd] underline"
                    >
                      {entry.bookingUrl}
                    </a>
                    . You can find it under Booking types or share it from any conversation.
                  </p>
                </div>
              );
            })}
            {view.step === "summary" && (
              <CreateSummaryCard
                draft={view.draft}
                onCreate={finalizeCreateFlow}
                onStartOver={restartCreateFlow}
              />
            )}
          </div>
        )}

        <div className="px-3 pb-2 pt-2">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 rounded-2xl border border-solid border-[#00000033] bg-white px-3 py-2 focus-within:border-[#0040dd]"
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask AVA anything or type / for more"
              data-testid="input-ava-message"
              className="flex-1 bg-transparent font-main-text text-[length:var(--main-text-font-size)] leading-[var(--main-text-line-height)] text-black placeholder:text-[#9498a4] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              aria-label="Send message"
              data-testid="button-ava-send"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-transparent text-[#9498a4] disabled:cursor-not-allowed enabled:bg-[#0040dd] enabled:text-white enabled:hover:bg-[#0037be]"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-2 text-center text-[11px] leading-4 text-[#6e7079]">
            Content generated by AI. Was it accurate?
          </p>
        </div>
      </aside>

      <AvaUpsellDialog open={upsellOpen} onOpenChange={setUpsellOpen} />
    </>
  );
};

interface CreateSummaryCardProps {
  draft: CreateDraft;
  onCreate: () => void;
  onStartOver: () => void;
}

const CreateSummaryCard = ({
  draft,
  onCreate,
  onStartOver,
}: CreateSummaryCardProps): JSX.Element => {
  const rows: Array<{ field: CreateField; value: string }> = [
    { field: "description", value: draft.description },
    { field: "duration", value: draft.duration },
    { field: "location", value: draft.location },
  ];

  return (
    <div
      data-testid="card-ava-create-summary"
      className="flex flex-col gap-3 rounded-xl border border-solid border-[#dddfe5] bg-white p-3"
    >
      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <div key={row.field} className="flex items-baseline justify-between gap-3">
            <span className="text-[12px] font-semibold leading-4 text-[#6e7079]">
              {CREATE_STEP_LABELS[row.field]}
            </span>
            <span
              data-testid={`text-summary-${row.field}`}
              className="text-right text-[14px] leading-5 text-black"
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="ghost"
          onClick={onStartOver}
          data-testid="button-ava-create-start-over"
          className="h-8 rounded-full bg-transparent px-4 py-0 text-[14px] font-medium leading-5 text-[#0040dd] hover:bg-[#eef2ff] hover:text-[#0040dd]"
        >
          Start over
        </Button>
        <Button
          onClick={onCreate}
          data-testid="button-ava-create-confirm"
          className="h-8 rounded-full bg-[#0040dd] px-4 py-0 text-[14px] font-medium leading-5 text-white hover:bg-[#0037be]"
        >
          Create booking page
        </Button>
      </div>
    </div>
  );
};

interface ShareBookingFormProps {
  onCancel: () => void;
  onContinue: (
    bookingTitle: string,
    message: string,
    channel: ShareChannel,
    destination: ShareDestination,
  ) => void;
}

const ShareBookingForm = ({
  onCancel,
  onContinue,
}: ShareBookingFormProps): JSX.Element => {
  const bookingTypes = useBookingTypes();
  const [channel, setChannel] = useState<ShareChannel>("sms");
  const [bookingId, setBookingId] = useState<string>(
    bookingTypes[0]?.id ?? "",
  );
  const [extra, setExtra] = useState("");
  const [fromNumber, setFromNumber] = useState<string>(SHARE_FROM_NUMBERS[0].value);
  const [toNumber, setToNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [conversationId, setConversationId] = useState<string>(SHARE_CONVERSATIONS[0].id);

  useEffect(() => {
    if (bookingTypes.length === 0) {
      if (bookingId !== "") setBookingId("");
      return;
    }
    if (!bookingTypes.some((b) => b.id === bookingId)) {
      setBookingId(bookingTypes[0].id);
    }
  }, [bookingTypes, bookingId]);

  const selectedBooking = bookingTypes.find((b) => b.id === bookingId) ?? null;

  const canContinue = (() => {
    if (!selectedBooking) return false;
    if (channel === "sms") return toNumber.trim().length > 0 && fromNumber.length > 0;
    if (channel === "email") return /\S+@\S+\.\S+/.test(emailAddress.trim());
    return conversationId.length > 0;
  })();

  const handleContinue = () => {
    if (!canContinue || !selectedBooking) return;
    let destination: ShareDestination = {};
    if (channel === "sms") {
      destination = { fromNumber, toNumber: toNumber.trim() };
    } else if (channel === "email") {
      destination = { emailAddress: emailAddress.trim() };
    } else {
      const convo = SHARE_CONVERSATIONS.find((c) => c.id === conversationId) ?? SHARE_CONVERSATIONS[0];
      destination = { conversationId: convo.id, conversationName: convo.name };
    }
    onContinue(selectedBooking.title, extra, channel, destination);
  };

  return (
    <div
      data-testid="form-ava-share-booking"
      className="flex flex-col gap-3 rounded-xl border border-solid border-[#dddfe5] bg-white p-3"
    >
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold leading-4 text-[#323439]">
          Channel
        </label>
        <Select value={channel} onValueChange={(v) => setChannel(v as ShareChannel)}>
          <SelectTrigger
            data-testid="select-ava-channel"
            className="h-9 rounded-md border border-solid border-[#00000033] bg-white text-[14px] text-black"
          >
            <SelectValue placeholder="Select channel" />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(CHANNEL_LABELS) as ShareChannel[]).map((c) => (
              <SelectItem
                key={c}
                value={c}
                data-testid={`option-ava-channel-${c}`}
              >
                {CHANNEL_LABELS[c]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold leading-4 text-[#323439]">
          Booking type
        </label>
        <Select
          value={bookingId}
          onValueChange={setBookingId}
          disabled={bookingTypes.length === 0}
        >
          <SelectTrigger
            data-testid="select-ava-booking-type"
            className="h-9 rounded-md border border-solid border-[#00000033] bg-white text-[14px] text-black"
          >
            <SelectValue placeholder="Select booking type" />
          </SelectTrigger>
          <SelectContent>
            {bookingTypes.map((bt) => (
              <SelectItem
                key={bt.id}
                value={bt.id}
                data-testid={`option-ava-booking-${bt.id}`}
              >
                {bt.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {channel === "sms" && (
        <>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold leading-4 text-[#323439]">
              From
            </label>
            <Select value={fromNumber} onValueChange={setFromNumber}>
              <SelectTrigger
                data-testid="select-ava-from-number"
                className="h-9 rounded-md border border-solid border-[#00000033] bg-white text-[14px] text-black"
              >
                <SelectValue placeholder="Select number" />
              </SelectTrigger>
              <SelectContent>
                {SHARE_FROM_NUMBERS.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    data-testid={`option-ava-from-${slugify(opt.value)}`}
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold leading-4 text-[#323439]">
              To
            </label>
            <input
              value={toNumber}
              onChange={(e) => setToNumber(e.target.value)}
              placeholder="Enter phone number"
              inputMode="tel"
              data-testid="input-ava-to-number"
              className="h-9 rounded-md border border-solid border-[#00000033] bg-white px-3 text-[14px] text-black placeholder:text-[#9498a4] focus:border-[#0040dd] focus:outline-none"
            />
          </div>
        </>
      )}

      {channel === "email" && (
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold leading-4 text-[#323439]">
            Email address
          </label>
          <input
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            placeholder="name@example.com"
            data-testid="input-ava-email-address"
            className="h-9 rounded-md border border-solid border-[#00000033] bg-white px-3 text-[14px] text-black placeholder:text-[#9498a4] focus:border-[#0040dd] focus:outline-none"
          />
        </div>
      )}

      {channel === "message" && (
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold leading-4 text-[#323439]">
            Conversation
          </label>
          <Select value={conversationId} onValueChange={setConversationId}>
            <SelectTrigger
              data-testid="select-ava-conversation"
              className="h-9 rounded-md border border-solid border-[#00000033] bg-white text-[14px] text-black"
            >
              <SelectValue placeholder="Select conversation" />
            </SelectTrigger>
            <SelectContent>
              {SHARE_CONVERSATIONS.map((c) => (
                <SelectItem
                  key={c.id}
                  value={c.id}
                  data-testid={`option-ava-conversation-${c.id}`}
                >
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-semibold leading-4 text-[#323439]">
          Additional message
        </label>
        <Textarea
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          placeholder="Enter additional message"
          data-testid="textarea-ava-additional-message"
          className="min-h-[72px] rounded-md border border-solid border-[#00000033] bg-white text-[14px] text-black"
        />
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
          data-testid="button-ava-share-cancel"
          className="h-8 rounded-full border border-solid border-[#0040dd] bg-white px-4 py-0 text-[14px] font-medium leading-5 text-[#0040dd] hover:bg-[#eef2ff] hover:text-[#0040dd]"
        >
          Cancel
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!canContinue}
          data-testid="button-ava-share-continue"
          className="h-8 rounded-full bg-[#0040dd] px-4 py-0 text-[14px] font-medium leading-5 text-white hover:bg-[#0037be] disabled:cursor-not-allowed disabled:bg-[#9498a4] disabled:text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
