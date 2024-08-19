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


export default function SettingsScreen() {
  const [albums, setAlbums] = useState<MediaLibrary.Album[] | null>(null);
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  async function getAlbums() {
    if(permissionResponse === null || permissionResponse.status !== 'granted') {
      await requestPermission();
    }
    const fetchedAssets = await MediaLibrary.getAssetsAsync({sortBy: 'modificationTime'})
    // fetchedAssets.assets
    setAssets(fetchedAssets.assets)
  }

  useEffect(() => {
    getAlbums();
  }, [])

  const colorScheme = useColorScheme() ?? 'dark';


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
          {/* {albums ?
            albums.map((album, index) => {
              return <AlbumEntry album={album} />
            })
          : null} */}

          {/* {assets ? 
            assets.map((asset, index) => {
              return <Image key={index.toString()} source={{uri: asset.uri}} style={{width: 50, height: 50}} />
            })
          : null} */}
          <View style={[styles.profileSection, {backgroundColor: Colors[colorScheme].elevated}]}>
            {/* <LinearGradient colors={['white', 'red']} style={{position: 'absolute', top: 0, left: 0, height: '100%', width: '100%'}} /> */}
            {/* <LinearGradient colors={['transparent', Colors[colorScheme].primary]} style={{position: 'absolute', top: 0, left: 0, height: '100%', width: '100%'}} /> */}
            {/* <LinearGradient colors={[Colors[colorScheme].elevated, 'transparent']} style={{position: 'absolute', top: 0, left: 0, height: '100%', width: '100%'}} /> */}
            {/* <LinearGradient colors={[Colors[colorScheme].elevated, 'transparent', Colors[colorScheme].elevated]} style={{position: 'absolute', top: 0, left: 0, height: '100%', width: '100%'}} /> */}
            {/* <LinearGradient colors={['transparent', Colors[colorScheme].elevated, 'transparent']} style={{position: 'absolute', top: 0, left: 0, height: '100%', width: '100%'}} /> */}
            {/* <View style={[styles.profilePictureWrapper, {borderColor: Colors[colorScheme].primary}]}>
              <Image source={require('../../../assets/testImages/test_image_1.jpg')} style={styles.profilePicture}/>
            </View>
            <SmallHeading>Sheikh</SmallHeading> */}
              {/* <LinearGradient colors={['white', Colors[colorScheme].primary]} /> */}
              <View style={[styles.profilePictureWrapper, {borderColor: Colors[colorScheme].primary}]}>
                <Image source={require('../../../assets/testImages/test_image_1.jpg')} style={styles.profilePicture}/>
              </View>
              <SmallHeading>Sheikh</SmallHeading>
          </View>

          <View style={[styles.optionGroup, {backgroundColor: Colors[colorScheme].elevated}]}>
              {/* <SmallHeading>Privacy</SmallHeading> */}
              {/* <Text>Privacy</Text> */}
              <Pressable style={styles.option} android_ripple={{color: 'rgba(0, 0, 0, .25)', foreground: true, borderless: false}}>
                <Text>Random Setting</Text>
              </Pressable>
          </View>
              {/* </LinearGradient> */}
        </ScrollView>
      </View>
  );
}

function AlbumEntry({album}: {album: MediaLibrary.Album}) {
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);

  async function getAlbumAssets() {
    const albumAssets = await MediaLibrary.getAssetsAsync({album});
    setAssets(albumAssets.assets) 
  }

  useEffect(() => {
    getAlbumAssets()
  }, [album]) 

  return (
    <View
      key={album.id}
    >
      <Text>
        {album.title} - {album.assetCount ?? 'no'} {album.assetCount === 1 ? 'asset' : 'assets'}
      </Text>
      <View style={styles.album}>
        {assets ?
          assets.map((asset, index) => {
            return <Image key={index.toString()} source={{uri: asset.uri}} style={{width: 50, height: 50}} />
          })
        : null}
      </View>
    </View>
  )
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
    width: '45%',
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
