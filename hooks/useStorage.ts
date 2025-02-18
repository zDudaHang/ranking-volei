import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const APP_KEY = "@RankingVolei:";

export interface UseStorageReturnValue<T> {
  loading: boolean;
  store: (value: T, key: string) => void;
  update: (newValue: T, key: string) => void;
  get: (key: string) => Promise<T | null>;
}

export interface UseStorageProps {
  onCompleteStore?: () => void;
  onCompleteUpdate?: () => void;
}

export function useStorage<T>(
  props?: UseStorageProps
): UseStorageReturnValue<T> {
  const [loading, setLoading] = useState<boolean>(false);

  const store = (value: T, key: string) => {
    setLoading(true);
    AsyncStorage.setItem(APP_KEY + key, JSON.stringify(value))
      .catch(console.error)
      .then(() => {
        setLoading(false);
        props?.onCompleteStore?.();
      });
  };

  const get = async (key: string): Promise<T | null> => {
    const value = await AsyncStorage.getItem(APP_KEY + key);
    if (value) {
      return JSON.parse(value) as T;
    }

    return null;
  };

  const update = (newValue: T, key: string) => {
    setLoading(true);
    AsyncStorage.mergeItem(APP_KEY + key, JSON.stringify(newValue))
      .catch(console.error)
      .then(() => {
        setLoading(false);
        props?.onCompleteUpdate?.();
      });
  };

  return { store, get, loading, update };
}
