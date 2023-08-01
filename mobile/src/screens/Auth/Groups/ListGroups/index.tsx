import { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FloatingAction, IActionProps } from "react-native-floating-action";
import { styled, useTheme } from "../../../../styles/stitches";
import { Heading } from "../../../../components/Heading";
import { GroupCard } from "../../../../components/GroupCard";
import { GroupsScreensParams } from "..";

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

interface ActionButtonProps {
  onPressItem?: (name: string) => void;
}
type ActionButtonItemName = "create" | "search";
function ActionButton({ onPressItem }: ActionButtonProps) {
  const { colors } = useTheme();

  const actions: IActionProps[] = useMemo<IActionProps[]>(() => {
    return [
      {
        name: "create" as ActionButtonItemName,
        icon: <Ionicons name="add" size={28} color="#ffffff" />,
        color: colors.blue700,
      },
      {
        name: "search" as ActionButtonItemName,
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
      onPressItem={onPressItem}
    />
  );
}

type ScreenProps = NativeStackScreenProps<GroupsScreensParams, "list">;
export function ListGroupsScreen({ navigation }: ScreenProps) {
  const floatingButtonActions = useMemo(() => {
    return new Map<ActionButtonItemName, () => void>([
      [
        "create",
        () => {
          navigation.navigate("create");
        },
      ],
      ["search", () => navigation.navigate("search")],
    ]);
  }, [navigation]);
  return (
    <Container>
      <Heading size="lg" css={{ fontWeight: "bold" }}>
        Grupos de estudo
      </Heading>
      <GroupCardsContainer>
        <GroupCard
          groupName="Estudantes de matemática"
          membershipStatus="member"
          onPress={() => navigation.navigate("view", { groupId: "bbbb" })}
        />
        <GroupCard
          groupName="Estudantes de física"
          membershipStatus="pending"
          onPress={() => navigation.navigate("view", { groupId: "aaaa" })}
        />
      </GroupCardsContainer>
      <ActionButton
        onPressItem={(name) => {
          const action = floatingButtonActions.get(
            name as ActionButtonItemName
          );
          action();
        }}
      />
    </Container>
  );
}
