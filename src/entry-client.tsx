import ReactDOM from "react-dom/client";
import Root from "./Root";
import { BrowserRouter } from "react-router-dom";

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);
