import { View } from "react-native";
import { styled } from "../../styles/stitches";
import { ReactNode } from "react";

const TextInputRootContainer = styled(View, {
  borderWidth: 1,
  borderColor: "$gray700",
  borderRadius: 8,
  color: "$gray200",
  fontSize: 16,
  width: "100%",
  overflow: "hidden",
  flexDirection: "row",
});

interface TextInputRootProps {
  children: ReactNode;
}
export function TextInputRoot({ children }: TextInputRootProps) {
  return <TextInputRootContainer>{children}</TextInputRootContainer>;
}
