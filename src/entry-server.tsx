import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { App } from "./App";

interface Options {
  onShellReady: () => void;
}

export function render(url: string, options: Options) {
  const stream = ReactDOMServer.renderToPipeableStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
    options
  );
  return stream;
}
