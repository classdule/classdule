import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

import { ComponentProps, CSS } from "stitches-native";

import { styled, config } from "../../styles/stitches";
import { Text } from "../Text";

type ButtonProps = TouchableOpacityProps & {
  mode?: ComponentProps<typeof RootButton>["mode"];
  css?: CSS<typeof config>;
  textCss?: CSS<typeof config>;
  children: string;
};

const RootButton = styled(TouchableOpacity, {
  width: "100%",
  paddingVertical: 12,
  fontSize: 16,
  fontWeight: "bold",
  alignItems: "center",
  borderRadius: 8,
  backgroundColor: "$rose700",
  borderColor: "$rose700",
  variants: {
    mode: {
      full: {},
      outline: {
        borderWidth: 1,

        backgroundColor: "transparent",
      },
    },
  },
});

const ButtonText = styled(Text, {
  fontWeight: "bold",
  fontSize: 16,
  variants: {
    mode: {
      full: {
        color: "$gray100",
      },
      outline: {
        color: "$rose700",
      },
    },
  },
});

export function Button({ mode = "full", css, textCss, ...props }: ButtonProps) {
  return (
    <RootButton mode={mode} css={css} {...props}>
      <ButtonText mode={mode} css={textCss}>
        {props.children}
      </ButtonText>
    </RootButton>
  );
}
