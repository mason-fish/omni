import { useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebouncedEffect(fn: Function, ms: number, deps: any) {
  const t = useRef(0);

  useEffect(() => {
    clearTimeout(t.current);
    t.current = setTimeout(fn, ms);
  }, deps);

  useEffect(() => {
    return () => clearTimeout(t.current);
  }, []);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
