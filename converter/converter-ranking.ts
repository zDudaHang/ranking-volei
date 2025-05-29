import { Participante } from "@/model/participante";
import { Ranking } from "@/model/ranking";
import { asDdMmYyyyWithWeekDay, asHourAndMinutes } from "@/util/date-format";
import {
  ParticipanteFormModel,
  RankingFormModel,
} from "@/validator/criar-ranking/validator";

export function convertParticipanteFormModelToParticipante(
  participantes: ParticipanteFormModel[]
): Participante[] {
  return participantes.map(
    (form) => new Participante(form.nome, form.tipoParticipante, form.pontuacao)
  );
}
