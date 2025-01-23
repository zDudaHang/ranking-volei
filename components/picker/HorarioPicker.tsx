import React, { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { ThemedButton } from "../common/ThemedButton";
import { ThemedInput } from "../common/ThemedInput";
import { useThemeColor } from "@/hooks/useThemeColor";

interface HorarioPickerProps {
  light?: string;
  dark?: string;

  horarioSelecionado: Date;
  setHorarioSelecionado: (horario: Date) => void;
}

const HOUR_PATTERN = "HH:mm";

export function HorarioPicker(props: HorarioPickerProps) {
  const { horarioSelecionado, setHorarioSelecionado, light, dark } = props;

  const [show, setShow] = useState<boolean>(false);

  const primary = useThemeColor({ light, dark }, "primary");

  const handleChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      setHorarioSelecionado(date);
      setShow(false);
    }
  };

  return (
    <>
      <ThemedInput
        label="E qual o horário?"
        rightIcon={{
          name: "edit",
          size: 32,
          color: primary,
          onPress: () => setShow(true),
        }}
        value={format(horarioSelecionado, HOUR_PATTERN)}
        editable={false}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={horarioSelecionado}
          mode="time"
          is24Hour={true}
          onChange={handleChange}
        />
      )}
    </>
  );
}
