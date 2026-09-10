import { useAuth, useSignUp } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
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

export default function SignUp() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const onSignUpPress = async () => {
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    const { error } = await signUp.password({
      emailAddress: email,
      password,
      firstName,
      lastName,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (!error) await signUp.verifications.sendEmailCode();
  };

  const onVerifyPress = async () => {
    await signUp.verifications.verifyEmailCode({
      code,
    });

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }

          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    } else {
      console.error("Sign-up attempt not complete:", signUp);
    }
  };

  const isLoading = fetchStatus === "fetching";

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  // ============================================================
  // OTP VERIFICATION SCREEN
  // ============================================================

  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="bg-white"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 py-12">
          {/* Logo */}
          <View className="items-center mb-8">
            <Image
              source={require("../../assets/images/krishi.png")}
              className="w-44 h-28"
              resizeMode="contain"
            />
          </View>

          {/* Heading */}
          <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
            Verify Your Account
          </Text>

          <Text className="text-base text-gray-400 text-center mb-10">
            We have sent a verification code to
          </Text>

          <Text className="text-base font-semibold text-gray-700 text-center mb-8">
            {email}
          </Text>

          {/* OTP Label */}
          <Text className="text-xl font-bold text-gray-900 mb-3">
            Verification Code
          </Text>

          {/* OTP Input */}
          <TextInput
            className="w-full border border-gray-200 rounded-full px-6 py-4 text-base mb-2"
            placeholder="Enter verification code"
            placeholderTextColor="#B0B0B0"
            keyboardType="number-pad"
            value={code}
            onChangeText={setCode}
            maxLength={6}
          />

          {errors.fields.code && (
            <Text className="text-red-500 text-sm mb-4">
              {errors.fields.code.message}
            </Text>
          )}

          {/* Verify Button */}
          <TouchableOpacity
            onPress={onVerifyPress}
            disabled={isLoading}
            className="w-full bg-[#7FA339] py-4 rounded-full items-center mt-5 mb-6"
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-base">Verify Now</Text>
            )}
          </TouchableOpacity>

          {/* Resend */}
          <View className="items-center">
            <Text className="text-gray-400 text-sm mb-1">
              
            </Text>

            <TouchableOpacity
              onPress={() => signUp.verifications.sendEmailCode()}
              className="py-2"
            >
              <Text className="text-[#7FA339] font-semibold">Resend Code</Text>
            </TouchableOpacity>
          </View>

          {/* Start Over */}
          <TouchableOpacity
            onPress={() => signUp.reset()}
            className="items-center mt-4"
          >
            <Text className="text-gray-400 text-sm">Start over</Text>
          </TouchableOpacity>

          <View nativeID="clerk-captcha" />
        </View>
      </ScrollView>
    );
  }

  // ============================================================
  // SIGN UP SCREEN
  // ============================================================

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 px-6 pt-16 pb-8">
        {/* ======================================================
            LOGO
        ====================================================== */}

        <View className="items-center mb-5">
          <Image
            source={require("../../assets/images/krishi.png")}
            className="w-44 h-28"
            resizeMode="contain"
          />
        </View>

        {/* ======================================================
            TITLE
        ====================================================== */}

        <Text className="text-3xl font-bold text-gray-900 text-center mb-1">
          Registration
        </Text>

        <Text className="text-base text-gray-400 text-center mb-9">
          Enter the fields below to get started.
        </Text>

        {/* ======================================================
            NAME
        ====================================================== */}

        <Text className="text-xl font-bold text-gray-900 mb-2 ml-1">Name</Text>

        <TextInput
          className="w-full h-16 border border-gray-200 rounded-full px-7 text-base text-gray-800 mb-4"
          placeholder="Enter your Name"
          placeholderTextColor="#B0B0B0"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />

        {/* ======================================================
            EMAIL
        ====================================================== */}

        <Text className="text-xl font-bold text-gray-900 mb-2 ml-1">Email</Text>

        <TextInput
          className="w-full h-16 border border-gray-200 rounded-full px-7 text-base text-gray-800"
          placeholder="Enter your Email"
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

        {/* ======================================================
            PASSWORD
        ====================================================== */}

        <Text className="text-xl font-bold text-gray-900 mt-4 mb-2 ml-1">
          Password
        </Text>

        <TextInput
          className="w-full h-16 border border-gray-200 rounded-full px-7 text-base text-gray-800"
          placeholder="Enter your Password"
          placeholderTextColor="#B0B0B0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {errors.fields.password && (
          <Text className="text-red-500 text-sm mt-1 ml-2">
            {errors.fields.password.message}
          </Text>
        )}

        {/* ======================================================
            REMEMBER ME
        ====================================================== */}

        {/* <View className="flex-row items-center mt-4 ml-2">
          <View className="w-5 h-5 border border-gray-400 rounded-md items-center justify-center">
            <Ionicons name="checkmark" size={15} color="#777777" />
          </View>

          <Text className="text-gray-400 text-sm ml-2">Remember me</Text>
        </View> */}

        {/* ======================================================
            SIGN UP BUTTON
        ====================================================== */}

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

        {/* ======================================================
            SOCIAL DIVIDER
        ====================================================== */}

        <View className="flex-row items-center mb-7">
          <View className="flex-1 h-px bg-gray-300" />

          <Text className="text-gray-400 text-sm mx-3">Or Continue with</Text>

          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* ======================================================
            SOCIAL ICONS
        ====================================================== */}

        <View className="flex-row justify-center items-center mb-8">
          {/* Google */}
          <TouchableOpacity
            className="mx-5 items-center justify-center"
            activeOpacity={0.7}
          >
            <Ionicons
              name="logo-google"
              size={35}
              color="#4285F4"
            />
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

        {/* ======================================================
            LOGIN
        ====================================================== */}

        <View className="flex-row justify-center items-center">
          <Text className="text-gray-400 text-base">
            Already have an account ?
          </Text>

          <Link href="/sign-in" asChild>
            <TouchableOpacity>
              <Text className="text-[#7FA339] font-semibold text-base ml-1">
                Login
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Clerk CAPTCHA */}
        <View nativeID="clerk-captcha" />
      </View>
    </ScrollView>
  );
}
