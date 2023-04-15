import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { ThemeProvider } from "./src/styles/stitches";
import { LoginPage } from "./src/screens/Login";
import { SignUpPage } from "./src/screens/SignUp";

const RootStack = createNativeStackNavigator();

export type RootStackScreensParams = {
  login: undefined;
  "sign-up": undefined;
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar />
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="login" component={LoginPage} />
          <RootStack.Screen name="sign-up" component={SignUpPage} />
        </RootStack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
