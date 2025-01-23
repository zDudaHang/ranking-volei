import React, { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { ThemedInput } from "../common/ThemedInput";
import { useThemeColor } from "@/hooks/useThemeColor";

interface DiaSemanaPickerProps {
  light?: string;
  dark?: string;

  diaSelecionado: Date;
  setDiaSelecionado: (dia: Date) => void;
}

export function DiaSemanaPicker(props: DiaSemanaPickerProps) {
  const { diaSelecionado, setDiaSelecionado, light, dark } = props;

  const [show, setShow] = useState<boolean>(false);

  const primary = useThemeColor({ light, dark }, "primary");

  const handleChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setDiaSelecionado(date);
      setShow(false);
    }
  };

  return (
    <>
      <ThemedInput
        label="Qual dia que a turma tem a aula?"
        rightIcon={{
          name: "edit",
          size: 32,
          color: primary,
          onPress: () => setShow(true),
        }}
        value={diaSelecionado.toLocaleDateString()}
        editable={false}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={diaSelecionado}
          mode="date"
          onChange={handleChange}
        />
      )}
    </>
  );
}
