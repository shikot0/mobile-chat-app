import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { Text, useThemeColor, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import {Image} from 'expo-image'
import { messages } from '@/drizzle/schema';
import { SmallHeading } from '@/components/StyledText';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { localUserStore } from '@/constants/globalState';
import { Redirect, useRouter } from 'expo-router';
import { DangerButton } from '@/components/Buttons';
import * as SecureStore from 'expo-secure-store';
import { LocalUser } from '@/utils/handleLocalData';


export default function SettingsScreen() {
  const [isSignOutLoading, setIsSignOutLoading] = useState<boolean>(false);
  const {localUser, setLocalUser, setUserToken, setIsLoggedIn} = localUserStore();
  const router = useRouter();
  let userData: LocalUser = {
    id: '',
    username: '',
    email: '',
    phoneNumber: '',
    profilePicture: null
  }

  // console.log({localUser})
  // if(!localUser) {
  //   return <Redirect href="./" />
  // }

  if(localUser) {
    userData = localUser
  }
  // const {id, username, email, phoneNumber, profilePicture} = localUser;
  const {id, username, email, phoneNumber, profilePicture} = userData;



  const colorScheme = useColorScheme() ?? 'dark';

  async function signOut() {
    setIsSignOutLoading(true);
    await SecureStore.deleteItemAsync('local-user');
    await SecureStore.deleteItemAsync('user-token');
    setLocalUser(null);
    setUserToken(null);
    setIsLoggedIn(false);
    setIsSignOutLoading(false);
    // router.replace("/register")
  }


  // async function addEntry() {
  //   await db.insert(messages).values({id: '1034214013413', email: 'test', password: 'testpassword', phone: '52623221341951', username: 'sheikh'})
  // }

  // useEffect(() => {
  //   addEntry()
  // }, []) 

  // const {data} = useLiveQuery(db.select().from(messages));
  // console.log({data}) 
  
  return (
      <View style={styles.container}>
        <ScrollView style={styles.settingsWrapper} contentContainerStyle={{gap: 36}}>
          <View style={[styles.profileSection, {backgroundColor: Colors[colorScheme].elevated}]}>
              <View style={[styles.profilePictureWrapper, {borderColor: Colors[colorScheme].primary}]}>
                <Image source={require('../../../assets/testImages/test_image_1.jpg')} style={styles.profilePicture}/>
              </View>
              <SmallHeading>{username}</SmallHeading>
              <Text>{phoneNumber}</Text>
          </View>

          <View style={[styles.optionGroup, {backgroundColor: Colors[colorScheme].elevated}]}>
              {/* <SmallHeading>Privacy</SmallHeading> */}
              {/* <Text>Privacy</Text> */}
              <Pressable style={styles.option} android_ripple={{color: 'rgba(0, 0, 0, .25)', foreground: true, borderless: false}}>
                <Text>Random Setting</Text>
              </Pressable>
          </View>
          <DangerButton callback={signOut} isLoading={isSignOutLoading}>Sign out</DangerButton>
        </ScrollView>
      </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 40,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid'
  },
  profileSection: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 280,
    gap: 16,
    position: 'relative',
    overflow: 'hidden',
    // backgroundColor: 'grey',
    borderRadius: 16,
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid'
  },
  profilePictureWrapper: {
    width: '40%',
    aspectRatio: 1/1,
    borderRadius: 1000,
    overflow: 'hidden',
    borderStyle: 'solid',
    borderWidth: 4,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  optionGroup: {
    borderRadius: 8,
    overflow: 'hidden'
  },
  option: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
  },
  album: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    borderColor: 'blue',
    borderWidth: 1,
    borderStyle: 'solid'
  },
});
