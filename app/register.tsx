import { PrimaryButton, SecondaryButton, Tooltip, TooltipTypes } from "@/components/Buttons";
import { EmailInput, ImageInput, PasswordInput, TextInput } from "@/components/Inputs";
import { Heading, SmallHeading } from "@/components/StyledText";
import { Text, View, ScrollView } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { localUserStore } from "@/constants/globalState";
import { serverRoute } from "@/constants/routes";
import { addLocalToken, addLocalUser, setLocalValue } from "@/utils/handleLocalData";
import { ImagePickerAsset } from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {Dimensions, Platform, Pressable, StyleSheet, KeyboardAvoidingView, useColorScheme} from 'react-native';
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
    const [signInUsername, setSignInUsername] = useState<string>('');
    const [signInEmail, setSignInEmail] = useState<string>('');
    const [signInPassword, setSignInPassword] = useState<string>('');
    const [signInNumber, setSignInNumber] = useState<string>('');
    const [profilePicture, setProfilePicture] = useState<ImagePickerAsset>();
    // const [loginUsername, setLoginUsername] = useState<string>('');
    const [loginEmail, setLoginEmail] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const translateX = useSharedValue(0);
    const router = useRouter();
    const isSignInDisabled = signInUsername === '' || signInEmail === '' || signInPassword === '' || signInNumber === '';
    const isLoginDisabled = loginEmail === '' || loginPassword === '';
    const {isLoggedIn, localUser, userToken, setIsLoggedIn, setLocalUser, setUserToken} = localUserStore();
    const colorScheme = useColorScheme() ?? 'dark';

    const signInDetails = {
        username: signInUsername,
        password: signInPassword,
        phoneNumber: signInNumber,
        email: signInEmail
    }
    const loginDetails = {
        email: loginEmail,
        password: loginPassword,
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

    // useEffect(() => {
    //     console.log('register page')
    // }, [])

    // const route = "http://192.168.17.241:3000";

    // console.log({serverRoute})
    // console.log({serverRoute})

    async function handleSignIn() {  
        try {
            setIsLoading(true);
            // console.log('started')
            // const response = await fetch('http://192.168.34.241:3000/auth/register', {
            const response = await fetch(`${serverRoute}/auth/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(signInDetails)
            })
            const body = await response.json();
            // console.log({body})
            const {succeeded} = body;
            if(succeeded) {
                const {user, token} = body;

                setLocalUser(user);
                setUserToken(token);
                setLocalValue('local-user', user);
                setLocalValue('user-token', token);
                setIsLoggedIn(true);

                // addLocalUser(user);
                // addLocalToken(token);
                router.navigate('./(app)')
                // console.log({isLoggedIn, localUser, userToken});
            }

            setIsLoading(false);
        } catch(error) {
            setIsLoading(false);
            console.log(`Sign up error: ${error}`)
        }
    }

    async function handleLogin() {
        try {
            setIsLoading(true);

            // console.log({serverRoute})
            const response = await fetch(`${serverRoute}/auth/log-in`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(loginDetails)
            })

            const body = await response.json();


            // console.log({body})
            const {succeeded} = body;
            if(succeeded) {
                const {user, token} = body;

                setLocalUser(user);
                setUserToken(token);
                setLocalValue('local-user', user);
                setLocalValue('user-token', token);
                setIsLoggedIn(true);

                // addLocalUser(user);
                // addLocalToken(token);
                router.navigate('./(app)')

                // console.log({isLoggedIn, localUser, userToken});
            }

            setIsLoading(false);
        }catch(error) {
            setIsLoading(false);
            console.log(`Login error: ${error}`)
        }

    }


    // useEffect(() => {
    //     console.log({loginEmail})
    // }, [loginEmail])

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                     translateX: translateX.value
                }
            ]
        }
    })


    return (
        // <ScrollView 
        //     style={styles.container}
        //     contentContainerStyle={{
        //         // width: '100%',
        //         flexDirection: 'row',
        //         // alignItems: 'center',
        //         alignItems: 'center',
        //         justifyContent: 'space-between'
        //     }}
        // >
        // <KeyboardAvoidingView 
        //     style={styles.container}
        //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        //     contentContainerStyle={{
        //         // width: '100%',
        //         flexDirection: 'row',
        //         // alignItems: 'center',
        //         alignItems: 'center',
        //         justifyContent: 'space-between'
        //     }}
        // >
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
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.form}>
                    <ImageInput image={profilePicture} setter={setProfilePicture} circular size={120}/>
                    <TextInput value={signInUsername} updateFunction={setSignInUsername} label="Username" placeholder={'Username'}/>
                    {/* <TextInput value={signInEmail} updateFunction={setSignInEmail} placeholder={'Email'}/> */}
                    <EmailInput value={signInEmail} updateFunction={setSignInEmail} label="Email" placeholder={'Email'} />
                    <TextInput value={signInNumber} updateFunction={setSignInNumber} label="Phone Number" placeholder={'Phone number'}/>
                    {/* <TextInput value={signInPassword} secureTextEntry={true} placeholder={'Password'} updateFunction={setSignInPassword} /> */}
                    <PasswordInput value={signInPassword} updateFunction={setSignInPassword} label="Password" placeholder={'Password'}/>
                    {/* <PrimaryButton>
                        <Text>Sign in</Text>
                    </PrimaryButton> */}
                    {/* <PrimaryButton isLoading={true}>Sign in</PrimaryButton> */}
                    <PrimaryButton full callback={handleSignIn} disabled={isSignInDisabled} isLoading={isLoading}>Sign in</PrimaryButton>
                </KeyboardAvoidingView>
                {/* <SecondaryButton style={{flex: 1}} callback={handleTransformRight}>Log in</SecondaryButton> */}
                {/* <SecondaryButton callback={handleTransformRight}>Log in</SecondaryButton> */}
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
                    {/* <TextInput value={loginUsername} placeholder={'Username'} updateFunction={setLoginUsername} /> */}
                    {/* <TextInput value={loginEmail} updateFunction={setLoginEmail} placeholder={'Email'}/> */}
                    <EmailInput value={loginEmail} updateFunction={setLoginEmail} placeholder={'Email'}/>
                    {/* <TextInput value={loginPassword} secureTextEntry={true} autoCorrect={false} placeholder={'Password'} updateFunction={setLoginPassword} /> */}
                    <PasswordInput  value={loginPassword} updateFunction={setLoginPassword} placeholder={'Password'}/>
                    {/* <TextInput value={signInEmail} placeholder={'Email'} updateFunction={setSignInEmail} /> */}
                    {/* <PrimaryButton>
                        <Text>Sign in</Text>
                    </PrimaryButton> */}
                    {/* <PrimaryButton isLoading={true}>Sign in</PrimaryButton> */}
                    <PrimaryButton callback={handleLogin} disabled={isLoginDisabled} isLoading={isLoading} full>Log in</PrimaryButton>
                </View>
                {/* <SecondaryButton callback={handleTransformLeft}>Sign up</SecondaryButton> */}
                <Tooltip buttonText="Sign up" callback={handleTransformLeft} type={TooltipTypes.Button} />
            </Animated.View>
        {/* </ScrollView> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // paddingVertical: 16,
        // padding: 0,
        // width: '100%',
        // width: '200%',
        // minHeight: '100%',
        // backgroundColor: 'darkblue',
        // minHeight: '100%',
        paddingBottom: 16,
        flexDirection: 'row',
        overflow: 'hidden',
        // paddingTop: 60,
        // paddingBottom: 40,
        // gap: 16
        // borderColor: 'red',
        // borderStyle: 'solid',
        // borderWidth: 1,
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
        // width: '50%',
        // width: '50%',
        // flex: 1,
        // width: '100%',
        // width: '100%',
        // flex: 1,
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