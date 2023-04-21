import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "../../../../styles/stitches";
import { Heading } from "../../../../components/Heading";
import { View } from "react-native";
import { Text } from "../../../../components/Text";
import { TextInput } from "../../../../components/TextInput";
import { Button } from "../../../../components/Button";
import { TextArea } from "../../../../components/TextArea";

const Container = styled(SafeAreaView, {
  paddingHorizontal: 24,
  flex: 1,
  backgroundColor: "$gray900",
  paddingVertical: 56,
});

const CreateGroupForm = styled(View, {
  width: "100%",
  gap: 16,
  marginTop: 44,
});

export function CreateGroupPage() {
  return (
    <Container>
      <Heading css={{ fontWeight: "bold" }} size="lg">
        Criar um grupo
      </Heading>
      <CreateGroupForm>
        <Text>Nome do grupo</Text>
        <TextInput.Root>
          <TextInput.Input placeholder="Estudantes dedicados" />
        </TextInput.Root>
        <Text>Descrição do grupo</Text>
        <TextArea placeholder="Estudantes apaixonados pelo conhecimento." />
        <Button>Criar grupo</Button>
      </CreateGroupForm>
    </Container>
  );
}
