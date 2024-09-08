import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { Provider } from "react-redux";
import {store } from './redux/store.ts'

import { Buffer } from 'buffer';
window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <MetaMaskProvider
      sdkOptions={{
        dappMetadata: {
          name: "Car Insurance DApp",
          url: window.location.href,
        },
      }}
    >
      <App />
    </MetaMaskProvider>
    </Provider>
  </React.StrictMode>
);
