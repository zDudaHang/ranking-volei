import { Ranking } from "@/model/ranking";
import { asDdMmYyyyWithWeekDay, asHourAndMinutes } from "@/util/date-format";
import { RankingFormModel } from "@/validator/criar-ranking/validator";

export function convertToFormModel(ranking: Ranking): RankingFormModel | null {
  const turma = ranking.getTurma();
  if (turma.dia && turma.horario) {
    return {
      diaSemana: asDdMmYyyyWithWeekDay(turma.dia),
      horario: asHourAndMinutes(turma.horario),
      participantes: ranking.getParticipantes().map((p) => ({
        nome: p.getNome(),
        pontuacao: p.getPontuacao(),
        tipo: p.getTipo(),
      })),
    };
  }
  return null;
}
