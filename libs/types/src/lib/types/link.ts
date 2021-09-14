import { Location } from 'history';

export interface Link {
  slug: string;
  title: string;
  entityType?: string;
  customUrlResolver?: (paramName: string, slug: string, id: string | number, location?: Location) => string;
}
