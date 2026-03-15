import { ThemeProvider, suiLight } from "@ringcentral/spring-ui";
import VideoTemplate from "@/components/video/VideoTemplate";

export default function App() {
  return (
    <ThemeProvider theme={suiLight}>
      <VideoTemplate />
    </ThemeProvider>
  );
}
