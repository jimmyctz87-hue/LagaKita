import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { API_URL } from "../../lib/constants";
import { supabase } from "../../lib/supabase";

export default function HomeScreen() {
    const [matches, setMatches] = useState<any[]>([]);
    const [userName, setUserName] = useState("Player");

    useEffect(() => {
        fetchMatches();
        getUserProfile();
    }, []);

    const fetchMatches = async () => {
        try {
            const res = await fetch(`${API_URL}/api/matches`);
            const data = await res.json();
            setMatches(data.slice(0, 3)); // Show top 3
        } catch (error) {
            console.error("Error fetching matches:", error);
        }
    };

    const getUserProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            setUserName(user.identities?.[0]?.identity_data?.name || "Player");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-secondary p-4">
            <View className="flex-row justify-between items-center mb-6">
                <View>
                    <Text className="text-slate-400">Welcome Back,</Text>
                    <Text className="text-2xl font-bold text-white">{userName}!</Text>
                </View>
                <View className="w-10 h-10 bg-primary rounded-full items-center justify-center">
                    <Text className="font-bold text-secondary">LK</Text>
                </View>
            </View>

            <View className="mb-8">
                <Text className="text-lg font-bold text-white mb-4">Upcoming Matches</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
                    {matches.map((match) => (
                        <TouchableOpacity key={match.id} className="bg-slate-800 p-4 rounded-xl w-64 border border-slate-700 mr-4">
                            <Text className="text-primary font-bold mb-1">{match.title}</Text>
                            <Text className="text-white font-bold text-lg mb-2">{match.sportType}</Text>
                            <View className="flex-row items-center mb-2">
                                <Text className="text-slate-400 text-xs">📅 {new Date(match.date).toLocaleDateString()}</Text>
                                <Text className="text-slate-400 text-xs ml-2">🕒 {new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                            </View>
                            <Text className="text-slate-500 text-xs">📍 {match.location}</Text>
                        </TouchableOpacity>
                    ))}
                    {matches.length === 0 && (
                        <View className="bg-slate-800 p-4 rounded-xl w-64 border border-slate-700 items-center justify-center h-32">
                            <Text className="text-slate-400">No upcoming matches</Text>
                        </View>
                    )}
                </ScrollView>
            </View>

            <View className="flex-1">
                <Text className="text-lg font-bold text-white mb-4">Quick Actions</Text>
                <View className="flex-row justify-between space-x-4">
                    <TouchableOpacity className="flex-1 bg-primary/20 p-4 rounded-xl items-center border border-primary border-dashed">
                        <Text className="text-primary font-bold text-lg">+ Join Match</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 bg-accent/20 p-4 rounded-xl items-center border border-accent border-dashed">
                        <Text className="text-accent font-bold text-lg">My Schedule</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
