import { isNilOrEmpty } from '@kleeen/common/utils';

export const SDT_SEPARATOR = '-';

export function sdtMatchesRule({ sdt, rule }: { sdt: string; rule: string }): boolean {
  return Boolean(sdt) && sdt.includes(rule);
}

export function sdtSpecificity(sdt: string): number {
  return sdt.split(SDT_SEPARATOR).length;
}

export function bestSdtSpecificityMatch({
  sdt,
  candidates,
}: {
  sdt: string;
  candidates: string[];
}): string | undefined {
  const matches = candidates.filter((candidate) => sdtMatchesRule({ rule: candidate, sdt }));
  if (isNilOrEmpty(matches)) {
    return;
  }

  const bestMatches = matches
    .map((match) => ({
      match,
      specificity: sdtSpecificity(match),
    }))
    .sort((a, b) => b.specificity - a.specificity);
  return bestMatches[0].match;
}

export function resolveBestSdtMatch<T>({
  object,
  sdt,
  defaultMatch,
}: {
  object: Record<string, T>;
  sdt: string;
  defaultMatch: T;
}): T {
  const keys = Object.keys(object);
  const bestMatch = bestSdtSpecificityMatch({ sdt, candidates: keys });
  if (!bestMatch) {
    return defaultMatch;
  }
  return object[bestMatch];
}
