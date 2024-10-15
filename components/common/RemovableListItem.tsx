import { useThemeColor } from "@/hooks/useThemeColor"
import { Button, ListItem } from "@rneui/base"
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content"
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title"

interface RemovableListItemProps {
  lightColor?: string
  darkColor?: string
  index: number
  text: string
  onPress: (index: number) => void
}

export function RemovableListItem(props: RemovableListItemProps) {
  const { index, text, lightColor, darkColor, onPress } = props

  const danger = useThemeColor({ light: lightColor, dark: darkColor }, "danger")

  const handlePress = (index: number, reset: () => void) => {
    onPress(index)
    reset()
  }

  return (
    <ListItem.Swipeable
      key={`item-index`}
      containerStyle={{
        backgroundColor: "white",
        borderRadius: 8,
      }}
      rightContent={(reset) => (
        <Button
          title="Remover"
          color={danger}
          onPress={() => handlePress(index, reset)}
          icon={{ name: "delete", color: "white" }}
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
  )
}
