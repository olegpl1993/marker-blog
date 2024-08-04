import { Helmet } from "react-helmet-async";
import { getFirstSentence } from "../../shared/utils/getFirstSentence";

interface Props {
  title: string | undefined;
  slug: string | undefined;
}

export function SeoTopic(props: Props) {
  const { title, slug } = props;

  const description = title && getFirstSentence(title);
  const canonical = `https://marker.cx.ua/topic/${slug}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}
