import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { ListHeading } from '@/components/StyledText';
import { ConversationPreview } from '@/components/Previews';
import { useState, useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { PrimaryButton } from '@/components/Buttons';

export default function MessagesScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState([]);
  const [noMessages, setNoMessages] = useState<boolean>(false);
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

  const route = 'http://192.168.17.241:3000'

  useEffect(() => {
    setIsLoading(true);

    fetch(`${route}/messages/conversations`)
    .then(res => res.json())
    .then(data => {
      console.log({data})
      if(data.succeeded) {
        setMessages(data.returnedConversations);
        console.log({data})
        if(data.returnedConversations.length === 0) setNoMessages(true);
      }
    }) 
    .catch(error => {
      console.log(`Error: ${error}`)
    })

    // setTimeout(() => setIsLoading(false), 10000)
    setIsLoading(false);
  
    // console.log({data})
  }, [])
 
  return (
    <View style={styles.container}>

      <FlashList 
          data={messages}
          // style={styles.flatList}
          contentContainerStyle={{paddingVertical: 48}}
          estimatedItemSize={86}
          // refreshControl={}
          ListEmptyComponent={() => {
              if(isLoading) {
                return <ActivityIndicator style={styles.centeredActivityIndicator} size={50} color={Colors[colorScheme].primary}/>
              }else {
                return (
                  <View style={styles.noConversationsWrapper}>
                    {/* <Text style={styles.centeredText}>Looks like you have no conversations...</Text> */}
                    <PrimaryButton link={"/new-chat"}>Start a conversation</PrimaryButton>
                  </View>
                )
              }
            }
          }
          renderItem={({item, index}) => {
            // return <Text>{item.from}</Text>
            return <ConversationPreview preview={item} />
          }}
          ListHeaderComponent={() => <ListHeading>Messages</ListHeading>}
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
  noConversationsWrapper: {
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