export function primaryTopic(value: string): string {
  return value.replace(/\s*\|\s*(?:LearnSMC|ICT\s*&\s*SMC Academy).*$/i, '')
    .replace(/^(?:Chapter|LEC)\s*\d+\s*:\s*/i, '')
    .replace(/\s+[—–]\s+(?:Institutional )?(?:Glossary|Knowledge Graph|Chart Lab|ICT Masterclass Hub|LearnSMC).*$/i, '')
    .replace(/\s+/g, ' ').trim();
}

export function conciseHeading(value: string): string {
  const clean = primaryTopic(value);
  const topic = clean.split(/\s+[—–]\s+/)[0];
  return topic.length >= 12 ? topic : clean;
}
