import { View, Text } from "@/components/Themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useLocalSearchParams } from "expo-router";
import {useEffect, useState} from 'react';
import {Tabs} from 'expo-router';
import {Audio} from 'expo-av';
import Animated, { SlideInRight, withTiming, Easing, withSpring } from 'react-native-reanimated';
import { StyleSheet, Image, TextInput, Pressable, FlatList, NativeSyntheticEvent, TextInputTextInputEventData, useColorScheme, Dimensions, ScrollView, KeyboardAvoidingView } from "react-native";
import Colors from "@/constants/Colors";
import { MessageInput } from "@/components/Inputs";
import { MessageHandler } from "@/components/MessageComponents";

// interface ChatPageProps {
//     params: {
//         type: string, 
//         id: string
//     }
// }

const {width, height} = Dimensions.get('window');

// export default function ChatPage({params: {type, id}}: ChatPageProps) {
export default function ChatPage() {
    const {id, chatType} = useLocalSearchParams<{id: string, chatType: string}>();
    const [newMessage, setNewMessage] = useState<string>('');
    const [messages, setMessages] = useState<any[]>([
        {   
            type: 'text',
            sender: 'amin',
            text: 'This is a test message'
        },
        {   
            type: 'text',
            sender: 'me',
            text: 'Ok'
        },
        {   
            type: 'text',
            sender: 'amin',
            text: 'How have you been?'
        },
        {   
            type: 'text',
            sender: 'me',
            text: "I've been good"
        },
        {   
            type: 'text',
            sender: 'amin',
            text: 'Okay'
        },
        {
            type: 'images',
            sender: 'me',
            // imageLinks: ['../../../assets/images/favicon.png']
            imageLinks: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        },
        {
            type: 'images',
            sender: 'amin',
            // imageLinks: ['../../../assets/images/favicon.png']
            imageLinks: ['1', '2']
        },
        {
            type: 'images',
            sender: 'me',
            // imageLinks: ['../../../assets/images/favicon.png']
            imageLinks: ['1']
        }, 
        {
            type: 'audio',
            sender: 'me'
        }
    ])
                        
    let flatListRef: FlatList<any> | null = null;

    async function playSound() {
        const playSound = new Audio.Sound()
        await playSound.loadAsync(require('../../assets/sounds/new-message.m4a'));
        await playSound.playAsync()       
    }

    // useEffect(() => {
    //     flatListRef?.scrollToIndex({index: messages.length-1, animated: true, viewOffset: 1})
    // }, [messages])

    async function addNewMessage() {
        console.log('adding new message!')
        setMessages(prev => {
            return [...prev, {type: 'text', sender: 'me', text: newMessage}]
        });
        setNewMessage('')
        // flatListRef?.scrollToEnd({animated: true})
        await playSound();
    }

    const animationDuration = 100;
    const textEnteringAnim = (values: {targetOriginY: number; targetOriginX: number}) => {
        "worklet";

        const animations = {
            // originY: withTiming(values.targetOriginY, {
            //     duration: animationDuration,
            //     easing: Easing.elastic(1)
            // }),

            // originX: withTiming(values.targetOriginX, {
            //     duration: animationDuration,
            //     easing: Easing.elastic(1)
            // }),
            // originX: withSpring(values.targetOriginX, {
            //     duration: animationDuration,
            //     // easing: Easing.elastic(1)
            // }),
            opacity: withTiming(1, {
                duration: animationDuration
            }),
            // scaleX: withSpring(1, {
            //     stiffness: 0,
            //     duration: animationDuration
            // }),
            // scaleY: withSpring(1, {
            //     stiffness: 0,
            //     duration: animationDuration
            // })
            originX: withTiming(values.targetOriginX, {
                duration: animationDuration/2,
                easing: Easing.elastic(1)
            }),
            scaleX: withTiming(1, {
                duration: animationDuration,
                easing: Easing.elastic(2),
                // easing: Easing.linear
            }),
            scaleY: withTiming(1, {
                duration: animationDuration,
                easing: Easing.elastic(2),
                // easing: Easing.linear
            })
        };
        const initialValues = {
            // originY: height,
            originX: width + 50,
            scaleX: .75,
            scaleY: .75,
            opacity: .5,
        }

        // playSound()
        // const playSound = new Audio.Sound()
        // await playSound.loadAsync(require('../../assets/sounds/new-message.m4a'));
        // await playSound.playAsync()       
        
        
        return {
            initialValues,
            animations
        }
    }


    const colorScheme = useColorScheme() ?? 'light';
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: id }} />
            <View style={styles.chatWrapper}>
            {/* <KeyboardAvoidingView style={styles.chatWrapper}> */}
                <FlatList 
                    data={messages}
                    style={styles.messagesWrapper} 
                    contentContainerStyle={{padding: 8, gap: 8}}
                    ref={(ref) => {
                        flatListRef = ref;
                    }}
                    renderItem={({item, index}) => {
                        return (
                            <MessageHandler message={item} />
                        )
                    }}
                />

                {/* <ScrollView
                    style={styles.messagesWrapper} 
                    contentContainerStyle={{flex: 1, padding: 8, gap: 8}}
                    
                >
                    {messages.map((message, index) => {
                        return (
                            <Animated.View
                                key={index.toString()}
                                style={[
                                    styles.message, 
                                    {
                                        alignSelf: message.from === 'me' ? "flex-end": 'flex-start'
                                    }
                                ]}
                                // entering={SlideInRight}
                                entering={textEnteringAnim}
                            >
                                <Text>{message.text}</Text>
                            </Animated.View>
                        ) 
                    })}
                </ScrollView> */}
            </View>
            {/* </KeyboardAvoidingView> */}
            
            {/* <View style={styles.messageInputWrapper}>
                <TextInput cursorColor={'grey'} value={newMessage} style={[styles.textInput, {color: Colors[colorScheme].text, backgroundColor: Colors[colorScheme].elevated}]} onChangeText={text => handleUpdateNewMessage(text)}/>
                <Pressable disabled={newMessage.length === 0} style={[styles.sendButton, {backgroundColor: newMessage.length === 0 ? Colors[colorScheme].elevated : 'lightblue'}]} onPress={() => addNewMessage()}>
                    <Ionicons name="paper-plane-outline" size={28} />
                </Pressable>
            </View> */}
            <MessageInput 
                value={newMessage}
                updateFunction={setNewMessage}
                submitFunction={addNewMessage}
                submitDisabled={newMessage.length === 0}
                style={styles.messageInputWrapper}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatWrapper: {
        flex: 12,
        // borderWidth: 1,
        // borderColor: 'red',
        // borderStyle: 'solid'
    },
    messagesWrapper: {
        flex: 1,
        position: 'relative',
        // borderWidth: 1,
        // borderColor: 'red',
        // borderStyle: 'solid'
    },
    message: {
        // position: 'absolute',
        borderRadius: 20,
        // borderRadius: '10%',
        maxWidth: '57.5%',
        // backgroundColor: 'lightblue',
        backgroundColor: 'rgba(0, 175, 200, .5)',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    messageImageWrapper: {
        // maxWidth: '57.5%',
        // width: '57.5%',
        width: '50%',
        aspectRatio: 1/1.25,
        borderRadius: 16,
        // width: 100,
        // height: 100,
        overflow: 'hidden',
        // borderWidth: 1,
        // borderStyle: 'solid',
        // borderColor: 'red'
    },  
    messageImage: {
        width: '100%',
        height: '100%'
    },
    messageInputWrapper: {
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 8,
        gap: 8,
        // borderWidth: 1,
        // borderColor: 'red',
        // borderStyle: 'solid'
    },
    textInput: {
        // width: '100%',
        paddingHorizontal: 12,
        height: 44,
        paddingVertical: 4,
        fontSize: 16,
        flex: 8,
        // flex: 1,
        borderRadius: 24,
        // backgroundColor: 'red'
    },
    sendButton: {
        // flex: 2,
        // position: 'absolute',
        // right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        // height: 44,
        aspectRatio: 1/1,
        borderRadius: 48,
        // backgroundColor: 'lightblue'
    }
})