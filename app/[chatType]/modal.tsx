import {View, Text} from '@/components/Themed';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

export default function Modal() {

    const router = useRouter();
    function handleGoBack() {
        router.back();
    }

    return (
        <Pressable onPress={handleGoBack} style={styles.container}>
            <Text>This is a test</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, .25)'
    }
})