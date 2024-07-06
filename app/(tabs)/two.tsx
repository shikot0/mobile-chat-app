import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import {Image} from 'expo-image'
import { drizzle, useLiveQuery } from 'drizzle-orm/expo-sqlite';
// import { db } from '@/drizzle/db';
import { messages } from '@/drizzle/schema';
import { openDatabaseSync } from 'expo-sqlite';

const expo = openDatabaseSync('app.db', {enableChangeListener: true});
const db = drizzle(expo);

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

  // async function addEntry() {
  //   await db.insert(messages).values({id: '1034214013413', email: 'test', password: 'testpassword', phone: '52623221341951', username: 'sheikh'})
  // }

  // useEffect(() => {
  //   addEntry()
  // }, [])

  const {data} = useLiveQuery(db.select().from(messages));
  console.log({data}) 
  
  return (
      <View style={styles.container}>
        <ScrollView style={styles.albumsWrapper}>
          {/* {albums ?
            albums.map((album, index) => {
              return <AlbumEntry album={album} />
            })
          : null} */}

          {assets ? 
            assets.map((asset, index) => {
              return <Image key={index.toString()} source={{uri: asset.uri}} style={{width: 50, height: 50}} />
            })
          : null}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  albumsWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid'
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
