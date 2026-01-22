import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { API_URL } from "../../lib/constants";
import { MapPin } from "lucide-react-native";

export default function ExploreScreen() {
    const [venues, setVenues] = useState<any[]>([]);

    useEffect(() => {
        fetchVenues();
    }, []);

    const fetchVenues = async () => {
        try {
            const res = await fetch(`${API_URL}/api/venues`);
            const data = await res.json();
            setVenues(data);
        } catch (error) {
            console.error("Error fetching venues:", error);
        }
    };

    const renderVenue = ({ item }: { item: any }) => (
        <TouchableOpacity className="bg-slate-800 mb-4 rounded-xl overflow-hidden border border-slate-700">
            <View className="h-32 bg-slate-700 items-center justify-center">
                {/* Placeholder for Image */}
                <Text className="text-slate-500 font-bold text-2xl">{item.name[0]}</Text>
            </View>
            <View className="p-4">
                <View className="flex-row justify-between items-start mb-2">
                    <Text className="text-white font-bold text-lg flex-1">{item.name}</Text>
                    <Text className="text-primary font-bold text-xs bg-primary/10 px-2 py-1 rounded">
                        Rp {item.fields?.[0]?.pricePerHour?.toLocaleString() || "0"}/hr
                    </Text>
                </View>
                <View className="flex-row items-center mb-2">
                    <MapPin size={14} color="#94A3B8" />
                    <Text className="text-slate-400 text-xs ml-1">{item.location}</Text>
                </View>
                <View className="flex-row flex-wrap gap-2 mt-2">
                    {item.fields?.map((f: any, idx: number) => (
                        <Text key={idx} className="text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded">
                            {f.sportType}
                        </Text>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-secondary p-4 pb-0">
            <Text className="text-2xl font-bold text-white mb-6">Explore Fields</Text>
            <FlatList
                data={venues}
                keyExtractor={(item) => item.id}
                renderItem={renderVenue}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </SafeAreaView>
    );
}
