import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { ListHeading } from '@/components/StyledText';
import { ConversationPreview } from '@/components/Previews';
import { useState, useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { PrimaryButton } from '@/components/Buttons';
import { serverRoute } from '@/constants/routes';
import { getConversations } from '@/utils/apiCalls';
import { localUserStore } from '@/constants/globalState';

export default function ConversationsScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [conversations, setConversations] = useState([]);
  const [noConversations, setNoConversations] = useState<boolean>(false);
  const {userToken} = localUserStore();
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

      const conversationsResult = await getConversations(userToken);
      setConversations(conversationsResult);
      if(conversationsResult.length === 0) setNoConversations(true);

      setIsLoading(false);
    }catch(error) {
      console.log(`Error loading conversations: ${error}`)
    }
  }

  useEffect(() => {

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
    loadConversations()
  }, [])

  // useEffect(() => {
  //   getConversations(userToken)
  // }, [])
 
  return (
    <View style={styles.container}>

      <FlashList 
          data={conversations}
          // style={styles.flatList}
          contentContainerStyle={{paddingVertical: 48}}
          estimatedItemSize={86}
          // refreshControl={}
          ListHeaderComponent={() => <ListHeading>Messages</ListHeading>}
          ListEmptyComponent={() => {
              if(isLoading) {
                return <ActivityIndicator style={styles.centeredActivityIndicator} size={50} color={Colors[colorScheme].primary}/>
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
          ListFooterComponent={() => {
            return (
              // <View style={styles.listFooterWrapper}>
              //   {/* <Text style={styles.centeredText}>Looks like you have no conversations...</Text> */}
              //   <PrimaryButton link={"/new-chat"}>Start a conversation</PrimaryButton>
              // </View>

              <View style={styles.listFooterWrapper}>
                <PrimaryButton callback={loadConversations}>Reload</PrimaryButton>
              </View>
            )
          }}
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
    // flex: 1,
    // flexGrow: 1,
    height: '100%',
    backgroundColor: 'blue',
    // borderRadius: 8,
    // overflow: 'hidden', 
    // borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'red'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listFooterWrapper: {
    flex: 1,
    minHeight: 250,
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
