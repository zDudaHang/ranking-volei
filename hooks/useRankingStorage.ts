import { Ranking } from "@/model/ranking";
import {
  UseStorageProps,
  UseStorageReturnValue,
  useStorage,
} from "./useStorage";

const ACTUAL_RANKING_KEY = "ActualRaking";

interface UseRankingStorageReturnValue
  extends Pick<UseStorageReturnValue<Ranking>, "loading"> {
  store: (ranking: Ranking) => void;
  update: (novoRanking: Ranking) => void;
  get: () => Promise<Ranking | null>;
}

interface UseRankingStorageProps extends UseStorageProps {}

export function useRankingStorage(
  props?: UseRankingStorageProps
): UseRankingStorageReturnValue {
  const { loading, get, store, update } = useStorage<Ranking>(props);

  const storeRanking = (ranking: Ranking) => store(ranking, ACTUAL_RANKING_KEY);

  const getRanking = () => get(ACTUAL_RANKING_KEY);

  const updateRanking = (novoRanking: Ranking) =>
    update(novoRanking, ACTUAL_RANKING_KEY);

  return {
    loading,
    get: getRanking,
    store: storeRanking,
    update: updateRanking,
  };
}
