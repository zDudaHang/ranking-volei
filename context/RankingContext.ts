import { Ranking } from "@/model/ranking";
import { createContext } from "react";

interface RankingContext {
  ranking: Ranking | null;
  adicionarAlunos: (alunos: string[]) => void;
  adicionarProfessores: (professores: string[]) => void;
  adicionarTurma: (horario: string, diaSemana: string) => void;
}

export const RankingContext = createContext<RankingContext>({
  ranking: null,
  adicionarAlunos: () => null,
  adicionarProfessores: () => null,
  adicionarTurma: () => null,
});