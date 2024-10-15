import AsyncStorage from "@react-native-async-storage/async-storage";

const APP_KEY = "@RankingVolei:";

interface UseStorageReturnValue<T> {
  store: (value: T, key: string) => void;
  get: (key: string) => Promise<T | null>;
}

export function useStorage<T>(): UseStorageReturnValue<T> {
  const store = (value: T, key: string) => {
    AsyncStorage.setItem(APP_KEY + key, JSON.stringify(value))
      .catch(console.error)
      .then(() => console.log("Sucesso!"));
  };

  const get = async (key: string): Promise<T | null> => {
    const value = await AsyncStorage.getItem(APP_KEY + key);
    if (value) {
      console.log(value);
      return JSON.parse(value);
    }

    return null;
  };

  return { store, get };
}
