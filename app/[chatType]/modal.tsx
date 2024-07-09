import {View, Text} from '@/components/Themed';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import {BlurView} from 'expo-blur'

export default function Modal() {

    const router = useRouter();
    function handleGoBack() {
        router.back();
    }

    return (
        // <Pressable onPress={handleGoBack} style={styles.container}>
        <Pressable onPress={handleGoBack} style={styles.container}>
            <View style={styles.numOfImagesWrapper}>
                <Text style={styles.numOfImages}>6/10</Text>
            </View>
            <Text>This is a test</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .4)'
    },
    numOfImagesWrapper: {
        position: 'absolute',
        top: 36,
        right: 48,
    },
    numOfImages: {
        fontSize: 20
    }
})