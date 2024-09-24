import { ActivityIndicator, FlatList, RefreshControl, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { ListHeading } from '@/components/StyledText';
import { ConversationPreview } from '@/components/Previews';
import { useState, useEffect, useRef } from 'react';
import { FlashList } from '@shopify/flash-list';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { PrimaryButton } from '@/components/Buttons';
import { serverRoute } from '@/constants/routes';
import { getConversations } from '@/utils/apiCalls';
import { localUserStore } from '@/constants/globalState';
import {conversations as conversationsSchema} from '@/drizzle/schema';
import { db } from '@/drizzle/db';
import { eq } from 'drizzle-orm';
import AntDesign from '@expo/vector-icons/AntDesign';
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

export default function ConversationsScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [conversations, setConversations] = useState<{conversation: Conversation, conversationParticipants: ConversationParticipant[]}[]>([]);
  const [noConversations, setNoConversations] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const {localUser, userToken} = localUserStore();
  // const messages = [
  //   {
  //     type: 'chat',
  //     username: 'Amin',
  //     id: '1',
  //     latestMessage: 'Hello'
  //   },
  //   {
  //     type: 'chat',
  //     username: 'Wisdom',
  //     id: '2',
  //     latestMessage: 'This is a test'
  //   }, 
  //   {
  //     type: 'chat',
  //     username: 'Ensa',
  //     id: '3',
  //     latestMessage: 'Hi how are you?'
  //   }
  // ]

  const colorScheme = useColorScheme() ?? 'dark';

  // const route = 'http://192.168.198.241:3000'
  // console.log({serverRoute})

  async function loadConversations() {
    try {
      setIsLoading(true);
      // return null;

      const conversationsResult = await getConversations(userToken);
      // console.log({userToken, conversationsResult})
      setConversations(conversationsResult);
      // const res = await db.insert(conversationsSchema).values(conversationsResult).returning();
      // console.log({res})
      // for(let i = 0; i < conversationsResult.length; i++) {
      //   // await db.insert(conversationsSchema).values(conversationsResult[i].conversationParticipants);
      //   for(let j = 0; j < conversationsResult[i].conversationParticipants.length; j++) {
      //     const {id, } = conversationsResult[i].conversationParticipants[j];
      //     await db.insert(conversationsSchema).values(conversationsResult[i].conversationParticipants)
      //   }
      // }
      for(let i = 0; i < conversationsResult.length; i++) {
        // const [exists] = await db.select().from(conversationsSchema).where(eq(conversationsSchema.id, conversationsResult[i].conversation.id));
        // if(!exists) await db.insert(conversationsSchema).values(conversationsResult[i].conversation);
        const [existingConversation] = await db.select().from(conversationsSchema).where(eq(conversationsSchema.id, conversationsResult[i].conversation.id));
        if(existingConversation) {
          await db.update(conversationsSchema).set(conversationsResult[i].conversation).where(eq(conversationsSchema.id, existingConversation.id));
        }else {
          await db.insert(conversationsSchema).values(conversationsResult[i].conversation);
        }
      }
      const dbConversations = await db.select().from(conversationsSchema);
      // console.log({dbConversations})
      if(conversationsResult.length === 0) setNoConversations(true);

      setIsLoading(false);
    }catch(error) {
      setIsLoading(false);
      console.log(`Error loading conversations: ${error}`)
    }
  }

  useEffect(() => {
    // console.log({localUser, userToken})
    // fetch(`${serverRoute}/messages/conversations`)
    // .then(res => res.json())
    // .then(data => {
    //   // console.log({data})
    //   if(data.succeeded) {
    //     setMessages(data.returnedConversations);
    //     // console.log({data})
    //     if(data.returnedConversations.length === 0) setNoMessages(true);
    //   }
    // }) 
    // .catch(error => {
    //   console.log(`Error: ${error}`)
    // })

    loadConversations();
  }, [])

  // useEffect(() => {
  //   getConversations(userToken)
  // }, [])

  async function handleRefresh() {
    setIsRefreshing(true);
    await loadConversations();    
    setIsRefreshing(false);
  }
 
  console.log({conversations})
  return (
    <View style={styles.container}>

      <FlashList 
          data={conversations}
          // style={styles.flatList}
          // refreshControl={{key: '1', props: {enabled: true, refreshing: true}, type: 'test'}}
          // contentContainerStyle={{paddingVertical: 48}}
          // contentContainerStyle={{paddingVertical: 20}}
          estimatedItemSize={86}
          // refreshControl={}
          refreshControl={
            <RefreshControl
              progressBackgroundColor={Colors[colorScheme].elevated}
              colors={[Colors[colorScheme].text]}
              refreshing={isRefreshing}
              progressViewOffset={100}
              onRefresh={handleRefresh}
            />
          }
          ListHeaderComponent={() => {
            return (
              <View style={styles.listHeadingWrapper}>
                <ListHeading>Messages</ListHeading>
                <PrimaryButton circular link={"/new-chat"} icon={<AntDesign name='plus' size={16} color={Colors[colorScheme].primaryButtonText}/>}></PrimaryButton>
              </View>
            )
          }}
          ListEmptyComponent={() => {
              if(isLoading) {
                // return <ActivityIndicator style={styles.centeredActivityIndicator} size={50} color={Colors[colorScheme].primary}/>
                // console.log('isloading')
                // return <ActivityIndicator style={styles.centeredActivityIndicator} size={50} color={'red'}/>
                // return <ActivityIndicator style={styles.centeredActivityIndicator} size={50} color={Colors[colorScheme].primary}/>
                // return <ActivityIndicator style={{top: 25}} size={50} color={Colors[colorScheme].primary}/>
                return <ActivityIndicator style={{marginVertical: 24}} size={50} color={Colors[colorScheme].primary}/>
              }else {
                return (
                  <View style={styles.listFooterWrapper}>
                    <Text style={styles.centeredText}>Looks like you have no conversations...</Text>
                    {/* <PrimaryButton link={"/new-chat"}>Start a conversation</PrimaryButton> */}
                  </View>
                  // <View style={styles.noConversationsWrapper}>
                  //   {/* <Text style={styles.centeredText}>Looks like you have no conversations...</Text> */}
                  //   <PrimaryButton link={"/new-chat"}>Start a conversation</PrimaryButton>
                  // </View>
                )
              }
            }
          }
          // ListFooterComponent={() => {
          //   return (
          //     // <View style={styles.listFooterWrapper}>
          //     //   {/* <Text style={styles.centeredText}>Looks like you have no conversations...</Text> */}
          //     //   <PrimaryButton link={"/new-chat"}>Start a conversation</PrimaryButton>
          //     // </View>

          //     <View style={styles.listFooterWrapper}>
          //       <PrimaryButton callback={loadConversations}>Reload</PrimaryButton>
          //       {/* <PrimaryButton callback={() => {setConversations([]); loadConversations()}}>Reload</PrimaryButton> */}
          //     </View>
          //   )
          // }}
          renderItem={({item, index}) => {
            // return <Text>{item.from}</Text>
            return <ConversationPreview preview={item} />
          }}
      />
  
      
    

    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center', 
  },
  flatList: {
    // position: 'relative',
    // position: 'relative',
    // flex: 1,
    // flexGrow: 1,
    // height: '100%',
    // backgroundColor: 'blue',
    // borderRadius: 50,
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'red',
    // overflow: 'hidden'
    // borderRadius: 8,
    // overflow: 'hidden', 
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'red'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listHeadingWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listFooterWrapper: {
    flex: 1,
    // minHeight: 250,
    padding: 16,
    alignItems: 'center', 
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
    // borderStyle: 'solid'
  },
  centeredText: {
    // position: 'absolute',
    // left: '50%',
    // top: '50%',
    textAlign: 'center'
  },
  centeredActivityIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      {
        translateX: -25
      },
      {
        translateY: -25
      }
    ]
  }
});
