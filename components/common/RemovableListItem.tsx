import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedComponent } from "@/model/common";
import { Button, ListItem } from "@rneui/base";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";

interface RemovableListItemProps extends ThemedComponent {
  index: number;
  text: string;
  onPress: (index: number) => void;
}

export function RemovableListItem(props: RemovableListItemProps) {
  const { index, text, light, dark, onPress } = props;

  const danger = useThemeColor({ light, dark }, "danger");

  const handlePress = (index: number, reset: () => void) => {
    onPress(index);
    reset();
  };

  return (
    <ListItem.Swipeable
      containerStyle={{
        backgroundColor: "white",
        borderRadius: 8,
      }}
      rightContent={(reset) => (
        <Button
          title="Remover"
          color={danger}
          onPress={() => handlePress(index, reset)}
          icon={{ name: "delete", color: "white", size: 32 }}
          buttonStyle={{
            minHeight: "100%",
            borderRadius: 8,
          }}
        />
      )}
    >
      <ListItemContent>
        <ListItemTitle>{text}</ListItemTitle>
      </ListItemContent>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
}
