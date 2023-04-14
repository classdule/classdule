import { styled } from "../../styles/stitches";
import { Text } from "../../components/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heading } from "../../components/Heading";
import { View } from "react-native";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";

const Container = styled(SafeAreaView, {
  backgroundColor: "$gray900",
  flex: 1,
  paddingHorizontal: 32,
  paddingVertical: 96,
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

export function SignUpPage({ navigation }) {
  return (
    <Container>
      <Heading size="lg">Vamos começar</Heading>
      <SignUpForm>
        <Text>Email</Text>
        <TextInput placeholder="john.doe@gmail.com" />
        <Text>Senha</Text>
        <TextInput placeholder="Digite sua senha" secureTextEntry />
        <Text>Confirmar senha</Text>
        <TextInput placeholder="Confirme sua senha" secureTextEntry />
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
