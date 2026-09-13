import { useAuth, useSignUp } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
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

export default function SignUp() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSignUpPress = async () => {
    if (!fullName.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }
    if (!password) {
      alert("Please enter your password.");
      return;
    }

    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");
    const { error } = await signUp.password({
      emailAddress: email.trim(),
      password,
      firstName,
      lastName,
    });
    if (error) {
      alert(error.message);
      return;
    }
    const { error: verificationError } =
      await signUp.verifications.sendEmailCode();

    if (verificationError) {
      alert(verificationError.message);
      return;
    }
    router.push({
      pathname: "/(auth)/verify-email",
      params: {
        email: email.trim(),
        type: "signup",
      },
    });
  };

  const isLoading = fetchStatus === "fetching";

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  //Sign Up Screen
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
          <View className="items-center mb-2">
            <Image
              source={require("../../assets/images/krishi.png")}
              className="w-56 h-36"
              resizeMode="contain"
            />
          </View>

          <Text className="text-2xl font-bold text-gray-900 text-center mb-1">
            Registration
          </Text>
          <Text className="text-base text-gray-400 text-center mb-5">
            Enter the fields below to get started.
          </Text>

          <Text className="text-xl font-bold text-gray-900 mb-1 ml-1">
            Name
          </Text>
          <TextInput
            className="w-full border border-gray-200 rounded-full px-7 text-base text-gray-800 mb-4"
            placeholder="Enter your Name"
            style={{
              height: 64,
              paddingVertical: 0,
              lineHeight: 16,
            }}
            placeholderTextColor="#B0B0B0"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          <Text className="text-xl font-bold text-gray-900 mb-1 ml-1">
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
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {errors.fields.emailAddress && (
            <Text className="text-red-500 text-sm mt-1 ml-2">
              {errors.fields.emailAddress.message}
            </Text>
          )}

          <Text className="text-xl font-bold text-gray-900 mt-4 mb-1 ml-1">
            Password
          </Text>
          <View className="relative">
            <TextInput
              className="w-full border border-gray-200 rounded-full px-7 pr-16 text-base text-gray-800"
              placeholder="Enter your Password"
              style={{
                height: 64,
                paddingVertical: 0,
                lineHeight: 16,
              }}
              placeholderTextColor="#B0B0B0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
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

          <TouchableOpacity
            onPress={onSignUpPress}
            disabled={isLoading}
            className="w-full bg-[#7FA339] h-16 rounded-full items-center justify-center mt-7 mb-7"
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">Sign Up</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row items-center mb-7">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="text-gray-400 text-sm mx-3">Or Continue with</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Social Icons */}
          <View className="flex-row justify-center items-center mb-8">
            {/* Google */}
            <TouchableOpacity
              className="mx-5 items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons name="logo-google" size={35} color="#4285F4" />
            </TouchableOpacity>

            {/* Apple */}
            <TouchableOpacity
              className="mx-5 items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons name="logo-apple" size={35} color="#000000" />
            </TouchableOpacity>

            {/* Facebook */}
            <TouchableOpacity
              className="mx-5 items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons name="logo-facebook" size={37} color="#1877F2" />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center items-center">
            <Text className="text-gray-400 text-base">
              Already have an account ?
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
