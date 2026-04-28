import { useLocation } from "wouter";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FLOWS,
  buildFlowHref,
  useActiveFlowEntryId,
  type FlowEntry,
  type FlowGroup,
} from "@/lib/flows";
import { setSmartSchedulerPurchased } from "@/lib/smartScheduler";

const groupTitles: Record<FlowGroup, string> = {
  before: "Before purchase",
  after: "After purchase",
};

export const FlowsLauncher = (): JSX.Element => {
  const [, navigate] = useLocation();
  const activeId = useActiveFlowEntryId();

  const handleSelect = (entry: FlowEntry) => {
    if (entry.comingSoon) return;
    if (typeof entry.setPurchased === "boolean") {
      setSmartSchedulerPurchased(entry.setPurchased);
    } else {
      setSmartSchedulerPurchased(entry.group === "after");
    }
    navigate(buildFlowHref(entry));
  };

  const grouped: Record<FlowGroup, FlowEntry[]> = {
    before: FLOWS.filter((f) => f.group === "before"),
    after: FLOWS.filter((f) => f.group === "after"),
  };
  const groupOrder: FlowGroup[] = ["before", "after"];

  const renderEntry = (entry: FlowEntry) => {
    const isActive = entry.id === activeId;
    if (entry.children && entry.children.length > 0) {
      return (
        <DropdownMenuSub key={entry.id}>
          <DropdownMenuSubTrigger
            className={
              isActive
                ? "bg-[#0040dd1a] text-[#0040dd] focus:bg-[#0040dd1a] focus:text-[#0040dd] data-[state=open]:bg-[#0040dd1a] data-[state=open]:text-[#0040dd]"
                : undefined
            }
            data-testid={`flow-item-${entry.id}`}
          >
            <span className="flex-1 truncate">{entry.label}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="z-[10000] w-56">
            {entry.children.map(renderEntry)}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      );
    }
    return (
      <DropdownMenuItem
        key={entry.id}
        disabled={entry.comingSoon}
        onSelect={(e) => {
          if (entry.comingSoon) {
            e.preventDefault();
            return;
          }
          handleSelect(entry);
        }}
        className={
          isActive && !entry.comingSoon
            ? "bg-[#0040dd1a] text-[#0040dd] focus:bg-[#0040dd1a] focus:text-[#0040dd]"
            : undefined
        }
        data-testid={`flow-item-${entry.id}`}
      >
        <span className="flex-1 truncate">{entry.label}</span>
        {entry.comingSoon && (
          <span className="ml-2 shrink-0 rounded bg-[#dddfe5] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#56585e]">
            soon
          </span>
        )}
      </DropdownMenuItem>
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        right: 24,
        transform: "translateY(-50%)",
        zIndex: 9999,
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Presentation configuration"
            data-testid="button-flows-launcher"
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white shadow-lg outline-none transition-colors hover:bg-[#1a1a1a] focus-visible:ring-2 focus-visible:ring-[#0040dd]"
          >
            <Settings className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="left"
          align="center"
          sideOffset={8}
          className="z-[10000] w-56"
          data-testid="panel-flows"
        >
          {groupOrder.map((group) => {
            const hasActive = grouped[group].some((e) => e.id === activeId);
            return (
              <DropdownMenuSub key={group}>
                <DropdownMenuSubTrigger
                  className={
                    hasActive
                      ? "text-[#0040dd] focus:text-[#0040dd] data-[state=open]:text-[#0040dd]"
                      : undefined
                  }
                  data-testid={`flow-group-${group}`}
                >
                  {groupTitles[group]}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="z-[10000] w-64">
                  {grouped[group].map(renderEntry)}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-[10px] font-normal normal-case tracking-normal text-[#8a8c93]">
            Demo navigation — not visible in production
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
