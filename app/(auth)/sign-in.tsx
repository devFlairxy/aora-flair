import { View, Text, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { getCurrentUser, signIn } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async () => {
    if (!form.password || !form.email) {
      Alert.alert('Error', 'All fields are required');
    }
    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      //set to global state using context
      const result = getCurrentUser();
      setUser(result);
      setIsLoggedIn(true)
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
