import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState } from "react"

const APP_KEY = "@RankingVolei:"

interface UseStorageReturnValue<T> {
  loading: boolean
  store: (value: T, key: string) => void
  get: (key: string) => Promise<T | null>
}

interface UseStorageProps {
  onCompleteStore?: () => void
}

export function useStorage<T>(
  props?: UseStorageProps
): UseStorageReturnValue<T> {
  const [loading, setLoading] = useState<boolean>(false)

  const store = (value: T, key: string) => {
    setLoading(true)
    AsyncStorage.setItem(APP_KEY + key, JSON.stringify(value))
      .catch(console.error)
      .then(() => {
        setLoading(false)
        props?.onCompleteStore?.()
      })
  }

  const get = async (key: string): Promise<T | null> => {
    const value = await AsyncStorage.getItem(APP_KEY + key)
    if (value) {
      return JSON.parse(value)
    }

    return null
  }

  return { store, get, loading }
}
