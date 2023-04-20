import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { AntDesign } from "@expo/vector-icons";

import { TouchableOpacity, View } from "react-native";
import { styled } from "../../styles/stitches";
import { HomeTabBarIcon } from "../../screens/Auth/Home";
import { GroupsTabBarIcon } from "../../screens/Auth/Groups";
import { AuthBottomTabScreen } from "../../screens/Auth";
import { FC, useCallback, useMemo } from "react";

const Container = styled(View, {
  width: "100%",
  backgroundColor: "$gray900",
  paddingVertical: 16,
  paddingHorizontal: 24,
  flexDirection: "row",
  justifyContent: "space-between",
  borderTopColor: "$gray800",
  borderWidth: 1,
});

const iconsByRouteName = new Map<
  AuthBottomTabScreen,
  FC<{ isFocused: boolean }>
>([
  ["home", HomeTabBarIcon],
  ["groups", GroupsTabBarIcon],
]);

export function BottomTabBar({ navigation, state }: BottomTabBarProps) {
  return (
    <Container>
      {state.routes.map((route, index) => {
        const isFocused = useMemo(() => index === state.index, [state, index]);

        const RouteIcon = iconsByRouteName.get(
          route.name as AuthBottomTabScreen
        );
        const onPress = useCallback(() => {
          const event = navigation.emit({
            target: route.key,
            type: "tabPress",
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        }, [navigation, isFocused, route]);

        const onLongPress = useCallback(() => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        }, [navigation]);

        return (
          <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.key}
          >
            {!!RouteIcon ? (
              <RouteIcon isFocused={isFocused} />
            ) : (
              <AntDesign
                color={isFocused ? "#ffffff" : "#a0a0a0"}
                size={32}
                name="question"
              />
            )}
          </TouchableOpacity>
        );
      })}
    </Container>
  );
}
