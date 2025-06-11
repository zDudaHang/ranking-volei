import { InputRef } from "@/model/common";
import { Fragment, forwardRef } from "react";
import { ThemedInput, ThemedInputProps } from "../common/ThemedInput";
import { ThemedText } from "../common/ThemedText";
import { Dupla } from "@/model/dupla";

interface PontuarDuplaProps extends Pick<ThemedInputProps, "errorMessage"> {
  dupla: Dupla;
  index: number;
  pontuacao: string | undefined;
  onChangePontuacao: (index: number, pontuacao: string) => void;
  onSubmitEditing: (index: number) => void;
}

export const PontuarDupla = forwardRef<InputRef, PontuarDuplaProps>(
  (props, ref) => {
    const {
      dupla,
      index,
      pontuacao,
      onChangePontuacao,
      onSubmitEditing,
      errorMessage,
    } = props;

    if (!dupla) {
      return null;
    }

    const handleSubmitPontuacao = () => onSubmitEditing(index);

    const handleChangePontuacao = (pontuacao: string) =>
      onChangePontuacao(index, pontuacao);

    return (
      <Fragment>
        <ThemedText type="subtitle">{dupla.getNomes()}</ThemedText>
        <ThemedInput
          ref={ref}
          label="Pontuação"
          placeholder="Exemplo: 8"
          value={pontuacao}
          keyboardType="numeric"
          onChangeText={handleChangePontuacao}
          onSubmitEditing={handleSubmitPontuacao}
          returnKeyType="next"
          errorMessage={errorMessage}
        />
      </Fragment>
    );
  }
);
