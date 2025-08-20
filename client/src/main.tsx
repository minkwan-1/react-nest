import { createRoot } from "react-dom/client";
import "./reset.css";
import App from "./App.tsx";
import {
  RouterProvider,
  ThemeProviderWrapper,
  TanstackQueryProvider,
} from "./providers/index.ts";

createRoot(document.getElementById("root")!).render(
  <RouterProvider>
    <TanstackQueryProvider>
      <ThemeProviderWrapper>
        <App />
      </ThemeProviderWrapper>
    </TanstackQueryProvider>
  </RouterProvider>
);
