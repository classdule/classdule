import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "../../../../styles/stitches";
import { TextInput } from "../../../../components/TextInput";
import { Heading } from "../../../../components/Heading";
import { View } from "react-native";
import { GroupSearchResult } from "../../../../components/GroupSearchResult";

const Container = styled(SafeAreaView, {
  paddingHorizontal: 24,
  backgroundColor: "$gray900",
  flex: 1,
  paddingVertical: 48,
});

const SearchResultSection = styled(View, {
  width: "100%",
  gap: 8,
});

export function SearchGroupsScreen() {
  return (
    <Container>
      <TextInput.Root>
        <TextInput.Icon>
          <Ionicons name="search" size={32} />
        </TextInput.Icon>
        <TextInput.Input placeholder="Pesquise aqui" />
      </TextInput.Root>
      <Heading>Resultados da busca</Heading>
      <SearchResultSection>
        <GroupSearchResult
          groupDescription="Grupo dos alunos"
          groupId="1111-aaaaa"
          groupName="Apenas um grupo"
        />
      </SearchResultSection>
    </Container>
  );
}
