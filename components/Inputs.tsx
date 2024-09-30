import Colors from '@/constants/Colors';
import {ActivityIndicator, TextInput as OriginalTextInput, TextInputProps as OriginalTextInputProps, Pressable, StyleSheet} from 'react-native';
// import {TextInput as OriginalTextInput, TextInputProps as OriginalTextInputProps, Pressable, StyleSheet, Image} from 'react-native';
import { useColorScheme } from './useColorScheme';
import { Text, View } from './Themed';
import {View as DefaultView} from 'react-native';
import {LegacyRef, MutableRefObject, useEffect, useRef, useState} from 'react';
import Animated from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
// import {} from 'expo-file-system'
// import {} from 'expo-media-library'
import { Image } from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as MediaLibrary from 'expo-media-library';
import { SecondaryButton } from './Buttons';
import React from 'react';
import { FlashList } from '@shopify/flash-list';



interface TextInputProps extends OriginalTextInputProps {
    value: string,
    updateFunction: Function,
    placeholder?: string,
    label?: string,
    trimWhitespace?: boolean
}


export function TextInput({value, updateFunction, trimWhitespace, label, placeholder, ...props}: TextInputProps) {
    const colorScheme = useColorScheme() ?? 'light';
    return (
        <View style={styles.textInputWrapper}>
            <OriginalTextInput 
                value={value} 
                onChangeText={text => {
                    // console.log({text})
                    if(trimWhitespace) {
                        updateFunction(text.trim())
                    }else {
                        updateFunction(text)
                    }
                    // updateFunction(trimWhitespace ? text.trim() : text)
                }}
                cursorColor={'grey'} 
                placeholder={placeholder}
                placeholderTextColor={'rgba(255, 255, 255, .75)'}
                style={[
                    styles.textInput, 
                    {
                        color: Colors[colorScheme].text, 
                        backgroundColor: Colors[colorScheme].elevated
                    },
                    props.style
                ]}

                {...props}
            />
            {label ? 
                <Text style={[styles.label, {backgroundColor: Colors[colorScheme].background}]}>{label}</Text>
            : null}
        </View>
    )
}

export function EmailInput({value, updateFunction, trimWhitespace = true, placeholder, ...props}: TextInputProps) {
    return <TextInput value={value} updateFunction={updateFunction} trimWhitespace={trimWhitespace} placeholder={placeholder} keyboardType='email-address' autoCapitalize={'none'} autoCorrect={false} {...props}/>
}

interface PasswordInputProps extends TextInputProps {
    passwordVisible?: boolean
}

export function PasswordInput({value, updateFunction, placeholder, trimWhitespace, passwordVisible, ...props}: PasswordInputProps) {
    // return <TextInput value={value} updateFunction={updateFunction} trimWhitespace={trimWhitespace} placeholder={placeholder} autoCapitalize={'none'} secureTextEntry={!passwordVisible} autoCorrect={false} {...props}/>
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(passwordVisible ?? false);

    return (
        <View style={styles.passwordInputWrapper}>
            {/* <TextInput value={value} updateFunction={updateFunction} trimWhitespace={trimWhitespace} placeholder={placeholder} autoCapitalize={'none'} secureTextEntry={!passwordVisible} autoCorrect={false} {...props}/> */}
            <TextInput value={value} updateFunction={updateFunction} trimWhitespace={trimWhitespace} placeholder={placeholder} autoCapitalize={'none'} secureTextEntry={!isPasswordVisible} autoCorrect={false} {...props}/>
            <Pressable
                style={styles.passwordVisibleButtonWrapper}
                onPress={() => setIsPasswordVisible(prev => !prev)}
                android_ripple={{color: 'rgba(0, 0, 0, .25)', foreground: true, borderless: false}}
            >
                <AntDesign name="eye" size={16} color={'white'}/>
            </Pressable>
        </View>
    )
}

// interface MessageInputProps extends TextInputProps, DefaultView {
//     submitFunction: Function,
//     submitDisabled: boolean,
// }   
type MessageInputProps = TextInputProps & DefaultView['props'] & {
    submitFunction: Function,
    submitDisabled: boolean,
}   

export function MessageInput({value, updateFunction, trimWhitespace, placeholder, submitFunction, submitDisabled, ...props}: MessageInputProps) {
    const [isLoadingLibrary, setIsLoadingLibrary] = useState<boolean>(true);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [assets, setAssets] = useState<MediaLibrary.Asset[]>();
    const [albums, setAlbums] = useState<MediaLibrary.Album[]>();
    const colorScheme = useColorScheme() ?? 'light';
    const inputRef = useRef<OriginalTextInput | null>(null)

    async function getMedia() {
        // if(permissionResponse?.status !== 'granted') return;
        if(permissionResponse?.status !== 'granted') {
            await requestPermission();
        }
        setIsLoadingLibrary(true)
        
        // const albums = await MediaLibrary.getAlbumsAsync({
        //     includeSmartAlbums: true
        // });
        // const assets = [];
        // for(let i = 0; i < albums.length; i++) {
        //     const albumAssets = await MediaLibrary.getAssetsAsync()
        // }
        const allAssets = await MediaLibrary.getAssetsAsync();
        const allAlbums = await MediaLibrary.getAlbumsAsync();
        const sortedAlbums = allAlbums.sort((a, b) => b.assetCount-a.assetCount)
        console.log({sortedAlbums})
        setAlbums(sortedAlbums)
        // const allAssets = await MediaLibrary.getAssetsAsync({album: 'Inspo'});
        // console.log({allAssets})
        setAssets(allAssets.assets)
        setIsLoadingLibrary(false)
    }
 
    useEffect(() => {
        getMedia();
    }, [])

    // useEffect(() => {
    //     console.log({assets})
    // }, [assets])

    // useEffect(() => {
    //     console.log({permissionResponse})
    // }, [])

    

    return (
        // <View style={{flexDirection: 'column'}}>
        <View>
            <View
                {...props}
                style={[
                    styles.messageInputWrapper,
                ]}
            >
                {/* <TextInput 
                    value={value} 
                    updateFunction={updateFunction}
                    // style={[styles.messageTextInput, {backgroundColor: Colors[colorScheme].elevated, flex: 8}]}
                    style={[styles.messageTextInput, {backgroundColor: Colors[colorScheme].elevated}]}
                    // style={[styles.messageTextInput, {backgroundColor: Colors[colorScheme].elevated, flex: 8}]}
                /> */}
                <OriginalTextInput 
                    value={value} 
                    onChangeText={text => {
                        // console.log({text})
                        if(trimWhitespace) {
                            updateFunction(text.trim())
                        }else {
                            updateFunction(text)
                        }
                        // updateFunction(trimWhitespace ? text.trim() : text)
                    }}
                    cursorColor={'grey'} 
                    placeholder={placeholder}
                    placeholderTextColor={'rgba(255, 255, 255, .75)'}
                    style={[
                        styles.textInput, 
                        styles.messageTextInput,
                        {
                            color: Colors[colorScheme].text, 
                            backgroundColor: Colors[colorScheme].elevated,
                            flex: 8,
                        }
                        // props.style
                    ]}
                    ref={inputRef}
                    // {...props}
                />
                <Pressable 
                    // onPress={() => submitFunction()}
                    // disabled={submitDisabled} 
                    style={[
                        // styles.sendButton, 
                        styles.messageInputButton, 
                        {
                            // backgroundColor: submitDisabled ? Colors[colorScheme].elevated : 'lightblue'
                            backgroundColor: 'lightblue'
                        }
                    ]}
                >
                    {/* <Ionicons style={{transform: [{translateY: 2}, {translateX: -2}]}} name="add-circle" size={28} /> */}
                    <Ionicons name="image" size={28} />
                    {/* <Ionicons name="paper-plane-outline" size={28} /> */}
                </Pressable>
                <Pressable 
                    onPress={() => submitFunction()}
                    disabled={submitDisabled} 
                    style={[
                        // styles.sendButton, 
                        styles.messageInputButton, 
                        {
                            backgroundColor: submitDisabled ? Colors[colorScheme].elevated : 'lightblue'
                        }
                    ]}
                >
                    <Ionicons style={{transform: [{translateY: 2}, {translateX: -2}]}} name="paper-plane-outline" size={28} />
                    {/* <Ionicons name="paper-plane-outline" size={28} /> */}
                </Pressable>
            </View>
            <ImageUploadViewer />
        </View>
    )
}

function ImageUploadViewer() {
    const [isLoadingLibrary, setIsLoadingLibrary] = useState<boolean>(true);
    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
    const [assets, setAssets] = useState<MediaLibrary.Asset[]>();
    const [albums, setAlbums] = useState<MediaLibrary.Album[]>();
    const colorScheme = useColorScheme() ?? 'light';

    async function getMedia() {
        // if(permissionResponse?.status !== 'granted') return;
        if(permissionResponse?.status !== 'granted') {
            await requestPermission();
        }
        setIsLoadingLibrary(true)
        
        // const albums = await MediaLibrary.getAlbumsAsync({
        //     includeSmartAlbums: true
        // });
        // const assets = [];
        // for(let i = 0; i < albums.length; i++) {
        //     const albumAssets = await MediaLibrary.getAssetsAsync()
        // }
        const allAssets = await MediaLibrary.getAssetsAsync();
        const allAlbums = await MediaLibrary.getAlbumsAsync();
        const sortedAlbums = allAlbums.sort((a, b) => b.assetCount-a.assetCount)
        console.log({sortedAlbums})
        setAlbums(sortedAlbums)
        // const allAssets = await MediaLibrary.getAssetsAsync({album: 'Inspo'});
        // console.log({allAssets})
        setAssets(allAssets.assets)
        setIsLoadingLibrary(false)
    }
 
    useEffect(() => {
        getMedia();
    }, [])
    return (
        <Animated.View
            style={styles.imageViewer}
        >
            {permissionResponse?.status === 'granted' ?
                <>
                    {/* {assets && assets.length !== 0 ? 
                        assets.map((asset, index) => {
                            return <Image key={index.toString()} source={{uri: asset.uri}} style={{width: 50, height: 50}} />
                        })
                    : null}  */}
                    {/* {assets && assets.length !== 0 ? 
                        <FlashList
                            data={assets}
                            // horizontal
                            numColumns={6}
                            style={{flex: 1}}
                            renderItem={({item, index}) => {
                                console.log({item})
                                // return <Image key={index.toString()} source={{uri: item.uri}} style={{width: 100, height: 100}} contentFit='contain' />
                                // return <Image key={index.toString()} source={{uri: item.uri, width: 100}} contentFit='contain' />
                                // return <Image key={index.toString()} source={{uri: item.uri}} style={{width: 50, height: 50}} contentFit='cover' />
                                return <Image key={index.toString()} source={{uri: item.uri}} style={{width: '100%', aspectRatio: 1/1}} contentFit='cover' />
                            }}
                            estimatedItemSize={49}
                        />
                    : null}  */}

                    {isLoadingLibrary ?
                        <ActivityIndicator
                            style={{position: 'absolute', top: '50%', left: '50%', transform: [{translateX: -22.5}, {translateY: -22.5}]}}
                            color={Colors[colorScheme].primary} size={45}
                        />    
                    :
                        <>
                            {/* {albums && albums.length !== 0 ?
                                // albums.map(async (album, index) => {
                                //     const {assets} = await MediaLibrary.getAssetsAsync({album});
                                albums.map((album, index) => {
                                    const returnedAssets = MediaLibrary.getAssetsAsync({album}).then(data => {
                                        return data
                                    });
                                    
                                    if(assets.length !== 0) {
                                        return (
                                            <FlashList
                                                data={assets}
                                                // horizontal
                                                numColumns={6}
                                                renderItem={({item, index}) => {
                                                    // console.log({item})
                                                    return <Image key={index.toString()} source={{uri: item.uri}} style={{width: '100%', aspectRatio: 1/1}} contentFit='cover' />
                                                }}
                                                estimatedItemSize={49}
                                            />
                                        )
                                    }else {
                                        return <Text>No assets</Text>
                                    }
                                })
                            : null} */}
                        </>
                    }
                </>
                // <Text>Granted</Text>
            : 
                <View>
                    <Text>You need to allow "chat app" to access your images in order to see them here</Text>
                    <SecondaryButton callback={async () => await requestPermission()}>Allow</SecondaryButton>
                </View>
            }
        </Animated.View>
    )
}

interface ImageInputProps {
    image: ImagePicker.ImagePickerAsset | undefined, 
    setter: Function,
    circular?: boolean,
    size?: number,
}

export function ImageInput({image, setter, circular, size}: ImageInputProps) {
    // const [image, setImage] = useState<ImagePicker.ImagePickerAsset>(); 
    // const [image, setImage] = useState<string>(); 
    const theme = useColorScheme() ?? 'dark';
    // const [permissionResponse, requestPermission] = ImagePicker.getMediaLibraryPermissionsAsync();

    async function handleImageSelect() {
        console.log('started')
        // const {granted, canAskAgain, expires, status, accessPrivileges} = await ImagePicker.getMediaLibraryPermissionsAsync();
        // console.log({granted})
        // if(!granted) {
        //     await ImagePicker.requestMediaLibraryPermissionsAsync();
        // };

        // const {assets, canceled} = await ImagePicker.launchImageLibraryAsync({mediaTypes: MediaTypeOptions.Images})
        const testImage = new FormData();
        const {assets, canceled} = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, mediaTypes: ImagePicker.MediaTypeOptions.Images})
        if(canceled || assets.length === 0) return;
        console.log({file: assets[0]})
        // setImage(assets[0].uri)
        setter(assets[0])
        // console.log({assets})
    }


    return (
        // <View style={[
        //     {
        //         width: width,
        //         borderRadius: circular ? 100 : 0,
        //         borderColor: Colors[theme].borderColor
        //     },
        //     styles.imageInputWrapper,
        // ]}>
        //     {image ?
        //         <></>
        //     : 
        //         // <Ionicons name="camera" size={width ? width / 2 : 50} color="red" />
        //         <Ionicons name="camera-outline" size={width ? width / 2 : 70} color={Colors[theme].borderColor} />
        //     }
        // </View>
        <Pressable
            onPress={() => handleImageSelect()}
            android_ripple={{color: 'rgba(0, 0, 0, .25)', foreground: true, borderless: false}}
            style={[
                {
                    width: size ? size : 150,
                    borderRadius: circular ? 100 : 0,
                    borderColor: image ? 'lightgreen' : Colors[theme].borderColor
                },
                styles.imageInputWrapper,
            ]}
        >
            {image ?
                // <Image style={styles.imageInput} source={{uri: image}} />
                <Image style={styles.imageInput} source={{uri: image?.uri}} />
            : 
                // <Ionicons name="camera" size={width ? width / 2 : 50} color="red" />
                <Ionicons name="camera-outline" size={size ? size / 2.5 : 70} color={Colors[theme].borderColor} />
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    textInputWrapper: {
        width: '100%',
        position: 'relative'
    },
    textInput: {
        paddingHorizontal: 16,
        height: 44,
        paddingVertical: 4,
        fontSize: 16,
        width: '100%',
        // flex: 8,
        borderRadius: 8
        // borderRadius: 24,
    },
    label: {
        position: 'absolute',
        left: 8,
        top: 4,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 10,
        transform: [
            {
                translateY: -16,
            }
        ]
    },
    messageInputWrapper: {
        position: 'relative',
        // width: '100%',
        // flex: 1,
        // flexDirection: 'row',
        // alignItems: 'center',
        // height: '100%',
        // flex: 1,
        width: '100%',
        height: 58,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        // backgroundColor: 'transparent',
        // paddingHorizontal: 8,
        paddingHorizontal: 12,
        gap: 8,
        // gap: 0,

        // borderWidth: 1,
        // borderColor: 'blue',
        // borderStyle: 'solid'
    },
    imageViewer: {
        // flex: 1,
        width: '100%',
        height: 250,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'red',
        position: 'relative'
        // justifyContent: 'center',
        // alignItems: 'center'
        // minHeight: 250,
        // maxHeight: 500,
    },
    messageTextInput: {
        color: 'white',
        // height: 44,
        height: '100%',
        // width: '10%',
        // width: 'auto',
        // width: '90%',
        // width: 'auto',
        // width: '90%',
        // height: 22,
        // height: '100%',
        // borderColor: 'red',
        // borderStyle: 'solid',
        // borderWidth: 1,
        paddingHorizontal: 16,
        borderRadius: 24,
    },
    // sendButton: {
    messageInputButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // flex: 1,
        height: '100%',
        // width: 44,
        // flex: 2,
        // width: '10%',
        // flex: 1,
        // width: '10%',
        // flexGrow: 1,
        // width: '100%',
        aspectRatio: 1/1,
        borderRadius: 48,
    },
    imageInputWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        // width: 150,
        aspectRatio: 1/1,
        borderWidth: 4,
        borderStyle: 'solid',
        overflow: 'hidden' 
    },
    imageInput: {
        width: '100%',
        height: '100%'
    },
    passwordInputWrapper: {
        // flex: 1,
        width: '100%',
        position: 'relative',
        backgroundColor: 'transparent',
        // borderStyle: 'solid',
        // borderColor: 'red',
        // borderWidth: 1,
    },
    passwordVisibleButtonWrapper: {
        position: 'absolute',
        width: 40,
        height: 40,
        top: '50%',
        right: 0,
        transform: [
            {
                translateY: -20
            }
        ],
        borderRadius: 40,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    }
})