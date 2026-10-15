import { useRouter } from "expo-router";
import { ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeHeader from "../../../components/home/HomeHeader";
import WeatherCard from "../../../components/home/WeatherCard";
import CategoriesSection from "../../../components/home/CategoriesSection";
import MarketPriceSection from "../../../components/home/MarketPriceSection";

export default function HomeScreen() {
  const router = useRouter();

  const handleCategoryPress = (category: string) => {
    switch (category) {
      case "Market":
        router.push("/(root)/(tabs)/market" as any);
        break;

      case "Services":
        router.push("/(root)/(tabs)/services" as any);
        break;

      case "Profit & Loss":
        router.push("/(root)/(tabs)/calculator" as any);
        break;

      case "Diagnosis":
        router.push("/(root)/(tabs)/diagnosis" as any);
        break;
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#386B2A]"
      edges={["top", "left", "right"]}
    >
      <StatusBar barStyle="light-content" />

      <ScrollView
        className="flex-1 bg-[#F4F6F1]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        // bounces={false}
      >
        <View
          style={{
            position: "absolute",
            top: -1000,
            left: 0,
            right: 0,
            height: 1000,
            backgroundColor: "#386B2A",
          }}
        />
        {/* Header */}
        <HomeHeader />

        {/* Weather and Rain Alert */}
        <WeatherCard />

        {/* Categories */}
        <CategoriesSection onCategoryPress={handleCategoryPress} />

        {/* Market Prices */}
        <MarketPriceSection />
      </ScrollView>
    </SafeAreaView>
  );
}
