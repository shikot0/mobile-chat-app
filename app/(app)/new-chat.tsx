import { PrimaryButton } from "@/components/Buttons";
import { UserPreview, UserPreviewProps } from "@/components/Previews";
import { Text, View } from "@/components/Themed";
import { localUserStore } from "@/constants/globalState";
// import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet } from "react-native";
import { serverRoute } from "@/constants/routes";

type User = {
    id: string,
    username: string,
    phone: string,
    profilePicture: string | null,
}

type UserSelect = {
    user: User,
    isSelected: boolean,
}

export default function NewChatPage() {
    // const [newChatParticipants, setNewChatParticipants] = useState();
    // const [users, setUsers] = useState<User[]>([]);
    const [users, setUsers] = useState<UserSelect[]>([]);
    // const [newChatParticipants, setNewChatParticipants] = useState<string[]>([]);
    // const [newChatParticipants, setNewChatParticipants] = useState<any[]>([]);
    // const [newChatParticipants, setNewChatParticipants] = useState<{[key: string]: boolean}>({});
    // const [newChatParticipantsArray, setNewChatParticipantsArray] = useState<string[]>([]);
    // const [newChatParticipants, setNewChatParticipants] = useState<Set<string>>(new Set())
    const [newChatParticipants, setNewChatParticipants] = useState<Set<string>>(new Set())
    // const newChatParticipantsArray = Object.keys(Array);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {localUser} = localUserStore();
    const router = useRouter();
    
    // const route = 'http://192.168.17.241:3000';
    useEffect(() => {
        // console.log('started')
        fetch(`${serverRoute}/users?page=1&limit=20`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Bearer': `${userToken}`
            },
        })
        .then(res => res.json())
        .then(data => {
            // console.log({data});
            setUsers(prev => { 
                // return [...prev, ...data].filter(item => item.id !== localUser?.id)
                const newArr = [...prev, ...data].filter(item => item.id !== localUser?.id).map<UserSelect>((item) => {
                    return {user: item, isSelected: false}
                })
                // return [...prev, ...data].filter(item => item.id !== localUser?.id).map((item) => {
                //     return {item, isSelected: false}
                // })
                return newArr;
            })
        })
        .catch(error => console.error(`Error collecting users ${error}`))
    }, [])

    async function createConversation() {
        // if(newChatParticipants.length <= 0) return;
        // if(newChatParticipantsArray.length <= 0) return;
        if(newChatParticipants.size <= 0) return;
        try {
            setIsLoading(true);
            const response = await fetch(`${serverRoute}/messages/new-conversation`, {
                method: 'POST',
                // body: JSON.stringify([...newChatParticipants, localUser?.id]),
                body: JSON.stringify({
                    createdBy: localUser?.id,
                    participants: [...newChatParticipants]
                }),
                headers: {'Content-Type': 'application/json'}
            })
    
            const body = await response.json();
            console.log({body})
            if(body.succeeded) {
                router.replace('/')
            }
    
            setIsLoading(false);
        }catch(error) {
            setIsLoading(false)
            console.log(`Error creating conversation: ${error}`)
        }
    }

    function toggleFunction(id: string) {
        const containsId = newChatParticipants.has(id);
        console.log({containsId, newChatParticipants})
        if(!containsId) {
            setUsers(prev => {
                // const index = prev.find((item) => {
                //     item.user.id === id;
                // })
                // const index = prev.indexOf()
                const index = prev.findIndex((item) => item.user.id === id);
                console.log({index})
                if(!isNaN(index)) {
                    // const newItem = prev[index]
                    // newItem.isSelected = true;
                    prev[index].isSelected = true;
                    // prev[index] = newItem;
                }
                console.log({prev})
                return [...prev];
            })
            setNewChatParticipants(prev => {
                prev.add(id)
                return prev
            })
        }else {
            let testParticipants = newChatParticipants;
            testParticipants.delete(id);
            // console.log({testParticipants})
            setUsers(prev => {
                // const index = prev.find((item) => {
                //     item.user.id === id;
                // })
                // const index = prev.indexOf()
                const index = prev.findIndex((item) => item.user.id === id);
                if(!isNaN(index)) {
                    prev[index].isSelected = false;
                }
                return [...prev];
            })
            setNewChatParticipants(testParticipants)
            // setNewChatParticipants(prev => {
            //     prev.delete(id);
            //     return prev;
            // })
        }
    }

    // function handleAddItem(id: string) {
    //     setNewChatParticipants(prev => [...prev, id])
    // }
    // function handleRemoveItem(id: string) {
    //     // let participants = [...newChatParticipants].filter(userId => userId !== id);
    //     // console.log({participants})
    //     const participants: string[] = [];
    //     console.log({newChatParticipants})
    //     // for(let i = 0; i < newChatParticipants.length; i++) {
    //     //     console.log({item: newChatParticipants[i]})
    //     //     if(newChatParticipants[i] !== id) {
    //     //         participants.push(newChatParticipants[i])
    //     //     }
    //     // }
    //     // console.log({participants})
    //     // setNewChatParticipants(participants)
    // }

    // useEffect(() => {
    //     console.log({newChatParticipants})
    // }, [newChatParticipants])
    // useEffect(() => {
    //     console.log({users})
    // }, [users])
    // useEffect(() => {
    //     // console.log({newChatParticipantsArray})
    //     setNewChatParticipantsArray(Object.keys(newChatParticipants))
    // }, [newChatParticipants])
    // useEffect(() => {
    //     // console.log({newChatParticipantsArray})
    //     console.log(newChatParticipantsArray);
    // }, [newChatParticipantsArray])
    return (
        <View style={styles.container}>
            <FlashList
                data={users}
                renderItem={({item}) => {
                    const {user, isSelected} = item;
                    // console.log({isSelected})
                    // return <UserPreview toggleFunction={toggleFunction} preview={item} />
                    // return <UserPreview toggleFunction={toggleFunction} isSelected={newChatParticipants.includes(item.id)} preview={item} />
                    // return <UserPreview addItemFunction={handleAddItem} removeItemFunction={handleRemoveItem} isSelected={newChatParticipants.includes(item.id)} preview={item} />
                    // return <UserPreview addItemFunction={handleAddItem} removeItemFunction={handleRemoveItem} preview={item} />
                    // let isSelected = newChatParticipants.has(item.id);
                    // let isSelected = false;
                    // const [isSelected, setIsSelectd] = useState(false);
                    return (
                        // <Pressable 
                        //     // onPress={() => isSelected ? handleRemoveItem(item.id) : handleAddItem(item.id)}
                        //     // onPress={() => toggleFunction(item.id)}
                        //     onPress={() => {
                        //         toggleFunction(user.id)
                        //         // isSelected = !isSelected;
                        //     }}
                        //     // style={{backgroundColor: newChatParticipants.has(item.id) ? 'red' : 'blue'}}
                        //     style={{backgroundColor: isSelected ? 'red' : 'blue'}}
                        //     android_ripple={{color: 'black', foreground: true, borderless: false}}
                        // >
                        //     <UserPreview isSelected={isSelected} preview={user} />
                        // </Pressable>
                        <UserPreview toggleFunction={toggleFunction} isSelected={isSelected} preview={user} />
                    )
                }}
                estimatedItemSize={100}
            />
            {/* {newChatParticipants.length > 0 ? */}
            {/* {newChatParticipantsArray.length > 0 ? */}
            {newChatParticipants.size > 0 ?
                <PrimaryButton
                    callback={createConversation}
                    isLoading={isLoading}
                    style={styles.floatingButton} 
                    icon={<Entypo name="paper-plane"size={15}/>}
                >
                    {/* Start chat */}
                    {`Start a ${newChatParticipants.size > 1 ? 'group chat' : 'chat'}`}
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