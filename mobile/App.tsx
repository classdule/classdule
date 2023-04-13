import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import { styled } from "stitches-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const HomeContainer = styled(SafeAreaView, {
  backgroundColor: "#1E1E21",
  flex: 1,
});
const HomeTitle = styled(Text, {
  color: "#4117E9",
  fontSize: 24,
  fontWeight: "bold",
  alignSelf: "center",
});

const Home = () => {
  return (
    <HomeContainer>
      <HomeTitle>This is Classdule</HomeTitle>
    </HomeContainer>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
