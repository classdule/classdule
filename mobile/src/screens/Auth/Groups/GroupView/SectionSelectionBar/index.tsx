import { View } from "react-native";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Section } from "..";
import { styled } from "../../../../../styles/stitches";
import { Text } from "../../../../../components/Text";
import {
  TouchableIcon,
  TouchableIconProps,
} from "../../../../../components/TouchableIcon";

const Container = styled(View, {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 36,
});

interface SectionSelectionBarProps {
  currentSection: Section;
  setSection: (section: Section) => void;
}

const MembersIcon: TouchableIconProps["Icon"] = ({ color }) => {
  return <Ionicons color={color} size={40} name="people-outline" />;
};
const ClassroomsIcon: TouchableIconProps["Icon"] = ({ color }) => {
  return <AntDesign color={color} size={40} name="book" />;
};
const EducatorsIcon: TouchableIconProps["Icon"] = ({ color }) => {
  return (
    <MaterialCommunityIcons
      color={color}
      size={40}
      name="book-education-outline"
    />
  );
};

export function SectionSelectionBar({
  currentSection,
  setSection,
}: SectionSelectionBarProps) {
  return (
    <Container>
      <TouchableIcon
        Icon={ClassroomsIcon}
        isFocused={currentSection === "classrooms"}
        onPress={() => setSection("classrooms")}
      />
      <TouchableIcon
        Icon={MembersIcon}
        isFocused={currentSection === "members"}
        onPress={() => setSection("members")}
      />
      <TouchableIcon
        Icon={EducatorsIcon}
        isFocused={currentSection === "educators"}
        onPress={() => setSection("educators")}
      />
    </Container>
  );
}
