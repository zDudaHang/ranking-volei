import { Participante, TipoParticipante } from "./participante";

export class Dupla {
  private primeiroParticipante: Participante;
  private segundoParticipante: Participante;
  private pontuacao: number;

  public constructor(
    primeiroParticipante: Participante,
    segundoParticipante: Participante
  ) {
    this.primeiroParticipante = primeiroParticipante;
    this.segundoParticipante = segundoParticipante;
    this.pontuacao = 0;
  }

  public setPrimeiroParticipante(participante: Participante): void {
    this.primeiroParticipante = participante;
  }

  public setSegundoParticipante(participante: Participante): void {
    this.segundoParticipante = participante;
  }

  public setPontuacao(prontuacao: number): void {
    this.pontuacao = prontuacao;
  }

  public equals(other: Dupla): boolean {
    return (
      this.primeiroParticipante === other.primeiroParticipante &&
      this.segundoParticipante === other.segundoParticipante
    );
  }

  public getParticipantes(): [Participante, Participante] {
    return [this.primeiroParticipante, this.segundoParticipante];
  }

  public toString(): string {
    return `${this.primeiroParticipante?.getNome()} e ${this.segundoParticipante?.getNome()}`;
  }

  public isDoisProfessores(): boolean {
    return (
      this.primeiroParticipante.getTipo() === TipoParticipante.PROFESSOR &&
      this.segundoParticipante.getTipo() === TipoParticipante.PROFESSOR
    );
  }
}
