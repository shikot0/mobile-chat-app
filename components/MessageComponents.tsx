import { Image, Dimensions, StyleSheet, Pressable } from "react-native";
import Animated, { withTiming, Easing, useAnimatedStyle, interpolate } from 'react-native-reanimated';
import {Text, View} from './Themed';
import { Link } from "expo-router";

const {width, height} = Dimensions.get('window');
const animationDuration = 300;

export enum MessageTypes {
    Text = 'text',
    Images = 'images',
    TextWithImages = 'text-with-images',
    Audio = 'audio'
}

type MessageHandlerProps = {
    message: MessageTypeProps
}

type MessageTypeProps = {
    timeSent?: string,
    timeReceived?: string,
} & (TextMessageProps | ImageMessageProps | AudioMessageProps) 

type TextMessageProps = {
    type?: MessageTypes.Text
    // type?: 'text'
    text: string,
    sender: string,
    // recipient: string,
}
type ImageMessageProps = {
    type?: MessageTypes.Images,
    sender: string,
    imageLinks: string[]
}
type AudioMessageProps = {
    type?: MessageTypes.Audio,
    sender: string
}

// export function MessageHandler({...messageProps}: MessageHandlerProps) {
export function MessageHandler({message}: MessageHandlerProps) {
    // console.log({type: message.type})
    switch (message.type) {
        case MessageTypes.Text:
            // console.log('here')
            return (
                <TextMessage sender={message.sender} text={message.text}/>
            ) 
        case MessageTypes.Images:
            // console.log('there')
            return (
                <ImageMessage sender={message.sender} imageLinks={message.imageLinks}/>
            )
    }
}


// export function TextMessage({text, timeSent, timeReceived, sender}: TextMessageProps) {
// export function TextMessage({text, sender}: TextMessageProps) {
export function TextMessage({text, sender}: TextMessageProps) {
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

    return (
        <Animated.View
            style={[
                styles.textMessageWrapper, 
                {
                    alignSelf: sender === 'me' ? "flex-end": 'flex-start'
                }
            ]}
            // entering={SlideInRight}
            entering={textEnteringAnim}
        >
            <Text>{text}</Text>
        </Animated.View>
    )
}

export function ImageMessage({sender, imageLinks}: ImageMessageProps) {
    const images = [require(`../assets/testImages/test_image_1.jpg`), require(`../assets/testImages/test_image_2.jpg`), require(`../assets/testImages/test_image_3.jpg`), require(`../assets/testImages/test_image_4.jpg`), require(`../assets/testImages/test_image_5.jpg`), require(`../assets/testImages/test_image_6.jpg`), require(`../assets/testImages/test_image_7.jpg`), require(`../assets/testImages/test_image_8.jpg`), require(`../assets/testImages/test_image_9.jpg`), require(`../assets/testImages/test_image_10.jpg`)]
    const selectedIndexes: number[] = [];
    function getRandomIndex() {
        // return images[Math.floor(Math.random() * images.length-1)];
        let index = Math.floor(Math.random() * images.length);
        while(selectedIndexes.includes(index)) {
            index = Math.floor(Math.random() * images.length);
        }
        // if(!selectedIndexes.includes(index)) return index;
        // return Math.floor(Math.random() * images.length);
        return index;
    }
    

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
                            alignSelf: sender === 'me' ? "flex-end": 'flex-start'
                        },
                        {
                            translateX: imageLinks.length === 1 ? 0 : sender === 'me' ? -10 : 10
                        }
                        // {
                        //     alignItems: sender === 'me' ? "flex-start": 'flex-end'
                        // }
                    ]}
                >
                    {imageLinks.slice(0, 3).map((imageLink, index) => {
                        // console.log({index})
                        const randomizedIndex = getRandomIndex();
                        const animatedStyle = useAnimatedStyle(() => {
                            const inputRange = [0, 1, 2]
                            return {
                                zIndex: interpolate(index, inputRange, [2, 1, 0], 'clamp'), 
                                transform: [
                                    {
                                        // skewY: `${interpolate(index, inputRange, [0, 10, 20], 'clamp')}deg`
                                        // skewY: `${interpolate(index, inputRange, [0, 10, -20], 'clamp')}deg`
                                        skewY: `${interpolate(index, inputRange, [0, 7.5, -12.5], 'clamp')}deg`
                                    }
                                ]
                            }
                        })
                        return (
                            <Animated.View 
                                key={index.toString()}
                                style={[styles.imageWrapper, animatedStyle]}
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
        backgroundColor: 'rgba(0, 175, 200, .5)',
        paddingVertical: 8,
        paddingHorizontal: 16,
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