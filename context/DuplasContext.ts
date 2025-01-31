import { Dupla } from "@/model/dupla";
import { createContext } from "react";

interface DuplasContext {
  duplasAtuais: Dupla[];
  historicoDuplas: Dupla[];
  duplasPossiveis: Dupla[];
  definirDuplasAtuais: (duplas: Dupla[]) => void;
  adicionarDuplasHistorico: (duplas: Dupla[]) => void;
}

export const DuplasContext = createContext<DuplasContext>({
  duplasAtuais: [],
  historicoDuplas: [],
  duplasPossiveis: [],
  definirDuplasAtuais: () => null,
  adicionarDuplasHistorico: () => null,
});
