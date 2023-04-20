import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { FloatingAction, IActionProps } from "react-native-floating-action";
import { styled, useTheme } from "../../../styles/stitches";
import { Heading } from "../../../components/Heading";
import { GroupCard } from "../../../components/GroupCard";
import { View } from "react-native";
import { useMemo } from "react";
import { TabBarIconProps } from "../../../types/tabBarIconProps";
import { getIsFocusedIconColor } from "../../../lib/utils/getIsFocusedIconColor";

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

export const GroupsTabBarIcon = ({ isFocused }: TabBarIconProps) => (
  <Ionicons
    name="people-sharp"
    color={getIsFocusedIconColor(isFocused)}
    size={32}
  />
);

function ActionButton() {
  const { colors } = useTheme();

  const actions: IActionProps[] = useMemo<IActionProps[]>(() => {
    return [
      {
        name: "create",
        icon: <Ionicons name="add" size={28} color="#ffffff" />,
        color: colors.blue700,
      },
      {
        name: "search",
        color: colors.orange700,
        icon: <Ionicons name="search" color="#ffffff" size={28} />,
      },
    ] as IActionProps[];
  }, [colors]);
  return (
    <FloatingAction
      actions={actions}
      shadow={{ shadowColor: "transparent" }}
      color={colors.blue700}
    />
  );
}

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
      <ActionButton />
    </Container>
  );
}
