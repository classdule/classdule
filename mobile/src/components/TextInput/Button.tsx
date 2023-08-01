import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { config, styled } from "../../styles/stitches";
import { CSS } from "stitches-native";
import { Text } from "../Text";

const TextInputButtonRoot = styled(TouchableOpacity, {
  backgroundColor: "$purple700",
  paddingHorizontal: 12,
  justifyContent: "center",
});

type TextInputButtonProps = TouchableOpacityProps & {
  css?: CSS<typeof config>;
  textCss?: CSS<typeof config>;
};

export function TextInputButton({
  children,
  textCss,
  ...props
}: TextInputButtonProps) {
  return (
    <TextInputButtonRoot {...props}>
      <Text css={{ ...textCss, fontWeight: "bold" }}>{children}</Text>
    </TextInputButtonRoot>
  );
}
