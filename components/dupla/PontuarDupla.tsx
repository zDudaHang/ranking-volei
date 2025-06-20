import { InputRef } from "@/model/common";
import { Fragment, forwardRef } from "react";
import { ThemedInput, ThemedInputProps } from "../common/ThemedInput";
import { ThemedText } from "../common/ThemedText";
import { Dupla } from "@/model/dupla";

interface PontuarDuplaProps extends Pick<ThemedInputProps, "errorMessage"> {
  dupla: Dupla;
  index: number;
  pontuacao: string | undefined;
  onChangePontuacao: (uuid: string, pontuacao: string) => void;
  onSubmitEditing: (index: number) => void;
  onClearPontuacao: (uuid: string) => void;
}

export const PontuarDupla = forwardRef<InputRef, PontuarDuplaProps>(
  (props, ref) => {
    const {
      dupla,
      index,
      pontuacao,
      errorMessage,
      onChangePontuacao,
      onSubmitEditing,
      onClearPontuacao,
    } = props;

    if (!dupla) {
      return null;
    }

    const handleSubmitPontuacao = () => onSubmitEditing(index);

    const handleChangePontuacao = (pontuacao: string) =>
      onChangePontuacao(dupla.getUuid(), pontuacao);

    const handleClear = () => onClearPontuacao(dupla.getUuid());

    return (
      <Fragment>
        <ThemedText type="subtitle">{dupla.getNomes()}</ThemedText>
        <ThemedInput
          ref={ref}
          label="Pontuação"
          placeholder="Exemplo: 8"
          value={pontuacao}
          keyboardType="decimal-pad"
          onChangeText={handleChangePontuacao}
          onSubmitEditing={handleSubmitPontuacao}
          returnKeyType="next"
          errorMessage={errorMessage}
          clearable
          onClear={handleClear}
        />
      </Fragment>
    );
  }
);
