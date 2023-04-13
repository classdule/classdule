import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import { styled } from "stitches-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ThemeProvider } from "./src/styles/stitches";
import { LoginPage } from "./src/screens/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home" component={LoginPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
