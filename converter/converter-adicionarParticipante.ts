import { ParticipanteFormModel } from "@/model/form/model-adicionarParticipante";
import { Participante } from "@/model/participante";

export function convertParticipanteFormModelToParticipante(
  participantes: ParticipanteFormModel[]
): Participante[] {
  return participantes.map(
    (form) => new Participante(form.nome, form.tipoParticipante, form.pontuacao)
  );
}
