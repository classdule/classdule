import { createStitches } from "stitches-native";

export const {
  ThemeProvider,
  config,
  createTheme,
  css,
  styled,
  theme,
  useTheme,
} = createStitches({
  theme: {
    colors: {
      gray900: "#161616",
      gray800: "#1E1E1E",
      gray700: "#242424",
      gray500: "#676767",
      gray300: "#A8A8A8",
      gray200: "#BEBEBE",
      gray100: "#F8F8F8",
      pink700: "#7A08ED",
      pink400: "#A363E2",
      rose700: "#ED085A",
      rose400: "#F55F95",
      red700: "#E91C1C",
      orange700: "#FF512B",
      yellow700: "#F2DD19",
      blue700: "#1784E9",
      purple700: "#4117E9",
      purple400: "#7251F3",
    },
  },
});
