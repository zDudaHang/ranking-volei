import AsyncStorage from "@react-native-async-storage/async-storage";
import { plainToInstance } from "class-transformer";
import { useState } from "react";

const APP_KEY = "@RankingVolei:";

export interface UseStorageReturnValue<T> {
  loading: boolean;
  store: (value: T, key: string) => void;
  update: (newValue: T, key: string) => void;
  get: (key: string) => Promise<any | null>;
  clear: () => void;
}

export interface UseStorageProps {
  onCompleteStore?: () => void;
  onCompleteUpdate?: () => void;
}

export function useStorage<T>(
  props?: UseStorageProps
): UseStorageReturnValue<T> {
  const [loading, setLoading] = useState<boolean>(false);

  const store = async (value: T, key: string) => {
    setLoading(true);
    const json = JSON.stringify(value);
    AsyncStorage.setItem(APP_KEY + key, json)
      .catch(console.error)
      .then(async () => {
        props?.onCompleteStore?.();
        setLoading(false);
      });
  };

  const get = async (key: string): Promise<any | null> => {
    setLoading(true);
    const value = await AsyncStorage.getItem(APP_KEY + key);

    if (value) {
      const parsed = JSON.parse(value);
      setLoading(false);
      return parsed;
    }
    setLoading(false);
    return null;
  };

  const update = (newValue: T, key: string) => {
    setLoading(true);
    AsyncStorage.mergeItem(APP_KEY + key, JSON.stringify(newValue))
      .catch(console.error)
      .then(() => {
        props?.onCompleteUpdate?.();
        setLoading(false);
      });
  };

  const clear = () => {
    setLoading(true);
    AsyncStorage.clear()
      .catch(console.error)
      .then(() => {
        setLoading(false);
      });
  };

  return { store, get, loading, update, clear };
}
