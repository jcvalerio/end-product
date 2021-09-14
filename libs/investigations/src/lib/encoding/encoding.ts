import { InvestigationCard } from '@kleeen/types';

export function getEncodedInvestigationCard(investigationCard: InvestigationCard): string {
  return Buffer.from(JSON.stringify(investigationCard)).toString('base64');
}

export function getDecodedInvestigationCard(encodedData: string): InvestigationCard {
  const decodedData = Buffer.from(encodedData, 'base64').toString();
  return JSON.parse(decodedData) as InvestigationCard;
}
