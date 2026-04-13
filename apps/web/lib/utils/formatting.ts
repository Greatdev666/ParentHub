export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 250));
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
