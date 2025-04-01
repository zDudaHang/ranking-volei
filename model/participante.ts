export enum TipoParticipante {
  ALUNO,
  PROFESSOR,
}

export class Participante {
  private nome: string;
  private tipo: TipoParticipante;
  private pontuacao: number;

  public constructor(nome: string, tipo: TipoParticipante, pontuacao?: number) {
    this.nome = nome;
    this.tipo = tipo;
    this.pontuacao = pontuacao ?? 0;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public setTipo(tipo: TipoParticipante): void {
    this.tipo = tipo;
  }

  public setPontuacao(pontuacao: number): void {
    this.pontuacao = pontuacao;
  }

  public getNome(): string {
    return this.nome;
  }

  public getTipo(): TipoParticipante {
    return this.tipo;
  }

  public getPontuacao(): number {
    return this.pontuacao;
  }

  public toString(): string {
    return `${this.nome} : ${this.pontuacao} ${
      this.pontuacao > 1 || this.pontuacao === 0 ? "pontos" : "ponto"
    }`;
  }

  public equals(other: Participante | undefined): boolean {
    return !!other && this.nome === other.nome && this.tipo === other.tipo;
  }

  public compare(other: Participante): number {
    if (this.pontuacao > other.getPontuacao()) {
      return 1;
    } else if (this.pontuacao === other.getPontuacao()) {
      return 0;
    } else {
      return -1;
    }
  }

  public isAluno(): boolean {
    return this.tipo === TipoParticipante.ALUNO;
  }

  public isProfessor(): boolean {
    return this.tipo === TipoParticipante.PROFESSOR;
  }
}
