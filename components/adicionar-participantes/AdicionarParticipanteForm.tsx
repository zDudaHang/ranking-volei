import { Input } from "@rneui/base";
import { useRef, useState } from "react";
import { TextInput } from "react-native";
import { ThemedInput } from "../common/ThemedInput";
import { ThemedText } from "../common/ThemedText";
import { ThemedView } from "../common/ThemedView";
import { ThemedCheckbox } from "../common/ThemedCheckBox";
import { TipoParticipante } from "@/model/participante";
import { ThemedButton } from "../common/ThemedButton";
import { Validation } from "@/validator/model-errorObject";
import { ErrorMessage, ROOT_ERROR } from "../error/ErrorMessage";
import { ParticipanteFormModel } from "@/model/form/model-adicionarParticipante";
import { validateAdicionarParticipante } from "@/validator/validator-adicionarParticipantes";
import { ParticipantesView } from "./ParticipantesView";

interface AdicionarParticipanteFormProps {
  participantes: ParticipanteFormModel[];
  participantesErrors: Validation<ParticipanteFormModel[]> | null;
  adicionar: (nome: string, tipoParticipante: TipoParticipante) => void;
  remover: (index: number) => void;
}

export interface AdicionarParticipanteForm {
  nome: string | undefined;
  tipoParticipante: TipoParticipante;
}

export function AdicionarParticipanteForm(
  props: AdicionarParticipanteFormProps
) {
  const { participantes, participantesErrors, adicionar, remover } = props;

  const [nome, setNome] = useState<string | undefined>();
  const [tipoParticipante, setTipoParticipante] = useState<TipoParticipante>(
    TipoParticipante.ALUNO
  );
  const [errors, setErrors] =
    useState<Validation<AdicionarParticipanteForm> | null>(null);

  const nomeRef = useRef<Input & TextInput>(null);

  const handleChangeNome = (nome: string) => {
    setNome(nome);
  };

  const handleAdicionar = () => {
    const errors = validateAdicionarParticipante(
      { nome, tipoParticipante },
      participantes
    );
    if (errors.isValid()) {
      if (nome) {
        adicionar(nome, tipoParticipante);
        nomeRef.current?.clear();
        setNome(undefined);
        setErrors(null);
      }
    } else {
      setErrors(errors);
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
        errorMessage={errors?.getErrors()["nome"]}
        clearable
        onClear={() => setNome(undefined)}
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
        Participantes adicionados
      </ThemedText>

      {participantesErrors && (
        <ErrorMessage errors={participantesErrors} name={ROOT_ERROR} />
      )}

      {!hasParticipantes && (
        <ThemedText type="secondary">Nenhum participante adicionado</ThemedText>
      )}

      <ParticipantesView participantes={participantes} onPress={remover} />
    </>
  );
}
