import { PrimaryButton } from "@/components/Buttons";
import { UserPreview, UserPreviewProps } from "@/components/Previews";
import { Text, View } from "@/components/Themed";
import { localUserStore } from "@/constants/globalState";
// import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

type User = {
    id: string,
    username: string,
    phone: string,
    profilePicture: string | null,
}

export default function NewChatPage() {
    // const [newChatParticipants, setNewChatParticipants] = useState();
    const [users, setUsers] = useState<User[]>([]);
    const [newChatParticipants, setNewChatParticipants] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {userToken, localUser} = localUserStore();
    const router = useRouter();
    
    const route = 'http://192.168.17.241:3000';
    useEffect(() => {
        console.log('started')
        fetch(`${route}/users?page=1&limit=20`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': `${userToken}`
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log({data});
            setUsers(prev => { 
                return [...prev, ...data].filter(item => item.id !== localUser?.id)
            })
        })
        .catch(error => console.error(`Error collecting users ${error}`))
    }, [])

    async function createConversation() {
        if(newChatParticipants.length <= 0) return;

        setIsLoading(true);
        const response = await fetch(`${route}/messages/new-conversation`, {
            method: 'POST',
            // body: JSON.stringify([...newChatParticipants, localUser?.id]),
            body: JSON.stringify({
                createdBy: localUser?.id,
                participants: newChatParticipants
            }),
            headers: {'Content-Type': 'application/json'}
        })

        const body = await response.json();
        console.log({body})
        if(body.succeeded) {
            router.replace('/')
        }

        setIsLoading(false);
    }

    function toggleFunction(id: string, method: 'add' | 'remove') {
        if(method === 'add') {
            setNewChatParticipants(prev => [...prev, id])
        }else {
            const newParticipants = newChatParticipants.filter(itemId => itemId !== id)
            setNewChatParticipants(newParticipants)
        }
    }
    return (
        <View style={styles.container}>
            <FlashList
                data={users}
                renderItem={({item}) => {
                    return <UserPreview toggleFunction={toggleFunction} preview={item} />
                }}
                estimatedItemSize={100}
            />
            {newChatParticipants.length > 0 ?
                <PrimaryButton
                    callback={createConversation}
                    isLoading={isLoading}
                    style={styles.floatingButton} 
                    icon={<Entypo name="paper-plane"size={15}/>}
                >
                    Start chat
                </PrimaryButton>   
            : null}
        </View>
    )
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        position: 'relative',
    },
    floatingButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    }
})