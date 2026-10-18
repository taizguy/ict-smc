/** Remove editorial Markdown markers without removing arithmetic multiplication signs. */
export function lessonText(value: string): string {
  return value.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/(^|\n)#{1,6}\s+/g, '$1');
}

export function lessonParagraphs(value: string): string[] {
  return lessonText(value).split(/\n\s*\n/).map(part => part.trim()).filter(Boolean);
}
