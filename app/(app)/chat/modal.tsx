import {View, Text} from '@/components/Themed';
import { useRouter } from 'expo-router';
import { Dimensions, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import {BlurView} from 'expo-blur'
import { AnimatedScrollView } from 'react-native-reanimated/lib/typescript/reanimated2/component/ScrollView';

const {width, height} = Dimensions.get('window');
const IMAGE_GAP = 16
const PAGE_WIDTH = width - (IMAGE_GAP*2);

export default function Modal() {
    // const images = [require(`../../../assets/testImages/test_image_1.jpg`), require(`../../../assets/testImages/test_image_2.jpg`), require(`../../../assets/testImages/test_image_3.jpg`), require(`../../../assets/testImages/test_image_4.jpg`), require(`../../../assets/testImages/test_image_5.jpg`), require(`../../../assets/testImages/test_image_6.jpg`), require(`../../../assets/testImages/test_image_7.jpg`), require(`../../../assets/testImages/test_image_8.jpg`), require(`../../../assets/testImages/test_image_9.jpg`), require(`../../../assets/testImages/test_image_10.jpg`)];
    const images = [require(`../../../assets/testImages/test_image_1.jpg`), require(`../../../assets/testImages/test_image_2.jpg`), require(`../../../assets/testImages/test_image_3.jpg`), require(`../../../assets/testImages/test_image_4.jpg`), require(`../../../assets/testImages/test_image_5.jpg`), require(`../../../assets/testImages/test_image_6.jpg`)];
    const router = useRouter();
    const arr = [1, 2, 3, 4];
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
    function handleGoBack() {
        router.back();
    }

    return (
        <Pressable onPress={handleGoBack} style={styles.container}>
        {/* <Pressable style={styles.container}> */}
            <View style={styles.numOfImagesWrapper}>
                <Text style={styles.numOfImages}>6/10</Text>
            </View>

            <FlatList 
                style={styles.modalImagesWrapper}
                contentContainerStyle={{
                    alignItems: 'center',
                    // paddingLeft: IMAGE_GAP
                    paddingHorizontal: IMAGE_GAP
                    // flex: 1,
                    // width: '100%'
                    // paddingHorizontal: IMAGE_GAP,
                    // gap: IMAGE_GAP,
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={images}
                // data={arr}
                pagingEnabled={true}
                snapToAlignment='center'
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                    console.log({item})
                    return (
                        <Animated.View 
                            key={index.toString()}
                            // sharedTransitionTag={index < 3 ? `image-${index}` : 'undefined'}
                            style={styles.modalImageWrapper} 
                        >
                            <Image 
                                style={styles.modalImage} 
                                source={item} 
                                resizeMode="cover" 
                            />
                            {/* <Image 
                                style={styles.modalImage} 
                                source={images[getRandomIndex(arr)]} 
                                resizeMode="cover" 
                            /> */}
                            <Text>test</Text>
                        </Animated.View>
                    )
                }}
            />
        </Pressable>

        // <View style={styles.container}>
        //     <View style={styles.numOfImagesWrapper}>
        //         <Text style={styles.numOfImages}>6/10</Text>
        //     </View>

        //     <FlatList 
        //         style={styles.modalImagesWrapper}
        //         contentContainerStyle={{
        //             flex: 1,
        //             paddingHorizontal: IMAGE_GAP,
        //             gap: IMAGE_GAP,
        //         }}
        //         horizontal={true}
        //         showsHorizontalScrollIndicator={false}
        //         data={images}
        //         pagingEnabled={true}
        //         keyExtractor={item => item.toString()}
        //         renderItem={({item, index}) => {
        //             console.log({item})
        //             return (
        //                 <View style={styles.modalImageWrapper} key={index.toString()}>
        //                     <Image 
        //                         style={styles.modalImage} 
        //                         source={item} 
        //                         resizeMode="cover" 
        //                     />
        //                 </View>
        //             )
        //         }}
        //     />
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: '100%',
        // height: '100%',
        paddingVertical: '10%',
        position: 'relative',
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .4)',
    },
    numOfImagesWrapper: {
        // position: 'absolute',
        // top: 36,
        // right: 48,
        // flex: 1,
        height: '10%',
        right: 16,
        // width: '100%',
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        // borderWidth: 1,
        // borderColor: 'red',
        // borderStyle: 'solid'
    },
    numOfImages: {
        fontSize: 20
    }, 
    modalImagesWrapper: {
        // flex: 9,
        // flex: 1,
        // width: '100%',
        // height: '80%',
        // width: '100%',
        borderWidth: 1,
        borderColor: 'red',
        borderStyle: 'solid'
    },
    modalImageWrapper: {
        // flex: 1,
        // width: '100%',
        // width: 100,
        width: PAGE_WIDTH,
        borderWidth: 1,
        borderColor: 'blue',
        borderStyle: 'solid'
    },
    modalImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8
    }
})