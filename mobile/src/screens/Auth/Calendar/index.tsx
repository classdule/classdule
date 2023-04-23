import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "../../../styles/stitches";
import { Heading } from "../../../components/Heading";
import { TabBarIconProps } from "../../../types/tabBarIconProps";
import { getIsFocusedIconColor } from "../../../lib/utils/getIsFocusedIconColor";
import { View } from "react-native";
import { Text } from "../../../components/Text";
import { ClassroomCard } from "../../../components/ClassroomCard";

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

const WeekDaySection = styled(View, {
  width: "100%",
});
const WeekDaysContainer = styled(View, {
  gap: 8,
});

export function CalendarScreen() {
  return (
    <Container>
      <Heading>Aulas</Heading>
      <WeekDaysContainer>
        <WeekDaySection>
          <Text size="lg" css={{ fontWeight: "bold", marginBottom: 8 }}>
            Seg
          </Text>
          <ClassroomCard
            name="Aula de matemática"
            groupName="Estudantes de exatas"
            endsAt={new Date()}
            startsAt={new Date()}
          />
        </WeekDaySection>
      </WeekDaysContainer>
    </Container>
  );
}
