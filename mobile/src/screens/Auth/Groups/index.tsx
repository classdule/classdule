import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "../../../styles/stitches";
import { Heading } from "../../../components/Heading";
import { GroupCard } from "../../../components/GroupCard";
import { View } from "react-native";

const Container = styled(SafeAreaView, {
  backgroundColor: "$gray900",
  flex: 1,
  alignItems: "center",
  paddingHorizontal: 24,
});
const GroupCardsContainer = styled(View, {
  flexDirection: "row",
  flexWrap: "wrap",
  width: "100%",
  justifyContent: "space-between",
  gap: 8,
});

export const GroupsTabBarIcon = ({ isFocused }: { isFocused: boolean }) => (
  <Ionicons
    name="people-sharp"
    color={isFocused ? "#ffffff" : "#919191"}
    size={32}
  />
);

export function GroupsPage() {
  return (
    <Container>
      <Heading size="lg" css={{ fontWeight: "bold" }}>
        Grupos de estudo
      </Heading>
      <GroupCardsContainer>
        <GroupCard
          groupName="Estudantes de matemática"
          membershipStatus="member"
        />
        <GroupCard
          groupName="Estudantes de física"
          membershipStatus="pendind"
        />
      </GroupCardsContainer>
    </Container>
  );
}
