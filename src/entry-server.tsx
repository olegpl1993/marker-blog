import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import Root from "./Root";

export function render(url: string) {
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <Root />
    </StaticRouter>
  );
  return { html };
}
