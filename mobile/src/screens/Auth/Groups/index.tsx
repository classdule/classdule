import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabBarIconProps } from "../../../types/tabBarIconProps";
import { getIsFocusedIconColor } from "../../../lib/utils/getIsFocusedIconColor";
import { ListGroupsPage } from "./ListGroups";
import { CreateGroupPage } from "./CreateGroup";

export const GroupsTabBarIcon = ({ isFocused }: TabBarIconProps) => (
  <Ionicons
    name="people-sharp"
    color={getIsFocusedIconColor(isFocused)}
    size={32}
  />
);

export type GroupsScreensParams = {
  "list-groups": undefined;
  "create-group": undefined;
};

const Stack = createNativeStackNavigator<GroupsScreensParams>();

export function GroupsRouter() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="list-groups" component={ListGroupsPage} />
      <Stack.Screen name="create-group" component={CreateGroupPage} />
    </Stack.Navigator>
  );
}
