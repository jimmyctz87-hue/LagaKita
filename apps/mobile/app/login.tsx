import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { router } from "expo-router";
import { supabase } from "../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            Alert.alert(error.message);
            setLoading(false);
        } else {
            setLoading(false);
            router.replace("/(tabs)/home");
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-secondary p-6 justify-center">
            <View className="mb-8 items-center">
                <Text className="text-3xl font-bold text-white mb-2">Welcome Back</Text>
                <Text className="text-slate-400">Sign in to continue</Text>
            </View>

            <View className="space-y-4">
                <View>
                    <Text className="text-slate-300 mb-1 ml-1">Email</Text>
                    <TextInput
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder="email@address.com"
                        placeholderTextColor="#94A3B8"
                        autoCapitalize="none"
                        className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700"
                    />
                </View>

                <View>
                    <Text className="text-slate-300 mb-1 ml-1">Password</Text>
                    <TextInput
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        placeholder="Password"
                        placeholderTextColor="#94A3B8"
                        autoCapitalize="none"
                        className="bg-slate-800 text-white p-4 rounded-xl border border-slate-700"
                    />
                </View>

                <TouchableOpacity
                    className="w-full bg-primary py-4 rounded-xl items-center mt-4 shadow-lg shadow-green-900"
                    disabled={loading}
                    onPress={signInWithEmail}
                >
                    <Text className="text-secondary font-bold text-lg">
                        {loading ? "Signing in..." : "Sign In"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Alert.alert("Feature coming soon!")} className="items-center mt-4">
                    <Text className="text-slate-400">Don't have an account? <Text className="text-accent font-bold">Sign Up</Text></Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
