import { useEffect, useReducer, useState } from "react";
import {
  initialMarket,
  marketReducer,
  restoreMarket,
  SESSION_KEY,
} from "../../utils/marketEngine";
export function useMarketSession(storageKey = SESSION_KEY) {
  const [state, dispatch] = useReducer(marketReducer, undefined, initialMarket),
    [ready, setReady] = useState(false),
    [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) dispatch({ type: "load", state: restoreMarket(raw, true) });
    } catch {
      setStorageError(true);
    }
    setReady(true);
  }, [storageKey]);
  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
      } catch {
        setStorageError(true);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [state, ready, storageKey]);
  const flush = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      setStorageError(true);
    }
  };
  return { state, dispatch, ready, storageError, flush };
}
