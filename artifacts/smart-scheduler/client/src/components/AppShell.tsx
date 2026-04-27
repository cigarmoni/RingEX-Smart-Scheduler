import { useState, useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AvaDrawer } from "@/components/AvaDrawer";
import { useAva } from "@/contexts/AvaContext";
import { FlowsLauncher } from "@/components/FlowsLauncher";
import { useFlowParam, useCurrentPhase, hrefForPhase } from "@/lib/flows";

const topActions = [
  { alt: "Compact view MD", src: "/figmaAssets/compactviewmd.svg" },
  { alt: "Dialpad MD", src: "/figmaAssets/dialpadmd.svg" },
  { alt: "Plus MD", src: "/figmaAssets/plusmd.svg" },
];

export type NavLabel =
  | "Chat"
  | "Meeting"
  | "Phone"
  | "Text"
  | "Contacts"
  | "More";

const primarySidebarItems: {
  label: NavLabel;
  src: string;
  alt: string;
  href?: string;
  isMore?: boolean;
}[] = [
  { label: "Chat", src: "/figmaAssets/message.svg", alt: "Message", href: "/chat" },
  { label: "Meeting", src: "/figmaAssets/video.svg", alt: "Video", href: "/meeting" },
  { label: "Phone", src: "/figmaAssets/call.svg", alt: "Call", href: "/phone" },
  { label: "Text", src: "/figmaAssets/sms.svg", alt: "Sms", href: "/text" },
  { label: "Contacts", src: "/figmaAssets/contacts.svg", alt: "Contacts", href: "/contacts" },
  { label: "More", src: "/figmaAssets/overflow.svg", alt: "Overflow", isMore: true },
];

const moreMenuItemsTop = [
  { label: "Workspace", src: "/figmaAssets/workspacesmd.svg", alt: "Workspaces MD", href: "/workspace" },
  { label: "Workflows", src: "/figmaAssets/workflowoutlinedmd.svg", alt: "Workflow outlined MD", href: "/workflows" },
  { label: "Bookings", src: "/figmaAssets/calendarmd.svg", alt: "Calendar MD", hasIndicator: true, href: "/" },
];

const moreMenuItemsBottom = [
  { label: "Customize", src: "/figmaAssets/customizemd.svg", alt: "Customize MD", href: "/customize" },
];

const secondarySidebarItems = [
  { label: "Apps", src: "/figmaAssets/appsmd.svg", alt: "Apps MD", href: "/apps" },
  { label: "Settings", src: "/figmaAssets/settingsmd-1.svg", alt: "Settings MD", href: "/settings" },
  { label: "Help", src: "/figmaAssets/helpmd.svg", alt: "Help MD", href: "/help" },
];

interface AppShellProps {
  activeNav?: NavLabel;
  children: ReactNode;
  onNavigate?: (href: string) => boolean;
}

export const AppShell = ({ activeNav, children, onNavigate }: AppShellProps): JSX.Element => {
  const [location, navigate] = useLocation();
  const { avaOpen, toggleAva, closeAva, openAva } = useAva();
  const flow = useFlowParam();
  const phase = useCurrentPhase();
  useEffect(() => {
    if (flow === "after-ava-manage" || flow === "ava") {
      openAva();
    }
  }, [flow, openAva]);
  const goTo = (href: string) => {
    const phasedHref = hrefForPhase(href, phase);
    if (onNavigate && onNavigate(phasedHref)) return;
    navigate(phasedHref);
  };
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const isMoreItemActive = (href?: string) => !!href && href !== "/" && location === href;
  const moreMenuDesktopRef = useRef<HTMLDivElement>(null);
  const moreMenuMobileRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const moreButtonMobileRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideAnyMenu =
        (moreMenuDesktopRef.current && moreMenuDesktopRef.current.contains(target)) ||
        (moreMenuMobileRef.current && moreMenuMobileRef.current.contains(target));
      const insideAnyButton =
        (moreButtonRef.current && moreButtonRef.current.contains(target)) ||
        (moreButtonMobileRef.current && moreButtonMobileRef.current.contains(target));
      if (!insideAnyMenu && !insideAnyButton) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (item: typeof primarySidebarItems[number]) => {
    if (item.isMore) {
      setMoreMenuOpen((prev) => !prev);
    } else if (item.href) {
      setMoreMenuOpen(false);
      goTo(item.href);
    }
  };

  return (
    <main className="flex h-screen w-full flex-col overflow-hidden bg-white">
      <header className="hidden h-7 items-center justify-center bg-white px-3 sm:flex">
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-md bg-[#ff514e]" />
            <span className="h-3 w-3 rounded-md bg-[#ffcc2d]" />
            <span className="h-3 w-3 rounded-md bg-[#05d355]" />
          </div>
          <div className="font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)] tracking-[var(--subtitle-letter-spacing)] text-black [font-style:var(--subtitle-font-style)]">
            RingCentral
          </div>
          <div />
        </div>
      </header>
      <section className="flex min-h-0 flex-1 overflow-hidden bg-white sm:rounded-b-[10px]">
        <div className="flex h-full w-full flex-col bg-white">
          <header className="flex flex-wrap items-center gap-2 border-b border-[#dddfe580] bg-[#0040dd] px-3 py-2 sm:gap-4 sm:px-4 sm:py-2.5">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div className="relative h-9 w-9 shrink-0">
                <div className="relative h-9 w-9 overflow-hidden rounded-full bg-[url(/figmaAssets/shape.svg)] bg-[100%_100%]">
                  <img className="absolute left-[calc(50%-8px)] top-[calc(50%-8px)] h-4 w-4" alt="Icon" src="/figmaAssets/icon.svg" />
                  <img className="absolute left-0 top-0 h-9 w-9" alt="Mask group" src="/figmaAssets/mask-group.png" />
                </div>
                <div className="absolute bottom-0 right-0 flex h-3 w-3 items-center justify-center rounded-full border border-solid border-white bg-[#16a937]">
                  <img className="h-3 w-3" alt="Check bold SM" src="/figmaAssets/checkboldsm.svg" />
                </div>
              </div>
              <h1 className="truncate font-display-2 text-[length:var(--display-2-font-size)] font-[number:var(--display-2-font-weight)] leading-[var(--display-2-line-height)] tracking-[var(--display-2-letter-spacing)] text-white [font-style:var(--display-2-font-style)]">
                RingCentral, Inc.
              </h1>
            </div>
            <div className="order-3 flex w-full flex-1 items-center justify-center gap-1.5 md:order-none md:w-auto">
              <div className="hidden items-center gap-1 md:flex">
                <Button variant="ghost" className="h-9 w-9 rounded-full p-0 hover:bg-white/10" aria-label="Previous">
                  <img className="h-9 w-9" alt="Caret left MD" src="/figmaAssets/caretleftmd.svg" />
                </Button>
                <Button variant="ghost" className="h-9 w-9 rounded-full p-0 hover:bg-white/10" aria-label="Next">
                  <img className="h-9 w-9" alt="Caret right MD" src="/figmaAssets/caretrightmd.svg" />
                </Button>
              </div>
              <div className="flex w-full max-w-[468px] flex-1 items-center px-1.5">
                <button
                  type="button"
                  onClick={toggleAva}
                  aria-pressed={avaOpen}
                  data-testid="button-ava-pill"
                  className={`flex h-9 w-full items-center rounded-full border border-solid pl-0.5 pr-3 text-left transition-colors ${
                    avaOpen
                      ? "border-white/20 bg-[#ffffff33]"
                      : "border-white/10 bg-[#ffffff1a] hover:bg-[#ffffff26]"
                  }`}
                >
                  <div className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full [background:radial-gradient(50%_50%_at_60%_62%,rgba(255,92,0,1)_13%,rgba(255,92,0,0.1)_80%,rgba(255,92,0,0)_100%),linear-gradient(0deg,rgba(255,122,0,1)_0%,rgba(255,122,0,1)_100%)]">
                    <img className="h-4 w-4" alt="Ai sparkle filled" src="/figmaAssets/aisparklefilled.svg" />
                  </div>
                  <span className="flex-1 font-main-text text-[length:var(--main-text-font-size)] font-[number:var(--main-text-font-weight)] leading-[var(--main-text-line-height)] tracking-[var(--main-text-letter-spacing)] text-white/60 [font-style:var(--main-text-font-style)]">
                    Ask Ava or Search
                  </span>
                </button>
              </div>
            </div>
            <div className="ml-auto hidden items-center justify-end gap-1 pl-1.5 sm:flex sm:gap-2 sm:pr-2 md:pr-4">
              {topActions.map((action) => (
                <Button key={action.alt} variant="ghost" className="h-9 w-9 rounded-full p-0 hover:bg-white/10" aria-label={action.alt}>
                  <img className="h-9 w-9" alt={action.alt} src={action.src} />
                </Button>
              ))}
            </div>
          </header>
          <div className="flex min-h-0 flex-1 items-stretch">
            <aside className="relative hidden w-[72px] shrink-0 flex-col justify-between border-r border-[#0000001a] bg-[#f5f6f9] md:flex">
              <nav className="flex flex-col items-center gap-2 py-4">
                {primarySidebarItems.map((item) => {
                  const isMoreActive = item.isMore && moreMenuOpen;
                  const isCurrent = !item.isMore && item.label === activeNav;
                  const highlight = isMoreActive || isCurrent;
                  return (
                    <button
                      key={item.label}
                      ref={item.isMore ? moreButtonRef : undefined}
                      type="button"
                      onClick={() => handleNavClick(item)}
                      className={`relative flex w-[72px] flex-col items-center justify-center gap-1 px-1 py-2 ${
                        highlight ? "bg-[#0040dd1a]" : "hover:bg-[#0000000a]"
                      }`}
                      aria-current={highlight ? "page" : undefined}
                      data-testid={`nav-${item.label.toLowerCase()}`}
                    >
                      {isCurrent && (
                        <span className="absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-r bg-[#0040dd]" />
                      )}
                      <img className="h-5 w-5" alt={item.alt} src={item.src} />
                      <span
                        className={`self-stretch text-center font-detail-bold text-[length:var(--detail-bold-font-size)] font-[number:var(--detail-bold-font-weight)] leading-[var(--detail-bold-line-height)] tracking-[var(--detail-bold-letter-spacing)] [font-style:var(--detail-bold-font-style)] ${
                          highlight ? "text-[#0040dd]" : "text-black"
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {moreMenuOpen && (
                <div
                  ref={moreMenuDesktopRef}
                  className="absolute left-[72px] top-[220px] z-50 w-max rounded-[10px] border border-solid border-[#00000033] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
                >
                  <div className="p-2">
                    <div className="flex flex-col bg-white">
                      {moreMenuItemsTop.map((menuItem) => {
                        const active = isMoreItemActive(menuItem.href);
                        return (
                        <button
                          key={menuItem.label}
                          type="button"
                          onClick={() => {
                            setMoreMenuOpen(false);
                            goTo(menuItem.href);
                          }}
                          aria-current={active ? "page" : undefined}
                          data-testid={`more-menu-${menuItem.label.toLowerCase().replace(/\s+/g, "-")}`}
                          className={`flex min-h-10 items-center rounded-[10px] px-2 py-2.5 text-left ${active ? "bg-[#0040dd1a]" : "hover:bg-[#f5f6f9]"}`}
                        >
                          <div className="flex flex-1 items-center">
                            <div className="pr-3">
                              <img className="h-4 w-4" alt={menuItem.alt} src={menuItem.src} />
                            </div>
                            <span className={`font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-[number:var(--subtitle-mini-font-weight)] leading-[var(--subtitle-mini-line-height)] tracking-[var(--subtitle-mini-letter-spacing)] [font-style:var(--subtitle-mini-font-style)] ${active ? "text-[#0040dd] font-semibold" : "text-black"}`}>
                              {menuItem.label}
                            </span>
                            {menuItem.hasIndicator && (
                              <span className="ml-1 h-2 w-2 rounded-full bg-[#fe8624]" />
                            )}
                          </div>
                        </button>
                        );
                      })}
                      <Separator className="my-2 bg-[#0000001a]" />
                      {moreMenuItemsBottom.map((menuItem) => {
                        const active = isMoreItemActive(menuItem.href);
                        return (
                        <button
                          key={menuItem.label}
                          type="button"
                          onClick={() => {
                            setMoreMenuOpen(false);
                            goTo(menuItem.href);
                          }}
                          aria-current={active ? "page" : undefined}
                          className={`flex min-h-10 items-center rounded-[10px] px-2 py-2.5 text-left ${active ? "bg-[#0040dd1a]" : "hover:bg-[#f5f6f9]"}`}
                        >
                          <div className="flex flex-1 items-center">
                            <div className="pr-3">
                              <img className="h-4 w-4" alt={menuItem.alt} src={menuItem.src} />
                            </div>
                            <span className={`font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-[number:var(--subtitle-mini-font-weight)] leading-[var(--subtitle-mini-line-height)] tracking-[var(--subtitle-mini-letter-spacing)] [font-style:var(--subtitle-mini-font-style)] ${active ? "text-[#0040dd] font-semibold" : "text-black"}`}>
                              {menuItem.label}
                            </span>
                          </div>
                        </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              <nav className="flex flex-col items-center justify-end gap-2 py-4">
                {secondarySidebarItems.map((item) => {
                  const isCurrent = location === item.href;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => goTo(item.href)}
                      className={`relative flex w-[72px] flex-col items-center justify-center gap-[3px] px-1 py-2 ${
                        isCurrent ? "bg-[#0040dd1a]" : "hover:bg-[#0000000a]"
                      }`}
                      aria-current={isCurrent ? "page" : undefined}
                      data-testid={`nav-secondary-${item.label.toLowerCase()}`}
                    >
                      {isCurrent && (
                        <span className="absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-r bg-[#0040dd]" />
                      )}
                      <img className="h-5 w-5" alt={item.alt} src={item.src} />
                      <span
                        className={`self-stretch text-center font-detail-bold text-[length:var(--detail-bold-font-size)] font-[number:var(--detail-bold-font-weight)] leading-[var(--detail-bold-line-height)] tracking-[var(--detail-bold-letter-spacing)] [font-style:var(--detail-bold-font-style)] ${
                          isCurrent ? "text-[#0040dd]" : "text-black"
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            <div className="relative flex min-h-0 min-w-0 flex-1 pb-20 md:pb-0">
              <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                {children}
              </div>
              <AvaDrawer open={avaOpen} onClose={closeAva} />
            </div>
          </div>

          {/* Mobile bottom navigation */}
          <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t border-[#0000001a] bg-[#f5f6f9] md:hidden">
            {primarySidebarItems.map((item) => {
              const isMoreActive = item.isMore && moreMenuOpen;
              const isCurrent = !item.isMore && item.label === activeNav;
              const highlight = isMoreActive || isCurrent;
              return (
                <button
                  key={item.label}
                  ref={item.isMore ? moreButtonMobileRef : undefined}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className={`relative flex flex-1 flex-col items-center justify-center gap-1 px-1 py-2 ${
                    highlight ? "bg-[#0040dd1a]" : "active:bg-[#0000000a]"
                  }`}
                  aria-current={highlight ? "page" : undefined}
                  data-testid={`nav-mobile-${item.label.toLowerCase()}`}
                >
                  <img className="h-5 w-5" alt={item.alt} src={item.src} />
                  <span
                    className={`text-center font-detail-bold text-[length:var(--detail-bold-font-size)] font-[number:var(--detail-bold-font-weight)] leading-[var(--detail-bold-line-height)] tracking-[var(--detail-bold-letter-spacing)] [font-style:var(--detail-bold-font-style)] ${
                      highlight ? "text-[#0040dd]" : "text-black"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {moreMenuOpen && (
            <div
              ref={moreMenuMobileRef}
              className="fixed inset-x-3 bottom-[80px] z-50 rounded-[10px] border border-solid border-[#00000033] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] md:hidden"
            >
              <div className="p-2">
                <div className="flex flex-col bg-white">
                  {moreMenuItemsTop.map((menuItem) => {
                    const active = isMoreItemActive(menuItem.href);
                    return (
                    <button
                      key={menuItem.label}
                      type="button"
                      onClick={() => {
                        setMoreMenuOpen(false);
                        goTo(menuItem.href);
                      }}
                      aria-current={active ? "page" : undefined}
                      data-testid={`more-menu-mobile-${menuItem.label.toLowerCase().replace(/\s+/g, "-")}`}
                      className={`flex min-h-10 items-center rounded-[10px] px-2 py-2.5 text-left ${active ? "bg-[#0040dd1a]" : "hover:bg-[#f5f6f9]"}`}
                    >
                      <div className="flex flex-1 items-center">
                        <div className="pr-3">
                          <img className="h-4 w-4" alt={menuItem.alt} src={menuItem.src} />
                        </div>
                        <span className={`font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-[number:var(--subtitle-mini-font-weight)] leading-[var(--subtitle-mini-line-height)] tracking-[var(--subtitle-mini-letter-spacing)] [font-style:var(--subtitle-mini-font-style)] ${active ? "text-[#0040dd] font-semibold" : "text-black"}`}>
                          {menuItem.label}
                        </span>
                        {menuItem.hasIndicator && (
                          <span className="ml-1 h-2 w-2 rounded-full bg-[#fe8624]" />
                        )}
                      </div>
                    </button>
                    );
                  })}
                  <Separator className="my-2 bg-[#0000001a]" />
                  {[...secondarySidebarItems, ...moreMenuItemsBottom].map((menuItem) => {
                    const active = isMoreItemActive(menuItem.href);
                    return (
                    <button
                      key={menuItem.label}
                      type="button"
                      onClick={() => {
                        setMoreMenuOpen(false);
                        goTo(menuItem.href);
                      }}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-10 items-center rounded-[10px] px-2 py-2.5 text-left ${active ? "bg-[#0040dd1a]" : "hover:bg-[#f5f6f9]"}`}
                    >
                      <div className="flex flex-1 items-center">
                        <div className="pr-3">
                          <img className="h-4 w-4" alt={menuItem.alt} src={menuItem.src} />
                        </div>
                        <span className={`font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-[number:var(--subtitle-mini-font-weight)] leading-[var(--subtitle-mini-line-height)] tracking-[var(--subtitle-mini-letter-spacing)] [font-style:var(--subtitle-mini-font-style)] ${active ? "text-[#0040dd] font-semibold" : "text-black"}`}>
                          {menuItem.label}
                        </span>
                      </div>
                    </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <FlowsLauncher />
    </main>
  );
};
