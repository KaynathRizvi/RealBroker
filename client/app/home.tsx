import { Stack, useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import styles from './styles/homeStyles'; // ✅ Import the styles

export default function HomePage() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Home' }} />

      <View style={styles.navbar}>
        <Text style={styles.title}>BrokerApp</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navLinks}>
            <Text style={styles.link} onPress={() => router.push('/home')}>Home</Text>
            <Text style={styles.link} onPress={() => router.push('/about')}>About</Text>
            <Text style={styles.link} onPress={() => router.push('/properties')}>Properties</Text>
            <Text style={styles.link} onPress={() => router.push('/profile')}>Profile</Text>
            <Text style={[styles.link, styles.logout]} onPress={handleLogout}>Logout</Text>
        </ScrollView>
      </View>

      <View style={styles.content}>
        <Text>Welcome to BrokerApp Home Page!</Text>
      </View>
    </View>
  );
}
