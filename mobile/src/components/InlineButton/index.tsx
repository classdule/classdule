import { TouchableOpacity } from "react-native";
import { styled } from "../../styles/stitches";
import { Text } from "../Text";

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

interface InlineButtonProps {
  onPress?: () => void;
  enable?: boolean;
  isOn?: boolean;
  text: string;
}

export function InlineButton({
  onPress,
  text,
  enable = false,
  isOn = false,
}: InlineButtonProps) {
  return (
    <Root
      on={isOn ? "true" : "false"}
      onPress={enable ? onPress : null}
      activeOpacity={enable ? 0.5 : 1}
    >
      <Text css={{ fontWeight: "bold" }}>{text}</Text>
    </Root>
  );
}
