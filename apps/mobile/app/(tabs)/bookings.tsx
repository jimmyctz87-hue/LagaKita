import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { API_URL } from "../../lib/constants";
import { supabase } from "../../lib/supabase";
import { Calendar, Clock, MapPin } from "lucide-react-native";

export default function BookingsScreen() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            fetchBookings();
        }, [])
    );

    const fetchBookings = async () => {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/bookings`, {
                headers: {
                    Authorization: `Bearer ${session.access_token}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                setBookings(data);
            } else {
                console.error("Failed to fetch bookings");
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderBooking = ({ item }: { item: any }) => (
        <View className="bg-slate-800 mb-4 p-4 rounded-xl border border-slate-700">
            <View className="flex-row justify-between mb-2">
                <Text className={`font-bold px-2 py-1 rounded text-xs ${item.status === 'CONFIRMED' ? 'bg-green-900/50 text-green-500' :
                        item.status === 'PENDING' ? 'bg-yellow-900/50 text-yellow-500' :
                            'bg-slate-700 text-slate-400'
                    }`}>
                    {item.status}
                </Text>
                <Text className="text-slate-400 text-xs">ID: {item.id.slice(0, 8)}</Text>
            </View>

            <Text className="text-white font-bold text-lg mb-1">{item.field.venue.name}</Text>
            <Text className="text-slate-300 text-sm mb-3">{item.field.name} ({item.field.sportType})</Text>

            <View className="space-y-1">
                <View className="flex-row items-center">
                    <Calendar size={14} color="#94A3B8" />
                    <Text className="text-slate-400 text-xs ml-2">{new Date(item.startTime).toDateString()}</Text>
                </View>
                <View className="flex-row items-center">
                    <Clock size={14} color="#94A3B8" />
                    <Text className="text-slate-400 text-xs ml-2">
                        {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                        {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                </View>
            </View>

            <View className="mt-4 pt-4 border-t border-slate-700 flex-row justify-between items-center">
                <Text className="text-slate-400 text-xs">Total Price</Text>
                <Text className="text-primary font-bold text-lg">Rp {item.totalPrice.toLocaleString()}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-secondary p-4 pb-0">
            <Text className="text-2xl font-bold text-white mb-6">My Bookings</Text>
            {loading && bookings.length === 0 ? (
                <Text className="text-slate-400">Loading...</Text>
            ) : (
                <FlatList
                    data={bookings}
                    keyExtractor={(item) => item.id}
                    renderItem={renderBooking}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={
                        <View className="items-center mt-10">
                            <Text className="text-slate-400">No bookings found.</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
}
