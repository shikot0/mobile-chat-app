import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import migrations from '../drizzle/migrations/migrations';

import { useColorScheme } from '@/components/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { db } from '@/drizzle/db';
import {useMigrations} from 'drizzle-orm/expo-sqlite/migrator';
import { messages } from '@/drizzle/schema';
import { drizzle } from 'drizzle-orm/expo-sqlite';

const expoDb = SQLite.openDatabaseSync('app.db');
const db = drizzle(expoDb)

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    Alata: require('../assets/fonts/Alata.ttf'),
    Ubuntu: require('../assets/fonts/Ubuntu.ttf'),
    Roboto: require('../assets/fonts/Roboto.ttf'),
    OpenSans: require('../assets/fonts/Open-Sans.ttf'),
    ...FontAwesome.font,
  });
  const {success, error} = useMigrations(db, migrations);


  // async function test() {
  //   const users = await db.select().from(messages)
  //   console.log({users})
  // }

  // useEffect(() => {
  //   test()
  // }, []) 

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (fontsError) throw fontsError;
  }, [fontsError]);

  useEffect(() => {
    if(error) throw error
  }, [error])

  useEffect(() => {
    if (fontsLoaded && success) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, success]);
      

  // useEffect(() => {
  //   if (fontsLoaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* <Redirect href={'./(tabs)/chats'}/> */}
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="[chatType]/[id]" options={{ animation: 'ios'}} /> */}
          <Stack.Screen name="[chatType]" options={{ animation: 'ios', headerShown: false}} />
          {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
          <Stack.Screen name="modal" options={{ gestureEnabled: true, presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
