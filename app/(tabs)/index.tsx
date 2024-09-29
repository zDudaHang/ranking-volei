import { StyleSheet, TextInput } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRef, useState } from "react";
import { Button, Input } from "@rneui/base";
import {
  RankingFormModel,
  validate,
} from "@/validator/criar-ranking/validator";
import { ErrorObject, Validation } from "@/validator/model";

type InputRef = Input & TextInput;

export default function HomeScreen() {
  const [mes, setMes] = useState<string>();
  const [ano, setAno] = useState<string>();
  const [horario, setHorario] = useState<string>();

  const [validationError, setValidationError] =
    useState<ErrorObject<RankingFormModel>>();

  const mesRef = useRef<InputRef>(null);
  const anoRef = useRef<InputRef>(null);
  const horarioRef = useRef<InputRef>(null);

  const handleChangeMes = (mes: string) => setMes(mes);
  const handleSubmitMes = () => anoRef.current?.focus();

  const handleChangeAno = (ano: string) => setAno(ano);
  const handleSubmitAno = () => horarioRef.current?.focus();

  const handleChangeHorario = (horario: string) => setHorario(horario);

  const handleSubmit = () => {
    const validation = validate({ mes, ano, horario });
    if (!validation.isValid()) {
      setValidationError(validation.errors);
    }
  };

  const handleClear = () => {
    mesRef.current?.clear();
    anoRef.current?.clear();
    horarioRef.current?.clear();
    mesRef.current?.focus();
    setValidationError(undefined);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <FontAwesome6 size={310} name="volleyball" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Criando um Ranking</ThemedText>
        <ThemedText type="subtitle">Informações básicas</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Input
          ref={mesRef}
          label="Em qual mês esse ranking está sendo registrado?"
          keyboardType="default"
          placeholder="Exemplo: Janeiro"
          value={mes}
          onChangeText={handleChangeMes}
          returnKeyType="next"
          onSubmitEditing={handleSubmitMes}
          blurOnSubmit
          errorMessage={validationError?.mes}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Input
          ref={anoRef}
          label="Em qual ano esse ranking está sendo registrado?"
          keyboardType="numeric"
          placeholder="Exemplo: 2024"
          value={ano}
          onChangeText={handleChangeAno}
          returnKeyType="next"
          onSubmitEditing={handleSubmitAno}
          blurOnSubmit
          errorMessage={validationError?.ano}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Input
          ref={horarioRef}
          label="Qual o horário da turma?"
          keyboardType="numeric"
          placeholder="Exemplo: 20"
          value={horario}
          onChangeText={handleChangeHorario}
          returnKeyType="done"
          blurOnSubmit
          errorMessage={validationError?.horario}
        />
      </ThemedView>
      <Button size="lg" color="success" onPress={handleSubmit}>
        Criar
      </Button>
      <Button size="lg" type="outline" onPress={handleClear}>
        Limpar formulário
      </Button>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
