import { useSignIn } from "@clerk/expo";
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

export default function SignIn() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSignInPress = async () => {
    const { error } = await signIn.password({
      emailAddress: email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    } else if (signIn.status === "needs_second_factor") {
      await signIn.mfa.sendPhoneCode();
    } else if (signIn.status === "needs_client_trust") {
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === "email_code",
      );
      if (emailCodeFactor) {
        const { error: verificationError } = await signIn.mfa.sendEmailCode();
        if (verificationError) {
          alert(verificationError.message);
          return;
        }
        router.push({
          pathname: "/(auth)/verify-email",
          params: {
            email,
            type: "signin",
          },
        });
      }
    }
  };

  const isLoading = fetchStatus === "fetching";

  //Sign In Screen
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

          <Text className="text-2xl font-bold text-gray-900 text-center mb-1">
            Welcome to Krishi Mitra
          </Text>
          <Text className="text-base text-gray-400 text-center mb-9">
            Your trusted companion for smarter farming.
          </Text>

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
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {errors.fields.identifier && (
            <Text className="text-red-500 text-sm mt-1 ml-2">
              {errors.fields.identifier.message}
            </Text>
          )}

          <Text className="text-xl font-bold text-gray-900 mt-4 mb-2 ml-1">
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

            <View className="flex-row justify-end items-center mt-2 pr-1">
              <Link href="/forget-password" asChild>
                <TouchableOpacity>
                  <Text className="text-[#7FA339] font-semibold text-base ml-1">
                    Forget Password?
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>

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
            onPress={onSignInPress}
            disabled={isLoading}
            className="w-full bg-[#7FA339] h-16 rounded-full items-center justify-center mt-7 mb-7"
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">LogIn</Text>
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
              Don&apos;t have an account
            </Text>

            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text className="text-[#7FA339] font-semibold text-base ml-1 underline">
                  Sign Up
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
