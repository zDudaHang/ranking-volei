import { Dupla } from "@/model/duplas"
import { Participante, TipoParticipante } from "@/model/ranking"
import { partition } from "lodash"

export function gerarDuplasPossiveis(
  participantes: Participante[] | undefined
): Dupla[] {
  if (!participantes || participantes.length === 0) {
    return []
  }

  const duplas: Dupla[] = []

  const [professores, alunos] = partition(participantes, (p) => p.tipo)

  professores.forEach((professor) => {
    const duplasComAlunos: Dupla[] = alunos.map((aluno) => ({
      primeiroParticipante: professor,
      segundoParticipante: aluno,
    }))
    duplas.push(...duplasComAlunos)
  })

  alunos.forEach((aluno, index, array) => {
    const alunosRestantes = array.slice(index + 1)
    const duplasComOutroAlunos: Dupla[] = alunosRestantes.map((outroAluno) => ({
      primeiroParticipante: aluno,
      segundoParticipante: outroAluno,
    }))
    duplas.push(...duplasComOutroAlunos)
  })

  return duplas
}

export function isNotDuplaProfessores(dupla: Dupla): boolean {
  if (!dupla || !dupla.primeiroParticipante || !dupla.segundoParticipante) {
    return false
  }

  return (
    dupla.primeiroParticipante?.tipo !== TipoParticipante.PROFESSOR &&
    dupla.segundoParticipante?.tipo !== TipoParticipante.PROFESSOR
  )
}

export function hasDuplaInParticipantesRestantes(
  participantesRestantes: Participante[],
  dupla: Dupla
): boolean {
  if (!dupla || !dupla.primeiroParticipante || !dupla.segundoParticipante) {
    return false
  }

  return (
    participantesRestantes.includes(dupla.primeiroParticipante) &&
    participantesRestantes.includes(dupla.segundoParticipante)
  )
}
