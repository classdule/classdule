import { View } from "react-native";
import { Slot } from "@radix-ui/react-slot";

import { styled, useTheme } from "../../styles/stitches";
import { ReactNode } from "react";

const Container = styled(View, {
  justifyContent: "center",
  alignItems: "center",
});

interface TextInputIconProps {
  children: ReactNode;
}
export function TextInputIcon({ children }: TextInputIconProps) {
  const { colors } = useTheme();
  return (
    <Container>
      <Slot color={colors.gray100}>{children}</Slot>
    </Container>
  );
}
