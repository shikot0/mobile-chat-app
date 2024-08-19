import { ActivityIndicator, Pressable, PressableProps, StyleSheet, TextProps, useColorScheme } from "react-native";
import {Text, useThemeColor} from '@/components/Themed';
import Colors from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import { Href, Link, useRouter } from "expo-router";

interface PrimaryButtonProps extends TextProps {
    callback?: Function,
    isLoading?: boolean,
    disabled?: boolean,
    full?: boolean
}

function handleCallback(callback?: Function) {
    if(!callback) return;
    callback();
}

export function PrimaryButton({callback, children, isLoading, disabled, full}: PrimaryButtonProps) {
    const theme = useColorScheme() ?? 'dark';
    return (
        <Pressable
            android_ripple={{color: 'rgba(0, 0, 0, .25)', foreground: true, borderless: false}}
            disabled={disabled || isLoading}
            onPress={() => handleCallback(callback)}
            style={
                [
                    styles.primaryButton,
                    {
                        width: full ? '100%' : 'auto',
                        paddingVertical: full ? 10 : 8,
                        backgroundColor: Colors[theme].primary
                    }
                ]
            }
        >
            {!isLoading ? 
                <Text 
                    style={
                        [
                            styles.primaryButtonText,
                            {
                                color: Colors[theme].primaryButtonText
                            }
                        ]
                    }
                >
                    {children}
                </Text>
            : <ActivityIndicator size={22} color={Colors[theme].primaryButtonText}/>}
        </Pressable>
    )
}

interface SecondaryButtonProps extends PrimaryButtonProps {

}

export function SecondaryButton({callback, children, isLoading, disabled, full}: SecondaryButtonProps) {
    const theme = useColorScheme() ?? 'dark';
    return (
        <Pressable
            style={[
                styles.secondaryButton,
                {
                    backgroundColor: Colors[theme].elevated
                }
            ]}
            android_ripple={{color: 'rgba(0, 0, 0, .25)', foreground: true, borderless: false}}
            onPress={() => handleCallback(callback)}
        >
            {!isLoading ?
                <Text>
                    {children}
                </Text>    
            : <ActivityIndicator color={Colors[theme].primaryButtonText}/>}
        </Pressable>
    )
}

export enum TooltipTypes {
    Button = 'button',
    Link = 'link'
}
type TooltipProps = TextProps & {
    type: TooltipTypes,
    buttonText: string,
} & (TooltipButtonProps | TooltipLinkProps)

// type TooltipProps = TextProps & {
//     type: TooltipTypes,
//     buttonText: string,
// }
// type TooltipProps = TextProps & (TooltipButtonProps | TooltipLinkProps)

// type TooltipButtonProps = Omit<TooltipProps, 'type'> & {
//     // buttonText: string,
//     type?: TooltipTypes.Button,
//     callback?: Function
// }

// type TooltipLinkProps = Omit<TooltipProps, 'type'> & {
//     type?: TooltipTypes.Link,
//     // linkText: string
//     link: string
// }
type TooltipButtonProps =  {
    buttonText: string,
    type?: TooltipTypes.Button,
    callback?: Function
}

type TooltipLinkProps = {
    type?: TooltipTypes.Link,
    linkText: string
    link: Href,
    // pathname?: string,
    // params?: string,
    // link: string
}


// export function Tooltip({type = TooltipTypes.Button, buttonText, children}: TooltipProps) {
// export function Tooltip({type, buttonText, children, ...props}: TooltipProps) {
export function Tooltip({...props}: TooltipProps) {
    console.log({props})
    const {type, buttonText, children} = props;
// export function Tooltip({type, buttonText, children, ...props}: TooltipLinkProps | TooltipButtonProps) {
    return (
        <Text>
            {children}
            <Pressable>
                {/* {type === TooltipTypes.Link ?
                    <TooltipLink link={props.link} buttonText={buttonText}/>
                :   <Text>{buttonText}</Text>} */}
                {type === TooltipTypes.Link ?
                    <TooltipLink link={props.link} linkText={buttonText}/>
                :   <TooltipButton buttonText={buttonText} callback={props.callback} />}
            </Pressable>
        </Text>
    )
}

function TooltipButton({buttonText, callback}: TooltipButtonProps) {
    return (
        <Pressable onPress={() => handleCallback(callback)}>
            <Text>{buttonText}</Text>
        </Pressable>
    )
}

// function TooltipLink({linkText, link, pathname, params}: TooltipLinkProps) {
function TooltipLink({linkText, link}: TooltipLinkProps) {
    // const router = useRouter();

    // function handleNavigate() {
    //     router.push(link)
    // }
    return (
        <Pressable>
            {/* <Link href={`${link}`}>{linkText}</Link> */}
            {/* <Link href={'/(app)'}>{linkText}</Link> */}
            <Link href={link}>{linkText}</Link>
        </Pressable>    
    )   
}

const styles = StyleSheet.create({
    primaryButton: {
        borderRadius: 48,
        // backgroundColor: 'lightgreen',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    primaryButtonText: {
        // fontFamily: Fonts.Headings,
        // fontSize: 18,
        // fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    secondaryButton: {
        // flex: .5,
        borderRadius: 32,
        paddingVertical: 8,
        paddingHorizontal: 16,
        // backgroundColor: 
    }
})