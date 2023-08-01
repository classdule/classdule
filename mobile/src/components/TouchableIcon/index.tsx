import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { type CSS } from "stitches-native";
import { config, styled } from "../../styles/stitches";

export interface TouchableIconProps {
  isFocused?: boolean;
  onPress?: () => void;
  Icon?: React.FC<{ color: string; size: number }>;
  size?: number;
  css?: CSS<typeof config>;
}

const Root = styled(TouchableOpacity, {});

export function TouchableIcon({
  Icon,
  isFocused,
  onPress,
  size = 40,
  css,
}: TouchableIconProps) {
  return (
    <Root onPress={onPress} css={css}>
      {Icon ? (
        <Icon color={isFocused ? "#ffffff" : "#a0a0a0"} size={size} />
      ) : (
        <AntDesign
          color={isFocused ? "#ffffff" : "#a0a0a0"}
          size={size}
          name="question"
        />
      )}
    </Root>
  );
}
