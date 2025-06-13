import { Ranking } from "@/model/ranking";
import { format } from "date-fns";
import {
  UseStorageProps,
  UseStorageReturnValue,
  useStorage,
} from "./useStorage";
import { plainToInstance } from "class-transformer";
import { remove } from "lodash";
import { useState } from "react";

const HISTORICO_KEY_SUFFIX = "HISTORY-";

const DAY_KEY_PATTERN = "ddMMyyyy";

const generateKey = (dia: Date): string =>
  HISTORICO_KEY_SUFFIX + format(dia, DAY_KEY_PATTERN);

interface UseHistoricoRankingStorageReturnValue
  extends Pick<UseStorageReturnValue<Ranking[]>, "loading"> {
  store: (ranking: Ranking) => void;
  get: (dia: Date) => Promise<Ranking[] | null>;
  remove: (dia: Date, uuids: string[]) => Promise<Ranking[] | null>;
}

interface UseHistoricoRankingStorageProps extends UseStorageProps {}

export function useHistoricoRankingStorage(
  props?: UseHistoricoRankingStorageProps
): UseHistoricoRankingStorageReturnValue {
  const { get, store } = useStorage<Ranking[]>(props);

  const [loading, setLoading] = useState<boolean>(false);

  const storeRanking = (ranking: Ranking) => {
    setLoading(true);
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
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const getRanking = async (dia: Date): Promise<Ranking[] | null> => {
    setLoading(true);

    const key = generateKey(dia);
    const historico = await get(key);

    if (historico) {
      const ranking = plainToInstance(Ranking, historico);
      setLoading(false);
      return ranking;
    }

    setLoading(false);
    return null;
  };

  const removeRankings = async (dia: Date, uuids: string[]) => {
    setLoading(true);
    const historico = await getRanking(dia);
    let newHistorico = historico;
    if (historico) {
      newHistorico = historico.filter(
        (ranking) => !uuids.includes(ranking.getUuid())
      );
      const key = generateKey(dia);
      store(newHistorico, key);
    }

    setLoading(false);
    return newHistorico;
  };

  return {
    loading,
    get: getRanking,
    store: storeRanking,
    remove: removeRankings,
  };
}
