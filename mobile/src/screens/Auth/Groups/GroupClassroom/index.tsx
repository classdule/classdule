import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "../../../../styles/stitches";
import { Text } from "../../../../components/Text";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { GroupsScreensParams } from "..";
import { Heading } from "../../../../components/Heading";
import { WeekdayToggleButton } from "./WeekdayToggleButton";
import { View } from "react-native";
import { Button } from "../../../../components/Button";

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
export function GroupClassroomScreen({ route }: ScreenProps) {
  return (
    <Container>
      <Heading size="lg" css={{ fontWeight: "bold" }}>
        Aula de matemática
      </Heading>
      <WeekDaysContainer>
        <WeekdayToggleButton weekday="Dom" isOn />
        <WeekdayToggleButton weekday="Seg" />
        <WeekdayToggleButton weekday="Ter" />
        <WeekdayToggleButton weekday="Qua" />
        <WeekdayToggleButton weekday="Qui" />
        <WeekdayToggleButton weekday="Sex" isOn />
        <WeekdayToggleButton weekday="Sab" isOn />
      </WeekDaysContainer>
      <EducatorLabel>Professor: Gustavo Martins</EducatorLabel>
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
