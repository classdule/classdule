import { View } from "react-native";
import type { Classroom } from "../../../../../types/entities/classroom";
import { styled } from "../../../../../styles/stitches";
import { ClassroomCard } from "../../../../../components/ClassroomCard";

const Container = styled(View, {
  marginTop: 24,
});

interface ClassroomsSectionProps {
  classrooms: Classroom[];
}
export function ClassroomsSection(props: ClassroomsSectionProps) {
  return (
    <Container>
      {props.classrooms.map((classroom) => {
        return (
          <ClassroomCard
            key={classroom.name}
            name={classroom.name}
            startsAt={classroom.startsAt}
            endsAt={classroom.endsAt}
          />
        );
      })}
    </Container>
  );
}
