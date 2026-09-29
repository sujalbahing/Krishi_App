import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { slides } from "../../data/slides";
import { useFonts } from "expo-font";

export default function Onboarding() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  const [fontsLoaded, fontError] = useFonts({
    K2DBold: require("../../assets/fonts/K2D-Bold.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const logoFontFamily = fontsLoaded ? "K2DBold" : undefined;

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

  const illustrationHeight = Math.min(Math.max(height * 0.32, 200), 320);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View className="items-center pt-5 px-6 pl-10">
        <View className="flex-row items-center w-full">
          <Image
            source={require("../../assets/images/krishi.png")}
            className="h-20 w-20"
            resizeMode="contain"
          />

          <Text
            style={{
              fontFamily: logoFontFamily,
              fontSize: 34,
              letterSpacing: 1,
              color: "#4F873F",
              marginLeft: 12,
              flexShrink: 1,
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
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
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={{ width }} className="flex-1 items-center px-5">
            {/* Illustration */}
            <View
              className="w-full items-center justify-center"
              style={{
                height: illustrationHeight,
              }}
            >
              <Image
                source={item.image}
                className="h-full w-full"
                resizeMode="contain"
              />
            </View>

            {/* Title */}
            <View className="mt-2 px-4">
              <Text
                className="text-center text-[34px] font-bold leading-[52px] text-black"
                allowFontScaling
              >
                {item.title}
              </Text>
            </View>

            {/* Description */}
            <View className="mt-2 px-5">
              <Text
                className="text-center text-[18px] leading-[27px] text-[#AAAAAA]"
                allowFontScaling
              >
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />

      {/* Bottom Controls */}
      <View className="px-7 pb-9">
        {/* Pagination */}
        <View className="mb-9 flex-row items-center justify-center gap-3">
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
