import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { slides } from "../../data/slides";

const { width } = Dimensions.get("window");

export default function Onboarding() {
  const router = useRouter();

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);

    setCurrentIndex(index);
  };

  const handleContinue = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      router.replace("/(auth)/sign-in");
    }
  };

  const handleSignUp = () => {
    router.replace("/(auth)/sign-up");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {/* Header */}
      <View className="items-center pt-5">
        <View className="flex-row items-center">
          {/* Logo Icon */}
          <Image
            source={require("../../assets/images/krishi.png")}
            className="h-20 w-20"
            resizeMode="contain"
          />

          {/* Logo Text */}
          <Text className="ml-3 text-[34px] font-bold tracking-wide text-[#4F873F]">
            KRISHI MITRA
          </Text>
        </View>
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="flex-1"
        renderItem={({ item }) => (
          <View style={{ width }} className="items-center px-5">
            {/* Illustration */}
            <View className="h-[330px] w-full items-center justify-center">
              <Image
                source={item.image}
                className="h-full w-full"
                resizeMode="contain"
              />
            </View>

            {/* Title */}
            <View className="mt-0 px-4">
              <Text className="text-center text-[34px] font-bold leading-[52px] text-black">
                {item.title}
              </Text>
            </View>

            {/* Description */}
            <View className="mt-2 px-5">
              <Text className="text-center text-[18px] leading-[27px] text-[#AAAAAA]">
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />

      {/* Bottom Controls */}
      <View className="px-7 pb-2">
        {/* Pagination */}
        <View className="mb-6 flex-row items-center justify-center gap-3">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`h-3 w-3 rounded-full ${
                currentIndex === index ? "bg-[#7FA339]" : "bg-[#D9D9D9]"
              }`}
            />
          ))}
        </View>

        {/* Continue Button */}
        <Pressable
          onPress={handleContinue}
          className="h-[62px] items-center justify-center rounded-[43px] bg-[#7FA339]"
        >
          <Text className="text-[18px] font-bold text-white">
            {currentIndex === slides.length - 1 ? "Get Started" : "Continue"}
          </Text>
        </Pressable>

        {/* Sign Up Button */}
        <Pressable
          onPress={handleSignUp}
          className="mt-4 h-[62px] items-center justify-center rounded-[43px] border border-[#AAAAAA] bg-white"
        >
          <Text className="text-[18px] font-bold text-black">
            I’m new, sign me up
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
