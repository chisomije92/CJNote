import * as ReactDOMClient from "react-dom/client";
import "./index.css";

import App from "./App";

const container = document.getElementById("root") as HTMLElement;

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(<App />);
