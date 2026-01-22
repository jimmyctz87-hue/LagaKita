import { Platform } from "react-native";

// Use 10.0.2.2 for Android Emulator, localhost for iOS/Web
export const API_URL = Platform.OS === 'android'
    ? "http://10.0.2.2:3000"
    : "http://localhost:3000";
