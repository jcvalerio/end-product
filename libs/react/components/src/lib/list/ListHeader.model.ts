import { Attribute } from '@kleeen/types';

export interface ListHeaderProps {
  columns: Attribute[];
  setSearchTerm: (searchTerm: string) => void;
  setSearchKey: (setSearchKey: string) => void;
}
