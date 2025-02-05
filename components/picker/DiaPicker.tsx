import React, { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { ThemedInput } from "../common/ThemedInput";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedComponent } from "@/model/common";

interface DiaSemanaPickerProps extends ThemedComponent {
  label: string;
  diaSelecionado: Date;
  setDiaSelecionado: (dia: Date) => void;
}

export function DiaPicker(props: DiaSemanaPickerProps) {
  const { label, diaSelecionado, setDiaSelecionado, light, dark } = props;

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
        label={label}
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
