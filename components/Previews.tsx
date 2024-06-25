import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { View, Text } from "./Themed";
// import Image from 'expo-image';
import { Image } from "react-native";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

interface MessagePreviewProps {
    preview: {
        type: string,
        id: string,
        username: string,
        latestMessage: string,
    }
}

// export function MessagePreview({userId, username, latestMessage}: MessagePreviewProps) {
export function MessagePreview({preview}: MessagePreviewProps) {
    const colorScheme = useColorScheme() ?? 'dark';
    const {type, id, username, latestMessage} = preview;
    return (
        // <View style={styles.messagePreview}>
        //     <View style={styles.profilePictureWrapper}>
        //         <Image style={styles.profilePicture} source={require('../assets/images/favicon.png')} resizeMode="cover"/>
        //     </View>
        //     <View style={styles.messageTextWrapper}>
        //         <Text>{username}</Text>
        //         <Text>{latestMessage}</Text>
        //     </View>
        // </View>

        // <Link href={`/${type}/${id}`} style={styles.messagePreview}>
        // <Link href={`/${type}/${id}`} asChild style={[styles.messagePreview, {backgroundColor: Colors[colorScheme].elevated}]}>
        //     {/* <View style={[styles.messagePreview, {backgroundColor: Colors[colorScheme].elevated}]}> */}
        //     {/* <View style={[{backgroundColor: Colors[colorScheme].elevated}]}> */}
        //     <View>
        //         <View style={styles.profilePictureWrapper}>
        //             <Image style={styles.profilePicture} source={require('../assets/images/favicon.png')} resizeMode="cover"/>
        //         </View>
        //         <View style={[styles.messageTextWrapper, {backgroundColor: Colors[colorScheme].elevated}]}>
        //             <Text>{username}</Text>
        //             <Text>{latestMessage}</Text>
        //         </View>
        //     </View>
        // </Link>
        // <View style={[styles.messagePreviewWrapper, {backgroundColor: Colors[colorScheme].elevated}]}>
        //     <Link href={`/${type}/${id}`} style={styles.messagePreview}>
        //         {/* <View style={[styles.messagePreview, {backgroundColor: Colors[colorScheme].elevated}]}> */}
        //         {/* <View style={[{backgroundColor: Colors[colorScheme].elevated}]}> */}
        //             <View style={styles.profilePictureWrapper}>
        //                 <Image style={styles.profilePicture} source={require('../assets/images/favicon.png')} resizeMode="cover"/>
        //             </View>
        //             <View style={[styles.messageTextWrapper, {backgroundColor: Colors[colorScheme].elevated}]}>
        //                 <Text>{username}</Text>
        //                 <Text>{latestMessage}</Text>
        //             </View>
        //     </Link>
        // </View>
        <Link href={`/${type}/${id}`} asChild>
            <Pressable>
                <View style={[styles.messagePreview, {backgroundColor: Colors[colorScheme].elevated}]}>
                    <View style={styles.profilePictureWrapper}>
                        <Image style={styles.profilePicture} source={require('../assets/images/favicon.png')} resizeMode="cover"/>
                    </View>
                    <View style={[styles.messageTextWrapper, {backgroundColor: Colors[colorScheme].elevated}]}>
                        <Text style={styles.username}>{username}</Text>
                        <Text>{latestMessage}</Text>
                    </View>
                </View>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    messagePreviewWrapper: {
        // width: '100%',
        flexDirection: 'row',
        // alignItems: 'center',
        // borderWidth: 1,
        // borderStyle: 'solid',
        // borderColor: 'red',
        // padding: 16,
        // gap: 16,
    },
    messagePreview: {
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
    username: {
        fontWeight: "bold"
    },
    messageTextWrapper: {
        flexGrow: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 8,
    },
})