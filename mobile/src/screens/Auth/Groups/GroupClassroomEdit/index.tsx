import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "../../../../styles/stitches";
import { Heading } from "../../../../components/Heading";
import { View } from "react-native";
import { WeekdayToggleButton } from "../GroupClassroom/WeekdayToggleButton";
import { TextArea } from "../../../../components/TextArea";
import { Button } from "../../../../components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GroupsScreensParams } from "..";

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

type ScreenProps = NativeStackScreenProps<GroupsScreensParams, "editClassroom">;
export function GroupClassroomEditScreen({ navigation }: ScreenProps) {
  return (
    <Container>
      <Heading size="lg" css={{ fontWeight: "bold" }}>
        Aula de matemática
      </Heading>
      <WeekDaysContainer>
        <WeekdayToggleButton weekday="Dom" isOn enable />
        <WeekdayToggleButton weekday="Seg" enable />
        <WeekdayToggleButton weekday="Ter" enable />
        <WeekdayToggleButton weekday="Qua" enable />
        <WeekdayToggleButton weekday="Qui" enable />
        <WeekdayToggleButton weekday="Sex" isOn enable />
        <WeekdayToggleButton weekday="Sab" isOn enable />
      </WeekDaysContainer>
      <TextArea value="Aula dedicada a revisão" />
      <Button onPress={() => navigation.goBack()}>Salvar</Button>
    </Container>
  );
}
