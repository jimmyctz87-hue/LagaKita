import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
    return (
        <SafeAreaView className="flex-1 bg-secondary items-center justify-center p-6">
            <View className="items-center mb-10">
                {/* Placeholder Logo */}
                <View className="w-24 h-24 bg-primary rounded-full items-center justify-center mb-4 shadow-lg shadow-primary">
                    <Text className="text-3xl font-bold text-secondary">LK</Text>
                </View>
                <Text className="text-4xl font-bold text-white mb-2">LagaKita</Text>
                <Text className="text-slate-400 text-center">
                    Find opponents, book fields, and join communities.
                </Text>
            </View>

            <View className="w-full space-y-4">
                <TouchableOpacity
                    className="w-full bg-primary py-4 rounded-xl items-center shadow-lg shadow-green-900"
                    onPress={() => router.push("/login")}
                >
                    <Text className="text-secondary font-bold text-lg">Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="w-full bg-slate-700 py-4 rounded-xl items-center border border-slate-600"
                    onPress={() => router.push("/explore")}
                >
                    <Text className="text-white font-bold text-lg">Explore as Guest</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
