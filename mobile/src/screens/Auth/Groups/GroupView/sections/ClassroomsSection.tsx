import { View } from "react-native";
import { styled } from "../../../../../styles/stitches";
import { ClassroomCard } from "../../../../../components/ClassroomCard";

interface Classroom {
  name: string;
  startsAt: Date;
  endsAt: Date;
}

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
