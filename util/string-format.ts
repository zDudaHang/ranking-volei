export function toTitleCase(text: string): string {
  return text.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
}
