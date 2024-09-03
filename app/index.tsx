import {Text, View} from '@/components/Themed';
import { localUserStore } from '@/constants/globalState';
import { Redirect } from 'expo-router';
import {StyleSheet} from 'react-native';


export default function IndexPage() {
    const {isLoading, isLoggedIn} = localUserStore();
    // console.log({isLoading, isLoggedIn})

    if(isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }

    if(isLoggedIn) {
        return <Redirect href="./(app)" />
    }else {
        return <Redirect href="./register" />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})