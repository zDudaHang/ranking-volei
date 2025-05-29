import { Participante } from "@/model/participante";
import { Ranking } from "@/model/ranking";
import { createContext } from "react";

interface RankingContext {
  ranking: Ranking | null;
  adicionarParticipantes: (participantes: Participante[]) => void;
  adicionarTurma: (horario: Date, dia: Date) => void;
  limparRankingAtual: () => void;
}

export const RankingContext = createContext<RankingContext>({
  ranking: null,
  adicionarParticipantes: () => null,
  adicionarTurma: () => null,
  limparRankingAtual: () => null,
});
