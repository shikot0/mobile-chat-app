import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            {/* <Stack.Screen name="[id]" /> */}
            <Stack.Screen name="[id]" options={{headerShown: false}}/>
            <Stack.Screen name="modal" options={{headerShown: false, presentation: 'transparentModal', animation: 'fade'}} />
        </Stack>
    )
}