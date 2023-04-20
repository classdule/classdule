import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "../../../styles/stitches";
import { Heading } from "../../../components/Heading";

const Container = styled(SafeAreaView, {
  backgroundColor: "$gray900",
  flex: 1,
  alignItems: "center",
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
    </Container>
  );
}
