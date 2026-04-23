import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { AppShell } from "../components/AppShell";
import { AvaUpsellDialog } from "../components/AvaUpsellDialog";
import { FeatureIntroBanner } from "../components/FeatureIntroBanner";
import { useFlowParam, useIsBookingPurchased } from "../lib/flows";
import {
  AddContactMd,
  AiStarsMd,
  PhoneWarningMd,
  AppsMd,
  EarthFilledMd,
  EmojiMd,
  MicrophoneMd,
  MicrophoneOffMd,
  OverflowMd,
  NotificationsMd,
  StopMd,
  SearchMd,
  SettingsMd,
  ShareMd,
  VideoMd,
  StartVideoMd,
  OverflowVerticalMd
} from "@ringcentral/spring-icon";
import { Popover } from "@ringcentral/spring-ui";

const SUI_TEXT = "text-sui-neutral-f01";
const SUI_MUTED = "text-sui-neutral-f02";
const SUI_PRIMARY = "text-sui-cobranding-b01";

const controls = [
  { icon: MicrophoneOffMd, label: "Mute" },
  { icon: AppsMd, label: "Keypad" },
  { icon: StartVideoMd, label: "Video" },
  { icon: AddContactMd, label: "Add" },
  { icon: ShareMd, label: "Share" },
  { icon: EmojiMd, label: "Record" },
  { icon: OverflowVerticalMd, label: "Transfer" },
  { icon: NotificationsMd, label: "Hold" },
  { icon: AiStarsMd, label: "Notes" },
];

type CallTab = "CONTACT" | "NOTES" | "TEXT" | "BOOKINGS";

export const Phone = (): JSX.Element => {
  const [view, setView] = useState<"dialer" | "in-call">("dialer");
  const [muted, setMuted] = useState(false);
  const [activeWidgetTab, setActiveWidgetTab] = useState<CallTab>("NOTES");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [suggestionAnchor, setSuggestionAnchor] = useState<HTMLElement | null>(null);

  const flow = useFlowParam();
  const afterPurchase = useIsBookingPurchased();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (flow === "in-call") {
      setView("in-call");
      setActiveWidgetTab("NOTES");
      const timer = setTimeout(() => {
        const btn = document.getElementById("share-booking-btn");
        if (btn) setSuggestionAnchor(btn);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [flow]);

  const endCall = () => {
    setView("dialer");
    if (flow === "in-call") {
      navigate("/phone/post-call?flow=post-call");
    }
  };

  return (
    <AppShell activeNav="Phone">
      <div className="relative flex h-full w-full flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-sui-neutral-line bg-white px-4">
          <h2 className="font-title text-[20px] font-semibold text-sui-neutral-f01">
            Phone
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={`rounded-full p-2 hover:bg-sui-neutral-b02 ${SUI_MUTED}`}
              aria-label="Search"
            >
              <SearchMd className="h-5 w-5" />
            </button>
            <button
              type="button"
              className={`rounded-full p-2 hover:bg-sui-neutral-b02 ${SUI_MUTED}`}
              aria-label="Settings"
            >
              <SettingsMd className="h-5 w-5" />
            </button>
          </div>
        </header>

        <section className="flex flex-1 items-center justify-center bg-sui-neutral-b01">
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => {
                setView("in-call");
                navigate("/phone?flow=in-call");
              }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-sui-success text-white hover:opacity-90"
            >
              <PhoneWarningMd className="h-8 w-8 rotate-180" />
            </button>
          </div>
        </section>

        {view === "in-call" && (
          <div className="pointer-events-none fixed inset-0 z-[100] flex items-start justify-center overflow-auto px-3 py-4 sm:items-center sm:p-6">
            <div className="pointer-events-auto w-full max-w-[680px] shrink-0 overflow-hidden rounded-xl border border-sui-neutral-line bg-white shadow-sui-lg sm:h-[518px] sm:w-[680px]">
              <div className="relative flex h-7 items-center border-b border-sui-neutral-line bg-sui-neutral-b02 px-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff514e]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffcc2d]" />
                  <span className="h-3 w-3 rounded-full bg-[#05d355]" />
                </div>
                <span className={`absolute left-1/2 -translate-x-1/2 text-[12px] font-medium ${SUI_TEXT}`}>
                  RingCentral phone call
                </span>
              </div>

              <div className="flex h-[calc(100%-28px)] flex-col sm:flex-row">
                <div className="flex w-full shrink-0 flex-col border-b border-sui-neutral-line sm:h-full sm:w-[280px] sm:border-b-0 sm:border-r">
                  <div className="flex items-center justify-between px-4 pt-3">
                    <div className={`flex items-center gap-2 text-[12px] ${SUI_TEXT}`}>
                      <span className="font-mono text-sm font-semibold tabular-nums">00:11</span>
                    </div>
                    <div className={`flex items-center gap-1 ${SUI_MUTED}`}>
                      <button className="rounded p-1 hover:bg-sui-neutral-b02">
                        <OverflowMd className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 px-4 pt-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#5b9bd5] text-sm font-semibold text-white">
                      TS
                    </div>
                    <div className="min-w-0">
                      <p className={`truncate text-base font-semibold ${SUI_TEXT}`}>Tim Smith</p>
                      <p className={`text-[12px] ${SUI_MUTED}`}>(470) 335-1472</p>
                    </div>
                  </div>

                  <div className="relative grid grid-cols-3 gap-x-2 gap-y-3 px-6 py-5">
                    {controls.map((c) => (
                      <button
                        key={c.label}
                        type="button"
                        onClick={() => {
                          if (c.label === "Mute") setMuted((m) => !m);
                        }}
                        className="flex flex-col items-center gap-1.5"
                      >
                        <span className={`flex h-12 w-12 items-center justify-center rounded-full bg-sui-neutral-b02 hover:bg-sui-neutral-line ${SUI_TEXT}`}>
                          <c.icon className="h-5 w-5" />
                        </span>
                        <span className={`text-[11px] font-medium ${SUI_TEXT}`}>{c.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-center px-6 pb-4 pt-4">
                    <button
                      type="button"
                      onClick={endCall}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-sui-danger-b text-white hover:bg-sui-danger-f"
                    >
                      <PhoneWarningMd className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                <div className="flex w-full min-w-0 flex-1 flex-col sm:h-full sm:w-[400px] sm:flex-none">
                  <div className="flex items-center justify-between border-b border-sui-neutral-line px-4 pt-3">
                    <div className="flex items-center gap-5">
                      {(["CONTACT", "NOTES", "TEXT", "BOOKINGS"] as CallTab[]).map((tab) => {
                        const isActive = activeWidgetTab === tab;
                        return (
                          <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveWidgetTab(tab)}
                            className={`relative pb-2.5 text-[12px] font-bold tracking-wider ${isActive ? SUI_PRIMARY : SUI_MUTED}`}
                          >
                            {tab}
                            {isActive && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-sui-cobranding-b01" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {activeWidgetTab === "NOTES" ? (
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-center justify-between px-4 pt-3">
                        <p className={`text-sm font-semibold ${SUI_TEXT}`}>Notes and transcript</p>
                      </div>

                      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-3 text-sm">
                        <div className="rounded-lg bg-sui-neutral-b02 p-3">
                          <p className={`text-sm ${SUI_TEXT}`}>
                            Sarah tried to find out the common time slot for schedule a follow-up appointment.
                          </p>
                          <button
                            id="share-booking-btn"
                            type="button"
                            onClick={(e) => setSuggestionAnchor(e.currentTarget)}
                            className="mt-2 inline-flex items-center gap-1 rounded px-1 py-0.5 text-[12px] font-medium text-sui-cobranding-b01 hover:bg-sui-cobranding-b01-t08"
                          >
                            <AiStarsMd className="h-3 w-3" />
                            Share booking link
                          </button>

                          <Popover
                            open={Boolean(suggestionAnchor)}
                            anchorEl={suggestionAnchor}
                            onClose={() => setSuggestionAnchor(null)}
                            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                            transformOrigin={{vertical: "top", horizontal: "center"}}
                          >
                            <div className="w-[280px] p-0 shadow-none border-0">
                              <FeatureIntroBanner
                                title="Send a booking link"
                                description="Let your customers choose a time based on your availability."
                                action={{
                                  label: "Find out more",
                                  onClick: () => {
                                    setSuggestionAnchor(null);
                                    setUpsellOpen(true);
                                  }
                                }}
                                onDismiss={() => setSuggestionAnchor(null)}
                              />
                            </div>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={`flex flex-1 items-center justify-center px-4 py-8 text-center text-sm ${SUI_MUTED}`}>
                      {activeWidgetTab} coming soon.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <AvaUpsellDialog open={upsellOpen} onOpenChange={setUpsellOpen} />
    </AppShell>
  );
};
