import { Pressable, StyleSheet, TouchableHighlight, useColorScheme } from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import { View, Text } from "./Themed";
// import Image from 'expo-image';
import { Image } from "react-native";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import { useEffect, useState } from "react";
import { localUserStore } from '@/constants/globalState';
import { LinearGradient } from "expo-linear-gradient";

interface Conversation {
    id: string,
    conversationType: string,
    createdBy: string,
    createdAt: string
}

interface ConversationParticipant {
    id: string,
    username: string,
    email: string,
    phone: string,
    conversationId: string,
    userId: string,
    profilePicture: string,
    createdAt: string,
    joinDate: string,
}

interface ConversationPreviewProps {
    preview: {

        // type: string,
        // id: string,
        // username: string,
        // latestMessage: string,
        conversation: Conversation,
        conversationParticipants: ConversationParticipant[]
    }
}

// export function MessagePreview({userId, username, latestMessage}: MessagePreviewProps) {
export function ConversationPreview({preview}: ConversationPreviewProps) {
    const colorScheme = useColorScheme() ?? 'dark';
    const {conversation, conversationParticipants} = preview;
    // const {profilePicture} = conversat
    const {localUser} = localUserStore();
    // console.log({conversation, conversationParticipants})
    const {id, conversationType} = conversation;
    // const {} = conversationParticipants;
    return (
        // <Link href={`/${conversationType}/${id}`} asChild>
        <Link href={`/chat/${id}`} asChild>
            {/* <Pressable android_ripple={{color: 'rgba(255, 255, 255, .25)', radius: 50, foreground: true, borderless: false}}> */}
            {/* <Pressable android_ripple={{color: 'rgba(255, 255, 255, .25)', radius: 100, foreground: true, borderless: false}}> */}
            <Pressable android_ripple={{color: 'black', foreground: true, borderless: false}}>
                <View style={[styles.conversationPreview, {backgroundColor: Colors[colorScheme].elevated}]}>
                    <View
                        style={[
                            styles.profilePictureWrapper,
                            // {borderRadius: 0}
                            // {
                            //     flexWrap: conversationParticipants.length >= 3 ? 'wrap' : 'nowrap',
                            //     justifyContent: conversationParticipants.length >= 3 ? 'center' : 'space-between',
                            // }
                        ]}
                    >
                        {/* <Image style={styles.profilePicture} source={require('../assets/images/favicon.png')} resizeMode="cover"/> */}
                        {/* <Image style={styles.profilePicture} source={conversationType === 'one-to-one' && !conversationParticipants[0]?.profilePicture ? require('../assets/images/person.png') : require('../assets/images/favicon.png')} resizeMode="cover"/> */}
                        {conversationParticipants.length <= 2 ?
                            <Image style={styles.profilePicture} source={require('../assets/images/person.png')} resizeMode="cover"/>
                        : 
                            // conversationParticipants.length > 4 ?
                            conversationParticipants.length > 3 ?
                                <Image style={styles.profilePicture} source={require('../assets/images/people.png')} resizeMode="cover"/>
                            :
                                // conversationParticipants.filter(participant => {
                                //     if(participant.userId !== localUser?.id) return participant;
                                // }).map((participant, index) => {
                                //     return <Image
                                //         key={index.toString()}
                                //         style={[
                                //             styles.profilePicture,
                                //             {
                                //                 alignSelf: (index === 1 || index === 3) ? 'flex-end': 'flex-start',
                                //                 width: '50%',
                                //                 height: '50%'                                                
                                //             }
                                //         ]}
                                //         source={require('../assets/images/person.png')}
                                //         resizeMode="cover"
                                //     />
                                // })
                                conversationParticipants
                                .filter(participant => {
                                    if(participant.userId !== localUser?.id) return participant;
                                })
                                .map((participant, index) => {
                                    return <Image
                                        key={index.toString()}
                                        style={[
                                            styles.profilePicture,
                                            {
                                                // alignSelf: (index === 1 || index === 3) ? 'flex-end': 'flex-start',
                                                // alignSelf: (index === 1 || index === 2) ? 'flex-end': 'flex-start',
                                                alignSelf: index === 1 ? 'flex-end': 'flex-start',
                                                width: '50%',
                                                height: '50%'                                                
                                            }
                                        ]}
                                        source={require('../assets/images/person.png')}
                                        // resizeMode="cover"
                                        resizeMode="contain"
                                    />
                                })
                        }
                    </View>
                    {/* <View style={[styles.conversationDetailsWrapper, {backgroundColor: Colors[colorScheme].elevated}]}>
                        <Text style={styles.username}>{username}</Text>
                        <Text>{latestMessage}</Text>
                    </View> */}
                    <View style={[styles.conversationDetailsWrapper, {backgroundColor: Colors[colorScheme].elevated}]}>
                        {conversationParticipants.filter((participant) => {
                            if(participant.userId !== localUser?.id) return participant;
                        }).map((participant, index, arr) => {
                            if(index < arr.length-1) {
                                return <Text key={index.toString()} style={styles.username}>{`${participant.username},`}</Text>
                            }else {
                                return <Text key={index.toString()} style={styles.username}>{participant.username}</Text>
                            }
                        })}
                        {/* {conversationParticipants.map((participant, index, arr) => {
                            if(index < arr.length-1) {
                                return <Text key={index.toString()} style={styles.username}>{`${participant.username},`}</Text>
                            }else {
                                return <Text key={index.toString()} style={styles.username}>{participant.username}</Text>
                            }
                        })} */}
                    </View>
                </View>
            </Pressable>
        </Link>
    )
}     
 
export type UserPreviewProps = {
    preview: {
        id: string,
        username: string,
        phone: string,
        profilePicture: string | null,
    },
    isSelected?: boolean,
    // toggleFunction?: Function,
    // addItemFunction?: Function,
    // removeItemFunction?: Function,
    // isAlreadySelected?: boolean,
    toggleFunction?: Function
}
// export interface UserPreviewProps {
//     preview: {
//         id: string,
//         username: string,
//         phone: string,
//         profilePicture: string | null,
//     }
// }

// export function UserPreview({preview, toggleFunction, isAlreadySelected}: UserPreviewProps) {
// export function UserPreview({preview, toggleFunction, isSelected}: UserPreviewProps) {
// export function UserPreview({preview, addItemFunction, removeItemFunction, isSelected}: UserPreviewProps) {
export function UserPreview({preview, toggleFunction, isSelected}: UserPreviewProps) {
    const {id, username, phone, profilePicture} = preview;
    console.log({isSelected})
    // const [isSelected, setIsSelected] = useState<boolean>(isAlreadySelected ?? false);
    const [currentlySelected, setCurrentlySelected] = useState(false);
    const colorScheme = useColorScheme() ?? 'dark';

    // function handleToggle() {
    //     setIsSelected(prev => !prev)
    // }
    function handleToggle() {
        // if(!addItemFunction || !removeItemFunction) return;
        // if(currentlySelected) {
        //     removeItemFunction(id)
        //     setCurrentlySelected(false);
        // }else {
        //     addItemFunction(id)
        //     setCurrentlySelected(true);
        // }
        // toggleFunction(id, isSelected ? 'remove' : 'add')
        // setCurrentlySelected(toggleFunction(id, currentlySelected ? 'remove' : 'add'));
        if(!toggleFunction) return;
        toggleFunction(id)
    }

    // useEffect(() => {
    //     // console.log({toggleFunction})
    //     if(!toggleFunction) return;
        
    //     if(isSelected) {
    //         console.log('adding')
    //         toggleFunction(id, 'add')
    //     }else {
    //         console.log('removing')
    //         toggleFunction(id, 'remove')
    //     }
    // }, [isSelected])
    return (
        <Pressable 
            onPress={() => handleToggle()}
            android_ripple={{color: 'black', foreground: true, borderless: false}}
        >
            {/* <View style={[styles.userPreview, {backgroundColor: Colors[colorScheme].elevated}]}> */}
            {/* <View style={[styles.userPreview, {backgroundColor: isSelected ? Colors[colorScheme].primary : Colors[colorScheme].elevated}]}> */}
            <View style={[styles.userPreview, {backgroundColor: isSelected ? Colors[colorScheme].primary : Colors[colorScheme].elevated}]}>
                {/* <View style={styles.profilePictureWrapper}>
                    <Image style={styles.profilePicture} source={require('../assets/images/favicon.png')} resizeMode="cover"/>
                </View>
                <View style={[styles.userInfoWrapper, {backgroundColor: Colors[colorScheme].elevated}]}>
                    <Text style={styles.username}>{username}</Text>
                </View> */}

                {/* <LinearGradient style={{position: 'absolute', width: '100%', height: '100%', zIndex: 0}} colors={isSelected ? [Colors[colorScheme].elevated, Colors[colorScheme].primary] : [Colors[colorScheme].elevated, Colors[colorScheme].elevated]}/> */}
                <View style={styles.profilePictureWrapper}>
                    <Image style={styles.profilePicture} source={require('../assets/images/person.png')} resizeMode="cover"/>
                </View>
                {/* <View style={[styles.userInfoWrapper, {backgroundColor: Colors[colorScheme].elevated}]}> */}
                <View style={[styles.userInfoWrapper]}>
                    <Text style={styles.username}>{username}</Text>
                    {/* <Text>{latestMessage}</Text> */}
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    // conversationPreviewWrapper: {
    //     // width: '100%',
    //     flexDirection: 'row',
    //     // alignItems: 'center',
    //     // borderWidth: 1,
    //     // borderStyle: 'solid',
    //     // borderColor: 'red',
    //     // padding: 16,
    //     // gap: 16,
    // },
    conversationPreview: {
        width: '100%',
        display: 'flex',
        // flexGrow: 1,
        flexDirection: 'row',
        padding: 16,
        gap: 16,
        rowGap: 32,
        // backgroundColor: 'red',
        // borderWidth: 1,
        // borderStyle: 'solid',
        // borderColor: 'blue',
    },
    profilePictureWrapper: {
        display: 'flex',
        flexDirection: 'row',
        // alignItems: ''
        // flexWrap: 'wrap',
        // justifyContent: 'center',
        // justifyContent: 'center',
        // alignItems: 'center',
        // flexWrap: 'wrap',
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 4,
        // gap: 0,
        width: 52,
        height: 52,
        borderRadius: 100,
        // overflow: 'hidden',
        // borderWidth: 1,
        // borderStyle: 'solid',
        // borderColor: 'red',
        // backgroundColor
    },
    profilePicture: {
        // width: '100%',
        // height: '100%',
        // alignSelf: 'flex-end',
        // flex: 1,
        // flex: 1,
        width: '100%',
        height: '100%',
        aspectRatio: 1/1,
        borderRadius: 48
    },
    conversationDetailsWrapper: {
        flexGrow: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
        gap: 8,
    },
    username: {
        fontWeight: "bold",
        backgroundColor: 'transparent'
    },
    userPreview: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: 16,
        gap: 16,
        rowGap: 32,
    },
    userInfoWrapper: {
        flexGrow: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        gap: 8,
    }
})