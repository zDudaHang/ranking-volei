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

  alunos.forEach((aluno, index, array) => {
    const alunosRestantes = array.slice(index + 1);
    const duplasComOutroAlunos: Dupla[] = alunosRestantes.map(
      (outroAluno) => new Dupla(aluno, outroAluno)
    );
    duplas.push(...duplasComOutroAlunos);
  });

  return duplas;
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
