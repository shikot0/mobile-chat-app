import { View, Text } from "@/components/Themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useLocalSearchParams } from "expo-router";
import {useState} from 'react';
import {Tabs} from 'expo-router';
import Animated, { SlideInRight } from 'react-native-reanimated';
import { StyleSheet, TextInput, Pressable, FlatList, NativeSyntheticEvent, TextInputTextInputEventData } from "react-native";

// interface ChatPageProps {
//     params: {
//         type: string,
//         id: string
//     }
// }

// export default function ChatPage({params: {type, id}}: ChatPageProps) {
export default function ChatPage() {
    const {id, chatType} = useLocalSearchParams<{id: string, chatType: string}>();
    const [newMessage, setNewMessage] = useState<string>('');
    const [messages, setMessages] = useState<any[]>([
        {
            from: 'amin',
            text: 'This is a test message'
        },
        {
            from: 'me',
            text: 'Ok'
        },
        {
            from: 'amin',
            text: 'How have you been?'
        },
        {
            from: 'me',
            text: "I've been good"
        },
        {
            from: 'amin',
            text: 'Okay'
        }
    ])
    // const messages = [
    //     {
    //         from: 'amin',
    //         text: 'This is a test message'
    //     },
    //     {
    //         from: 'me',
    //         text: 'Ok'
    //     },
    //     {
    //         from: 'amin',
    //         text: 'How have you been?'
    //     },
    //     {
    //         from: 'me',
    //         text: "I've been good"
    //     },
    //     {
    //         from: 'amin',
    //         text: 'Okay'
    //     }
    // ]

    function addNewMessage() {
        console.log('adding new message!')
        // const newMessages = messages;
        // newMessages.push({from: 'me', text: newMessage});
        // setMessages(newMessages);
        setMessages(prev => {
            return [...prev, {from: 'me', text: newMessage}]
        });
        setNewMessage('')
    }

    // function handleUpdateNewMessage(e: NativeSyntheticEvent<TextInputTextInputEventData>) {
    function handleUpdateNewMessage(text: string) {
        // const text = 
        console.log({text})
        setNewMessage(text);
    }
    // console.log({id, chatType})

    // const AnimatedView = Animated.createAnimatedComponent(View)
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: id }} />
            <View style={styles.chatWrapper}>
                <FlatList 
                    // onContentSizeChange={}
                    // scrollsToTop
                    data={messages}
                    // style={styles.chatWrapper}
                    contentContainerStyle={{padding: 8, gap: 8}}
                    renderItem={({item, index}) => {
                        return (
                            // <AnimatedView style={[styles.message, {alignSelf: item.from === 'me' ? "flex-end": 'flex-start'}]}>
                            <Animated.View
                                style={[
                                    styles.message, 
                                    {
                                        alignSelf: item.from === 'me' ? "flex-end": 'flex-start'
                                    }
                                ]}
                                entering={SlideInRight}
                            >
                                <Text>{item.text}</Text>
                            </Animated.View>
                            // </AnimatedView>
                        )
                    }}
                />
            </View>
            <View style={styles.chatInputWrapper}>
                <TextInput cursorColor={'grey'} value={newMessage} style={styles.textInput} onChangeText={text => handleUpdateNewMessage(text)}/>
                {/* <SendButton /> */}
                <Pressable style={styles.sendButton} onPress={() => addNewMessage()}>
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
    message: {
        borderRadius: 48,
        // backgroundColor: 'lightblue',
        backgroundColor: 'rgba(0, 175, 200, .5)',
        paddingVertical: 8,
        paddingHorizontal: 16,
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