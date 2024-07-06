import Colors from '@/constants/Colors';
import {TextInput as OriginalTextInput, Pressable, StyleSheet} from 'react-native';
import { useColorScheme } from './useColorScheme';
import { View } from './Themed';
import {View as DefaultView} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';



interface TextInputProps {
    value: string,
    updateFunction: Function,
}

export function TextInput({value, updateFunction}: TextInputProps) {
    const colorScheme = useColorScheme() ?? 'light';
    return (
        <OriginalTextInput 
            value={value} 
            onChangeText={text => updateFunction(text)}
            cursorColor={'grey'} 
            style={[
                styles.textInput, 
                {
                    color: Colors[colorScheme].text, 
                    backgroundColor: Colors[colorScheme].elevated
                }
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

const styles = StyleSheet.create({
    textInput: {
        paddingHorizontal: 12,
        height: 44,
        paddingVertical: 4,
        fontSize: 16,
        flex: 8,
        borderRadius: 24,
    },
    sendButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        aspectRatio: 1/1,
        borderRadius: 48,
    }
})