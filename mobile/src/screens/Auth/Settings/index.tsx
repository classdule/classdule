import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "../../../styles/stitches";
import { Heading } from "../../../components/Heading";
import { getIsFocusedIconColor } from "../../../lib/utils/getIsFocusedIconColor";
import { TabBarIconProps } from "../../../types/tabBarIconProps";
import { TextInput } from "../../../components/TextInput";
import { View } from "react-native";
import { Text } from "../../../components/Text";
import { Button } from "../../../components/Button";

export const SettingsTabBarIcon = ({ isFocused }: TabBarIconProps) => (
  <Ionicons
    name="settings"
    color={getIsFocusedIconColor(isFocused)}
    size={32}
  />
);

const Container = styled(SafeAreaView, {
  paddingHorizontal: 24,
  paddingVertical: 56,
  flex: 1,
  backgroundColor: "$gray900",
});

const ConfigContainer = styled(View, {
  gap: 16,
  marginTop: 28,
});

export function SettingsScreen() {
  return (
    <Container>
      <Heading css={{ fontWeight: "bold" }} size="lg">
        Configurações
      </Heading>
      <Text css={{ color: "$gray500" }}>gu.martins@email.com</Text>
      <ConfigContainer>
        <TextInput.Root>
          <TextInput.Inner>
            <TextInput.Input value="Gustavo Martins" />
          </TextInput.Inner>
          <TextInput.Button>Salvar</TextInput.Button>
        </TextInput.Root>
        <Button css={{ backgroundColor: "$red700" }}>Logout</Button>
      </ConfigContainer>
    </Container>
  );
}
