import { useLocation, useSearch } from "wouter";
import { useMemo } from "react";

export type FlowGroup = "before" | "after";

export interface FlowEntry {
  id: string;
  label: string;
  group: FlowGroup;
  route: string;
  flow?: string;
  comingSoon?: boolean;
  children?: FlowEntry[];
  setPurchased?: boolean;
}

export const FLOWS: FlowEntry[] = [
  { id: "booking-tab", label: "Booking tab", group: "before", route: "/" },
  { id: "chat", label: "Chat", group: "before", route: "/chat" },
  { id: "in-meeting", label: "In meeting", group: "before", route: "/", flow: "in-meeting" },
  { id: "post-meeting", label: "Post meeting", group: "before", route: "/", flow: "post-meeting" },
  { id: "in-call", label: "In call", group: "before", route: "/phone", flow: "in-call" },
  { id: "post-call", label: "Post call", group: "before", route: "/phone/post-call" },
  { id: "text", label: "Text", group: "before", route: "/text" },
  { id: "workflow", label: "Workflow", group: "before", route: "/workflows" },
  { id: "ava", label: "AVA", group: "before", route: "/", flow: "ava" },
  { id: "settings-calendar", label: "Settings / Calendar", group: "before", route: "/settings", flow: "settings-calendars" },
  { id: "widget", label: "Widget", group: "before", route: "/apps" },

  { id: "after-booking-initial-setup", label: "Booking tab", group: "after", route: "/", flow: "after-booking-initial-setup" },
  { id: "after-chat-booking-link", label: "Chat", group: "after", route: "/chat", flow: "after-chat-booking-link" },
  { id: "after-meeting-share-link", label: "In meeting", group: "after", route: "/meeting-window", flow: "share-booking", setPurchased: true },
  { id: "after-post-meeting-share-link", label: "Post meeting", group: "after", route: "/", flow: "after-post-meeting-share-link", comingSoon: true },
  { id: "after-call-share-link", label: "In call", group: "after", route: "/phone", flow: "after-call-share-link" },
  { id: "after-post-call-share-link", label: "Post call", group: "after", route: "/", flow: "after-post-call-share-link", comingSoon: true },
  { id: "after-text-booking-link", label: "Text", group: "after", route: "/text", flow: "after-text-booking-link" },
  { id: "after-workflow-send-link", label: "Workflow", group: "after", route: "/workflows", flow: "after-workflow-send-link" },
  { id: "after-ava-manage", label: "AVA", group: "after", route: "/", flow: "after-ava-manage" },
];

export function useFlowParam(): string | null {
  const search = useSearch();
  return useMemo(() => {
    const params = new URLSearchParams(search);
    return params.get("flow");
  }, [search]);
}

export function buildFlowHref(entry: FlowEntry): string {
  if (!entry.flow) return entry.route;
  const sep = entry.route.includes("?") ? "&" : "?";
  return `${entry.route}${sep}flow=${encodeURIComponent(entry.flow)}`;
}

export function useIsBookingPurchased(): boolean {
  const flow = useFlowParam();
  return useMemo(() => {
    if (!flow) return false;
    const entry = FLOWS.find((f) => f.flow === flow);
    return entry?.group === "after";
  }, [flow]);
}

function flattenFlows(entries: FlowEntry[]): FlowEntry[] {
  const out: FlowEntry[] = [];
  for (const entry of entries) {
    out.push(entry);
    if (entry.children) out.push(...flattenFlows(entry.children));
  }
  return out;
}

/**
 * Default flow per route per phase. Used to make sidebar navigation phase-aware:
 * if the user is mid-demo on a "before" or "after" flow, jumping to another
 * tab should land on that tab's equivalent "before" or "after" entry rather
 * than dropping the demo state.
 */
const ROUTE_PHASE_FLOW: Record<string, Partial<Record<FlowGroup, string>>> = {
  "/": { before: "booking-tab", after: "after-booking-initial-setup" },
  "/chat": { before: "chat", after: "after-chat-booking-link" },
  "/phone": { before: "in-call", after: "after-call-share-link" },
  "/phone/post-call": { before: "post-call" },
  "/text": { before: "text", after: "after-text-booking-link" },
  "/workflows": { before: "workflow", after: "after-workflow-send-link" },
  "/settings": { before: "settings-calendar", after: "settings-calendar" },
  "/meeting-window": { after: "after-meeting-share-link" },
};

export function hrefForPhase(href: string, phase: FlowGroup | null): string {
  if (!phase) return href;
  // strip any existing query so we don't double up
  const [path] = href.split("?");
  const mapping = ROUTE_PHASE_FLOW[path];
  if (!mapping) return href;
  const flowId = mapping[phase];
  if (!flowId) return href;
  const entry = FLOWS.find((f) => f.id === flowId);
  if (!entry) return href;
  return buildFlowHref(entry);
}

export function useCurrentPhase(): FlowGroup | null {
  const flow = useFlowParam();
  return useMemo(() => {
    if (!flow) return null;
    const entry = FLOWS.find((f) => f.flow === flow);
    return entry?.group ?? null;
  }, [flow]);
}

export function useActiveFlowEntryId(): string | null {
  const [location] = useLocation();
  const flow = useFlowParam();
  return useMemo(() => {
    const path = location || "/";
    let bestMatch: FlowEntry | null = null;
    for (const entry of flattenFlows(FLOWS)) {
      if (entry.route !== path) continue;
      if (entry.flow) {
        if (entry.flow === flow) return entry.id;
      } else if (!flow && !bestMatch) {
        bestMatch = entry;
      }
    }
    return bestMatch?.id ?? null;
  }, [location, flow]);
}
