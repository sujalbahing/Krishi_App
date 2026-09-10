import { useSignUp } from "@clerk/expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function VerifyEmail() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState("");

  const isLoading = fetchStatus === "fetching";
  const onVerifyPress = async () => {
    const { error } = await signUp.verifications.verifyEmailCode({
      code,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session.currentTask);
            return;
          }

          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 px-6 pt-20 pb-8">
        {/* Logo */}
        <View className="items-center mb-8">
          <Image
            source={require("../../assets/images/krishi.png")}
            className="w-56 h-36"
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
          Verify Your Email
        </Text>

        <Text className="text-base text-gray-400 text-center mb-8">
          We have sent a code to{" "}
          <Text className="font-bold text-gray-700">{email}</Text>
        </Text>

        {/* OTP */}
        <Text className="text-xl font-bold text-gray-900 mb-2">
          Verification Code
        </Text>

        <TextInput
          className="w-full border border-gray-200 rounded-full px-7 text-base"
          placeholder="Enter verification code"
          style={{
            height: 64,
            paddingVertical: 0,
            lineHeight: 16,
          }}
          placeholderTextColor="#B0B0B0"
          keyboardType="number-pad"
          value={code}
          onChangeText={setCode}
          maxLength={6}
        />

        {errors.fields.code && (
          <Text className="text-red-500 text-sm mt-2">
            {errors.fields.code.message}
          </Text>
        )}

        {/* Verify */}
        <TouchableOpacity
          onPress={onVerifyPress}
          disabled={isLoading}
          className="w-full h-16 bg-[#7FA339] rounded-full items-center justify-center mt-7"
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Verify Now</Text>
          )}
        </TouchableOpacity>

        {/* Resend */}
        <View className="flex-row justify-center items-center mt-7">
          <Text className="text-gray-400">Didn’t you receive any code?</Text>

          <TouchableOpacity
            onPress={() => signUp.verifications.sendEmailCode()}
          >
            <Text className="text-[#7FA339] font-semibold ml-1">
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>

        {/* Start over */}
        <TouchableOpacity
          onPress={() => {
            signUp.reset();
            router.replace("/(auth)/sign-up");
          }}
          className="items-center mt-5"
        >
          <Text className="text-gray-400">Start over</Text>
        </TouchableOpacity>

        <View nativeID="clerk-captcha" />
      </View>
    </ScrollView>
  );
}
