import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomePage } from "./Home";

const AuthBottomTabRouter = createBottomTabNavigator<AuthBottomScreensProps>();

export type AuthBottomScreensProps = {
  home: undefined;
};

export function AuthRouter() {
  return (
    <AuthBottomTabRouter.Navigator screenOptions={{ headerShown: false }}>
      <AuthBottomTabRouter.Screen name="home" component={HomePage} />
    </AuthBottomTabRouter.Navigator>
  );
}
