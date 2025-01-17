export enum TipoParticipante {
  ALUNO,
  PROFESSOR,
}

export class Participante {
  private nome: string;
  private tipo: TipoParticipante;

  public constructor(nome: string, tipo: TipoParticipante) {
    this.nome = nome;
    this.tipo = tipo;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public setTipo(tipo: TipoParticipante): void {
    this.tipo = tipo;
  }

  public getNome(): string {
    return this.nome;
  }

  public getTipo(): TipoParticipante {
    return this.tipo;
  }

  public equals(other: Participante | undefined): boolean {
    return !!other && this.nome === other.nome && this.tipo === other.tipo;
  }
}
