// Interfaces
// TODO: @cafe update this props with real types
export interface FormatProps {
  categories?: string[];
  dateTime?: DateTimeFormatOptions;
  examples?: string[];
  isNumericType?: boolean;
  key?: string;
  max?: number;
  maximumFractionDigits?: number;
  min?: number;
  prefix?: string;
  severityBad?: number;
  severityGood?: number;
  severityLevels?: number;
  suffix?: string;
  type?: string;
  valueLabels?: { [key: number]: string };
}

export interface TrendMark {
  color: string;
  marker: {
    enabled: boolean;
    radius: number;
  };
  y: number;
}

// Types
export type DateTimeFormatOptions = {
  weekday?: string;
  era?: string;
  year?: string;
  month?: string;
  day?: string;
  hour?: string;
  minute?: string;
  second?: string;
  timeZoneName?: string;
  hour12?: boolean;
  timeZone?: string;
};

export type TrendFormat = number | TrendMark;
