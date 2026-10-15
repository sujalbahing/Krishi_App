import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type CategoryProps = {
  title: string;
  icon: React.ComponentProps<
    typeof MaterialCommunityIcons
  >["name"];
  onPress: () => void;
};

export default function CategoryButton({
  title,
  icon,
  onPress,
}: CategoryProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center rounded-[25px] bg-white px-2 py-4"
      style={({ pressed }) => ({
        opacity: pressed ? 0.75 : 1,
        minHeight: 155,
      })}
    >
      <View className="mb-3 h-[68px] w-[68px] items-center justify-center rounded-[22px] bg-[#E8F1E2]">
        <MaterialCommunityIcons
          name={icon}
          size={34}
          color="#386B2A"
        />
      </View>

      <Text className="text-center text-[13px] font-semibold leading-5 text-[#1C2D1D]">
        {title}
      </Text>
    </Pressable>
  );
}