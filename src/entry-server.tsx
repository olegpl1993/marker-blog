import ReactDOMServer from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server";
import { App } from "./App";

interface Options {
  onShellReady: () => void;
}

export function render(url: string, options: Options) {
  const helmetContext = {};
  const stream = ReactDOMServer.renderToPipeableStream(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
    options
  );
  return { stream, helmetContext };
}
