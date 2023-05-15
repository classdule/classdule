import { View } from "react-native";
import type { Classroom } from "../../../../../types/entities/classroom";
import { styled } from "../../../../../styles/stitches";
import { ClassroomCard } from "../../../../../components/ClassroomCard";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { type GroupsScreensParams } from "../..";
import { useEffect } from "react";

const Container = styled(View, {});

interface ClassroomsSectionProps {
  classrooms: Classroom[];
}
export function ClassroomsSection(props: ClassroomsSectionProps) {
  const navigation =
    useNavigation<NavigationProp<GroupsScreensParams, "view">>();
  return (
    <Container>
      {props.classrooms.map((classroom) => {
        return (
          <ClassroomCard
            key={classroom.name}
            name={classroom.name}
            startsAt={classroom.startsAt}
            endsAt={classroom.endsAt}
            onPress={() => {
              navigation.navigate("viewClassroom", {
                classroomId: classroom.id,
              });
            }}
          />
        );
      })}
    </Container>
  );
}
