import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "../../../../styles/stitches";
import { Text } from "../../../../components/Text";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GroupsScreensParams } from "..";
import { Heading } from "../../../../components/Heading";
import { MembersSection } from "./sections/MembersSection";

import { Button } from "../../../../components/Button";
import { useState } from "react";
import { SectionSelectionBar } from "./SectionSelectionBar";
import { EducatorsSection } from "./sections/EducatorsSection";
import { ClassroomsSection } from "./sections/ClassroomsSection";

const Container = styled(SafeAreaView, {
  backgroundColor: "$gray900",
  flex: 1,
  paddingHorizontal: 24,
  paddingVertical: 16,
});

export type Section = "classrooms" | "members" | "educators";

type ScreenProps = NativeStackScreenProps<GroupsScreensParams, "view">;
export function GroupViewScreen({ route }: ScreenProps) {
  const [currentSection, setCurrentSection] = useState<Section>("classrooms");
  return (
    <Container>
      <Heading size="lg" css={{ fontWeight: "bold" }}>
        Estudantes de exatas
      </Heading>
      <Text css={{ fontWeight: "300", color: "$gray300", marginTop: 16 }}>
        Grupo dedicado a nos aprofundar nesta incrível matéria.
      </Text>
      <Text
        css={{ fontWeight: "300", color: "$gray300", alignSelf: "flex-end" }}
      >
        Criador: Manuel Teixeira
      </Text>

      <SectionSelectionBar
        currentSection={currentSection}
        setSection={setCurrentSection}
      />

      {currentSection === "members" ? (
        <MembersSection
          members={[
            {
              email: "email@email.com",
              name: "name",
            },
            {
              email: "email@email.com",
              name: "name2",
            },
          ]}
        />
      ) : currentSection === "educators" ? (
        <EducatorsSection
          educators={[
            {
              email: "admin@gmail.com",
              name: "ADM",
            },
          ]}
        />
      ) : (
        <ClassroomsSection
          classrooms={[
            {
              endsAt: new Date(),
              name: "Aula de matemática",
              startsAt: new Date(),
            },
          ]}
        />
      )}
    </Container>
  );
}
