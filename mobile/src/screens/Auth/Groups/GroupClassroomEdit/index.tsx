import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "../../../../styles/stitches";
import { Heading } from "../../../../components/Heading";
import { View } from "react-native";
import { TextArea } from "../../../../components/TextArea";
import { Button } from "../../../../components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GroupsScreensParams } from "..";
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

type ScreenProps = NativeStackScreenProps<GroupsScreensParams, "editClassroom">;
export function GroupClassroomEditScreen({ navigation }: ScreenProps) {
  return (
    <Container>
      <Heading size="lg" css={{ fontWeight: "bold" }}>
        Aula de matemática
      </Heading>
      <WeekDaysContainer>
        <InlineButton text="Dom" isOn enable />
        <InlineButton text="Seg" enable />
        <InlineButton text="Ter" enable />
        <InlineButton text="Qua" enable />
        <InlineButton text="Qui" enable />
        <InlineButton text="Sex" isOn enable />
        <InlineButton text="Sab" isOn enable />
      </WeekDaysContainer>
      <TextArea value="Aula dedicada a revisão" />
      <Button onPress={() => navigation.goBack()}>Salvar</Button>
    </Container>
  );
}
