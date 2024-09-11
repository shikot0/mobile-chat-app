// import { Image, Dimensions, StyleSheet, Pressable } from "react-native";
import { Dimensions, StyleSheet, Pressable } from "react-native";
import {Image} from 'expo-image'
import Animated, { withTiming, Easing, useAnimatedStyle, interpolate, useSharedValue, SharedValue } from 'react-native-reanimated';
import { Link } from "expo-router";
// import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import {Text, View} from './Themed';
// import Ionicons from "@expo/vector-icons/Ionicons";
import Swipeable from 'react-native-gesture-handler/Swipeable'
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect } from "react";
import { localUserStore } from "@/constants/globalState";

const {width, height} = Dimensions.get('window');
const animationDuration = 300;

export enum MessageTypes {
    Text = 'text',
    Images = 'images',
    TextWithImages = 'text-with-images',
    Audio = 'audio'
}

type MessageHandlerProps = {
    message: MessageTypeProps,
    user: {
        id: string,
        username: string,
        profilePicture: string | null
    }
}

type MessageTypeProps = {
    text?: string,
    media?: string[],
    // timeSent?: string,
    // timeReceived?: string,
} 
// } & (TextMessageProps | ImageMessageProps | AudioMessageProps) 

// type TextMessageProps = {
//     type?: MessageTypes.Text
//     // type?: 'text'
//     text: string,
//     sender: string,
//     // recipient: string,
// }
// type ImageMessageProps = {
//     type?: MessageTypes.Images,
//     sender: string,
//     imageLinks: string[]
// }
// type AudioMessageProps = {
//     type?: MessageTypes.Audio,
//     sender: string
// }
type TextMessageProps = {
    // type?: MessageTypes.Text
    // type?: 'text'
    text: string,
    // sender: string,
    user: MessageHandlerProps["user"],
    // recipient: string,
}
type ImageMessageProps = {
    // type?: MessageTypes.Images,
    // sender: string,
    user: MessageHandlerProps["user"],
    imageLinks: string[]
}
type AudioMessageProps = {
    // type?: MessageTypes.Audio,
    sender: string
}

// export function MessageHandler({...messageProps}: MessageHandlerProps) {
export function MessageHandler({message, user}: MessageHandlerProps) {
    // console.log({type: message.type})
    // switch (message.type) {
    //     case MessageTypes.Text:
    //         // console.log('here')
    //         return (
    //             <TextMessage sender={message.sender} text={message.text}/>
    //         ) 
    //     case MessageTypes.Images:
    //         // console.log('there')
    //         return (
    //             <ImageMessage sender={message.sender} imageLinks={message.imageLinks}/>
    //         )
    // }
    if(message.text && message.media && message.media.length !== 0) {
        return (
            <>
                <ImageMessage user={user} imageLinks={message.media}/>
                <TextMessage user={user} text={message.text}/>
            </>
        ) 
    }else if(message.text) {
        return (
            <TextMessage user={user} text={message.text}/>
        )
    }if(message.media) {
        <ImageMessage user={user} imageLinks={message.media}/>
    }
}


// export function TextMessage({text, timeSent, timeReceived, sender}: TextMessageProps) {
// export function TextMessage({text, sender}: TextMessageProps) {
export function TextMessage({text, user}: TextMessageProps) {
    const textEnteringAnim = (values: {targetOriginY: number; targetOriginX: number}) => {
        "worklet";

        const animations = {
            opacity: withTiming(1, {
                duration: animationDuration
            }),
            originX: withTiming(values.targetOriginX, {
                duration: animationDuration/2,
                easing: Easing.elastic(1)
            }),
            scaleX: withTiming(1, {
                duration: animationDuration,
                easing: Easing.elastic(2),
                // easing: Easing.linear
            }),
            scaleY: withTiming(1, {
                duration: animationDuration,
                easing: Easing.elastic(2),
                // easing: Easing.linear
            })
        };

        const initialValues = {
            // originY: height,
            originX: width + 50,
            scaleX: .75,
            scaleY: .75,
            opacity: .5,
        }  
        
        return {
            initialValues,
            animations
        }
    }
    const {localUser} = localUserStore();

    // const AnimatedSwipeable = Animated.createAnimatedComponent(Swipeable);


    return (
        // <Animated.View
        //     style={[
        //         styles.textMessageWrapper, 
        //         {
        //             backgroundColor: sender === 'me' ? 'rgba(0, 175, 200, .5)' : 'rgba(255, 255, 255, .75)',
        //             alignSelf: sender === 'me' ? "flex-end": 'flex-start'
        //         }
        //     ]}
        //     // entering={SlideInRight}
        //     entering={textEnteringAnim}
        // >
        //     <Text
        //         style={
        //             {
        //                 color: sender === 'me' ? 'white' : 'black'
        //             }
        //         }
        //     >
        //         {text}
        //     </Text>
        // </Animated.View>

        <Swipeable
            // entering={SlideInRight}
            // entering={textEnteringAnim}
            overshootFriction={8}
            overshootLeft={false}
            
            renderRightActions={(progress, dragX) => {
            // renderLeftActions={(progress: SharedValue<number>, dragX: SharedValue<number>) => {
                const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);
                // const animatedStyle = useAnimatedStyle(() => {
                //     const opacity = interpolate(progress, [0, 1], [0, 1], 'clamp')
                // })
                // const opacity = progress.interpolate({
                //     inputRange: [0, 1],
                //     outputRange: [0, 1],
                //     extrapolate: "clamp"
                // })
                // let opacity = dragX.interpolate({
                //     inputRange: [0, 25],
                //     outputRange: [0, 1],
                // })
                // const opacity = interpolate(dragX.removeListener, [0, 25], [0, 1], 'clamp')
                // console.log({opacity})
                // useEffect(() => {
                //     console.log({opacity})
                // }, [opacity])

                // drag.interpolate({
                //     inputRange: []
                // })

                // const animatedStyle = useAnimatedStyle(() => {
                //     return {
                //         opacity: progress.
                //     }
                // })

                return (
                    // <View><Text>test</Text></View>
                    <View
                        style={[
                            {
                                width: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                // borderStyle: 'solid',
                                // borderWidth: 1,
                                // borderColor: 'white'
                                // opacity: progress
                            },
                            // {
                            //     opacity: opacity
                            // }
                            // animatedStyle
                        ]}
                    >
                        <AnimatedIcon name="arrowleft" color="white" size={25}/>
                    </View>
                )
            }}
        >
            <View             
                style={[
                    styles.textMessageWrapper, 
                    {
                        backgroundColor: user.id === localUser?.id ? 'rgba(0, 175, 200, .5)' : 'rgba(255, 255, 255, .75)',
                        alignSelf: user.id === localUser?.id ? "flex-end": 'flex-start'
                    }
                ]}
            >

                <Text
                    style={
                        {
                            color: localUser?.id === user.id ? 'white' : 'black'
                        }
                    }
                >
                    {text}
                </Text>
            </View>
        </Swipeable>
    )
}

export function ImageMessage({user, imageLinks}: ImageMessageProps) {
    const images = [require(`../assets/testImages/test_image_1.jpg`), require(`../assets/testImages/test_image_2.jpg`), require(`../assets/testImages/test_image_3.jpg`), require(`../assets/testImages/test_image_4.jpg`), require(`../assets/testImages/test_image_5.jpg`), require(`../assets/testImages/test_image_6.jpg`), require(`../assets/testImages/test_image_7.jpg`), require(`../assets/testImages/test_image_8.jpg`), require(`../assets/testImages/test_image_9.jpg`), require(`../assets/testImages/test_image_10.jpg`)]
    const selectedIndexes: number[] = [];
    function getRandomIndex(arr: any[]) {
        // return images[Math.floor(Math.random() * images.length-1)];
        let index = Math.floor(Math.random() * arr.length);
        while(selectedIndexes.includes(index)) {
            index = Math.floor(Math.random() * arr.length);
        }
        // if(!selectedIndexes.includes(index)) return index;
        // return Math.floor(Math.random() * images.length);
        return index;
    }

    const {localUser} = localUserStore();
    

    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    return (
        // <Animated.View style={[
        //     styles.imageMessageWrapper,
        //     {
        //         alignSelf: sender === 'me' ? "flex-end": 'flex-start'
        //     },
        //     {
        //         translateX: imageLinks.length === 1 ? 0 : sender === 'me' ? -10 : 10
        //     }
        //     // {
        //     //     alignItems: sender === 'me' ? "flex-start": 'flex-end'
        //     // }
        // ]}>
        //     {imageLinks.slice(0, 3).map((imageLink, index) => {
        //         // console.log({index})
        //         const randomizedIndex = getRandomIndex();
        //         const animatedStyle = useAnimatedStyle(() => {
        //             const inputRange = [0, 1, 2]
        //             return {
        //                 zIndex: interpolate(index, inputRange, [2, 1, 0], 'clamp'), 
        //                 transform: [
        //                     {
        //                         // skewY: `${interpolate(index, inputRange, [0, 10, 20], 'clamp')}deg`
        //                         // skewY: `${interpolate(index, inputRange, [0, 10, -20], 'clamp')}deg`
        //                         skewY: `${interpolate(index, inputRange, [0, 7.5, -12.5], 'clamp')}deg`
        //                     }
        //                 ]
        //             }
        //         })
        //         return (
        //             <Animated.View 
        //                 key={index.toString()}
        //                 style={[styles.imageWrapper, animatedStyle]}
        //             >
        //                 <Image
        //                     style={styles.imageMessage} 
        //                     source={images[randomizedIndex]} 
        //                     resizeMode="cover" 
        //                 />
        //             </Animated.View>
        //         )
        //     })}
        //     {imageLinks.length > 1 ?
        //         <View style={styles.numOfImagesOverlayWrapper}>
        //             <Text style={styles.numOfImagesOverlay}>{imageLinks.length}</Text>
        //         </View> 
        //     : null}
        // </Animated.View>
        <Link href='./modal' asChild>
            <Pressable>
                <View
                    style={[
                        styles.imageMessageWrapper,
                        {
                            alignSelf: localUser?.id === user.id ? "flex-end": 'flex-start'
                        },
                        {
                            translateX: imageLinks.length === 1 ? 0 : localUser?.id === user.id ? -10 : 10
                        }
                        // {
                        //     alignItems: sender === 'me' ? "flex-start": 'flex-end'
                        // }
                    ]}
                >
                    {imageLinks.slice(0, 3).map((imageLink, index) => {
                        // console.log({index})
                        // const rotateZ = useSharedValue(Math.random() * 20 - 10);
                        const randomizedIndex = getRandomIndex(images);
                        const animatedStyle = useAnimatedStyle(() => {
                            const inputRange = [0, 1, 2]
                            return {
                                zIndex: interpolate(index, inputRange, [2, 1, 0], 'clamp'), 
                                opacity: interpolate(index, inputRange, [1, .5, .25], 'clamp'),
                                transform: [
                                    {
                                        // skewY: `${interpolate(index, inputRange, [0, 10, 20], 'clamp')}deg`
                                        // skewY: `${interpolate(index, inputRange, [0, 10, -20], 'clamp')}deg`
                                        skewY: `${interpolate(index, inputRange, [0, 7.5, -12.5], 'clamp')}deg`
                                        // rotateZ: `${rotateZ.value}deg`
                                    }
                                ]
                            }
                        })
                        return (
                            <Animated.View 
                                key={index.toString()}
                                style={[styles.imageWrapper, animatedStyle]}
                                // sharedTransitionTag={index < 3 ? `image-${index}` : 'undefined'}
                            >
                                <Image
                                    style={styles.imageMessage} 
                                    source={images[randomizedIndex]} 
                                    resizeMode="cover" 
                                />
                            </Animated.View>
                        )
                    })}
                    {imageLinks.length > 1 ?
                        <View style={styles.numOfImagesOverlayWrapper}>
                            <Text style={styles.numOfImagesOverlay}>{imageLinks.length}</Text>
                        </View> 
                    : null}
                </View>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    textMessageWrapper: {
        borderRadius: 20,
        maxWidth: '57.5%',
        // width: '100%',
        // backgroundColor: 'rgba(0, 175, 200, .5)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 4,
        
        // borderWidth: 1,
        // borderStyle: 'solid',
        // borderColor: 'red'
    },
    imageMessageWrapper: {
        width: '50%',
        maxWidth: 150,
        position: 'relative',
        aspectRatio: 1/1, 
        // aspectRatio: 1/1.05, 
        justifyContent: 'center',
        alignItems: 'center',
        // aspectRatio: 1/1.25,
        // borderRadius: 16,
        // width: 100,
        // height: 100,
        // overflow: 'hidden',
        // borderWidth: 1,
        // borderStyle: 'solid',
        // borderColor: 'red'
    },  
    imageWrapper: {
        position: 'absolute',
        // width: '100%',
        // aspectRatio: 1/1.25,
        // height: '80%',
        width: '90%',
        height: '90%',
        // width: '100%',
        // height: '100%',
        overflow: 'hidden',
        // aspectRatio: 1/1.25,
        borderRadius: 16,
        borderStyle: 'solid',
        borderColor: 'rgba(255, 255, 255, .25)',
        // borderColor: 'rgba(0, 0, 0, .25)',
        borderWidth: 1,
        // borderWidth: 1,
        // borderStyle: 'solid',
        // borderColor: 'red',
    },
    numOfImagesOverlayWrapper: {
        position: 'absolute',
        left: 16,
        top: 16,
        zIndex: 10,
        borderRadius: 100,
        // padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        aspectRatio: 1/1,
    },
    numOfImagesOverlay: {
        fontVariant: ['tabular-nums'],
        textAlign: 'center',
    },
    imageMessage: {
        width: '100%',
        height: '100%'
    },
})