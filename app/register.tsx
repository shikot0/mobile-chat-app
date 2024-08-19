import { PrimaryButton, SecondaryButton, Tooltip, TooltipTypes } from "@/components/Buttons";
import { ImageInput, TextInput } from "@/components/Inputs";
import { Heading, SmallHeading } from "@/components/StyledText";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { localUserStore } from "@/constants/globalState";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {Dimensions, ScrollView, Pressable, StyleSheet, KeyboardAvoidingView, useColorScheme} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, Easing } from "react-native-reanimated";

interface SignInDetails {
    password: string,
    email: string,
    username: string
}
const {width} = Dimensions.get('window');

export default function RegisterPage() {
    // const [signInPassword, setSignInPassword] = useState<string>('');
    // const [signInEmail, setSignInEmail] = useState<string>('');
    // const [signInUsername, setSignInUsername] = useState<string>('');
    // const [signInNumber, setSignInNumber] = useState<string>('');
    const [signInUsername, setSignInUsername] = useState<string>('Sheikh');
    const [signInEmail, setSignInEmail] = useState<string>('');
    const [signInPassword, setSignInPassword] = useState<string>('');
    const [signInNumber, setSignInNumber] = useState<string>('');
    const [logInUsername, setLogInUsername] = useState<string>('');
    const [logInPassword, setLogInPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const translateX = useSharedValue(0)
    const theme = useColorScheme() ?? 'dark';
    const {setIsLoggedIn} = localUserStore();
    const router = useRouter();
    // const [signInDetails, setSignInDetails] = useState<SignInDetails>({
    //     password: signInPassword,
    //     email: signInEmail
    // })
    const signInDetails = {
        password: signInPassword,
        email: signInEmail
    }
    
    const animationDuration = 500;

    function handleTransformRight() {
        if(isLoading) return;
        // translateX.value = withSpring(-width, {
            //     duration: animationDuration,
            // })
        translateX.value = withTiming(-width, {
            duration: animationDuration,
            easing: Easing.elastic()
        })
    }
    
    function handleTransformLeft() {
        if(isLoading) return;
        // translateX.value = withSpring(0, {
        //     duration: animationDuration
        // })
        translateX.value = withTiming(0, {
            duration: animationDuration,
            easing: Easing.elastic()
        })
    }

    // async function handleSignIn() {
    function handleSignIn() {
        // try {
        //     // console.log('initialized')
        //     // setIsLoading(true);
        //     // setIsLoggedIn(true);
        //     // router.navigate('./(app)/(tabs)')
        //     // setIsLoading(false);
            

        //     // setTimeout(() => {
        //     //     setIsLoggedIn(true);
        //     //     router.navigate('./(app)/(tabs)')
        //     //     setIsLoading(false);
        //     // }, 2000)

        //     setIsLoading(true);

        //     const response = await fetch('192.168.36.241:3000/auth/register', {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             password: signInPassword,
        //             username: signInUsername,
        //             email: signInEmail,
        //             phoneNumber: signInNumber, 
        //         })
        //     })

        //     const body = await response.json();

        //     console.log({body})


        //     setIsLoading(false);
        // }catch(error) {
        //     setIsLoading(false)
        //     console.log(`Error: ${error}`)
        // }

        // console.log('initialized')
        // setIsLoading(true);
        // setIsLoggedIn(true);
        // router.navigate('./(app)/(tabs)')
        // setIsLoading(false);
        
        // setTimeout(() => {
        //     setIsLoggedIn(true);
        //     router.navigate('./(app)/(tabs)')
        //     setIsLoading(false);
        // }, 2000)
        setIsLoading(true);
        fetch('192.168.36.146:3000/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                password: signInPassword,
                username: signInUsername,
                email: signInEmail,
                phoneNumber: signInNumber, 
            })
        }).then(response => response.json())
        .then(body => console.log({body}))
        .catch(error => console.log(`Error: ${error}`))

        setIsLoading(false);
    }

    // setIsLoading(false)

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value
                }
            ]
        }
    })

    useEffect(() => {
        console.log({signInDetails})
    }, [signInDetails])

    const AnimatedKeyboardAvoidingView = Animated.createAnimatedComponent(KeyboardAvoidingView)

    return (
        <View style={styles.container}>
            {/* <View style={styles.pageWrapper}> */}
            <Animated.View
                style={[styles.pageWrapper, animatedStyle]}
                // behavior={"height"}
                // contentContainerStyle={{width: '100%', alignItems: 'center'}}
            >
                <View style={styles.headingSection}>
                    {/* <Heading style={{textAlign: 'center'}}>Sign up</Heading> */}
                    <SmallHeading>Sign up</SmallHeading>
                </View>
                <View style={styles.form}>
                    <ImageInput circular size={120}/>
                    <TextInput value={signInUsername} placeholder={'Username'} updateFunction={setSignInUsername} />
                    <TextInput value={signInEmail} placeholder={'Email'} updateFunction={setSignInEmail} />
                    <TextInput value={signInNumber} placeholder={'Phone number'} updateFunction={setSignInNumber} />
                    <TextInput value={signInPassword} secureTextEntry placeholder={'Password'} updateFunction={setSignInPassword} />
                    {/* <PrimaryButton>
                        <Text>Sign in</Text>
                    </PrimaryButton> */}
                    {/* <PrimaryButton isLoading={true}>Sign in</PrimaryButton> */}
                    <PrimaryButton full callback={handleSignIn} isLoading={isLoading}>Sign in</PrimaryButton>
                </View>
                {/* <SecondaryButton style={{flex: 1}} callback={handleTransformRight}>Log in</SecondaryButton> */}
                <Tooltip buttonText="Log in" callback={handleTransformRight} type={TooltipTypes.Button} />
            </Animated.View>

            <Animated.View
                style={[styles.pageWrapper, animatedStyle]}
            >
                <View style={styles.headingSection}>
                    {/* <Heading style={{textAlign: 'center'}}>Sign up</Heading> */}
                    <SmallHeading>Log in</SmallHeading>
                </View>
                <View style={styles.form}>
                    {/* <ImageInput circular /> */}
                    <TextInput value={signInUsername} placeholder={'Username'} updateFunction={setLogInUsername} />
                    <TextInput value={signInPassword} placeholder={'Password'} updateFunction={setLogInPassword} />
                    {/* <TextInput value={signInEmail} placeholder={'Email'} updateFunction={setSignInEmail} /> */}
                    {/* <PrimaryButton>
                        <Text>Sign in</Text>
                    </PrimaryButton> */}
                    {/* <PrimaryButton isLoading={true}>Sign in</PrimaryButton> */}
                    <PrimaryButton full>Log in</PrimaryButton>
                </View>
                {/* <SecondaryButton callback={handleTransformLeft}>Sign up</SecondaryButton> */}
                <Tooltip buttonText="Sign up" callback={handleTransformLeft} type={TooltipTypes.Button} />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingVertical: 16,
        paddingBottom: 16,
        flexDirection: 'row',
        overflow: 'hidden',
        // paddingTop: 60,
        // paddingBottom: 40,
        // gap: 16
    },
    pageWrapper: {
        // transform: [
        //     {
        //         translateX: -100
        //     }
        // ],
        // flex: 1,
        paddingHorizontal: 16,
        gap: 8,
        width: '100%',
        alignItems: 'center'
    },
    headingSection: {
        width: '100%',
        // flex: 1.5,
        // flex: 1,
        // height: 100,
        height: 80,
        alignItems: 'center',
        justifyContent: 'flex-end',
        // justifyContent: 'flex-start',
        // justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'blue',
        // borderStyle: 'solid'
    },
    form: {
        // flex: 8,
        flex: 8,
        gap: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'red',
        // borderStyle: 'solid'
    },
    transformPageButton: {
        // flex: .5,
        borderRadius: 32,
        paddingVertical: 8,
        paddingHorizontal: 16,
        // backgroundColor: 
    }
})