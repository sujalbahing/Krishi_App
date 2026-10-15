import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { marketPrices } from "../../data/marketprices";
import MarketPriceCard from "./MarketPriceCard";

export default function MarketPriceSection() {
  const router = useRouter();

  return (
    <View className="mt-8 px-5">
      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-[25px] font-bold text-[#1C2D1D]">
            Market prices
          </Text>

          <Text className="mt-0.5 text-[16px] text-[#536353]">
            Change compared with last week
          </Text>
        </View>

        <Pressable
          onPress={() => router.push("/(root)/(tabs)/market" as any)}
          className="ml-2 flex-row items-center"
        >
          <Text className="text-[17px] font-bold text-[#386B2A]">
            See all
          </Text>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#386B2A"
          />
        </Pressable>
      </View>

      {marketPrices.map((item) => (
        <MarketPriceCard key={item.id} item={item} />
      ))}
    </View>
  );
}