import { Tabs } from "expo-router";
import { House, Search, Calendar, User } from "lucide-react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#1E293B",
                    borderTopColor: "#334155",
                },
                tabBarActiveTintColor: "#32CD32",
                tabBarInactiveTintColor: "#94A3B8",
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <House size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    tabBarIcon: ({ color }) => <Search size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="bookings"
                options={{
                    title: "Bookings",
                    tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <User size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
