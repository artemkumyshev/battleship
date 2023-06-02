import React from "react";
import ReactDOM from "react-dom/client";
import { attachLogger } from 'effector-logger';

import App from "./App";

attachLogger

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
