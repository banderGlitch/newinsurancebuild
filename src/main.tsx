import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { Buffer } from 'buffer';
window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MetaMaskProvider
      sdkOptions={{
        debug: true,  // Enable debugging to track initialization issues
        dappMetadata: {
          name: "Car Insurance DApp",
          url: window.location.href,
        },
      }}
    >
      <App />
    </MetaMaskProvider>

  </React.StrictMode>
);
