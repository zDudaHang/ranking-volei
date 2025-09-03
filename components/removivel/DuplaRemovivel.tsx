import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedComponent } from "@/model/common";
import { Dupla } from "@/model/dupla";
import { Button, ListItem } from "@rneui/base";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import { ThemedButton } from "../common/ThemedButton";

interface DuplaRemovivelProps extends ThemedComponent {
  index: number;
  dupla: Dupla;
  onPress: (index: number) => void;
}

export function DuplaRemovivel(props: DuplaRemovivelProps) {
  const { index, dupla, light, dark, onPress } = props;

  const placeholder = useThemeColor({ light, dark }, "placeholder");

  const handlePress = (index: number) => onPress(index);

  return (
    <ListItem
      containerStyle={{
        backgroundColor: "white",
        borderRadius: 8,
      }}
    >
      <>
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
        <ThemedButton
          type="clear"
          icon={{
            name: "close",
          }}
          color="secondary"
          onPress={() => handlePress(index)}
        />
      </>
    </ListItem>
  );
}
