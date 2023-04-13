import { forwardRef } from "react";

import {
  TextInput as BaseTextInput,
  type TextInputProps as BaseTextInputProps,
} from "react-native";

import { CSS } from "stitches-native";

import { styled, config, useTheme } from "../../styles/stitches";

type TextInputProps = BaseTextInputProps & {
  css?: CSS<typeof config>;
};

const TextInputRoot = styled(BaseTextInput, {
  borderWidth: 1,
  borderColor: "$gray500",
  borderRadius: 8,
  color: "$gray200",
  paddingHorizontal: 8,
  paddingVertical: 12,
  fontSize: 16,
  width: "100%",
});

export const TextInput = forwardRef<typeof TextInputRoot, TextInputProps>(
  (props, ref) => {
    const placeholderColor = useTheme().colors.gray500;
    return (
      <TextInputRoot
        css={props.css}
        {...props}
        ref={ref}
        placeholderTextColor={placeholderColor}
      />
    );
  }
);
