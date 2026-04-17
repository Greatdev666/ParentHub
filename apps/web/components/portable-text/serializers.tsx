import { Callout } from "./Callout";
import { ImageBlock } from "./ImageBlock";
import { VideoEmbed } from "./VideoEmbed";
import { FAQBlock } from "./FAQBlock";
import { StatGrid } from "./StatGrid";
import { NumberedCardList } from "./NumberedCardList";
import { TableBlock } from "./TableBlock";
import { ArticleEmbedList } from "./ArticleEmbedList";
import { CodeBlock } from "./CodeBlock";
import type { PortableTextComponents } from "@portabletext/react";

const toPlainText = (blocks: any[]): string => {
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }
      return block.children.map((child: any) => child.text).join("");
    })
    .join("\n\n");
};

// Simple helper for IDs
const slugify = (text: string) => 
  text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

export const portableTextComponents: PortableTextComponents = {
  types: {
    callout: ({ value }) => <Callout type={value.type} variant={value.variant} title={value.title} content={value.content} />,
    statGrid: ({ value }) => <StatGrid items={value.items} />,
    numberedCardList: ({ value }) => <NumberedCardList items={value.items} />,
    tableBlock: ({ value }) => <TableBlock table={value.table} alignment={value.alignment} showIndex={value.showIndex} />,
    imageWithAlt: ({ value }) => <ImageBlock image={value} />,
    videoEmbed: ({ value }) => <VideoEmbed url={value.url} />,
    faq: ({ value }) => <FAQBlock items={value.items} />,
    articleEmbedList: ({ value }) => <ArticleEmbedList title={value.title} articles={value.articles} />,
    codeBlock: ({ value }) => (
      <CodeBlock 
        code={value.code} 
        language={value.language} 
        filename={value.filename} 
        showPreview={value.showPreview}
        output={value.output}
      />
    ),
  },
  block: {
    h2: ({ children, value }) => {
      const text = value.children.map((c: any) => c.text).join("");
      const id = slugify(text) || value._key;
      return <h2 id={id} className="scroll-mt-24">{children}</h2>;
    },
    h3: ({ children, value }) => {
      const text = value.children.map((c: any) => c.text).join("");
      const id = slugify(text) || value._key;
      return <h3 id={id} className="scroll-mt-24">{children}</h3>;
    },
  },
  marks: {
    internalLink: ({ value, children }) => <a href={`/${value?.slug}`} className="text-brand-teal underline underline-offset-2 hover:text-brand-teal/80">{children}</a>,
    link: ({ value, children }) => <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-brand-teal underline underline-offset-2">{children}</a>,
    code: ({ children }) => (
      <code className="bg-[#FFF9F6] dark:bg-white/10 border border-[#FFEDE0] dark:border-white/10 text-[#A34E24] dark:text-brand-orange px-1.5 py-0.5 rounded-md font-mono text-[0.85em] font-bold">
        {children}
      </code>
    ),
  },
};
