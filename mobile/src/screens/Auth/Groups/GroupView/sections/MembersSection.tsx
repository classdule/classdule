import { View, FlatList } from "react-native";
import type { Member } from "../../../../../types/entities/member";
import { styled } from "../../../../../styles/stitches";
import { Text } from "../../../../../components/Text";

interface MembersSectionProps {
  members: Member[];
}

const StyledList = styled(FlatList, {});

const ItemContainer = styled(View, {
  borderBottomWidth: 1,
  borderBottomColor: "$gray800",
  margin: 4,
});

export function MembersSection({ members }: MembersSectionProps) {
  return (
    <StyledList
      data={members}
      renderItem={({ item }) => {
        return (
          <ItemContainer>
            <Text>{(item as Member).name}</Text>
            <Text size="sm" css={{ color: "$gray300", fontWeight: "300" }}>
              {(item as Member).email}
            </Text>
          </ItemContainer>
        );
      }}
    />
  );
}
