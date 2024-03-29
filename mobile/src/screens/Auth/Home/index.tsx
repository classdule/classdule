import { Ionicons } from "@expo/vector-icons";

import { Heading } from "../../../components/Heading";
import { Text } from "../../../components/Text";
import { styled } from "../../../styles/stitches";
import { SafeAreaView } from "react-native-safe-area-context";
import { ClassroomCard } from "../../../components/ClassroomCard";
import { View } from "react-native";
import { Logo } from "../../../components/Logo";
import { TabBarIconProps } from "../../../types/tabBarIconProps";
import { getIsFocusedIconColor } from "../../../lib/utils/getIsFocusedIconColor";

const Container = styled(SafeAreaView, {
  backgroundColor: "$gray900",
  flex: 1,
  paddingHorizontal: 24,
  paddingVertical: 16,
  alignItems: "center",
});

const TodayClassesContainer = styled(SafeAreaView, {
  width: "100%",
  gap: 16,
});

const ViewMoreContainer = styled(View, {
  flexDirection: "row",
  padding: 8,
  alignSelf: "flex-end",
  alignItems: "center",
});

export const HomeTabBarIcon = ({ isFocused }: TabBarIconProps) => (
  <Ionicons name="home" color={getIsFocusedIconColor(isFocused)} size={32} />
);

export function HomeScreen() {
  return (
    <Container>
      <Heading size="lg">Aulas de hoje</Heading>
      <TodayClassesContainer>
        <ClassroomCard
          startsAt={new Date("1970-01-01 12:00")}
          endsAt={new Date("1970-01-01 13:30")}
          name="Aula 1"
          groupName="Estudantes"
        />
      </TodayClassesContainer>
      <ViewMoreContainer>
        <Text css={{ fontWeight: "bold" }}>
          Ver todas <Ionicons color="#ffffff" size={20} name="caret-forward" />
        </Text>
      </ViewMoreContainer>
    </Container>
  );
}
