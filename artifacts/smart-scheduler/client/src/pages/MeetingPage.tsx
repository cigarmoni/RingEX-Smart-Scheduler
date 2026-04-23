import { useState } from "react";
import { useLocation } from "wouter";
import { AppShell } from "@/components/AppShell";
import { MeetingContent } from "@/pages/Meeting";

export const MeetingPage = (): JSX.Element => {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [, navigate] = useLocation();

  const handleNavigate = (href: string): boolean => {
    // Stay on this page when user clicks Meeting again
    if (href === "/meeting") return true;
    navigate(href);
    return true;
  };

  return (
    <AppShell activeNav="Meeting" onNavigate={handleNavigate}>
      <MeetingContent
        bannerDismissed={bannerDismissed}
        onDismissBanner={() => setBannerDismissed(true)}
      />
    </AppShell>
  );
};
