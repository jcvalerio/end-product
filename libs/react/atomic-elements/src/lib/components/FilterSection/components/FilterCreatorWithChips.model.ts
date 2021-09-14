import { FiltersAddedState } from '../FilterSection.model';
export interface ChipsGroupByCategoryProps {
  filters: FiltersAddedState;
  getTagProps: ({ index }: TagProps) => void;
  removeCategory: (category: string) => void;
  removeValue: (category: string, name: number | string, operator: string) => void;
}
interface TagProps {
  index: number;
}
