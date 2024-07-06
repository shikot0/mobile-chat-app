import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { ListHeading } from '@/components/StyledText';
import { MessagePreview } from '@/components/Previews';

export default function MessagesScreen() {
  const messages = [
    {
      type: 'chat',
      username: 'Amin',
      id: '1',
      latestMessage: 'Hello'
    },
    {
      type: 'chat',
      username: 'Wisdom',
      id: '2',
      latestMessage: 'This is a test'
    }, 
    {
      type: 'chat',
      username: 'Ensa',
      id: '3',
      latestMessage: 'Hi how are you?'
    }
  ]
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      <FlatList 
        data={messages}
        style={styles.flatList}
        contentContainerStyle={{paddingVertical: 48, alignItems: 'stretch'}}
        renderItem={({item, index}) => {
          // return <Text>{item.from}</Text>
          return <MessagePreview preview={item} />
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
