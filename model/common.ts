import { Input } from "@rneui/base";
import { TextInput } from "react-native";

export type InputRef = Input & TextInput;

export interface ThemedComponent {
  light?: string;
  dark?: string;
}
