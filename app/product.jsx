import AppContext from '@/hooks/AppContext';
import { useRouteInfo, useRouter } from 'expo-router/build/hooks';
import { useContext, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Page = () => {
    const { cart, setcart } = useContext(AppContext);
    const nav = useRouter();
    const params = useRouteInfo().params;
    
    const [count, setcount] = useState(1);
    // الحالة الخاصة باللون المختار (افتراضياً أول لون أو رمادي)
    const [selectedColor, setSelectedColor] = useState('black');

    // قائمة الألوان المتاحة (يمكنك جعلها ديناميكية من params إذا كانت متوفرة)
    const colors = ['black', 'silver', 'orange', 'blue'];

    const addtocart = () => {
        // البحث عن المنتج مع التأكد من مطابقة الاسم واللون
        const found = cart.find((item) => item.name === params.name && item.color === selectedColor);
        
        if (found) {
            found.count += count;
            setcart([...cart]);
        } else {
            // إضافة اللون المختار لبيانات المنتج في السلة
            const product = { ...params, count, color: selectedColor };
            setcart([...cart, product]);
        }
        
        nav.push({
            pathname: "/cart",
        });
    };

    const plus = () => setcount(count + 1);
    const minus = () => {
        if (count > 1) setcount(count - 1);
        else alert('Cant be less than 1');
    };

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: params.image }} />

            <View style={styles.info}>
                <Text style={styles.txt}>{params.name}</Text>
                <Text style={styles.price}>{params.price}₪</Text>
                
                {/* قسم اختيار الألوان */}
                <Text style={styles.label}>اختر اللون:</Text>
                <View style={styles.colorContainer}>
                    {colors.map((color) => (
                        <TouchableOpacity
                            key={color}
                            style={[
                                styles.colorCircle,
                                { backgroundColor: color },
                                selectedColor === color && styles.selectedCircle
                            ]}
                            onPress={() => setSelectedColor(color)}
                        />
                    ))}
                </View>
            </View>

            <View style={styles.counter}>
                <TouchableOpacity style={styles.putoon} onPress={plus}>
                    <Text style={styles.plsTXT}>+</Text>
                </TouchableOpacity>

                <Text style={styles.countText}>{count}</Text>

                <TouchableOpacity style={styles.putoon} onPress={minus}>
                    <Text style={styles.plsTXT}> - </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={addtocart} style={styles.btn}>
                <Text style={styles.btnText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    image: {
        height: '40%',
        width: '100%',
        resizeMode: 'contain'
    },
    info: {
        alignItems: 'center',
        paddingVertical: 10
    },
    txt: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 24,
        color: 'green',
        marginVertical: 5
    },
    label: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 5
    },
    colorContainer: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 20
    },
    colorCircle: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedCircle: {
        borderWidth: 3,
        borderColor: '#007AFF', // لون التحديد
        transform: [{ scale: 1.2 }]
    },
    counter: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        marginVertical: 10
    },
    putoon: {
        padding: 10,
    },
    plsTXT: {
        fontSize: 35,
        color: 'blue',
    },
    countText: {
        fontSize: 30,
    },
    btn: {
        backgroundColor: '#000',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});