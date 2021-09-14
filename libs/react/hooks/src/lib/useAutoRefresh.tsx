import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

const autoRefreshSource = new Subject<string | string[]>();
const autoRefresh$ = autoRefreshSource.asObservable();

export function useAutoRefresh(): {
  autoRefreshSource: Subject<string | string[]>;
  autoRefresh$: Observable<string | string[]>;
} {
  return { autoRefreshSource, autoRefresh$ };
}
