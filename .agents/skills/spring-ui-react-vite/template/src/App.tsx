import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, suiLight, CircularProgressIndicator } from "@ringcentral/spring-ui";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();
const base = import.meta.env.BASE_URL;

function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6 bg-sui-neutral-b01">
      <div className="flex items-center gap-3">
        <img src={`${base}replit-logo.png`} alt="Replit" className="h-10 w-auto" />
        <span className="text-sui-neutral-f03 text-2xl font-light select-none">&times;</span>
        <img src={`${base}ringcentral-logo.png`} alt="RingCentral" className="h-10 w-auto" />
      </div>
      <CircularProgressIndicator size="xlarge" />
      <div className="text-center">
        <h1 className="text-xl font-semibold text-sui-neutral-f01">
          Replit Agent is building...
        </h1>
        <p className="mt-1 text-sm text-sui-neutral-f02">
          Your app will appear here once it's ready.
        </p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider theme={suiLight}>
      <QueryClientProvider client={queryClient}>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
