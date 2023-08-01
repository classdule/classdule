import { theme } from "../../styles/stitches";

export function getIsFocusedIconColor(isFocused: boolean) {
  return isFocused ? "#ffffff" : theme.colors.gray500.value;
}
