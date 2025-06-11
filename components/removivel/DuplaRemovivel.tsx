import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedComponent } from "@/model/common";
import { Dupla } from "@/model/dupla";
import { Button, ListItem } from "@rneui/base";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";

interface DuplaRemovivelProps extends ThemedComponent {
  index: number;
  dupla: Dupla;
  onPress: (index: number) => void;
}

export function DuplaRemovivel(props: DuplaRemovivelProps) {
  const { index, dupla, light, dark, onPress } = props;

  const danger = useThemeColor({ light, dark }, "danger");
  const placeholder = useThemeColor({ light, dark }, "placeholder");

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
        <ListItemTitle>{dupla.getNomes()}</ListItemTitle>
        <ListItemSubtitle
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            color: placeholder,
          }}
        >
          {dupla.getTiposParticipantes()}
        </ListItemSubtitle>
      </ListItemContent>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
}
