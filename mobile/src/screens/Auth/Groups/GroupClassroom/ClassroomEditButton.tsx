import { FontAwesome } from "@expo/vector-icons";
import { TouchableIcon } from "../../../../components/TouchableIcon";
import { config, styled } from "../../../../styles/stitches";
import { View } from "react-native";
import { CSS } from "stitches-native";

interface ClassroomEditIconProps {
  color: string;
  size: number;
}
export function ClassroomEditIcon({ color, size }: ClassroomEditIconProps) {
  return <FontAwesome name="pencil" size={size} color={color} />;
}

interface ClassroomEditButtonProps {
  onPress?: () => void;
  css?: CSS<typeof config>;
}
export function ClassroomEditButton({
  onPress,
  css,
}: ClassroomEditButtonProps) {
  return (
    <TouchableIcon
      Icon={ClassroomEditIcon}
      size={40}
      isFocused
      onPress={onPress}
      css={css}
    />
  );
}
