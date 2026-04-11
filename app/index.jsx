import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native';
import Images from '../assets/images/Images';

const { width, height } = Dimensions.get('window');

const Page = () => {
    const router = useRouter();
    const logo = Images.logo;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();

        const timer = setTimeout(() => {
            router.replace('/(tabs)');
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.animatedWrapper, { opacity: fadeAnim }]}>
                <Image 
                    source={logo} 
                    style={styles.logo} 
                    resizeMode="contain" 
                />
            </Animated.View>
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    animatedWrapper: {
        // Ensures the container of the image takes up most of the screen
        width: '90%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        // Setting width and height to 100% ensures it expands to the 
        // limits of the wrapper, while resizeMode="contain" prevents distortion.
        width: '100%',
        height: '100%',
    },
});