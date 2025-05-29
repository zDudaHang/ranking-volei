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

  public getPontuacao(): number {
    return this.pontuacao;
  }

  public getNomes(): string {
    return `${this.primeiroParticipante?.getNome()} e ${this.segundoParticipante?.getNome()}`;
  }

  public getTiposParticipantes(): string {
    const primeiroTipoParticipante = this.primeiroParticipante.getTipo();
    const segundoTipoParticipante = this.segundoParticipante.getTipo();

    const isPrimeiroParticipanteProfessor =
      primeiroTipoParticipante === TipoParticipante.PROFESSOR;
    const isSegundoParticipanteProfessor =
      segundoTipoParticipante === TipoParticipante.PROFESSOR;

    if (isPrimeiroParticipanteProfessor && isSegundoParticipanteProfessor) {
      return "Professores";
    } else if (isPrimeiroParticipanteProfessor) {
      return "Professor(a) e Aluno(a)";
    } else if (isSegundoParticipanteProfessor) {
      return "Aluno(a) e Professor(a)";
    } else {
      return "Alunos";
    }
  }

  public contains(participante: Participante): boolean {
    return (
      this.primeiroParticipante.equals(participante) ||
      this.segundoParticipante.equals(participante)
    );
  }

  public containsPeloMenosUmParticipante(outraDupla: Dupla): boolean {
    const [primeiroParticipante, segundoParticipante] =
      outraDupla.getParticipantes();
    return (
      this.contains(primeiroParticipante) || this.contains(segundoParticipante)
    );
  }
}
