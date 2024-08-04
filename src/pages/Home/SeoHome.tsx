import { Helmet } from "react-helmet-async";

export function SeoHome() {
  const title = "Game Marker - Останні ігрові новини та огляди на відео ігри";
  const description =
    "Нові та популярні відео ігри, анонси та гайди, геймплей, топ ігор, кіберспорт. Дізнайтесь про останні ігрові релізи та оновлення.";
  const canonical = "https://marker.cx.ua";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}
