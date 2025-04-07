import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Ensure we have the root element
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found. Make sure there is a div with id 'root' in the HTML.");
}

createRoot(rootElement).render(<App />);
