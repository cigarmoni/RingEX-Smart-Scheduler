import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, suiLight } from "@ringcentral/spring-theme";
import { AvaProvider } from "@/contexts/AvaContext";
import NotFound from "@/pages/not-found";

import { Bookings } from "@/pages/Bookings";
import { Chat } from "@/pages/Chat";
import { Text } from "@/pages/Text";
import { Settings } from "@/pages/Settings";
import { Workflow } from "@/pages/Workflow";
import { PostCall } from "@/pages/PostCall";
import { Phone } from "@/pages/Phone";
import { MeetingWindow } from "@/pages/MeetingWindow";
import { MeetingPage } from "@/pages/MeetingPage";
import { Placeholder } from "@/pages/Placeholder";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
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
      <Route path="/apps">
        <Placeholder title="Apps" />
      </Route>
      <Route path="/help">
        <Placeholder title="Help" />
      </Route>
      <Route path="/customize">
        <Placeholder title="Customize" />
      </Route>
      <Route path="/workspace">
        <Placeholder title="Workspace" />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider theme={suiLight}>
      <QueryClientProvider client={queryClient}>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AvaProvider>
            <Router />
          </AvaProvider>
        </WouterRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
