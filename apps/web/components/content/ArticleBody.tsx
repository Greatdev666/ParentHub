import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/components/portable-text/serializers";

export function ArticleBody({ body }: { body: any[] }) {
  return (
    <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none text-brand-navy dark:text-gray-200 prose-headings:font-display prose-headings:text-brand-navy dark:prose-headings:text-white prose-a:text-brand-teal transition-colors duration-300">
      <PortableText value={body} components={portableTextComponents} />
    </div>
  );
}
