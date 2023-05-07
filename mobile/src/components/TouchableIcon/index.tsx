import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export interface TouchableIconProps {
  isFocused?: boolean;
  onPress?: () => void;
  Icon?: React.FC<{ color: string }>;
}

export function TouchableIcon({
  Icon,
  isFocused,
  onPress,
}: TouchableIconProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      {Icon ? (
        <Icon color={isFocused ? "#ffffff" : "#a0a0a0"} />
      ) : (
        <AntDesign
          color={isFocused ? "#ffffff" : "#a0a0a0"}
          size={32}
          name="question"
        />
      )}
    </TouchableOpacity>
  );
}
