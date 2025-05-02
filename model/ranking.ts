import { Expose, Type } from "class-transformer";
import { Dupla } from "./dupla";
import { Participante } from "./participante";
import "reflect-metadata";
import uuid from "react-native-uuid";

export interface Turma {
  dia: Date | null;
  horario: Date | null;
}

export class Ranking {
  private turma: Turma;
  private uuid: string;

  @Type(() => Participante)
  private participantes: Participante[];

  public constructor(turma: Turma, participantes: Participante[]) {
    this.turma = turma;
    this.participantes = participantes;
    this.uuid = uuid.v4();
  }

  @Expose()
  public getParticipantes(): Participante[] {
    return this.participantes;
  }

  @Expose()
  public getTurma(): Turma {
    return this.turma;
  }

  @Expose()
  public getUuid(): string {
    return this.uuid;
  }

  private hasParticipante(participante: Participante): boolean {
    return (
      this.participantes.findIndex((participanteAtual) =>
        participante.equals(participanteAtual)
      ) !== -1
    );
  }

  public adicionarParticipantes(participantes: Participante[]): void {
    const novosParticipantes = participantes.filter(
      (p) => !this.hasParticipante(p)
    );
    this.participantes.push(...novosParticipantes);
  }

  @Expose()
  public setTurma(turma: Turma): void {
    this.turma = turma;
  }

  @Expose()
  public setParticipantes(participantes: Participante[]): void {
    this.participantes = participantes;
  }

  @Expose()
  public setUuid(uuid: string): void {
    this.uuid = uuid;
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
