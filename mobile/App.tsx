import { StatusBar } from "expo-status-bar";
import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { ThemeProvider } from "./src/styles/stitches";
import { LoginScreen } from "./src/screens/Login";
import { SignUpScreen } from "./src/screens/SignUp";
import { AuthBottomScreensProps, AuthRouter } from "./src/screens/Auth";

const RootStack = createNativeStackNavigator<RootStackScreensParams>();

export type RootStackScreensParams = {
  login: undefined;
  "sign-up": undefined;
  auth: NavigatorScreenParams<AuthBottomScreensProps>;
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar />
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="login" component={LoginScreen} />
          <RootStack.Screen name="sign-up" component={SignUpScreen} />
          <RootStack.Screen name="auth" component={AuthRouter} />
        </RootStack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
