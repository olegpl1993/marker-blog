import fs from "fs";

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

const data = fs.readFileSync("./urls.txt").toString().split("\n");
const xmlData = data.reduce(
  (acc, url) =>
    acc +
    `
<url>
  <loc>${url}</loc>
</url>`,
  sitemap
);

fs.writeFileSync("./dist/sitemap.xml", xmlData);
