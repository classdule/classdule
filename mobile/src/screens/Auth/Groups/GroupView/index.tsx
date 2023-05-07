import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "../../../../styles/stitches";
import { Text } from "../../../../components/Text";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GroupsScreensParams } from "..";
import { Heading } from "../../../../components/Heading";
import { MembersSection } from "./sections/MembersSection";

const Container = styled(SafeAreaView, {
  backgroundColor: "$gray900",
  flex: 1,
  paddingHorizontal: 24,
  paddingVertical: 16,
});

type ScreenProps = NativeStackScreenProps<GroupsScreensParams, "view">;

export function GroupViewScreen({ route }: ScreenProps) {
  return (
    <Container>
      <Heading size="lg" css={{ fontWeight: "bold" }}>
        Estudantes de exatas
      </Heading>
      <Text css={{ fontWeight: "300", color: "$gray300", marginTop: 16 }}>
        Grupo dedicado a nos aprofundar nesta incrível matéria.
      </Text>
      <Text
        css={{ fontWeight: "300", color: "$gray300", alignSelf: "flex-end" }}
      >
        Criador: Manuel Teixeira
      </Text>
      <MembersSection
        members={[
          {
            email: "email@email.com",
            name: "name",
          },
          {
            email: "email@email.com",
            name: "name2",
          },
        ]}
      />
    </Container>
  );
}
