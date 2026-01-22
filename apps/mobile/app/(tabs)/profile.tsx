import { View, Text, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { User, LogOut } from "lucide-react-native";

export default function ProfileScreen() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
    }, []);

    async function handleSignOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            Alert.alert("Error signing out", error.message);
        } else {
            router.replace("/");
        }
    }

    if (!session) {
        return (
            <SafeAreaView className="flex-1 bg-secondary items-center justify-center">
                <Text className="text-white">Loading...</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-secondary p-6">
            <View className="items-center mb-10 mt-10">
                <View className="w-24 h-24 bg-slate-700 rounded-full items-center justify-center mb-4 border-2 border-primary">
                    <User size={48} color="#94A3B8" />
                </View>
                <Text className="text-2xl font-bold text-white mb-1">
                    {session.user.identities?.[0]?.identity_data?.name || "Player 1"}
                </Text>
                <Text className="text-slate-400">
                    {session.user.email}
                </Text>
            </View>

            <View className="bg-slate-800 rounded-2xl p-4 space-y-4">
                <TouchableOpacity
                    className="flex-row items-center p-3"
                    onPress={handleSignOut}
                >
                    <View className="w-10 h-10 bg-red-900/30 rounded-full items-center justify-center mr-4">
                        <LogOut size={20} color="#EF4444" />
                    </View>
                    <Text className="text-red-400 font-bold text-lg flex-1">Sign Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
