import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomePage } from "./Home";
import { BottomTabBar } from "../../components/BottomTabBar";
import { GroupsPage } from "./Groups";
import { CalendarPage } from "./Calendar";

const AuthBottomTabRouter = createBottomTabNavigator<AuthBottomScreensProps>();

export type AuthBottomScreensProps = {
  home: undefined;
  groups: undefined;
  calendar: undefined;
};
export type AuthBottomTabScreen = keyof AuthBottomScreensProps;

export function AuthRouter() {
  return (
    <AuthBottomTabRouter.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <AuthBottomTabRouter.Screen name="home" component={HomePage} />
      <AuthBottomTabRouter.Screen name="groups" component={GroupsPage} />
      <AuthBottomTabRouter.Screen name="calendar" component={CalendarPage} />
    </AuthBottomTabRouter.Navigator>
  );
}
