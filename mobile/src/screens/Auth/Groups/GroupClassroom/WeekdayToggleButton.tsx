import { TouchableOpacity } from "react-native";
import { styled } from "../../../../styles/stitches";
import { Text } from "../../../../components/Text";

const Root = styled(TouchableOpacity, {
  borderRadius: 4,
  padding: 2,
  variants: {
    on: {
      true: {
        backgroundColor: "$purple700",
      },
      false: {
        backgroundColor: "$gray800",
      },
    },
  },
});

interface WeekdayToggleButtonProps {
  onPress?: () => void;
  enable?: boolean;
  isOn?: boolean;
  weekday: string;
}

export function WeekdayToggleButton({
  onPress,
  weekday,
  enable = false,
  isOn = false,
}: WeekdayToggleButtonProps) {
  return (
    <Root
      on={isOn ? "true" : "false"}
      onPress={enable ? onPress : null}
      activeOpacity={enable ? 0.5 : 1}
    >
      <Text css={{ fontWeight: "bold" }}>{weekday}</Text>
    </Root>
  );
}
