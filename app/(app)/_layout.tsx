import {useEffect} from 'react';
import { localUserStore } from '@/constants/globalState';
import {Redirect, SplashScreen, Stack, useRouter} from 'expo-router';
import {Text, View} from '@/components/Themed';

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

    // useEffect(() => {
    //   console.log({isLoading, isLoggedIn, msg: 'Layout page'})
    // }, [isLoading, isLoggedIn])

    if(isLoading) {
        // return <Text>Loading...</Text>
        // console.log('Loading...')
        return (
          <View>
            <Text>Loading...</Text>
          </View>
        )
        // SplashScreen.hideAsync()
    }
    if(!isLoggedIn) {
        // return <Redirect href="../register" />
        //   router.navigate('/register'); 
      // console.log('test')
      // console.log('replacing')
      // return <Redirect href={"../../register"} />;
      return <Redirect href={".."}/>;
      // router.replace("/register")
    }
    // useEffect(() => {
    // }, [isLoading, isLoggedIn])
    return (
        // <Stack screenOptions={{headerShown: false}}>
        <Stack screenOptions={{statusBarTranslucent: false, statusBarColor: 'black'}}>
          {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="[chatType]" options={{ animation: 'ios', headerShown: false}} />
          <Stack.Screen name="modal" options={{ gestureEnabled: true, presentation: 'modal' }} />   */}
          {/* <Stack.Screen name="register" options={{headerShown: false}} /> */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ gestureEnabled: true, presentation: 'modal' }} />
          <Stack.Screen name="new-chat" options={{presentation: 'modal', title:"New chat", animation: 'fade_from_bottom', fullScreenGestureEnabled: true, gestureEnabled: true,}}/>
          {/* <Stack.Screen name="chat" options={{ animation: 'ios', headerShown: false}} /> */}
          {/* <Stack.Screen name="chat" options={{ animation: 'slide_from_bottom', animationTypeForReplace: 'push', headerShown: false}} /> */}
          {/* <Stack.Screen name="chat" options={{ animation: 'ios', headerShown: false}} /> */}
          {/* <Stack.Screen name="chat" options={{ presentation: 'transparentModal', animation: 'ios', headerShown: false}} /> */}
          <Stack.Screen name="chat" options={{ presentation: 'transparentModal', animation: 'slide_from_bottom', headerShown: false}} />
        </Stack>
    )
}