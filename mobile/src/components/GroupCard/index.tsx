import { View } from "react-native";
import { styled } from "../../styles/stitches";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { MembershipStatus } from "../../types/membershipStatus";

interface GroupCardProps {
  groupName: string;
  membershipStatus: MembershipStatus;
}

const Container = styled(View, {
  backgroundColor: "$gray800",
  padding: 8,
  borderRadius: 8,
  flex: 1,
  minWidth: 180,
  alignItems: "flex-start",
});
const MembershipStatusText = styled(Text, {
  borderRadius: 4,
  paddingVertical: 2,
  paddingHorizontal: 4,
  fontWeight: "bold",
  marginTop: 4,
  variants: {
    status: {
      pendind: {
        backgroundColor: "$orange700",
      },
      member: {
        backgroundColor: "$purple700",
      },
    },
  },
});

export function GroupCard({ groupName, membershipStatus }: GroupCardProps) {
  return (
    <Container>
      <Heading>{groupName}</Heading>
      <MembershipStatusText status={membershipStatus}>
        {membershipStatus}
      </MembershipStatusText>
    </Container>
  );
}
