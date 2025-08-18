// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./reset.css";
import App from "./App.tsx";
import {
  RouterProvider,
  ThemeProviderWrapper,
  TanstackQueryProvider,
} from "./providers/index.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <RouterProvider>
    <TanstackQueryProvider>
      <ThemeProviderWrapper>
        <App />
      </ThemeProviderWrapper>
      <ReactQueryDevtools initialIsOpen={false} />
    </TanstackQueryProvider>
  </RouterProvider>
  // </StrictMode>
);
