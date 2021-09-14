import { performance } from 'perf_hooks';

export function dateTimeDifference(startTime: number, endTime: number = performance.now()): number {
  return endTime - startTime;
}
