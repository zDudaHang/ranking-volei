import { AdicionarCommon } from "./AdicionarCommon";

interface AdicionarProfessoresProps {
  professores: string[];
  adicionarProfessor: (nome: string) => void;
  removerProfessor: (index: number) => void;
}

export function AdicionarProfessores(props: AdicionarProfessoresProps) {
  const { professores, adicionarProfessor, removerProfessor } = props;

  return (
    <AdicionarCommon
      data={professores}
      adicionar={adicionarProfessor}
      remover={removerProfessor}
      isAlunos={false}
    />
  );
}
