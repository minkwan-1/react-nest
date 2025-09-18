import { createRoot } from "react-dom/client";
import "./reset.css";
import App from "./App.tsx";
import {
  RouterProvider,
  ThemeProviderWrapper,
  TanstackQueryProvider,
} from "./providers/index.ts";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.SENTRY_DSN,
  release: "release version",
  environment: "development",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

createRoot(document.getElementById("root")!).render(
  <RouterProvider>
    <Sentry.ErrorBoundary fallback={<p>UI 렌더링 중 에러가 발생했습니다.</p>}>
      <TanstackQueryProvider>
        <ThemeProviderWrapper>
          <App />
        </ThemeProviderWrapper>
      </TanstackQueryProvider>
    </Sentry.ErrorBoundary>
  </RouterProvider>
);
