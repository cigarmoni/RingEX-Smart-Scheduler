import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Plus,
  ChevronUp,
  Eye,
  ShoppingCart,
  List,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AvaUpsellDialog } from "@/components/AvaUpsellDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RingCentralIcon } from "@/components/BrandIcons";

type TabKey = "home" | "installed";

type SectionKey = "discover" | "products" | "categories";

type RailItem = { key: string; label: string };

type RailSection = {
  key: SectionKey;
  label: string;
  Icon: typeof Eye;
  items: RailItem[];
};

const railSections: RailSection[] = [
  {
    key: "discover",
    label: "Discover apps",
    Icon: Eye,
    items: [
      { key: "essential", label: "Essential apps" },
      { key: "noteworthy", label: "New & Noteworthy" },
      { key: "google", label: "Works with Google" },
      { key: "microsoft", label: "Works with Microsoft" },
      { key: "salesforce", label: "Works with Salesforce" },
      { key: "widgets", label: "Widgets" },
      { key: "addins", label: "Add-ins" },
    ],
  },
  {
    key: "products",
    label: "Products",
    Icon: ShoppingCart,
    items: [
      { key: "chat", label: "Chat" },
      { key: "meetings", label: "Meetings" },
      { key: "phone", label: "Phone" },
    ],
  },
  {
    key: "categories",
    label: "Categories",
    Icon: List,
    items: [
      { key: "all", label: "All applications" },
      { key: "analytics", label: "Analytics" },
      { key: "automation", label: "Automation" },
      { key: "automotive", label: "Automotive" },
      { key: "collaboration", label: "Collaboration" },
      { key: "crm", label: "CRM" },
      { key: "support", label: "Customer Support" },
      { key: "education", label: "Education" },
      { key: "financial", label: "Financial Services" },
      { key: "healthcare", label: "Healthcare" },
      { key: "legal", label: "Legal" },
      { key: "marketing", label: "Marketing Automation" },
    ],
  },
];

const railItemLabel = (key: string): string => {
  for (const s of railSections) {
    const item = s.items.find((i) => i.key === key);
    if (item) return item.label;
  }
  return key;
};

const HappyFoxIcon = ({ className }: { className?: string }): JSX.Element => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
    <rect width="40" height="40" rx="6" fill="#1f2429" />
    <path
      d="M12 14 L16 11 L18 14 L22 14 L24 11 L28 14 L28 22 C28 26 24.4 29 20 29 C15.6 29 12 26 12 22 Z"
      fill="#e63946"
    />
    <path
      d="M14 17 L16 15 L18 17 L22 17 L24 15 L26 17 L26 22 C26 25 23.3 27.2 20 27.2 C16.7 27.2 14 25 14 22 Z"
      fill="#f4b223"
    />
    <circle cx="17" cy="21" r="1.4" fill="#1f2429" />
    <circle cx="23" cy="21" r="1.4" fill="#1f2429" />
    <path d="M18 24 Q20 25.6 22 24" stroke="#1f2429" strokeWidth="1.2" fill="none" strokeLinecap="round" />
  </svg>
);

const SalesforceIcon = ({ className }: { className?: string }): JSX.Element => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
    <rect width="40" height="40" rx="6" fill="#ffffff" />
    <path
      d="M19.4 13.2c1-1 2.3-1.7 3.9-1.7 2 0 3.8 1.1 4.7 2.8.8-.4 1.7-.6 2.7-.6 3.5 0 6.3 2.9 6.3 6.4s-2.8 6.4-6.3 6.4c-.4 0-.8 0-1.2-.1-.8 1.4-2.3 2.4-4 2.4-.7 0-1.4-.2-2-.5-.8 1.9-2.7 3.2-4.9 3.2-2.3 0-4.3-1.5-5-3.5-.4.1-.7.1-1.1.1-2.9 0-5.3-2.4-5.3-5.4 0-2 1.1-3.7 2.7-4.7-.3-.7-.5-1.5-.5-2.4 0-3 2.4-5.4 5.4-5.4 1.8 0 3.4.9 4.4 2.2.1-.1.2-.1.2-.2-.4-.4 0 0 0 0z"
      fill="#00a1e0"
    />
  </svg>
);

type Widget = {
  id: string;
  name: string;
  vendor: string;
  vendorLabel: string;
  description: string;
  Icon: ({ className }: { className?: string }) => JSX.Element;
};

const BookingsIcon = ({ className }: { className?: string }): JSX.Element => (
  <div
    className={`flex items-center justify-center rounded-lg bg-[#f5f6f9] ${className ?? ""}`}
  >
    <img
      src="/figmaAssets/calendarmd.svg"
      alt="Bookings"
      className="h-5 w-5"
    />
  </div>
);

const widgets: Widget[] = [
  {
    id: "contact",
    name: "Contact",
    vendor: "RingCentral",
    vendorLabel: "RingCentral, Inc.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore e…",
    Icon: RingCentralIcon,
  },
  {
    id: "notes",
    name: "Notes",
    vendor: "RingCentral",
    vendorLabel: "RingCentral, Inc.",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    Icon: RingCentralIcon,
  },
  {
    id: "text",
    name: "Text",
    vendor: "RingCentral",
    vendorLabel: "RingCentral, Inc.",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    Icon: RingCentralIcon,
  },
  {
    id: "happyfox",
    name: "HappyFox",
    vendor: "HappyFox",
    vendorLabel: "by HappyFox",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    Icon: HappyFoxIcon,
  },
  {
    id: "salesforce",
    name: "Salesforce Client Data",
    vendor: "Salesforce",
    vendorLabel: "by Salesforce",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    Icon: SalesforceIcon,
  },
  {
    id: "bookings",
    name: "Bookings",
    vendor: "RingCentral",
    vendorLabel: "RingCentral, Inc.",
    description:
      "Schedule appointments and manage bookings directly from your calls. View availability and create meetings on the fly.",
    Icon: BookingsIcon,
  },
];

export const Apps = (): JSX.Element => {
  const [tab, setTab] = useState<TabKey>("home");
  const [activeItem, setActiveItem] = useState<string>("widgets");
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    discover: true,
    products: true,
    categories: true,
  });
  const [query, setQuery] = useState("");
  const [bookingsIntroOpen, setBookingsIntroOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return widgets;
    return widgets.filter(
      (w) =>
        w.name.toLowerCase().includes(q) || w.vendor.toLowerCase().includes(q),
    );
  }, [query]);

  const handleAddWidget = (id: string) => {
    if (id === "bookings") {
      setBookingsIntroOpen(true);
    }
  };

  const toggleSection = (key: SectionKey) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const showWidgetsView = tab === "home" && activeItem === "widgets";

  return (
    <AppShell>
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        {/* Left rail */}
        <aside className="flex w-full shrink-0 flex-col border-b border-[#dddfe5] bg-white md:w-[280px] md:border-b-0 md:border-r">
          {/* Page header */}
          <div className="flex h-[60px] items-center px-4">
            <h2 className="font-title text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] leading-[var(--title-line-height)] tracking-[var(--title-letter-spacing)] text-black [font-style:var(--title-font-style)]">
              Apps
            </h2>
          </div>

          {/* Tabs */}
          <div className="relative flex items-center border-b border-[#0000001a] pl-2">
            {(["home", "installed"] as const).map((t) => {
              const isActive = tab === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className="relative flex h-12 flex-1 items-center justify-center px-2 py-3.5"
                  aria-current={isActive ? "page" : undefined}
                  data-testid={`apps-tab-${t}`}
                >
                  <span
                    className={`text-[12px] font-semibold uppercase leading-[15px] tracking-[0.2px] ${
                      isActive ? "text-[#0040dd]" : "text-[#72757a]"
                    }`}
                  >
                    {t}
                  </span>
                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 border-b-2 border-[#0040dd]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Sections */}
          <nav className="flex-1 overflow-y-auto pb-4">
            {tab === "home" ? (
              railSections.map((section) => {
                const open = openSections[section.key];
                return (
                  <div key={section.key} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => toggleSection(section.key)}
                      className="flex h-9 w-full items-center justify-between px-4 text-left"
                      aria-expanded={open}
                      data-testid={`apps-section-${section.key}`}
                    >
                      <span className="flex items-center gap-2">
                        <section.Icon className="h-4 w-4 text-[#72757a]" strokeWidth={1.75} />
                        <span className="font-subtitle-mini text-[length:var(--subtitle-mini-font-size)] font-[number:var(--subtitle-mini-font-weight)] leading-[var(--subtitle-mini-line-height)] tracking-[var(--subtitle-mini-letter-spacing)] text-[#72757a] [font-style:var(--subtitle-mini-font-style)]">
                          {section.label}
                        </span>
                      </span>
                      <ChevronUp
                        className={`h-4 w-4 text-[#72757a] transition-transform ${
                          open ? "" : "rotate-180"
                        }`}
                        strokeWidth={1.75}
                      />
                    </button>
                    {open && (
                      <div className="flex flex-col">
                        {section.items.map((item) => {
                          const isActive = activeItem === item.key;
                          return (
                            <button
                              key={item.key}
                              type="button"
                              onClick={() => setActiveItem(item.key)}
                              className={`flex h-11 items-center px-4 text-left ${
                                isActive
                                  ? "bg-[#dddfe580]"
                                  : "hover:bg-[#f5f6f9]"
                              }`}
                              aria-current={isActive ? "page" : undefined}
                              data-testid={`apps-item-${item.key}`}
                            >
                              <span className="pl-6 font-main-text text-[length:var(--main-text-font-size)] font-[number:var(--main-text-font-weight)] leading-[var(--main-text-line-height)] text-black">
                                {item.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div
                className="px-6 py-10 text-center font-main-text text-[length:var(--main-text-font-size)] text-[#56585e]"
                data-testid="apps-installed-empty"
              >
                You haven't installed any apps yet.
              </div>
            )}
          </nav>
        </aside>

        {/* Right pane */}
        <section className="flex min-w-0 flex-1 flex-col overflow-y-auto">
          {showWidgetsView ? (
            <WidgetsView
              query={query}
              onQueryChange={setQuery}
              widgets={filtered}
              onAdd={handleAddWidget}
            />
          ) : (
            <ComingSoon
              title={tab === "installed" ? "Installed apps" : railItemLabel(activeItem)}
              testId={`page-apps-${tab}-${activeItem}`}
            />
          )}
        </section>
      </div>
      <AvaUpsellDialog
        open={bookingsIntroOpen}
        onOpenChange={setBookingsIntroOpen}
      />
    </AppShell>
  );
};

const WidgetsView = ({
  query,
  onQueryChange,
  widgets,
  onAdd,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  widgets: Widget[];
  onAdd: (id: string) => void;
}): JSX.Element => (
  <>
    <header className="flex flex-wrap items-center gap-3 border-b border-[#dddfe5] px-6 py-4">
      <h1
        className="mr-auto font-title text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] leading-[var(--title-line-height)] tracking-[var(--title-letter-spacing)] text-black [font-style:var(--title-font-style)]"
        data-testid="text-apps-title"
      >
        Widgets
      </h1>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#56585e]" />
        <Input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search widgets"
          className="h-9 w-[260px] rounded-full border-[#dddfe5] bg-white pl-9 pr-3 shadow-none"
          data-testid="input-search-widgets"
        />
      </div>
      <Button
        variant="outline"
        className="h-9 w-9 rounded-full border-[#dddfe5] bg-white p-0 hover:bg-[#f5f6f9]"
        aria-label="Filter"
        data-testid="button-filter-widgets"
      >
        <SlidersHorizontal className="h-4 w-4 text-[#56585e]" />
      </Button>
    </header>

    <div className="flex-1 px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-headline text-[length:var(--headline-font-size)] font-[number:var(--headline-font-weight)] leading-[var(--headline-line-height)] tracking-[var(--headline-letter-spacing)] text-black [font-style:var(--headline-font-style)]">
              Call widgets
            </h2>
            <p className="mt-1 font-main-text text-[length:var(--main-text-font-size)] font-[number:var(--main-text-font-weight)] leading-[var(--main-text-line-height)] text-[#56585e]">
              Enhance your productivity using call tools
            </p>
          </div>
          <Button
            variant="outline"
            className="h-9 rounded-[10px] border-[#dddfe5] bg-white px-4 text-[#0040dd] hover:bg-[#f5f6f9]"
            data-testid="button-configure-call-widgets"
          >
            Configure call widgets
          </Button>
        </div>

        {widgets.length === 0 ? (
          <div
            className="rounded-[10px] border border-dashed border-[#dddfe5] bg-white p-10 text-center"
            data-testid="empty-widgets"
          >
            <p className="font-main-text text-[length:var(--main-text-font-size)] text-[#56585e]">
              No widgets match "{query}".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {widgets.map((w) => (
              <WidgetCard key={w.id} widget={w} onAdd={() => onAdd(w.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  </>
);

const WidgetCard = ({
  widget,
  onAdd,
}: {
  widget: Widget;
  onAdd: () => void;
}): JSX.Element => (
  <article
    className="group relative flex flex-col gap-3 rounded-[10px] border border-[#dddfe5] bg-white p-5 transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
    data-testid={`card-widget-${widget.id}`}
  >
    <button
      type="button"
      onClick={onAdd}
      aria-label={`Add ${widget.name}`}
      data-testid={`button-add-widget-${widget.id}`}
      className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#0040dd] text-white opacity-0 shadow-[0_2px_6px_rgba(0,0,0,0.18)] transition-opacity hover:bg-[#0033b0] focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0040dd]/40 group-hover:opacity-100"
    >
      <Plus className="h-4 w-4" strokeWidth={2.5} />
    </button>
    <widget.Icon className="h-10 w-10" />
    <div className="flex flex-col gap-0.5">
      <h3 className="font-subtitle text-[length:var(--subtitle-font-size)] font-[number:var(--subtitle-font-weight)] leading-[var(--subtitle-line-height)] tracking-[var(--subtitle-letter-spacing)] text-black [font-style:var(--subtitle-font-style)]">
        {widget.name}
      </h3>
      <p className="text-[12px] leading-[15px] tracking-[0.2px] text-[#56585e]">
        {widget.vendorLabel}
      </p>
    </div>
    <p className="line-clamp-3 font-main-text text-[length:var(--main-text-font-size)] font-[number:var(--main-text-font-weight)] leading-[var(--main-text-line-height)] text-[#56585e]">
      {widget.description}
    </p>
  </article>
);

const ComingSoon = ({ title, testId }: { title: string; testId: string }): JSX.Element => (
  <>
    <header className="border-b border-[#dddfe5] px-6 py-4">
      <h1 className="font-title text-[length:var(--title-font-size)] font-[number:var(--title-font-weight)] leading-[var(--title-line-height)] tracking-[var(--title-letter-spacing)] text-black [font-style:var(--title-font-style)]">
        {title}
      </h1>
    </header>
    <div className="flex flex-1 items-center justify-center px-6 py-16" data-testid={testId}>
      <p className="font-main-text text-[length:var(--main-text-font-size)] text-[#56585e]">
        Coming soon.
      </p>
    </div>
  </>
);
