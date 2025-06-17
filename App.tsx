// App.tsx
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import LoginScreen from './src/pages/LoginScreen';
import HomeScreen from './src/pages/HomeScreen';
import AddProductScreen from './src/pages/AddProductScreen';
import ProfileScreen from './src/pages/ProfileScreen';
import { ProductProvider } from './src/context/ProductContext';
import { useFonts, Fredoka_600SemiBold } from '@expo-google-fonts/fredoka';

const Stack = createNativeStackNavigator();

const AppNavigator = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='AddProduct' component={AddProductScreen} />
          <Stack.Screen name='Profile' component={ProfileScreen} />
        </>
      ) : (
        <Stack.Screen name='Login' component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Fredoka_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <ProductProvider>
        <AppContent />
      </ProductProvider>
    </AuthProvider>
  );
}

const AppContent = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <AppNavigator isLoggedIn={isLoggedIn} />
    </NavigationContainer>
  );
};
