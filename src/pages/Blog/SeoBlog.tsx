import { Helmet } from "react-helmet-async";

interface Props {
  categoryName: string | undefined;
  tagName: string | undefined;
  category: string | undefined;
  tagsSearchParams: string | null;
}

export function SeoBlog(props: Props) {
  const { categoryName, tagName, category, tagsSearchParams } = props;

  const title =
    categoryName || tagName
      ? (categoryName ? categoryName + " - " : "") +
        (tagName ? tagName + " - " : "") +
        "огляди українською | Game Marker"
      : `Ігрові новини та огляди українською | Game Marker`;

  const description =
    categoryName || tagName
      ? "Новини та огляди популярних ігор та анонси ігрових релізів" +
        (categoryName ? " у категорії " + categoryName : "") +
        (tagName ? " жанру " + tagName : "")
      : `Ігрові новини, анонси, огляди геймплей, відео ігри у жанрах: шутери, слешери, аркади, стелс, екшн, симулятори, економічні, стратегії, пригоди, рольові ігри, тактичні, РПГ, головоломки, онлайн ігри.`;

  const canonical =
    "https://marker.cx.ua/blog" +
    (category ? "/" + category : "") +
    (tagsSearchParams ? "?tags=" + tagsSearchParams : "");

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}
