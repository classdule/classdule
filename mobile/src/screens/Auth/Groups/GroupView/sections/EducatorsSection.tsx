import { View, FlatList } from "react-native";
import { styled } from "../../../../../styles/stitches";
import { Text } from "../../../../../components/Text";

interface Educator {
  name: string;
  email: string;
}

interface EducatorsSectionProps {
  educators: Educator[];
}

const StyledList = styled(FlatList, {
  marginTop: 24,
});

const ItemContainer = styled(View, {
  borderBottomWidth: 1,
  borderBottomColor: "$gray800",
  margin: 4,
});

export function EducatorsSection({ educators }: EducatorsSectionProps) {
  return (
    <StyledList
      data={educators}
      renderItem={({ item }) => {
        return (
          <ItemContainer>
            <Text>{(item as Educator).name}</Text>
            <Text size="sm" css={{ color: "$gray300", fontWeight: "300" }}>
              {(item as Educator).email}
            </Text>
          </ItemContainer>
        );
      }}
    />
  );
}
