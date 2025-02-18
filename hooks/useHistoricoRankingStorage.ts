import { Ranking } from "@/model/ranking";
import { format } from "date-fns";
import {
  UseStorageProps,
  UseStorageReturnValue,
  useStorage,
} from "./useStorage";

const HISTORICO_KEY_SUFFIX = "HISTORY-";

const DAY_KEY_PATTERN = "ddMMyyyy";

const generateKey = (dia: Date): string =>
  HISTORICO_KEY_SUFFIX + format(dia, DAY_KEY_PATTERN);

interface UseHistoricoRankingStorageReturnValue
  extends Pick<UseStorageReturnValue<Ranking[]>, "loading"> {
  store: (ranking: Ranking) => void;
  get: (dia: Date) => Promise<Ranking[] | null>;
}

interface UseHistoricoRankingStorageProps extends UseStorageProps {}

export function useHistoricoRankingStorage(
  props?: UseHistoricoRankingStorageProps
): UseHistoricoRankingStorageReturnValue {
  const { loading, get, store } = useStorage<Ranking[]>(props);

  const storeRanking = (ranking: Ranking) => {
    const dia = ranking.getTurma().dia;

    if (dia) {
      const key = generateKey(dia);
      get(key)
        .catch(console.error)
        .then((historicoAtual) => {
          console.log("Histórico atual: ", historicoAtual);
          if (historicoAtual) {
            console.log("Já existe um histórico");
            historicoAtual.push(ranking);
            store(historicoAtual, key);
          } else {
            console.log("Não existe um histórico");
            const historico: Ranking[] = [];
            historico.push(ranking);
            console.log(historico);
            store(historico, key);
          }
        });
    }
  };

  const getRanking = (dia: Date) => {
    const key = generateKey(dia);
    return get(key);
  };

  return {
    loading,
    get: getRanking,
    store: storeRanking,
  };
}
