import { ThemedComponent } from "@/model/common";
import { ThemedText } from "../common/ThemedText";
import { ThemedView } from "../common/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialIcons } from "@expo/vector-icons";
import { Validation } from "@/validator/model";

interface ErrorMessageProps<T> extends ThemedComponent {
  errors: Validation<T>;
  name: keyof T | "ARRAY_ERROR";
}

export function ErrorMessage<T>(props: ErrorMessageProps<T>) {
  const { errors, name, light, dark } = props;

  const danger = useThemeColor({ light, dark }, "danger");

  const message = errors?.errors[name];

  if (!message) {
    return null;
  }

  return (
    <ThemedText
      type="defaultSemiBold"
      style={{ color: danger }}
      textBreakStrategy="balanced"
    >
      {message}
    </ThemedText>
  );
}
