import { View } from "react-native";
import { styled } from "../../styles/stitches";
import { Text } from "../Text";
import { Heading } from "../Heading";
import { TouchableOpacity } from "react-native";

interface GroupSearchResultProps {
  groupName: string;
  groupId: string;
  groupDescription: string;
  onJoinButtonPressed?: () => void;
}

const Container = styled(View, {
  backgroundColor: "$gray800",
  borderRadius: 8,
  padding: 8,
  alignItems: "flex-start",
  gap: 4,
});

const IdText = styled(Text, {
  color: "$gray500",
  fontSize: 12,
});
const NameText = styled(Heading, {
  color: "$gray200",
  fontSize: 20,
  fontWeight: "bold",
});
const DescriptionText = styled(Text, {
  color: "$gray300",
  fontSize: 14,
});

const JoinButton = styled(TouchableOpacity, {
  backgroundColor: "$purple700",
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 4,
});

export function GroupSearchResult({
  groupDescription,
  groupId,
  groupName,
  onJoinButtonPressed,
}: GroupSearchResultProps) {
  return (
    <Container>
      <NameText>{groupName}</NameText>
      <IdText>{groupId}</IdText>
      <DescriptionText>{groupDescription}</DescriptionText>
      <JoinButton onPress={onJoinButtonPressed}>
        <Text>Entrar</Text>
      </JoinButton>
    </Container>
  );
}
