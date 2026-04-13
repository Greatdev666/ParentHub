export function VideoEmbed({ url }: { url: string }) {
  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  const embedUrl = isYouTube ? url.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/") : url;
  return <div className="my-8 aspect-video overflow-hidden rounded-xl"><iframe src={embedUrl} className="h-full w-full" allowFullScreen loading="lazy" title="Video" /></div>;
}
