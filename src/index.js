import "@babel/polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Index from "./pages/Index";

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById("root")
);
