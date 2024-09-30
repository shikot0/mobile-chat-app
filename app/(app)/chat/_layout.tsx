import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
    return (
        // <Stack screenOptions={{statusBarTranslucent: false}}>
        // <Stack screenOptions={{presentation: 'transparentModal'}}>
        <Stack>
            {/* <Stack.Screen name="[id]" /> */}
            {/* <Stack.Screen name="[id]" options={{statusBarColor: 'black', headerShown: true}}/>
            <Stack.Screen name="modal" options={{statusBarHidden: true, headerShown: false, presentation: 'transparentModal', animation: 'fade'}} /> */}
            {/* <Stack.Screen name="[id]" options={{headerShown: true, headerBackButtonMenuEnabled: true}}/> */}
            <Stack.Screen name="[id]" options={{headerShown: true, headerTitle: '', headerBackButtonMenuEnabled: true}}/>
            <Stack.Screen name="modal" options={{headerShown: false, presentation: 'transparentModal', animation: 'fade'}} />
        </Stack>
    )
}