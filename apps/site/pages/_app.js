import "@ionic/core/css/core.css";
import "@ionic/core/css/display.css";
import "@ionic/core/css/flex-utils.css";
import "@ionic/core/css/float-elements.css";
import "@ionic/core/css/normalize.css";
import "@ionic/core/css/padding.css";
import "@ionic/core/css/structure.css";
import "@ionic/core/css/text-alignment.css";
import "@ionic/core/css/text-transformation.css";
import "@ionic/core/css/typography.css";
import { defineCustomElements as ionDefineCustomElements } from "@ionic/core/loader";
import React, { useEffect } from "react";
import "../styles/globals.css";
import initAuth from "../utils/initAuth";

initAuth();

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    ionDefineCustomElements(window);
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
