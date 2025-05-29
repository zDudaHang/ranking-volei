import { Input } from "@rneui/base";
import { useRef, useState } from "react";
import { TextInput } from "react-native";
import { ParticipanteRemovivel } from "../common/ParticipanteRemovivel";
import { ThemedInput } from "../common/ThemedInput";
import { ThemedText } from "../common/ThemedText";
import { ThemedView } from "../common/ThemedView";
import { ThemedCheckbox } from "../common/ThemedCheckBox";
import { Participante, TipoParticipante } from "@/model/participante";
import { ThemedButton } from "../common/ThemedButton";

interface AdicionarParticipanteFormProps {
  participantes: Participante[];
  adicionar: (nome: string, tipoParticipante: TipoParticipante) => void;
  remover: (index: number) => void;
}

export function AdicionarParticipanteForm(
  props: AdicionarParticipanteFormProps
) {
  const { participantes, adicionar, remover } = props;

  const [nome, setNome] = useState<string | undefined>();
  const [tipoParticipante, setTipoParticipante] = useState<TipoParticipante>(
    TipoParticipante.ALUNO
  );

  const nomeRef = useRef<Input & TextInput>(null);

  const handleChangeNome = (nome: string) => {
    setNome(nome);
  };

  const handleAdicionar = () => {
    if (nome) {
      adicionar(nome, tipoParticipante);
      nomeRef.current?.clear();
    }
  };

  const handlePressAluno = () => {
    if (tipoParticipante === TipoParticipante.PROFESSOR) {
      setTipoParticipante(TipoParticipante.ALUNO);
    }
  };

  const handlePressProfessor = () => {
    if (tipoParticipante === TipoParticipante.ALUNO) {
      setTipoParticipante(TipoParticipante.PROFESSOR);
    }
  };

  const hasParticipantes = participantes.length > 0;

  return (
    <>
      <ThemedInput
        ref={nomeRef}
        label="Nome do participante"
        placeholder="Exemplo: João"
        value={nome}
        onChangeText={handleChangeNome}
        onSubmitEditing={handleAdicionar}
        returnKeyType="next"
        blurOnSubmit={false}
        required
      />

      <ThemedView
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ThemedCheckbox
          title="Aluno"
          checked={tipoParticipante === TipoParticipante.ALUNO}
          onPress={handlePressAluno}
        />
        <ThemedCheckbox
          title="Professor"
          checked={tipoParticipante === TipoParticipante.PROFESSOR}
          onPress={handlePressProfessor}
        />
      </ThemedView>

      <ThemedButton size="lg" icon={{ name: "add" }} onPress={handleAdicionar}>
        Adicionar
      </ThemedButton>

      <ThemedText type="subtitle" style={{ marginTop: 16, marginBottom: 8 }}>
        Participantes adicionados ({participantes.length})
      </ThemedText>

      {!hasParticipantes && (
        <ThemedText type="secondary">Nenhum participante adicionado</ThemedText>
      )}

      {participantes.map((participante, index) => (
        <ParticipanteRemovivel
          key={`participante-${index}`}
          participante={participante}
          index={index}
          onPress={remover}
        />
      ))}
    </>
  );
}
