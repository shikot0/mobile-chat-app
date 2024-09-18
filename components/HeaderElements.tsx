import { Image } from "expo-image"
import { Pressable, StyleSheet, useColorScheme, View } from "react-native"
import { Text } from "./Themed"
import AntDesign from "@expo/vector-icons/AntDesign"
import Colors from "@/constants/Colors"
import Ionicons from "@expo/vector-icons/Ionicons"
import { Redirect, useRouter } from "expo-router"
import { localUserStore } from "@/constants/globalState"
import { useEffect, useState } from "react"

export enum HeaderElementTypes {
    Group = 'Group',
    OneOnOne = 'One-on-One'
}
type ConversationParticipant = {
    id: string, 
    username: string,
    phoneNumber: string,
    profilePicture: string | null, 
    email: string
}
type GroupHeaderElementProps = {
    type?: HeaderElementTypes.Group,
    users: ConversationParticipant[],
    // users: ConversationParticipant[],
    name?: string,
}
// type OneOnOneHeaderElementProps = {
type OneOnOneHeaderElementProps = {
    type?: HeaderElementTypes.OneOnOne,
    users: ConversationParticipant[],
    // users: ConversationParticipant[]
}

type HeaderElementProps = {
    type: HeaderElementTypes,
    // users: ConversationParticipant[] | undefined
} & (GroupHeaderElementProps | OneOnOneHeaderElementProps)


// export function HeaderElement({type, ...props}: HeaderElementProps) {
export function HeaderElement({...props}: HeaderElementProps) {
    // const {localUser} = localUserStore();
    // function getUserNames(users: ConversationParticipant[] | undefined, maxLength?: number) {
    //     if(!users) return 'Group';


    //     const usernames = users.reduce<string[]>((acc, user) => {
    //         // if(user.id === localUser?.id) {
    //         //     acc.push('You');
    //         // }else{
    //         //     acc.push(user.username);
    //         // }
    //         if(user.id !== localUser?.id) {
    //             acc.push(user.username);
    //         }
    //         return acc;
    //     }, []);
    //     usernames.unshift('You');
    //     const text = usernames.join(', ');
    //     if(maxLength && maxLength < text.length) {
    //         return `${text.slice(0, maxLength+1)}...`
    //     }else {
    //         return text;
    //     }
    // }

    // function handleGoBack() {
    //     router.back();
    // }
    // const router = useRouter();
    // const colorScheme = useColorScheme() ?? 'dark';

    // if(!props.users) {
    //     router.back();
    //     return;
    // }

    // if(type === HeaderElementTypes.Group) {
    if(props.type === HeaderElementTypes.Group) {
        // const {name, users} = props;
        // return GroupHeaderElement(props)
        return <GroupHeaderElement type={HeaderElementTypes.Group} users={props.users} name={props.name} />
        // return (
        //     <View style={styles.chatHeader}>
        //         <Pressable
        //             onPress={() => handleGoBack()}
        //             style={styles.backButton}
        //             android_ripple={{color: 'rgba(0, 0, 0, .25)', foreground: true, borderless: false}}
        //         >
        //             <Ionicons name="arrow-back" size={24} color={Colors[colorScheme].text}/>
        //         </Pressable>
        //         {users && users.length > 0 ? 
        //             <View style={[styles.userImagesWrapper, {transform: [{translateX: users.length > 3 ? 2 * 8 : 8}]}]}>
        //                 {users.slice(0, 3).map((user, index) => {
        //                     const {profilePicture} = user;
        //                     return (
        //                         <Image
        //                             key={index.toString()}
        //                             style={[
        //                                 styles.userImage,
        //                                 {
        //                                     transform: [
        //                                         {
        //                                             translateX: index > 0 ? (index * -8) : 0
        //                                         },
        //                                     ],
        //                                     zIndex: 3-index
        //                                 }
        //                             ]}
        //                             contentFit="contain"
        //                             source={profilePicture || require('../assets/images/person.png')}
        //                         />
        //                     )
        //                 })}
        //                 {users.length > 3 ?
        //                     <Text>{`+${users.length-3}`}</Text>
        //                 : null}
        //             </View>
        //         : null}
        //         <Text>{name || getUserNames(users)}</Text>
        //     </View>
        // )
    }else {
        // return <OneOnOneHeaderElement {...props} />
        // return OneOnOneHeaderElement(props)
        return <OneOnOneHeaderElement type={HeaderElementTypes.OneOnOne} users={props.users}/>
        // function handleGoBack() {
        //     router.back();
        // }
        // const recipient = us
        // return (
        //     <View style={styles.chatHeader}>
        //         <Pressable
        //             onPress={() => handleGoBack()}
        //             style={styles.backButton}
        //             android_ripple={{color: 'rgba(0, 0, 0, .25)', foreground: true, borderless: false}}
        //         >
        //             <Ionicons name="arrow-back" size={24} color={Colors[colorScheme].text}/>
        //         </Pressable>
        //         {users && users.length > 0 ? 
        //             <View style={[styles.userImagesWrapper, {transform: [{translateX: users.length > 3 ? 2 * 8 : 8}]}]}>
        //                 {users.slice(0, 3).map((user, index) => {
        //                     const {profilePicture} = user;
        //                     return (
        //                         <Image
        //                             key={index.toString()}
        //                             style={[
        //                                 styles.userImage,
        //                                 {
        //                                     transform: [
        //                                         {
        //                                             translateX: index > 0 ? (index * -8) : 0
        //                                         },
        //                                     ],
        //                                     zIndex: 3-index
        //                                 }
        //                             ]}
        //                             contentFit="contain"
        //                             source={profilePicture || require('../assets/images/person.png')}
        //                         />
        //                     )
        //                 })}
        //                 {users.length > 3 ?
        //                     <Text>{`+${users.length-3}`}</Text>
        //                 : null}
        //             </View>
        //         : null}
        //         <Text>{name || getUserNames(users)}</Text>
        //     </View>
    
    }
}

function GroupHeaderElement({...props}: GroupHeaderElementProps) {
    const {name, users} = props;
    const {localUser} = localUserStore();
    function getUserNames(users: ConversationParticipant[] | undefined, maxLength?: number) {
        if(!users) return 'Group';


        const usernames = users.reduce<string[]>((acc, user) => {
            // if(user.id === localUser?.id) {
            //     acc.push('You');
            // }else{
            //     acc.push(user.username);
            // }
            if(user.id !== localUser?.id) {
                acc.push(user.username);
            }
            return acc;
        }, []);
        usernames.unshift('You');
        const text = usernames.join(', ');
        if(maxLength && maxLength < text.length) {
            return `${text.slice(0, maxLength+1)}...`
        }else {
            return text;
        }
    }

    function handleGoBack() {
        router.back();
    }

    // if(!users) {
    //     return <Redirect href={'..'} />
    // }
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'dark';

    return (
        <View style={[styles.chatHeader, {backgroundColor: Colors[colorScheme].elevated}]}>
            <Pressable
                onPress={() => handleGoBack()}
                style={styles.backButton}
                android_ripple={{color: 'rgba(0, 0, 0, .25)', foreground: true, borderless: false}}
            >
                <Ionicons name="arrow-back" size={24} color={Colors[colorScheme].text}/>
            </Pressable>
            {users && users.length > 0 ? 
                <View style={[styles.userImagesWrapper, {transform: [{translateX: users.length > 3 ? 2 * 8 : 8}]}]}>
                    {users.slice(0, 3).map((user, index) => {
                        const {profilePicture} = user;
                        return (
                            <Image
                                key={index.toString()}
                                style={[
                                    styles.groupUserImage,
                                    {
                                        transform: [
                                            {
                                                translateX: index > 0 ? (index * -8) : 0
                                            },
                                        ],
                                        zIndex: 3-index
                                    }
                                ]}
                                contentFit="contain"
                                source={profilePicture || require('../assets/images/person.png')}
                            />
                        )
                    })}
                    {users.length > 3 ?
                        <Text>{`+${users.length-3}`}</Text>
                    : null}
                </View>
            : null}
            <Text>{name || getUserNames(users)}</Text>
        </View>
    )
}

function OneOnOneHeaderElement({...props}: OneOnOneHeaderElementProps) {
    const {users} = props;
    const router = useRouter();
    const {localUser} = localUserStore();
    // const [recipient, setRecipient] = useState<ConversationParticipant>({
    //     id: '',
    //     phoneNumber: '',
    //     profilePicture: '',
    //     username: '',
    //     email: ''
    // });
    const [recipient, setRecipient] = useState<ConversationParticipant>(users[0].id !== localUser?.id ? users[0] : users[1])
    function handleGoBack() {
        router.back();
    }
    console.log({users})
    // if(!users) {
    //     return <Redirect href={'..'} />
    // }
    // if(!users) {
    //     handleGoBack();
    //     return;
    // }

    // const recipient = users[0] !== localUser?.id ? users?[0] : users?[1];
    // let recipient: ConversationParticipant;
    // if(!users) {
    //     recipient = {
    //         id: '',
    //         phoneNumber: '',
    //         profilePicture: '',
    //         username: '',
    //         email: ''
    //     }
    // }else {
    //     recipient = users[0].id !== localUser?.id ? users[0] : users[1]
    // }

    // useEffect(() => {
    //     if(users) {
    //         setRecipient(users[0].id !== localUser?.id ? users[0] : users[1])
    //     }
    // }, [users])
    function getUserNames(users: ConversationParticipant[] | undefined, maxLength?: number) {
        if(!users) return 'Group';


        const usernames = users.reduce<string[]>((acc, user) => {
            // if(user.id === localUser?.id) {
            //     acc.push('You');
            // }else{
            //     acc.push(user.username);
            // }
            if(user.id !== localUser?.id) {
                acc.push(user.username);
            }
            return acc;
        }, []);
        usernames.unshift('You');
        const text = usernames.join(', ');
        if(maxLength && maxLength < text.length) {
            return `${text.slice(0, maxLength+1)}...`
        }else {
            return text;
        }
    }


    const colorScheme = useColorScheme() ?? 'dark';
    return (
        <View style={[styles.chatHeader, {backgroundColor: Colors[colorScheme].elevated}]}>
            <Pressable
                onPress={() => handleGoBack()}
                style={styles.backButton}
                android_ripple={{color: 'rgba(0, 0, 0, .25)', foreground: true, borderless: false}}
            >
                <Ionicons name="arrow-back" size={24} color={Colors[colorScheme].text}/>
            </Pressable>
                <View style={[styles.userImagesWrapper]}>
                        <Image
                            style={[
                                styles.userImage,
                            ]}
                            contentFit="contain"
                            source={recipient.profilePicture || require('../assets/images/person.png')}
                        />
                    {/* {users.length > 3 ?
                        <Text>{`+${users.length-3}`}</Text>
                    : null} */}
                </View>
            <Text>{recipient.username}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    chatHeader: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        gap: 16,
    },
    userImagesWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userImage: {
        width: 32,
        height: 32,
        borderRadius: 100,
        overflow: 'hidden'
    },
    groupUserImage: {
        width: 24,
        height: 24,
        borderRadius: 48,
        overflow: 'hidden'
    },
    backButton: {
        position: 'absolute',
        borderRadius: 48,
        top: 12,
        left: 12
    }
})