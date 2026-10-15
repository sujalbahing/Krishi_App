import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { marketPrices } from "../../data/marketprices";

type MarketPrice = (typeof marketPrices)[number];

type Props = {
  item: MarketPrice;
};

export default function MarketPriceCard({ item }: Props) {
  const isRising = item.trend === "up";

  return (
    <Pressable
      onPress={() => {
        // TODO: Navigate to the crop price details screen.
      }}
      className="mb-3 flex-row items-center rounded-[20px] bg-white px-3 py-3"
      style={({ pressed }) => ({
        opacity: pressed ? 0.85 : 1,
        minHeight: 82,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.035,
        shadowRadius: 4,
        elevation: 1,
      })}
    >
      {/* Crop Icon */}
      <View
        className="mr-3 h-[54px] w-[54px] items-center justify-center rounded-2xl"
        style={{ backgroundColor: item.iconBackground }}
      >
        <MaterialCommunityIcons
          name={item.icon as any}
          size={28}
          color={item.iconColor}
        />
      </View>

      {/* Crop Information */}
      <View className="flex-1 justify-center">
        <Text
          numberOfLines={1}
          className="text-[16px] font-bold text-[#1C2D1D]"
        >
          {item.name}
        </Text>

        <Text
          numberOfLines={1}
          className="mt-0.5 text-[13px] text-[#536353]"
        >
          {item.market}
        </Text>
      </View>

      {/* Price and Trend */}
      <View className="ml-2 items-end justify-center">
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.85}
          className="text-[16px] font-bold text-[#1C2D1D]"
        >
          Rs. {item.price}/kg
        </Text>

        <View className="mt-1 flex-row items-center justify-end">
          <View
            className="flex-row items-center rounded-full px-1.5 py-0.5"
            style={{
              backgroundColor: isRising ? "#E1F3E4" : "#FDE7E4",
            }}
          >
            <Ionicons
              name={isRising ? "arrow-up" : "arrow-down"}
              size={11}
              color={isRising ? "#267A36" : "#C92D22"}
            />

            <Text
              className="ml-0.5 text-[11px] font-bold"
              style={{
                color: isRising ? "#267A36" : "#C92D22",
              }}
            >
              {item.change}
            </Text>
          </View>

          <Text
            numberOfLines={1}
            className="ml-1.5 text-[10px] text-[#536353]"
          >
            Was Rs. {item.previousPrice}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}