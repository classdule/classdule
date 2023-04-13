import { Text } from "react-native";

import { CSS } from "stitches-native";

import { styled, config } from "../../styles/stitches";

export interface HeadingProps {
  children: string;
  size?: "sm" | "md" | "lg" | "xl";
  css?: CSS<typeof config>;
}

const RootHeading = styled(Text, {
  color: "$gray100",
  variants: {
    size: {
      sm: {
        fontSize: 20,
      },
      md: {
        fontSize: 28,
      },
      lg: {
        fontSize: 36,
      },
      xl: {
        fontSize: 48,
      },
    },
  },
});

export function Heading({ children, size = "md", css }: HeadingProps) {
  return (
    <RootHeading size={size} css={css}>
      {children}
    </RootHeading>
  );
}
