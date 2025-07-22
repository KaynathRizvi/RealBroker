import { Stack } from "expo-router"
import { useFonts } from 'expo-font';
import { useEffect } from "react"
import * as Linking from "expo-linking"
import { Platform, View, ActivityIndicator } from "react-native"

export default function Layout() {
  // 1. Load fonts
  const [fontsLoaded] = useFonts({
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
  });

  // 2. Show loader until fonts are ready
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 3. Handle deep links (unchanged)
  useEffect(() => {
    const subscription = Linking.addEventListener("url", (event) => {
      console.log("Received deep link:", event.url);
    });
    return () => subscription.remove();
  }, []);

  // 4. Render your navigation stack
  return <Stack />;
}
