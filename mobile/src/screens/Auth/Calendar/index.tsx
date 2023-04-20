import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "../../../styles/stitches";
import { Heading } from "../../../components/Heading";
import { TabBarIconProps } from "../../../types/tabBarIconProps";
import { getIsFocusedIconColor } from "../../../lib/utils/getIsFocusedIconColor";

const Container = styled(SafeAreaView, {
  backgroundColor: "$gray900",
  flex: 1,
  paddingHorizontal: 24,
});

export function CalendarTabBarIcon({ isFocused }: TabBarIconProps) {
  return (
    <Ionicons
      name="calendar"
      size={32}
      color={getIsFocusedIconColor(isFocused)}
    />
  );
}

export function CalendarPage() {
  return (
    <Container>
      <Heading>Aulas</Heading>
    </Container>
  );
}
