import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "./Home";
import { BottomTabBar } from "../../components/BottomTabBar";
import { GroupsRouter } from "./Groups";
import { CalendarScreen } from "./Calendar";
import { SettingsScreen } from "./Settings";

const AuthBottomTabRouter = createBottomTabNavigator<AuthBottomScreensProps>();

export type AuthBottomScreensProps = {
  home: undefined;
  groups: undefined;
  calendar: undefined;
  settings: undefined;
};
export type AuthBottomTabScreen = keyof AuthBottomScreensProps;

export function AuthRouter() {
  return (
    <AuthBottomTabRouter.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <AuthBottomTabRouter.Screen name="home" component={HomeScreen} />
      <AuthBottomTabRouter.Screen name="calendar" component={CalendarScreen} />
      <AuthBottomTabRouter.Screen name="groups" component={GroupsRouter} />
      <AuthBottomTabRouter.Screen name="settings" component={SettingsScreen} />
    </AuthBottomTabRouter.Navigator>
  );
}
