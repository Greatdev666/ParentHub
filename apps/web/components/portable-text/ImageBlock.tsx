import { urlForImage } from "@/lib/sanity/image";
export function ImageBlock({ image }: { image: any }) {
  return (
    <figure className="my-8">
      <img src={urlForImage(image).width(900).url()} alt={image.alt || ""} className="w-full rounded-xl" loading="lazy" />
      {image.caption && <figcaption className="mt-2 text-center text-sm text-brand-navy/50 dark:text-gray-400 transition-colors">{image.caption}</figcaption>}
    </figure>
  );
}
