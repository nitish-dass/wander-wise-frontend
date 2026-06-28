import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeContext } from "./context/ThemeContext.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContext>
      <AuthProvider>

        <Toaster richColors position="top-right" />
        <App />

      </AuthProvider>
    </ThemeContext>
  </StrictMode>,
);

