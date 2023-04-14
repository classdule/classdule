import { Heading } from "../../components/Heading";
import { SafeAreaView } from "react-native-safe-area-context";

import { styled } from "../../styles/stitches";
import { View } from "react-native";
import { TextInput } from "../../components/TextInput";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";

const LoginPageContainer = styled(SafeAreaView, {
  backgroundColor: "$gray900",
  flex: 1,
  alignItems: "center",
  paddingTop: 96,
  paddingHorizontal: 32,
});

const LoginForm = styled(View, {
  width: "100%",
  marginTop: 86,
  gap: 16,
});
const PageBottom = styled(View, {
  width: "100%",
  gap: 4,
  alignItems: "center",
  marginTop: 18,
});

export function LoginPage({ navigation }) {
  return (
    <LoginPageContainer>
      <Heading size="lg" css={{ fontWeight: "bold" }}>
        Login
      </Heading>
      <LoginForm>
        <Text css={{ fontWeight: "bold" }}>Email</Text>
        <TextInput placeholder="email@email.com" />
        <Text css={{ fontWeight: "bold" }}>Senha</Text>
        <TextInput placeholder="Insira sua senha" secureTextEntry />
        <Button variant="primary">Login</Button>
      </LoginForm>
      <PageBottom>
        <Text>Não possui uma conta?</Text>
        <Text
          css={{ color: "$blue700", fontWeight: "bold" }}
          onPress={() => navigation.replace("sign-up")}
        >
          Comece agora!
        </Text>
      </PageBottom>
    </LoginPageContainer>
  );
}
