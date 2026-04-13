import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

export function urlForImage(source: any) {
  // Mock image chain if we are running the static demo
  if (typeof source === 'string' || !source?.asset?._ref) {
    const dummyUrl = typeof source === 'string' ? source : "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1200&auto=format&fit=crop";
    const mockBuilder = {
      width: () => mockBuilder,
      height: () => mockBuilder,
      url: () => dummyUrl
    };
    return mockBuilder;
  }

  const builder = imageUrlBuilder(client);
  return builder.image(source).auto("format").fit("max");
}
