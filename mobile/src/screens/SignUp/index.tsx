import { styled } from "../../styles/stitches";
import { Text } from "../../components/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heading } from "../../components/Heading";
import { View } from "react-native";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackScreensParams } from "../../../App";
import { Logo } from "../../components/Logo";

const Container = styled(SafeAreaView, {
  backgroundColor: "$gray900",
  flex: 1,
  paddingHorizontal: 32,
  paddingVertical: 48,
  alignItems: "center",
});

const SignUpForm = styled(View, {
  width: "100%",
  gap: 16,
  marginTop: 16,
});
const Bottom = styled(View, {
  width: "100%",
  alignItems: "center",
  marginTop: 18,
  gap: 4,
});

type ScreenProps = NativeStackScreenProps<RootStackScreensParams, "sign-up">;

export function SignUpPage({ navigation }: ScreenProps) {
  return (
    <Container>
      <Logo size={64} variant="mono-white" />
      <Heading size="lg">Vamos começar</Heading>
      <SignUpForm>
        <Text>Email</Text>
        <TextInput.Root>
          <TextInput.Input placeholder="john.doe@gmail.com" />
        </TextInput.Root>
        <Text>Senha</Text>
        <TextInput.Root>
          <TextInput.Input placeholder="Digite sua senha" secureTextEntry />
        </TextInput.Root>
        <Text>Confirmar senha</Text>
        <TextInput.Root>
          <TextInput.Input placeholder="Confirme sua senha" secureTextEntry />
        </TextInput.Root>
        <Button css={{ marginTop: 40 }}>Próximo</Button>
      </SignUpForm>
      <Bottom>
        <Text css={{ fontWeight: "bold" }}>Já possui uma conta?</Text>
        <Text
          css={{ color: "$blue700", fontWeight: "bold" }}
          onPress={() => navigation.replace("login")}
        >
          Login
        </Text>
      </Bottom>
    </Container>
  );
}
