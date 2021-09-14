import { useSelector } from 'react-redux';

interface RootState {
  [key: string]: Record<string, unknown>;
}

export function useKleeenContext<T extends unknown>(key: string): T {
  const partialState = useSelector((state: RootState): T => state[key] as T);

  return partialState;
}
