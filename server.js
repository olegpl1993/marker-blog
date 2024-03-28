import express from "express";
import fs from "node:fs/promises";

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

const app = express();

if (isProduction) {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      const template = await fs.readFile("./dist/client/index.html", "utf-8");
      const render = (await import("./dist/server/entry-server.js")).render;
      const HTML = template.split("<!--app-html-->");
      const stream = await render(url, {
        onShellReady() {
          res.write(HTML[0]);
          stream.pipe(res);
          res.write(HTML[1]);
        },
      });
    } catch (e) {
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });
} else {
  const { createServer } = await import("vite");
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      let template = await fs.readFile("./index.html", "utf-8");
      const transformHtml = await vite.transformIndexHtml(url, template);
      let render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
      const HTML = transformHtml.split("<!--app-html-->");
      const stream = await render(url, {
        onShellReady() {
          res.write(HTML[0]);
          stream.pipe(res);
          res.write(HTML[1]);
        },
      });
    } catch (e) {
      vite?.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });
}

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
