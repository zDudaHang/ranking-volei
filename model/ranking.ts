import { Dupla } from "./dupla";
import { Participante } from "./participante";

export interface Turma {
  dia: Date | null;
  horario: Date | null;
}

export class Ranking {
  private turma: Turma;
  private participantes: Participante[];

  public constructor(turma: Turma, participantes: Participante[]) {
    this.turma = turma;
    this.participantes = participantes;
  }

  public getParticipantes(): Participante[] {
    return this.participantes;
  }

  public getTurma(): Turma {
    return this.turma;
  }

  public adicionarParticipantes(novosParticipantes: Participante[]): void {
    this.participantes.push(...novosParticipantes);
  }

  public setTurma(turma: Turma): void {
    this.turma = turma;
  }

  public calcularPontuacoes(duplas: Dupla[]): void {
    const pontuacoesPorParticipante = new Map<Participante, number>();

    this.participantes.forEach((participante) =>
      pontuacoesPorParticipante.set(participante, participante.getPontuacao())
    );

    duplas.forEach((dupla) => {
      const [primeiroParticipante, segundoParticipante] =
        dupla.getParticipantes();

      const pontuacao = dupla.getPontuacao();

      const pontuacaoAtualPrimeiroParticipante =
        pontuacoesPorParticipante.get(primeiroParticipante) ?? 0;

      pontuacoesPorParticipante.set(
        primeiroParticipante,
        pontuacaoAtualPrimeiroParticipante + pontuacao
      );

      const pontuacaoAtualSegundoParticipante =
        pontuacoesPorParticipante.get(segundoParticipante) ?? 0;

      pontuacoesPorParticipante.set(
        segundoParticipante,
        pontuacaoAtualSegundoParticipante + pontuacao
      );
    });

    pontuacoesPorParticipante.forEach((pontuacaoFinal, participante) => {
      this.participantes
        .find((p) => p.equals(participante))
        ?.setPontuacao(pontuacaoFinal);
    });

    this.participantes.forEach((participante) => {
      const pontuacaoFinal = pontuacoesPorParticipante.get(participante) ?? 0;
      participante.setPontuacao(pontuacaoFinal);
    });
  }
}
