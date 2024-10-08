import { View, Text } from "@/components/Themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Stack, useLocalSearchParams, useRouter } from "expo-router";
import {useEffect, useRef, useState} from 'react';
import {Tabs} from 'expo-router';
import {Audio} from 'expo-av';
import Animated, { SlideInRight, withTiming, Easing, withSpring } from 'react-native-reanimated';
import { StyleSheet, Image, TextInput, Pressable, FlatList, NativeSyntheticEvent, TextInputTextInputEventData, useColorScheme, Dimensions, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import Colors from "@/constants/Colors";
import { MessageInput } from "@/components/Inputs";
import { MessageHandler } from "@/components/MessageComponents";
import {LinearGradient} from 'expo-linear-gradient';
import {FlashList, autoScroll} from '@shopify/flash-list';
import { serverRoute } from "@/constants/routes";
import { fetchWithAuth } from "@/utils/apiCalls";
import {io, Socket} from 'socket.io-client';
import { localUserStore } from "@/constants/globalState";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { HeaderElement, HeaderElementTypes } from "@/components/HeaderElements";
import { StatusBar } from "expo-status-bar";
import React from "react";

// interface ChatPageProps {
//     params: {
//         type: string, 
//         id: string
//     }
// }

const {width, height} = Dimensions.get('window');

type ConversationParticipant = {
    id: string, 
    username: string,
    phoneNumber: string,
    profilePicture: string | null,
    email: string
}

type ConversationInfo = {
    // conversation: {
    //     id: string,
    //     type: string
    //     createdBy: string,
    // },
    id: string,
    name?: string,
    type: string
    createdBy: string,
    users: ConversationParticipant[]
}
type MessageUser = {
    id: string,
    username: string,
    email: string,
    phone: string,
    profilePicture: string | null,
    createdAt: string,
}
type Message = {
    id: string,
    media: null | string[],
    text: string,
    userId: string
    conversationId: string,
    createdAt: string,
    updatedAt: string,
}

type ReceivedMessage = {
    // message: {
    //     id: string,
    //     media: null | string[],
    //     text: string,
    //     userId: string
    //     conversationId: string,
    //     createdAt: string,
    //     updatedAt: string,
    // },
    // user: {
    //     id: string,
    //     username: string,
    //     email: string,
    //     phone: string,
    //     profilePicture: string | null,
    //     createdAt: string,
    // }
    message: Message,
    user: MessageUser
}
type GroupedMessage = {
    user: MessageUser,
    messages: Message[]
}

// export default function ChatPage({params: {type, id}}: ChatPageProps) {
export default function ChatPage() {
    const {id} = useLocalSearchParams<{id: string, chatType: string}>();
    // console.log({id})
    const [newMessage, setNewMessage] = useState<string>('');
    // const [messages, setMessages] = useState<any[]>([]);
    // const [messages, setMessages] = useState<ReceivedMessage[]>([]);
    const [messages, setMessages] = useState<GroupedMessage[]>([]);
    const [conversationInfo, setConversationInfo] = useState<ConversationInfo>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {localUser, userToken} = localUserStore();
    const colorScheme = useColorScheme() ?? 'dark';
    // const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();
    const socket = useRef<Socket>();
    // const [messages, setMessages] = useState<any[]>([
    //     {   
    //         type: 'text',
    //         sender: 'amin',
    //         text: 'This is a test message'
    //     },
    //     {   
    //         type: 'text',
    //         sender: 'me',
    //         text: 'Ok'
    //     },
    //     {   
    //         type: 'text',
    //         sender: 'amin',
    //         text: 'How have you been?'
    //     },
    //     {   
    //         type: 'text',
    //         sender: 'me',
    //         text: "I've been good"
    //     },
    //     {   
    //         type: 'text',
    //         sender: 'amin',
    //         text: 'Okay'
    //     },
    //     {
    //         type: 'images',
    //         sender: 'me',
    //         // imageLinks: ['../../../assets/images/favicon.png']
    //         imageLinks: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    //     },
    //     {
    //         type: 'images',
    //         sender: 'amin',
    //         // imageLinks: ['../../../assets/images/favicon.png']
    //         imageLinks: ['1', '2']
    //     },
    //     {
    //         type: 'images',
    //         sender: 'me',
    //         // imageLinks: ['../../../assets/images/favicon.png']
    //         imageLinks: ['1']
    //     }, 
    //     {
    //         type: 'audio',
    //         sender: 'me'
    //     }
    // ])
                        
    // let flatListRef: FlatList<any> | null = null;
    let flashListRef: FlashList<any> | null = null;
    
    const {sendMessage, readyState, lastMessage} = useWebSocket(`${serverRoute}/messages/conversations/${id}`, {
        queryParams: {
            'userToken': `${userToken}`
        },
        retryOnError: true, 
        // eventSourceOptions: {withCredentials: true},
        onOpen: () => console.log('opened connection')
    }, true)

    // useEffect(() => {
    //     console.log({readyState})
    // }, [readyState])

    function groupMessages(messages: ReceivedMessage[]) {
        // const groupedMessages = messages.reduce<Message[][]>((acc, item) => {
        //     if(acc.length === 0) {
        //         acc.push([item]);
        //         continue;
        //     }


        //     return acc;
        // }, [])
        const groupedMessages: GroupedMessage[] = [];
        // if(messages.length === 0) return messages;
        if(messages.length === 0) return groupedMessages;

        // const groupedMessages: Message[][] = [];
        // const groupedMessages: {user: MessageUser, messages: Message[]}[] = [];
        // const groupedMessages: GroupedMessage[] = [];
        for(let i = 0; i < messages.length; i++) {
            if(!groupedMessages.length) {
                // groupedMessages.push(messages[i])
                groupedMessages.push({user: messages[i].user, messages: [messages[i].message]});
                continue;
            }

            // const lastUser = groupedMessages[groupedMessages.length-1][0].user;
            // if(messages[i].user.id === lastUser.id) {
            //     groupedMessages[groupedMessages.length-1].push(messages[i])
            // }else {
            //     groupedMessages.push([messages[i]])
            // }
            const lastUser = groupedMessages[groupedMessages.length-1].user;
            if(messages[i].user.id === lastUser.id) {
                groupedMessages[groupedMessages.length-1].messages.push(messages[i].message)
            }else {
                groupedMessages.push({user: messages[i].user, messages: [messages[i].message]})
            }
        }

        return groupedMessages;
    }



    useEffect(() => {
        // console.log({lastMessage})
        if(lastMessage) {
            // console.log({lastMessage})
            const data = JSON.parse(lastMessage.data);
            // const data = lastMessage.data;
            // console.log({data})
            // console.log({messages})
            // setMessages(prev => [...prev, data])
            // setMessages(prev => prev.concat(data));

            setMessages(prev => {
                if(!prev.length) {
                    // groupedMessages.push(messages[i])
                    // prev.push({user: data.user, messages: [data.message]});
                    // prev.concat({user: data.user, messages: [data.message]});
                    const copy = prev.concat({user: data.user, messages: [data.message]})
                    return copy;
                }
    
                // const lastUser = groupedMessages[groupedMessages.length-1][0].user;
                // if(messages[i].user.id === lastUser.id) {
                //     groupedMessages[groupedMessages.length-1].push(messages[i])
                // }else {
                //     groupedMessages.push([messages[i]])
                // }
                const lastUser = prev[prev.length-1].user;
                let copy = [...prev];
                if(data.user.id === lastUser.id) {
                    // prev[prev.length-1].messages.push(data.message)
                    // prev[prev.length-1].messages.push(data.message)
                    copy[copy.length-1].messages.push(data.message)
                }else {
                    // prev.push({user: data.user, messages: [data.message]})
                    // prev.concat({user: data.user, messages: [data.message]})
                    copy = copy.concat({user: data.user, messages: [data.message]})
                }
                return copy;
            });
            // autoScroll(flashListRef, flashListRef?.scrollToEnd)
            // flashListRef?.scrollToEnd({animated: true})
        }
    }, [lastMessage])

    async function getMessages() {
        try {
            const response = await fetchWithAuth(`${serverRoute}/messages/conversations/${id}/get-messages`, userToken)
            const body = await response.json();
            // console.log({body})
            // console.log(body?.result)
            // console.log({result: body?.result[0]})

            // if(body.succeeded) setMessages(body?.result)
            if(body.succeeded) setMessages(groupMessages(body?.result))
        } catch(error) {
            console.log(`Error collecting messages for the conversation: ${error}`)
        }
    }

    async function getConversationData() {
        try {
            const response = await fetchWithAuth(`${serverRoute}/messages/conversations/${id}`, userToken);
            const body = await response.json();
            if(body.succeeded) {
                const {conversation, conversationParticipants} = body.result;
                // console.log({conversation, conversationParticipants})
                // console.log({result: body.result})
                const reducedParticipants = conversationParticipants.reduce((acc: ConversationParticipant[], item: ConversationParticipant) => {
                    // const {id, username, phoneNumber, email} = item;
                    // acc.push({id, username, phoneNumber, email});
                    const {id, username, phoneNumber, email, profilePicture} = item;
                    acc.push({id, username, phoneNumber, email, profilePicture});
                    return acc;
                }, []);
                const newConversation = {...conversation, users: reducedParticipants}
                setConversationInfo(newConversation)
            }
        }catch(error) {
            console.log(`Error collecting conversation info: ${error}`)
        }
    }


    
    async function loadChat() {
        setIsLoading(true);
        await getMessages();
        await getConversationData();
        setIsLoading(false);
    }

    useEffect(() => {
        loadChat();
    }, [])
    // useEffect(() => {
    //     getMessages();
    //     getConversationData();
    // }, [])


    // if(!conversationInfo) {
    //     return <Redirect href={'..'} />
    // }

    // useEffect(() => {
    //     if(conversationInfo) return useRouter().back();
    // }, [conversationInfo])

    // useEffect(() => {
    //     console.log({conversationInfo})
    // }, [conversationInfo])
    
    function getConversationTitle() {
        if(conversationInfo?.name) return conversationInfo?.name;
        if(conversationInfo?.users.length === 0) return conversationInfo?.id;
        if(conversationInfo?.users.length === 2) return conversationInfo.users.filter(user => user.id !== localUser?.id)[0].username
        // if(conversationInfo?.users.length === 2) return conversationInfo.users.filter(user => user.id !== localUser?.id)[0]
        // if(conversationInfo?.users.length === 2) {
        //     console.log(conversationInfo.users)
        //     const filteredUsers = conversationInfo.users.filter(user => user.id !== localUser?.id)[0];
        //     console.log({filteredUsers})
        // }
        const names = conversationInfo?.users.map(user => {
            if(user.id === localUser?.id) return 'You';
            return user.username
        }).join(', ');
        return names;
    }

    async function playSound() {
        const playSound = new Audio.Sound()
        await playSound.loadAsync(require('../../../assets/sounds/new-message.m4a'));
        await playSound.playAsync()       
    }
    // useEffect(() => {
    //     flatListRef?.scrollToIndex({index: messages.length-1, animated: true, viewOffset: 1})
    // }, [messages])

    async function addNewMessage() {
        try {
            // console.log('adding new message!')
            // const res = await fetchWithAuth(`${serverRoute}/messages/conversations/${id}/post-message`, userToken, "POST", JSON.stringify({text: newMessage}));
            // const body = await res.json();
            // if(socket.current) {
            //     socket.current.emit('message', JSON.stringify({text: newMessage}))
            // }
            // const res = await fetchWithAuth(`${serverRoute}/messages/conversations/${id}/post-message`, userToken, "POST", JSON.stringify({text: newMessage}));
            // const body = await res.json();
            // if(socket.current) {
            //     // socket.current.emit('message', {text: newMessage})
            //     console.log('socket present')
            //     socket.current.emit("message", {text: newMessage}, () => console.log('sent?'))
                
            // }else {
            //     const res = await fetchWithAuth(`${serverRoute}/messages/conversations/${id}/post-message`, userToken, "POST", JSON.stringify({text: newMessage}));
            //     const body = await res.json();
            // }
            // console.log({readyState})
            if(readyState === ReadyState.OPEN) {
                // socket.current.emit('message', {text: newMessage})
                // console.log('socket present')
                // socket.current.emit("message", {text: newMessage}, () => console.log('sent?'))
                // sendMessage({text: newMessage})
                sendMessage(JSON.stringify({text: newMessage}))
                
            }else {
                const res = await fetchWithAuth(`${serverRoute}/messages/conversations/${id}/post-message`, userToken, "POST", JSON.stringify({text: newMessage}));
                const body = await res.json();
            }
            // console.log({body})
            // setMessages(prev => {
            //     return [...prev, {type: 'text', sender: 'me', text: newMessage}]
            // });
            setNewMessage('')
            // flatListRef?.scrollToEnd({animated: true})
            await playSound();
        }catch(error) {
            console.log(`Error sending message: ${error}`)
        }
    }
 
    // useEffect(() => {
    //     console.log({messages})
    //     // console.log({groupedMessages: groupMessages(messages)})
    //     // console.log({groupedMessages: JSON.stringify(groupMessages(messages))})
    // }, [messages])

    if(isLoading) return <ActivityIndicator size={50} style={{position: 'absolute', top: '50%', left: '50%', transform: [{translateX: -25}, {translateY: -25}]}} color={Colors[colorScheme].primary} />

    if(!conversationInfo) return <Redirect href={'..'} />

    return (
        <View style={styles.container}>
            {/* <Stack.Screen options={{ title: id }} /> */}
            <Stack.Screen
                options={{
                    title: getConversationTitle(),
                    headerStyle: {backgroundColor: Colors[colorScheme].elevated},
                    // header: () => <HeaderElement type={conversationInfo && conversationInfo.users.length > 2 ? HeaderElementTypes.Group: HeaderElementTypes.OneOnOne} users={conversationInfo?.users}/>
                    header: () => {
                        return (
                            <HeaderElement
                                type={conversationInfo.users.length > 2 ? HeaderElementTypes.Group: HeaderElementTypes.OneOnOne}
                                users={conversationInfo.users}
                            />
                        )
                    }
                }} 
            />
            {/* <StatusBar translucent={false} backgroundColor="black" /> */}
            {/* <StatusBar translucent={false} backgroundColor="white" style={"dark"} /> */}
            <LinearGradient
                // colors={['rgba(0, 0, 0, .25)', 'transparent', 'rgba(0, 0, 0, .25)']}
                // colors={['rgba(0, 0, 0, .25)', 'transparent', 'rgba(0, 0, 0, .25)']}
                // colors={['rgba(0, 0, 0, .15)', 'transparent', 'rgba(0, 0, 0, .15)']}
                colors={['rgba(0, 0, 0, .1)', 'transparent', 'rgba(0, 0, 0, .1)']}
                // colors={['red', 'transparent', 'red']}
                style={styles.linearGradient}
            />
            <View style={styles.chatWrapper}>
            {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.chatWrapper}> */}
                {/* <LinearGradient
                    colors={['rgba(0, 0, 0, .25)', 'transparent', 'rgba(0, 0, 0, .25)']}
                    style={{position: 'absolute', top: 0, left: 0, height: '100%'}}
                > */}

                <FlashList 
                    data={messages}
                    // style={styles.messagesWrapper} 
                    // contentContainerStyle={{padding: 8, gap: 8}}
                    
                    // refreshControl={{key: '1', props: 'test', type: () => {
                    //     return <Text>test</Text>
                    // }}}
                    // refreshControl={({}) => {
                    //     return <Text>test</Text>
                    // }}
                    contentContainerStyle={{padding: 8}}
                    // estimatedItemSize={messages.length}
                    ref={(ref) => {
                        flashListRef = ref;
                    }}
                    initialScrollIndex={messages.length-1}
                    estimatedItemSize={91}
                    renderItem={({item, index}) => {
                        const {user, messages} = item;
                        return (
                            // <MessageHandler message={item.message} user={item.user}/>
                            // {messages.map((message) => {
                            //     return <MessageHandler message={message} user={item.user}/>
                            // })}
                            <>
                                {messages.map((message, index) => {
                                    return <MessageHandler key={index.toString()} message={message} user={item.user}/>
                                })}

                                {user.id !== localUser?.id && conversationInfo?.type !== 'one-to-one'? 
                                    <View style={styles.messageSenderInfoWrapper}>
                                        <Image
                                            source={require('../../../assets/images/person.png')}
                                            style={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: 48,
                                                // transform: [
                                                //     {translateX: -6},
                                                //     {translateY: -8}
                                                // ]
                                            }}
                                        />
                                        <Text style={{
                                            fontSize: 8,
                                            // transform: [
                                            //     {translateX: -6},
                                            //     {translateY: -4}
                                            // ]
                                        }}
                                        >
                                            {user.username}
                                        </Text> 
                                    </View>
                                : null}
                            </>
                        )
                    }}
                />
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
                // style={styles.messageInputWrapper}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: '100%',
        position: 'relative'
    },
    chatWrapper: {
        flex: 13,
        justifyContent: 'flex-end',
        position: 'relative',
        // borderWidth: 1,
        // borderColor: 'red',
        // borderStyle: 'solid'
    },
    linearGradient: {
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 5,
        top: 0,
        left: 0,
        right: 0,
        height: '100%'
    },
    messageSenderInfoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 4,
        // alignItems: 'flex-start',
        // gap: 2,
        marginBottom: 16,
    },
    messagesWrapper: {
        // flex: 1,
        flexGrow: 0,
        position: 'relative',
        // justifyContent: 'flex-end',
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
    // messageInputWrapper: {
    //     position: 'relative',
    //     // width: '100%',
    //     // flex: 1,
    //     // flexDirection: 'row',
    //     // alignItems: 'center',
    //     // height: '100%',
    //     // flex: 1,
    //     height: 58,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     // justifyContent: 'center',
    //     justifyContent: 'space-between',
    //     paddingVertical: 8,
    //     // backgroundColor: 'transparent',
    //     // paddingHorizontal: 8,
    //     paddingHorizontal: 12,
    //     gap: 8,
    //     // gap: 0,

    //     // borderWidth: 1,
    //     // borderColor: 'blue',
    //     // borderStyle: 'solid'
    // },
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