import { ThemedComponent } from "@/model/common";
import { ThemedText } from "../common/ThemedText";
import { ThemedView } from "../common/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialIcons } from "@expo/vector-icons";
import { Validation } from "@/validator/model-errorObject";

export const ROOT_ERROR = "ROOT_ERROR";

interface ErrorMessageProps<T> extends ThemedComponent {
  errors: Validation<T>;
  name: keyof T | "ROOT_ERROR";
}

export function ErrorMessage<T>(props: ErrorMessageProps<T>) {
  const { errors, name, light, dark } = props;

  const danger = useThemeColor({ light, dark }, "danger");

  const message =
    name === ROOT_ERROR ? errors.getRootError() : errors.getErrors()?.[name];

  if (!message) {
    return null;
  }

  return (
    <ThemedText
      type="default"
      style={{ color: danger }}
      textBreakStrategy="balanced"
    >
      {message.toString()}
    </ThemedText>
  );
}
