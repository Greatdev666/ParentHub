import { Callout } from "./Callout";
import { ImageBlock } from "./ImageBlock";
import { VideoEmbed } from "./VideoEmbed";
import { FAQBlock } from "./FAQBlock";
import { StatGrid } from "./StatGrid";
import { NumberedCardList } from "./NumberedCardList";
import { TableBlock } from "./TableBlock";
import type { PortableTextComponents } from "@portabletext/react";

export const portableTextComponents: PortableTextComponents = {
  types: {
    callout: ({ value }) => <Callout type={value.type} title={value.title} content={value.content} />,
    statGrid: ({ value }) => <StatGrid items={value.items} />,
    numberedCardList: ({ value }) => <NumberedCardList items={value.items} />,
    tableBlock: ({ value }) => <TableBlock table={value.table} />,
    imageWithAlt: ({ value }) => <ImageBlock image={value} />,
    videoEmbed: ({ value }) => <VideoEmbed url={value.url} />,
    faq: ({ value }) => <FAQBlock items={value.items} />,
  },
  marks: {
    internalLink: ({ value, children }) => <a href={`/${value?.slug}`} className="text-brand-teal underline underline-offset-2 hover:text-brand-teal/80">{children}</a>,
    link: ({ value, children }) => <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-brand-teal underline underline-offset-2">{children}</a>,
  },
};
