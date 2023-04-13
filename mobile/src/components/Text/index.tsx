import { Text as BaseText, TextProps as BaseTextProps } from "react-native";

import { styled, config } from "../../styles/stitches";
import { CSS, ComponentProps } from "stitches-native";

type TextProps = BaseTextProps & {
  css?: CSS<typeof config>;
  size?: ComponentProps<typeof RootText>["size"];
};

const RootText = styled(BaseText, {
  color: "$gray100",
  variants: {
    size: {
      sm: {
        fontSize: 12,
      },
      md: {
        fontSize: 16,
      },
      lg: {
        fontSize: 20,
      },
      xl: {
        fontSize: 24,
      },
    },
  },
});

export function Text({ css, size = "md", children }: TextProps) {
  return (
    <RootText css={css} size={size}>
      {children}
    </RootText>
  );
}
