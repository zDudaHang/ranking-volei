import { Dupla } from "@/model/dupla";
import { Participante } from "@/model/participante";
import { partition } from "lodash";

export function gerarDuplasPossiveis(
  participantes: Participante[] | undefined
): Dupla[] {
  if (!participantes || participantes.length === 0) {
    return [];
  }

  const duplas: Dupla[] = [];

  const [professores, alunos] = partition(participantes, (p) => p.getTipo());

  professores.forEach((professor) => {
    const duplasComAlunos: Dupla[] = alunos.map(
      (aluno) => new Dupla(professor, aluno)
    );
    duplas.push(...duplasComAlunos);
  });

  const duplasEntreProfessores = gerarDuplasComOutrosParticipantes(professores);
  duplas.push(...duplasEntreProfessores);

  const duplasEntreAlunos = gerarDuplasComOutrosParticipantes(alunos);
  duplas.push(...duplasEntreAlunos);

  return duplas;
}

function gerarDuplasComOutrosParticipantes(
  participantes: Participante[]
): Dupla[] {
  const duplasComOutrosIntegrantes: Dupla[] = [];

  participantes.forEach((participante, index, array) => {
    const outrosParticipantes = array.slice(index + 1);
    const duplas = outrosParticipantes.map(
      (outroParticipante) => new Dupla(participante, outroParticipante)
    );
    duplasComOutrosIntegrantes.push(...duplas);
  });

  return duplasComOutrosIntegrantes;
}

export function hasDuplaInParticipantesRestantes(
  participantesRestantes: Participante[],
  dupla: Dupla
): boolean {
  if (!dupla) {
    return false;
  }

  const [primeiroParticipante, segundoParticipante] = dupla.getParticipantes();

  return (
    participantesRestantes.includes(primeiroParticipante) &&
    participantesRestantes.includes(segundoParticipante)
  );
}
