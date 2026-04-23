import { useState } from "react";
import { useLocation } from "wouter";
import {
  SettingsMd
} from "@ringcentral/spring-icon";
import { Popover, MenuItem } from "@ringcentral/spring-ui";
import {
  FLOWS,
  buildFlowHref,
  useActiveFlowEntryId,
  type FlowEntry,
  type FlowGroup,
} from "../lib/flows";
import { setSmartSchedulerPurchased } from "../lib/smartScheduler";

const groupTitles: Record<FlowGroup, string> = {
  before: "Before purchase",
  after: "After purchase",
};

export const FlowsLauncher = (): JSX.Element => {
  const [, navigate] = useLocation();
  const activeId = useActiveFlowEntryId();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  
  const handleSelect = (entry: FlowEntry) => {
    if (entry.comingSoon) return;
    if (typeof entry.setPurchased === "boolean") {
      setSmartSchedulerPurchased(entry.setPurchased);
    }
    navigate(buildFlowHref(entry));
    setAnchorEl(null);
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
        <div key={entry.id} className="flex flex-col">
          <div className="px-sui-3 py-sui-2 font-bold text-sui-neutral-f01">{entry.label}</div>
          <div className="pl-sui-4">
            {entry.children.map(renderEntry)}
          </div>
        </div>
      );
    }
    return (
      <MenuItem
        key={entry.id}
        disabled={entry.comingSoon}
        onClick={(e) => {
          if (entry.comingSoon) {
            e.preventDefault();
            return;
          }
          handleSelect(entry);
        }}
        className={
          isActive && !entry.comingSoon
            ? "bg-sui-cobranding-b01-t08 text-sui-cobranding-b01"
            : undefined
        }
        data-testid={`flow-item-${entry.id}`}
      >
        <span className="flex-1 truncate">{entry.label}</span>
        {entry.comingSoon && (
          <span className="ml-2 shrink-0 rounded bg-sui-neutral-line px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sui-neutral-f03">
            soon
          </span>
        )}
      </MenuItem>
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
      }}
    >
      <button
        type="button"
        aria-label="Presentation configuration"
        data-testid="button-flows-launcher"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white shadow-sui-lg outline-none transition-colors hover:bg-[#1a1a1a] focus-visible:ring-2 focus-visible:ring-sui-cobranding-b01"
      >
        <SettingsMd className="h-5 w-5" />
      </button>
      
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <div className="w-56 bg-white p-sui-2" data-testid="panel-flows">
          {groupOrder.map((group) => {
            const hasActive = grouped[group].some((e) => e.id === activeId);
            return (
              <div key={group} className="mb-sui-2">
                <div className={`px-sui-3 py-sui-1 font-bold ${hasActive ? "text-sui-cobranding-b01" : "text-sui-neutral-f02"}`} data-testid={`flow-group-${group}`}>
                  {groupTitles[group]}
                </div>
                <div>
                  {grouped[group].map(renderEntry)}
                </div>
              </div>
            );
          })}
          <div className="my-sui-2 h-px w-full bg-sui-neutral-line" />
          <div className="px-sui-3 py-sui-1 text-[10px] font-normal normal-case tracking-normal text-sui-neutral-f03">
            Demo navigation — not visible in production
          </div>
        </div>
      </Popover>
    </div>
  );
};
