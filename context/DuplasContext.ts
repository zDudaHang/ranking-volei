import { Dupla } from "@/model/duplas";
import { createContext } from "react";

interface DuplasContext {
  duplasAtuais: Dupla[];
  historicoDuplas: Dupla[];
  definirDuplasAtuais: (duplas: Dupla[]) => void;
  adicionarDuplasHistorico: (duplas: Dupla[]) => void;
}

export const DuplasContext = createContext<DuplasContext>({
  duplasAtuais: [],
  historicoDuplas: [],
  definirDuplasAtuais: () => null,
  adicionarDuplasHistorico: () => null,
});
