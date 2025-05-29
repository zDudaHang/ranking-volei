import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedComponent } from "@/model/common";
import { CheckBox, CheckBoxProps, Icon } from "@rneui/base";

interface ThemedCheckboxProps
  extends ThemedComponent,
    Omit<CheckBoxProps, "checkedIcon" | "uncheckedIcon" | "children"> {}

export function ThemedCheckbox(props: ThemedCheckboxProps) {
  const { light, dark, ...rest } = props;

  const text = useThemeColor({ light, dark }, "text");
  const secondary = useThemeColor({ light, dark }, "secondary");
  const primary = useThemeColor({ light, dark }, "primary");

  return (
    <CheckBox
      {...rest}
      containerStyle={{
        backgroundColor: "transparent",
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        marginLeft: 0,
        marginRight: 8,
        marginTop: 0,
        marginBottom: 8,
      }}
      textStyle={{ color: text }}
      checkedIcon={
        <Icon
          name="radio-button-checked"
          type="material"
          color={primary}
          size={32}
        />
      }
      uncheckedIcon={
        <Icon
          name="radio-button-unchecked"
          type="material"
          color={secondary}
          size={32}
        />
      }
    />
  );
}
