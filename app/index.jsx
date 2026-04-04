import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native';
import Images from '../assets/images/Images';

const size = Dimensions.get('window')

const Page = () => {
    const router = useRouter();
    const logo = Images.logo;
    const fadeAnim = useRef(new Animated.Value(0)).current; // للتحكم في ظهور الصورة تدريجياً

    useEffect(() => {
        // 1. تأثير ظهور تدريجي للصورة
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        // 2. الانتقال إلى التبويبات بعد 2.5 ثانية
        const timer = setTimeout(() => {
            router.replace('/(tabs)');
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={{ opacity: fadeAnim }}>
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
        backgroundColor: '#000', // الخلفية سوداء لتناسب تصميم شعار Nseem Tech
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: size.width, // يمكنك تكبير أو تصغير الشعار من هنا
        height: size.width,
        resizeMode:'contain',
        borderRadius:'100%'
    },
});