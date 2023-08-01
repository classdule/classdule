import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "../../../../styles/stitches";
import { Text } from "../../../../components/Text";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { GroupsScreensParams } from "..";
import { Heading } from "../../../../components/Heading";
import { View } from "react-native";
import { Button } from "../../../../components/Button";
import { MembershipStatus } from "../../../../types/membershipStatus";
import { useMemo } from "react";
import { ClassroomEditButton } from "./ClassroomEditButton";
import { InlineButton } from "../../../../components/InlineButton";

const Container = styled(SafeAreaView, {
  flex: 1,
  backgroundColor: "$gray900",
  paddingHorizontal: 24,
  paddingVertical: 16,
  gap: 16,
});
const WeekDaysContainer = styled(View, {
  flexDirection: "row",
  gap: 4,
});

const EducatorLabel = styled(Text, {
  width: "100%",
  textAlign: "right",
});

type ScreenProps = NativeStackScreenProps<GroupsScreensParams, "viewClassroom">;
export function GroupClassroomScreen({ navigation }: ScreenProps) {
  const currentRole = useMemo<MembershipStatus>(() => {
    return "educator";
  }, []);
  return (
    <Container>
      <Heading size="lg" css={{ fontWeight: "bold" }}>
        Aula de matemática
      </Heading>
      <WeekDaysContainer>
        <InlineButton text="Dom" isOn />
        <InlineButton text="Seg" />
        <InlineButton text="Ter" />
        <InlineButton text="Qua" />
        <InlineButton text="Qui" />
        <InlineButton text="Sex" isOn />
        <InlineButton text="Sab" isOn />
      </WeekDaysContainer>
      <EducatorLabel>Professor: Gustavo Martins</EducatorLabel>
      {currentRole === "educator" && (
        <ClassroomEditButton
          css={{ alignSelf: "flex-end" }}
          onPress={() => navigation.navigate("editClassroom")}
        />
      )}
      <Button
        mode="outline"
        textCss={{ color: "$white", fontWeight: "bold" }}
        css={{ borderColor: "$white" }}
      >
        Check-in
      </Button>
      <Text>Aula dedicada a revisão do conteúdo diário do cursinho</Text>
    </Container>
  );
}
