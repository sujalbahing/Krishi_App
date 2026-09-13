import { useSignIn } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
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

export default function ResetPassword() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const onResetPasswordPress = async () => {
    if (!password) {
      alert("Please enter your new password.");
      return;
    }

    if (!confirmPassword) {
      alert("Please confirm your new password.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const { error } = await signIn.resetPasswordEmailCode.submitPassword({
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (signIn.status === "complete") {
      const { error: finalizeError } = await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log("Current session task:", session.currentTask);
            return;
          }

          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });

      if (finalizeError) {
        alert(finalizeError.message);
        return;
      }

      return;
    }

    alert("Password reset successfully. Please log in again.");
    router.replace("/(auth)/sign-in");
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
          <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
            Reset Your Password
          </Text>

          <Text className="text-base text-gray-400 text-center mb-9">
            Create a new password for your Krishi Mitra account.
          </Text>

          {/* New Password */}
          <Text className="text-xl font-bold text-gray-900 mb-2 ml-1">
            New Password
          </Text>

          <View className="relative">
            <TextInput
              className="w-full border border-gray-200 rounded-full px-7 pr-16 text-base text-gray-800"
              placeholder="Enter your new password"
              style={{
                height: 64,
                paddingVertical: 0,
                lineHeight: 16,
              }}
              placeholderTextColor="#B0B0B0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-6 top-1 h-16 items-center justify-center"
            >
              <Ionicons
                name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                size={23}
                color="#B0B0B0"
              />
            </TouchableOpacity>
          </View>

          {errors.fields.password && (
            <Text className="text-red-500 text-sm mt-1 ml-2">
              {errors.fields.password.message}
            </Text>
          )}

          {/* Confirm Password */}
          <Text className="text-xl font-bold text-gray-900 mt-5 mb-2 ml-1">
            Confirm Password
          </Text>

          <View className="relative">
            <TextInput
              className="w-full border border-gray-200 rounded-full px-7 pr-16 text-base text-gray-800"
              placeholder="Confirm your new password"
              style={{
                height: 64,
                paddingVertical: 0,
                lineHeight: 16,
              }}
              placeholderTextColor="#B0B0B0"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!confirmPasswordVisible}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <TouchableOpacity
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              className="absolute right-6 top-1 h-16 items-center justify-center"
            >
              <Ionicons
                name={
                  confirmPasswordVisible ? "eye-outline" : "eye-off-outline"
                }
                size={23}
                color="#B0B0B0"
              />
            </TouchableOpacity>
          </View>

          {/* Reset Button */}
          <TouchableOpacity
            onPress={onResetPasswordPress}
            disabled={isLoading}
            className="w-full bg-[#7FA339] h-16 rounded-full items-center justify-center mt-7"
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">
                Reset Password
              </Text>
            )}
          </TouchableOpacity>

          <View nativeID="clerk-captcha" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
