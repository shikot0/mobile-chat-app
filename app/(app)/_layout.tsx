import {useEffect} from 'react';
import { localUserStore } from '@/constants/globalState';
import {Redirect, SplashScreen, Stack, useRouter} from 'expo-router';
import {Text} from '@/components/Themed';

SplashScreen.preventAutoHideAsync()


export default function Layout() {
    const {isLoading, isLoggedIn} = localUserStore();
    const router = useRouter();

    
    // useEffect(() => {
    //     if(!isLoading) {
    //         SplashScreen.hideAsync()
    //     }
    //     if(!isLoggedIn) {
    //       // return <Redirect href="../register" />
    //         //   router.navigate('/register'); 
    //       <Redirect href="/sign-in" />;
    //     }
    // }, [isLoading, isLoggedIn])

    if(isLoading) {
        return <Text>Loading...</Text>
        // SplashScreen.hideAsync()
    }
    if(!isLoggedIn) {
        // return <Redirect href="../register" />
        //   router.navigate('/register'); 
      return <Redirect href="/sign-in" />;
    }
    // useEffect(() => {
    // }, [isLoading, isLoggedIn])
    return (
        <Stack screenOptions={{headerShown: false}}>
          {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="[chatType]" options={{ animation: 'ios', headerShown: false}} />
          <Stack.Screen name="modal" options={{ gestureEnabled: true, presentation: 'modal' }} />   */}
          {/* <Stack.Screen name="register" options={{headerShown: false}} /> */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ gestureEnabled: true, presentation: 'modal' }} />
            <Stack.Screen name="[chatType]" options={{ animation: 'ios', headerShown: false}} />
        </Stack>
    )
}