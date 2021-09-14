import { ReactElement } from '@kleeen/types';

type SectionComponentType = { endSeparator?: boolean; component: ReactElement; flexNumber?: number };

export interface SectionType {
  flexNumber?: number;
  sections: SectionComponentType[];
}

export interface KsSubNavProps {
  startSection?: SectionType;
  endSection?: SectionType;
  centerSection?: SectionType;
}
