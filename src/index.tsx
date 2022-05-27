import { Web3ReactProvider } from "@web3-react/core";
import ModalProvider from "mui-modal-provider";
import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "src/App";
import "src/css/index.css";
import SnackbarProvider from "src/providers/SnackbarProvider";
import ThemeProvider from "src/providers/ThemeProvider";
import * as serviceWorker from "src/serviceWorker";
import store from "src/state";
import { getLibrary } from "src/utils/getLibrary";
import { StateUpdater } from "./state/updaters";

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <SnackbarProvider>
            <ModalProvider>
              <StateUpdater />
              <HashRouter>
                <App />
              </HashRouter>
            </ModalProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </ReduxProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorker.unregister();
