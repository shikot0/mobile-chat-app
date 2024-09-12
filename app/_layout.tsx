import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
import { Stack } from 'expo-router/stack';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect, useCallback } from 'react';
import * as SQLite from 'expo-sqlite';
import migrations from '../drizzle/migrations/migrations';
import { localUserStore } from '@/constants/globalState';
import { useColorScheme } from '@/components/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { db } from '@/drizzle/db';
import * as SecureStore from 'expo-secure-store';
import {useMigrations} from 'drizzle-orm/expo-sqlite/migrator';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { Redirect, Slot } from 'expo-router';
import { storage } from '@/utils/mmkv';
import { getLocalValue} from '@/utils/handleLocalData';

const expoDb = SQLite.openDatabaseSync('app.db');
const db = drizzle(expoDb)

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };

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
  const {success, error: migrationError} = useMigrations(db, migrations);
  const {isLoggedIn, setIsLoggedIn, setIsLoading, isLoading, userToken, setUserToken, setLocalUser} = localUserStore();


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
    if(migrationError) throw migrationError
  }, [migrationError])

  async function authenticate() {
    try {
      // await SecureStore.deleteItemAsync('user-token');
      // await SecureStore.deleteItemAsync('local-user');
      
      const savedToken = await getLocalValue('user-token');
      const localUser = await getLocalValue('local-user');
      console.log({savedToken, localUser})
          
      // const savedToken = storage.getString('user-token');
      // const localUser = storage.getString('local-user');
      // console.log({savedToken, localUser})
      // const savedToken = undefined;
      // const localUser = undefined;
      // console.log({savedToken, localUser})
      // console.log({savedToken})
          
      if(savedToken && localUser) {
        // setTimeout(() => {
          setUserToken(savedToken);
          setLocalUser(localUser);
          setIsLoggedIn(true);
          // setIsLoading(false),
          setIsLoading(false);
        // }, 10000)
      }else {
        setIsLoggedIn(false);
        setIsLoading(false)
      }
    }catch(error) {
      console.log(`Error authenticating user: ${error}`)
    }
  }

  // useEffect(() => {
  //   // const savedToken = SecureStore.getItem('user-token');
  //   // const localUser = SecureStore.getItem('local-user');
  //   const savedToken = await getLocalValue('user-token');
  //   const localUser = await getLocalValue('local-user');

  //   console.log({savedToken, localUser})
    
  //   // const savedToken = storage.getString('user-token');
  //   // const localUser = storage.getString('local-user');
  //   // console.log({savedToken, localUser})
  //   // const savedToken = undefined;
  //   // const localUser = undefined;

  //   // console.log({savedToken, localUser})
  //   // console.log({savedToken})
    
  //   if(savedToken && localUser) {
  //     // setTimeout(() => {
  //       setUserToken(savedToken);
  //       setLocalUser(JSON.parse(localUser));
  //       setIsLoggedIn(true);
  //       // setIsLoading(false),
  //       setIsLoading(false);
  //     // }, 10000)
  //   }else {
  //     setIsLoggedIn(false);
  //     setIsLoading(false)
  //   }
  // }, [])
  useEffect(() => {
    authenticate();    
  }, [])

  // useEffect(() => {
  //   console.log({isLoggedIn})
  // }, [isLoggedIn])

  // useEffect(() => {
  //   if (fontsLoaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // useEffect(() => {
  //   if (fontsLoaded && success) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, success]);

  // useEffect(() => {
  //   if (fontsLoaded && success && !isLoading) {
  //     console.log({msg: 'in useEffect', isLoggedIn, isLoading})
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, success, isLoading]);

  useEffect(() => {
    if (fontsLoaded && success && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, success, isLoading]);
      
  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded && success && !isLoading) {
  //     // This tells the splash screen to hide immediately! If we call this after
  //     // `setAppIsReady`, then we may see a blank screen while the app is
  //     // loading its initial state and rendering its first pixels. So instead,
  //     // we hide the splash screen once we know the root view has already
  //     // performed layout.
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, success, isLoading]);

  // if(isLoggedIn === false) {
  //   return <Redirect href="register" />
  // }

  if (!fontsLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  // const {isLoggedIn} = localUserStore();
  // console.log({isLoggedIn}) 
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="[chatType]" options={{ animation: 'ios', headerShown: false}} />
          <Stack.Screen name="modal" options={{ gestureEnabled: true, presentation: 'modal' }} />
        </Stack> */}
        {/* <Redirect href={'./(tabs)/chats'}/> */}
        {/* <Stack initialRouteName={isLoggedIn ? '(tabs)' : 'register'} screenOptions={{headerShown: false}}> */}
        {/* <Stack screenOptions={{headerShown: false}}>
          {isLoggedIn ?
            <>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ gestureEnabled: true, presentation: 'modal' }} />
              <Stack.Screen name="[chatType]" options={{ animation: 'ios', headerShown: false}} />
            </>
          :
            <Stack.Screen name="register" options={{headerShown: false}} />
          }
        </Stack> */}
        <Slot />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
