import { forwardRef } from "react";
import {
  TextInput as BaseTextInput,
  type TextInputProps as BaseTextInputProps,
} from "react-native";
import { CSS } from "stitches-native";
import { config, styled, useTheme } from "../../styles/stitches";

type TextInputProps = BaseTextInputProps & {
  css?: CSS<typeof config>;
};

const TextInputInputRoot = styled(BaseTextInput, {
  color: "$gray200",
  fontSize: 16,
  flex: 1,
  paddingHorizontal: 8,
  paddingVertical: 12,
});

export const TextInputInput = forwardRef<
  typeof TextInputInputRoot,
  TextInputProps
>((props, ref) => {
  const placeholderColor = useTheme().colors.gray500;
  return (
    <TextInputInputRoot
      css={props.css}
      {...props}
      ref={ref}
      placeholderTextColor={placeholderColor}
    />
  );
});
