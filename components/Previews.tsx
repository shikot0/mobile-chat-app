import { Pressable, StyleSheet, TouchableHighlight, useColorScheme } from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler';
import { View, Text } from "./Themed";
// import Image from 'expo-image';
import { Image } from "react-native";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import { useEffect, useState } from "react";
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
    participantId: string,
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
    const {id, conversationType} = conversation;
    // const {} = conversationParticipants;
    return (
        <Link href={`/${conversationType}/${id}`} asChild>
            {/* <Pressable android_ripple={{color: 'rgba(255, 255, 255, .25)', radius: 50, foreground: true, borderless: false}}> */}
            {/* <Pressable android_ripple={{color: 'rgba(255, 255, 255, .25)', radius: 100, foreground: true, borderless: false}}> */}
            <Pressable android_ripple={{color: 'black', foreground: true, borderless: false}}>
                <View style={[styles.conversationPreview, {backgroundColor: Colors[colorScheme].elevated}]}>
                    <View style={styles.profilePictureWrapper}>
                        <Image style={styles.profilePicture} source={require('../assets/images/favicon.png')} resizeMode="cover"/>
                    </View>
                    {/* <View style={[styles.conversationDetailsWrapper, {backgroundColor: Colors[colorScheme].elevated}]}>
                        <Text style={styles.username}>{username}</Text>
                        <Text>{latestMessage}</Text>
                    </View> */}
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
    toggleFunction?: Function,
    isAlreadySelected?: boolean,
}
// export interface UserPreviewProps {
//     preview: {
//         id: string,
//         username: string,
//         phone: string,
//         profilePicture: string | null,
//     }
// }

export function UserPreview({preview, toggleFunction, isAlreadySelected}: UserPreviewProps) {
    const {id, username, phone, profilePicture} = preview;
    const [isSelected, setIsSelected] = useState<boolean>(isAlreadySelected ?? false)
    const colorScheme = useColorScheme() ?? 'dark';

    function handleToggle() {
        setIsSelected(prev => !prev)
    }   

    useEffect(() => {
        if(!toggleFunction) return;
        
        if(isSelected) {
            toggleFunction(id, 'add')
        }else {
            toggleFunction(id, 'remove')
        }
    }, [isSelected])
    return (
        <Pressable 
            onPress={() => handleToggle()}
            android_ripple={{color: 'black', foreground: true, borderless: false}}
        >
            {/* <View style={[styles.userPreview, {backgroundColor: Colors[colorScheme].elevated}]}> */}
            <View style={[styles.userPreview, {backgroundColor: isSelected ? Colors[colorScheme].primary : Colors[colorScheme].elevated}]}>
                {/* <View style={styles.profilePictureWrapper}>
                    <Image style={styles.profilePicture} source={require('../assets/images/favicon.png')} resizeMode="cover"/>
                </View>
                <View style={[styles.userInfoWrapper, {backgroundColor: Colors[colorScheme].elevated}]}>
                    <Text style={styles.username}>{username}</Text>
                </View> */}

                {/* <LinearGradient style={{position: 'absolute', width: '100%', height: '100%', zIndex: 0}} colors={isSelected ? [Colors[colorScheme].elevated, Colors[colorScheme].primary] : [Colors[colorScheme].elevated, Colors[colorScheme].elevated]}/> */}
                <View style={styles.profilePictureWrapper}>
                    <Image style={styles.profilePicture} source={require('../assets/images/favicon.png')} resizeMode="cover"/>
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
        width: 52,
        height: 52,
        borderRadius: 100,
        overflow: 'hidden',
        // backgroundColor
    },
    profilePicture: {
        width: '100%',
        height: '100%'
    },
    conversationDetailsWrapper: {
        flexGrow: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
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