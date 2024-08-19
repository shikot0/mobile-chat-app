import Colors from '@/constants/Colors';
import {TextInput as OriginalTextInput, TextInputProps as OriginalTextInputProps, Pressable, StyleSheet} from 'react-native';
import { useColorScheme } from './useColorScheme';
import { View } from './Themed';
import {View as DefaultView} from 'react-native';
import {useState} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';



interface TextInputProps extends OriginalTextInputProps {
    value: string,
    updateFunction: Function,
    placeholder?: string
}

export function TextInput({value, updateFunction, placeholder, ...props}: TextInputProps) {
    const colorScheme = useColorScheme() ?? 'light';
    return (
        <OriginalTextInput 
            value={value} 
            onChangeText={text => updateFunction(text)}
            cursorColor={'grey'} 
            placeholder={placeholder}
            placeholderTextColor={'rgba(255, 255, 255, .75)w'}
            style={[
                styles.textInput, 
                {
                    color: Colors[colorScheme].text, 
                    backgroundColor: Colors[colorScheme].elevated
                },
                props.style
            ]}
        />
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
    circular?: boolean,
    size?: number,
}

export function ImageInput({circular, size}: ImageInputProps) {
    // const [image, setImage] = useState<ImagePicker.ImagePickerAsset>(); 
    const [image, setImage] = useState<string>(); 
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
        const {assets, canceled} = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, mediaTypes: ImagePicker.MediaTypeOptions.Images})
        if(canceled) return;
        setImage(assets[0].uri)
        console.log({assets})
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
                <Image style={styles.imageInput} source={{uri: image}} />
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
    }
})