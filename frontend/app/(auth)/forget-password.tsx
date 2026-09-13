import { useSignIn } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useResetPasswordStore } from "../../store/reset-password-store";

export default function ForgetPassword() {
  const { signIn, fetchStatus } = useSignIn();
  const router = useRouter();

  const [email, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");

  const setEmail = useResetPasswordStore((state) => state.setEmail);

  const onForgetPasswordPress = async () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    const { error } = await signIn.create({
      identifier: email.trim(),
    });

    if (error) {
      setEmailError(error.message);
      return;
    }

    const { error: sendCodeError } =
      await signIn.resetPasswordEmailCode.sendCode();

    if (sendCodeError) {
      alert(sendCodeError.message);
      return;
    }

    setEmail(email.trim());
    router.push("/(auth)/verify-reset-code");
  };

  const isLoading = fetchStatus === "fetching";

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="bg-white"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 pt-20 pb-8">
          {/* Logo */}
          <View className="items-center mb-5">
            <Image
              source={require("../../assets/images/krishi.png")}
              className="w-72 h-48"
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
            Forgot Password?
          </Text>

          <Text className="text-base text-gray-400 text-center mb-9">
            Enter your email account to reset password.
          </Text>

          {/* Email */}
          <Text className="text-xl font-bold text-gray-900 mb-2 ml-1">
            Email
          </Text>

          <TextInput
            className="w-full border border-gray-200 rounded-full px-7 text-base text-gray-800"
            placeholder="Enter your Email"
            style={{
              height: 64,
              paddingVertical: 0,
              lineHeight: 16,
            }}
            placeholderTextColor="#B0B0B0"
            value={email}
            onChangeText={(text) => {
              setEmailInput(text);
              setEmailError("");
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {emailError && (
            <Text className="text-red-500 text-sm mt-1 ml-2">{emailError}</Text>
          )}

          {/* Send Code */}
          <TouchableOpacity
            onPress={onForgetPasswordPress}
            disabled={isLoading}
            className="w-full bg-[#7FA339] h-16 rounded-full items-center justify-center mt-7 mb-7"
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">Confirm</Text>
            )}
          </TouchableOpacity>

          {/* Back to Login */}
          <View className="flex-row justify-center items-center mt-2">
            <Text className="text-gray-400 text-base">
              Remember your password?
            </Text>

            <Link href="/sign-in" asChild>
              <TouchableOpacity>
                <Text className="text-[#7FA339] font-semibold text-base ml-1 underline">
                  Log In
                </Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View nativeID="clerk-captcha" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
