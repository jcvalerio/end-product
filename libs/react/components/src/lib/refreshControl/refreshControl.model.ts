export interface RefreshControlProps {
  onRefresh: () => void;
  translate?: (value: string) => string;
  taskName?: string;
}
