import { createRoot } from "react-dom/client";
import App from "./App";
import { FirebaseProvider } from "./contexts/FirebaseProvider";
import { ThemeProvider } from "./contexts/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <FirebaseProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </FirebaseProvider>
);
