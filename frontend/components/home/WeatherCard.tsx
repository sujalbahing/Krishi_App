import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function WeatherCard() {
  return (
    <View
      className="mx-5 rounded-3xl bg-white p-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 3,
      }}
    >
      {/* Weather Summary */}
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-[36px] font-bold leading-[52px] tracking-tight text-[#1C2D1D]">
            26°C
          </Text>

          <Text className="mt-1 text-[17px] font-semibold text-[#1C2D1D]">
            Mostly sunny
          </Text>

          <Text className="mt-1 text-sm text-[#536353]">
            High 32° · Low 18°
          </Text>
        </View>

        <View className="mr-1 items-center justify-center">
          <MaterialCommunityIcons
            name="weather-partly-cloudy"
            size={68}
            color="#F9B900"
          />
        </View>
      </View>

      {/* Weather Alert */}
      <Pressable
        onPress={() => {
          // TODO: Open weather forecast and farming recommendations.
        }}
        className="mt-4 flex-row items-center rounded-2xl bg-[#FFF5D9] px-3 py-3"
      >
        <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-[#FFCF4A]">
          <MaterialCommunityIcons
            name="weather-pouring"
            size={25}
            color="#503400"
          />
        </View>

        <View className="flex-1">
          <Text className="text font-bold leading-5 text-[#533800]">
            Heavy rain expected Sun–Mon
          </Text>

          <Text className="mt-1 text-sm leading-[18px] text-[#684C12]">
            Harvest ready crops before Sunday
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={19}
          color="#533800"
        />
      </Pressable>
    </View>
  );
}