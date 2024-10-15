import { AdicionarCommon } from "./AdicionarCommon";

interface AdicionarAlunosProps {
  alunos: string[];
  adicionarAluno: (nome: string) => void;
  removerAluno: (index: number) => void;
}

export function AdicionarAlunos(props: AdicionarAlunosProps) {
  const { alunos, adicionarAluno, removerAluno } = props;

  return (
    <AdicionarCommon
      data={alunos}
      adicionar={adicionarAluno}
      remover={removerAluno}
      isAlunos
    />
  );
}
