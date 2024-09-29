import { Input, ListItem } from "@rneui/base";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import { useState, useRef } from "react";
import { TextInput, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export function AdicionarAlunos() {
  const [nomeAluno, setNomeAluno] = useState<string | undefined>();
  const [alunos, setAlunos] = useState<string[]>([]);

  const nomeAlunoRef = useRef<Input & TextInput>(null);
  const handleChangeNomeAluno = (novoAluno: string) => {
    setNomeAluno(novoAluno);
  };

  const handleAdicionarAluno = () => {
    if (nomeAluno) {
      setAlunos([...alunos, nomeAluno]);
      nomeAlunoRef.current?.focus();
    }
  };

  return (
    <>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Quais são os alunos?</ThemedText>
        <Input
          label="Nome do aluno"
          onChangeText={handleChangeNomeAluno}
          placeholder="Digite o nome de um aluno"
          value={nomeAluno}
          onSubmitEditing={handleAdicionarAluno}
          ref={nomeAlunoRef}
          onFocus={() => console.log("onFocus")}
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Alunos adicionados</ThemedText>
        {alunos.map((nome, index) => (
          <ListItem bottomDivider={index !== alunos.length} key={index}>
            <ListItemContent>
              <ListItemTitle>{nome}</ListItemTitle>
            </ListItemContent>
          </ListItem>
        ))}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
