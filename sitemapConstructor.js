import fs from "fs";

const data = fs.readFileSync("./urls.txt").toString().split("\n");
const linkData = data.map(
  (url) =>
    `
<url>
  <loc>${url}</loc>
</url>`,
).join("");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${linkData}
</urlset>
`;

fs.writeFileSync("./dist/sitemap.xml", sitemap);
