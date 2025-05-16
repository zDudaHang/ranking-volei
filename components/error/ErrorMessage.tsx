import { ThemedComponent } from "@/model/common";
import { ThemedText } from "../common/ThemedText";
import { ThemedView } from "../common/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialIcons } from "@expo/vector-icons";
import { Validation } from "@/validator/model";

interface ErrorMessageProps<T> extends ThemedComponent {
  errors: Validation<T>;
  name: keyof T;
}

export function ErrorMessage<T>(props: ErrorMessageProps<T>) {
  const { errors, name, light, dark } = props;

  const danger = useThemeColor({ light, dark }, "danger");

  const message = errors?.errors[name];

  if (!message) {
    return null;
  }

  return (
    <ThemedView
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
        padding: 8,
        gap: 8,
        backgroundColor: "#f9d2d5",
        borderWidth: 1,
        borderColor: danger,
      }}
    >
      <MaterialIcons name="error" size={32} color={danger} />
      <ThemedText
        type="default"
        style={{ color: danger }}
        textBreakStrategy="balanced"
      >
        {message}
      </ThemedText>
    </ThemedView>
  );
}
