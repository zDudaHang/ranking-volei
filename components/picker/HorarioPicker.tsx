import React, { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { ThemedInput } from "../common/ThemedInput";
import { useThemeColor } from "@/hooks/useThemeColor";
import { asHourAndMinutes } from "@/util/date-format";
import { ThemedComponent } from "@/model/common";

interface HorarioPickerProps extends ThemedComponent {
  label: string;
  horarioSelecionado: Date;
  setHorarioSelecionado: (horario: Date) => void;
}

export function HorarioPicker(props: HorarioPickerProps) {
  const { label, horarioSelecionado, setHorarioSelecionado, light, dark } =
    props;

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
        label={label}
        rightIcon={{
          name: "edit",
          size: 32,
          color: primary,
          onPress: () => setShow(true),
        }}
        value={asHourAndMinutes(horarioSelecionado)}
        editable={false}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={horarioSelecionado}
          mode="time"
          is24Hour
          onChange={handleChange}
        />
      )}
    </>
  );
}
