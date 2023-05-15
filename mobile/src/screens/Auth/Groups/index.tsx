import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabBarIconProps } from "../../../types/tabBarIconProps";
import { getIsFocusedIconColor } from "../../../lib/utils/getIsFocusedIconColor";
import { ListGroupsScreen } from "./ListGroups";
import { CreateGroupScreen } from "./CreateGroup";
import { SearchGroupsScreen } from "./SearchGroups";
import { GroupViewScreen } from "./GroupView";
import { GroupClassroomScreen } from "./GroupClassroom";

export const GroupsTabBarIcon = ({ isFocused }: TabBarIconProps) => (
  <Ionicons
    name="people-sharp"
    color={getIsFocusedIconColor(isFocused)}
    size={32}
  />
);

export type GroupsScreensParams = {
  list: undefined;
  create: undefined;
  search: undefined;
  view: {
    groupId: string;
  };
  viewClassroom: {
    classroomId: string;
  };
};

const Stack = createNativeStackNavigator<GroupsScreensParams>();

export function GroupsRouter() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="list" component={ListGroupsScreen} />
      <Stack.Screen name="create" component={CreateGroupScreen} />
      <Stack.Screen name="search" component={SearchGroupsScreen} />
      <Stack.Screen name="view" component={GroupViewScreen} />
      <Stack.Screen name="viewClassroom" component={GroupClassroomScreen} />
    </Stack.Navigator>
  );
}
