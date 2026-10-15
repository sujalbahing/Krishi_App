import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function HomeHeader() {
  return (
    <View className="relative mb-[-75px] rounded-b-[32px] bg-[#386B2A] px-5 pb-[95px] pt-4">
      <View className="flex-row items-center justify-between">
        {/* Greeting and Location */}
        <View className="flex-1">
          <Text className="text-[27px] font-bold tracking-tight text-white">
            Hello, Sujal
          </Text>

          <View className="mt-1 flex-row items-center">
            <Ionicons
              name="location-outline"
              size={17}
              color="#FFFFFF"
            />

            <Text className="ml-1 text-[15px] font-medium text-white">
              Dharan
            </Text>
          </View>
        </View>

        {/* Notifications */}
        <Pressable
          onPress={() => {
            // TODO: Open the notifications screen.
          }}
          className="relative h-12 w-12 items-center justify-center rounded-full bg-[#588348]"
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#FFFFFF"
          />

          {/* Notification Badge */}
          <View className="absolute -right-1 -top-1 h-5 min-w-5 items-center justify-center rounded-full bg-[#FFBE00] px-1">
            <Text className="text-[11px] font-bold text-[#1C2D1D]">
              2
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}