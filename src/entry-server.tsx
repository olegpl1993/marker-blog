import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import Root from "./Root";

interface Options {
  onShellReady: () => void;
}

export function render(url: string, options: Options) {
  const stream = ReactDOMServer.renderToPipeableStream(
    <StaticRouter location={url}>
      <Root />
    </StaticRouter>,
    options
  );
  return stream;
}
