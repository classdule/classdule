import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Heading } from "../../components/Heading";
import { SafeAreaView } from "react-native-safe-area-context";

import { styled } from "../../styles/stitches";
import { View } from "react-native";
import { TextInput } from "../../components/TextInput";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";
import { RootStackScreensParams } from "../../../App";
import { useCallback } from "react";
import { Logo } from "../../components/Logo";

const LoginPageContainer = styled(SafeAreaView, {
  backgroundColor: "$gray900",
  flex: 1,
  alignItems: "center",
  paddingTop: 48,
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

type ScreenProps = NativeStackScreenProps<RootStackScreensParams, "login">;

export function LoginScreen({ navigation }: ScreenProps) {
  const handleLogin = useCallback(() => {
    navigation.replace("auth", { screen: "home" });
  }, [navigation]);
  return (
    <LoginPageContainer>
      <Logo size={64} variant="mono-white" />
      <Heading size="lg" css={{ fontWeight: "bold" }}>
        Login
      </Heading>
      <LoginForm>
        <Text css={{ fontWeight: "bold" }}>Email</Text>
        <TextInput.Root>
          <TextInput.Input placeholder="email@email.com" />
        </TextInput.Root>
        <Text css={{ fontWeight: "bold" }}>Senha</Text>
        <TextInput.Root>
          <TextInput.Input placeholder="Insira sua senha" secureTextEntry />
        </TextInput.Root>
        <Button variant="primary" onPress={handleLogin}>
          Login
        </Button>
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
