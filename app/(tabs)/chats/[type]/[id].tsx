import { View, Text } from "@/components/Themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import {Tabs} from 'expo-router';
import { StyleSheet, TextInput, Pressable } from "react-native";

// interface ChatPageProps {
//     params: {
//         type: string,
//         id: string
//     }
// }

// export default function ChatPage({params: {type, id}}: ChatPageProps) {
export default function ChatPage() {
    const {id, type} = useLocalSearchParams();
    console.log({id, type})
    return (
        <View style={styles.container}>
            <Tabs screenOptions={{tabBarHideOnKeyboard: true}}/>
            <View style={styles.chatWrapper}></View>
            <View style={styles.chatInputWrapper}>
                <TextInput cursorColor={'grey'} style={styles.textInput} />
                {/* <SendButton /> */}
                <Pressable style={styles.sendButton}>
                    <Ionicons name="paper-plane-outline" size={28} />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatWrapper: {
        flex: 12,
    },
    chatInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        gap: 8,
        borderWidth: 1,
        borderColor: 'red',
        borderStyle: 'solid'
    },
    textInput: {
        // width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 4,
        fontSize: 16,
        flex: 8,
        borderRadius: 24,
        backgroundColor: 'red'
    },
    sendButton: {
        // flex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        // height: 44,
        aspectRatio: 1/1,
        borderRadius: 48,
        backgroundColor: 'lightblue'
    }
})