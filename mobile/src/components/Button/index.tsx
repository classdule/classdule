import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

import { ComponentProps, CSS } from "stitches-native";

import { styled, config } from "../../styles/stitches";
import { Text } from "../Text";

type ButtonProps = TouchableOpacityProps & {
  variant?: ComponentProps<typeof RootButton>["variant"];
  css?: CSS<typeof config>;
  children: string;
};

const RootButton = styled(TouchableOpacity, {
  width: "100%",
  paddingVertical: 12,
  fontSize: 16,
  fontWeight: "bold",
  alignItems: "center",
  borderRadius: 8,
  variants: {
    variant: {
      primary: {
        backgroundColor: "$rose700",
      },
    },
  },
});

export function Button({ variant = "primary", css, ...props }: ButtonProps) {
  return (
    <RootButton variant="primary" css={css} {...props}>
      <Text css={{ fontWeight: "bold", fontSize: 16 }}>{props.children}</Text>
    </RootButton>
  );
}
