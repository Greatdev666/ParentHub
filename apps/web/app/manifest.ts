import { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ParentHub",
    short_name: "ParentHub",
    description: "Expert parenting advice and resources",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F5F0",
    theme_color: "#00838F",
  };
}
