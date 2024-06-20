import { StyleSheet } from "react-native";
import { View, Text } from "./Themed";
// import Image from 'expo-image';
import { Image } from "react-native";
import { Link } from "expo-router";

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
    const {type, id, username, latestMessage} = preview
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
        <Link href={`chats/${type}/${id}`}>
            <View style={styles.messagePreview}>
                <View style={styles.profilePictureWrapper}>
                    <Image style={styles.profilePicture} source={require('../assets/images/favicon.png')} resizeMode="cover"/>
                </View>
                <View style={styles.messageTextWrapper}>
                    <Text>{username}</Text>
                    <Text>{latestMessage}</Text>
                </View>
            </View>
        </Link>
    )
}

const styles = StyleSheet.create({
    messagePreviewWrapper: {
        width: '100%',
    },
    messagePreview: {
        width: '100%',
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'row',
        padding: 16,
        gap: 16,
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
    messageTextWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 8,
    },
})