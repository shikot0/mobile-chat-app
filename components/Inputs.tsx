import Colors from '@/constants/Colors';
import {TextInput as OriginalTextInput, TextInputProps as OriginalTextInputProps, Pressable, StyleSheet} from 'react-native';
import { useColorScheme } from './useColorScheme';
import { View } from './Themed';
import {View as DefaultView} from 'react-native';
import {useState} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
// import {} from 'expo-file-system'
// import {} from 'expo-media-library'
import { Image } from 'expo-image';
import AntDesign from '@expo/vector-icons/AntDesign';



interface TextInputProps extends OriginalTextInputProps {
    value: string,
    updateFunction: Function,
    placeholder?: string,
    trimWhitespace?: boolean
}


export function TextInput({value, updateFunction, trimWhitespace, placeholder, ...props}: TextInputProps) {
    const colorScheme = useColorScheme() ?? 'light';
    return (
        <OriginalTextInput 
            value={value} 
            onChangeText={text => {
                console.log({text})
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

export function MessageInput({value, updateFunction, submitFunction, submitDisabled, ...props}: MessageInputProps) {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <View
            {...props}
        >
            <TextInput 
                value={value} 
                updateFunction={updateFunction}
                style={{flex: 8}}
            />
            <Pressable 
                onPress={() => submitFunction()}
                disabled={submitDisabled} 
                style={[
                    styles.sendButton, 
                    {
                        backgroundColor: submitDisabled ? Colors[colorScheme].elevated : 'lightblue'
                    }
                ]}
            >
                <Ionicons name="paper-plane-outline" size={28} />
            </Pressable>
        </View>
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
    textInput: {
        paddingHorizontal: 16,
        height: 44,
        paddingVertical: 4,
        fontSize: 16,
        width: '100%',
        // flex: 8,
        borderRadius: 24,
    },
    sendButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
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