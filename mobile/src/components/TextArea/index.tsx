import { TextInput, TextInputProps } from "react-native";
import { config, styled, useTheme } from "../../styles/stitches";
import { CSS } from "stitches-native";

const RootComponent = styled(TextInput, {
  borderWidth: 1,
  borderColor: "$gray700",
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 8,
  color: "$gray200",
  fontSize: 16,
});

type TextAreaProps = TextInputProps & {
  css?: CSS<typeof config>;
};

export function TextArea(props: TextAreaProps) {
  const { colors } = useTheme();
  return (
    <RootComponent multiline placeholderTextColor={colors.gray500} {...props} />
  );
}
