import { useCallback, useRef, useState } from 'react';

/** Invalid or inaccessible storage is never overwritten automatically. */
export function useToolStorage<T>(key: string, fallback: T, validate: (value: unknown) => value is T) {
  const [loaded] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return { value: fallback, error: '', raw: null };
      const envelope = JSON.parse(raw);
      if (envelope.version !== 1 || !validate(envelope.value)) throw new Error('invalid');
      return { value: envelope.value as T, error: '', raw };
    } catch {
      return { value: fallback, error: 'Saved data could not be read. It has not been overwritten. Export a backup before resetting this browser’s data.', raw: null };
    }
  });
  const [value, setValue] = useState<T>(loaded.value);
  const [error, setError] = useState(loaded.error);
  const lastRaw = useRef(loaded.raw);
  const save = useCallback((next: T): boolean => {
    if (loaded.error) return false;
    try {
      if (localStorage.getItem(key) !== lastRaw.current) {
        setError('Saved data changed in another tab. Export your current work, then reload to use the latest copy. No stored data was overwritten.');
        setValue(next);
        return false;
      }
      const serialized = JSON.stringify({ version: 1, value: next });
      localStorage.setItem(key, serialized);
      lastRaw.current = serialized;
      setValue(next);
      setError('');
      return true;
    } catch {
      setError('This browser could not save your changes. Keep this page open and export a backup before leaving.');
      setValue(next);
      return false;
    }
  }, [key, loaded.error]);
  return { value, save, error, unreadable: Boolean(loaded.error) };
}

export const isBooleanRecord = (value: unknown): value is Record<string, boolean> => Boolean(value) && typeof value === 'object' && !Array.isArray(value) && Object.values(value).every(v => typeof v === 'boolean');

export function downloadJson(name: string, data: unknown) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
  const a = document.createElement('a');
  a.href = url; a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
