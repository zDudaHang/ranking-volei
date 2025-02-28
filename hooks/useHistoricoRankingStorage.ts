import { Ranking } from "@/model/ranking";
import { format } from "date-fns";
import {
  UseStorageProps,
  UseStorageReturnValue,
  useStorage,
} from "./useStorage";
import { plainToInstance } from "class-transformer";

const HISTORICO_KEY_SUFFIX = "HISTORY-";

const DAY_KEY_PATTERN = "ddMMyyyy";

const generateKey = (dia: Date): string =>
  HISTORICO_KEY_SUFFIX + format(dia, DAY_KEY_PATTERN);

interface UseHistoricoRankingStorageReturnValue
  extends Pick<UseStorageReturnValue<Ranking[]>, "loading"> {
  store: (ranking: Ranking) => void;
  get: (dia: Date) => Promise<Ranking[] | null>;
  clear: () => void;
}

interface UseHistoricoRankingStorageProps extends UseStorageProps {}

export function useHistoricoRankingStorage(
  props?: UseHistoricoRankingStorageProps
): UseHistoricoRankingStorageReturnValue {
  const { loading, get, store, clear } = useStorage<Ranking[]>(props);

  const storeRanking = (ranking: Ranking) => {
    const dia = ranking.getTurma().dia;

    if (dia) {
      const key = generateKey(dia);
      get(key)
        .catch(console.error)
        .then((historicoAtual) => {
          if (historicoAtual) {
            const historico: Ranking[] = [...historicoAtual];
            historico.push(ranking);
            store(historico, key);
          } else {
            const historico: Ranking[] = [];
            historico.push(ranking);
            store(historico, key);
          }
        });
    }
  };

  const getRanking = async (dia: Date): Promise<Ranking[] | null> => {
    const key = generateKey(dia);
    const historico = await get(key);
    if (historico) {
      return plainToInstance(Ranking, historico);
    }
    return null;
  };

  return {
    loading,
    get: getRanking,
    store: storeRanking,
    clear,
  };
}
