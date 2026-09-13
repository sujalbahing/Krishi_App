import { useSignIn } from "@clerk/expo";
import { useRouter } from "expo-router";
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

export default function VerifyResetCode() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();
  const email = useResetPasswordStore((state) => state.email);

  const [code, setCode] = useState("");

  const isLoading = fetchStatus === "fetching";

  const onVerifyPress = async () => {
    if (!code.trim()) {
      alert("Please enter the verification code.");
      return;
    }

    const { error } = await signIn.resetPasswordEmailCode.verifyCode({
      code: code.trim(),
    });

    if (error) {
      alert(error.message);
      return;
    }

    // Code verified successfully.
    // Now allow the user to create a new password.
    if (signIn.status === "needs_new_password") {
      router.push("/(auth)/reset-password");
    }
  };

  const onResendCode = async () => {
    const { error } = await signIn.resetPasswordEmailCode.sendCode();

    if (error) {
      alert(error.message);
      return;
    }

    alert("A new verification code has been sent to your email.");
  };

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
          <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
            Verify Reset Code
          </Text>

          <Text className="text-base text-gray-400 text-center mb-9">
            We have sent a code to{" "}
            <Text className="font-bold text-gray-700">{email}</Text>
          </Text>

          {/* Verification Code */}
          <Text className="text-xl font-bold text-gray-900 mb-2 ml-1">
            Verification Code
          </Text>

          <TextInput
            className="w-full border border-gray-200 rounded-full px-7 text-base text-gray-800"
            placeholder="Enter verification code"
            style={{
              height: 64,
              paddingVertical: 0,
              lineHeight: 16,
            }}
            placeholderTextColor="#B0B0B0"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {errors.fields.code && (
            <Text className="text-red-500 text-sm mt-1 ml-2">
              {errors.fields.code.message}
            </Text>
          )}

          {/* Verify Button */}
          <TouchableOpacity
            onPress={onVerifyPress}
            disabled={isLoading}
            className="w-full bg-[#7FA339] h-16 rounded-full items-center justify-center mt-7"
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">Verify Code</Text>
            )}
          </TouchableOpacity>

          {/* Resend Code */}
          <View className="flex-row justify-center items-center mt-7">
            <Text className="text-gray-400 text-base">
              Didn&apos;t receive the code?
            </Text>

            <TouchableOpacity onPress={onResendCode} disabled={isLoading}>
              <Text className="text-[#7FA339] font-semibold text-base ml-1">
                Resend Code
              </Text>
            </TouchableOpacity>
          </View>

          <View nativeID="clerk-captcha" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
