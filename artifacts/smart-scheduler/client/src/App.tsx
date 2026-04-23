import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@ringcentral/spring-theme";
import { suiLight } from "@ringcentral/spring-theme";
import NotFound from "@/pages/not-found";
import { AvaProvider } from "@/contexts/AvaContext";

import { Bookings } from "@/pages/Bookings";
import { Chat } from "@/pages/Chat";
import { Text } from "@/pages/Text";
import { Settings } from "@/pages/Settings";
import { Workflow } from "@/pages/Workflow";
import { PostCall } from "@/pages/PostCall";
import { Phone } from "@/pages/Phone";
import { MeetingWindow } from "@/pages/MeetingWindow";
import { Placeholder } from "@/pages/Placeholder";
import { MeetingPage } from "@/pages/MeetingPage";
import { Apps } from "@/pages/Apps";

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/" component={Bookings} />
      <Route path="/chat" component={Chat} />
      <Route path="/text" component={Text} />
      <Route path="/settings" component={Settings} />
      <Route path="/workflows" component={Workflow} />
      <Route path="/phone" component={Phone} />
      <Route path="/phone/post-call" component={PostCall} />
      <Route path="/meeting-window">
        <MeetingWindow />
      </Route>
      <Route path="/meeting" component={MeetingPage} />
      <Route path="/contacts">
        <Placeholder title="Contacts" activeNav="Contacts" />
      </Route>
      <Route path="/apps" component={Apps} />
      <Route path="/help">
        <Placeholder title="Help" />
      </Route>
      <Route path="/customize">
        <Placeholder title="Customize" />
      </Route>
      <Route path="/workspace">
        <Placeholder title="Workspace" />
      </Route>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={suiLight}>
        <TooltipProvider>
          <AvaProvider>
            <Toaster />
            <Router />
          </AvaProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
