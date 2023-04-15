import { View } from "react-native";
import { format } from "date-fns";
import { styled } from "../../styles/stitches";
import { Heading } from "../Heading";
import { Text } from "../Text";

interface ClassroomCardProps {
  name: string;
  groupName?: string;
  startsAt: Date;
  endsAt: Date;
}

const Container = styled(View, {
  paddingHorizontal: 8,
  backgroundColor: "$gray800",
  borderRadius: 8,
  gap: 4,
  paddingVertical: 24,
  overflow: "hidden",
});

const DateFlag = styled(Text, {
  position: "absolute",
  top: 0,
  right: 0,
  backgroundColor: "$purple700",
  padding: 2,
  borderBottomLeftRadius: 8,
});

export function ClassroomCard({
  endsAt,
  name,
  startsAt,
  groupName,
}: ClassroomCardProps) {
  return (
    <Container>
      <DateFlag>
        {format(startsAt, "HH':'mm")} - {format(endsAt, "HH':'mm")}
      </DateFlag>
      <Heading size="sm" css={{ fontWeight: "bold" }}>
        {name}
      </Heading>
      <Text css={{ color: "$gray500" }}>{groupName}</Text>
    </Container>
  );
}
