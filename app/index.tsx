import {Text, View} from '@/components/Themed';
import { localUserStore } from '@/constants/globalState';
import migrations from '@/drizzle/migrations/migrations';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { Redirect } from 'expo-router';
import { openDatabaseSync } from 'expo-sqlite/next';
import {StyleSheet} from 'react-native';


export default function IndexPage() {
    const {isLoading, isLoggedIn} = localUserStore();
    // const expoDb = openDatabaseSync('app.db');
    // const db = drizzle(expoDb)
    // const {success, error} = useMigrations(db, migrations);
    // console.log({success})
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