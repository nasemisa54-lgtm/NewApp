import AppContext from '@/hooks/AppContext';
import { useRouteInfo, useRouter } from 'expo-router/build/hooks';
import { useContext, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



const Product = () => {
    const { cart, setcart } = useContext(AppContext)
    const nav = useRouter();
    const params = useRouteInfo().params;
    const [count, setcount] = useState(1);

    const addtocart = () => {
        const found = cart.find((item) => item.name == params.name);
        if (found) {
            found.count += count
            setcart([...cart])
        }
        else {
            const product = { ...params, count };
            cart.push(product);
            setcart([...cart]);
        }
        nav.push({
            pathname: "/cart",
        })

    }

    const plus = () => {
        setcount(count + 1);

    }

    const minus = () => {
        if (count > 1) {
            setcount(count - 1);
        }
        else {
            alert('cant be less than 1')
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: params.image }} />

            <View style={styles.info}>
                <Text style={styles.txt}>{params.name}</Text>
                <Text style={styles.text}>{params.price}₪</Text>
                {/* <Text style={styles.text}>{params.guntity}</Text> */}
                <Text style={styles.text}>{params.type}</Text>
            </View>
            <View style={styles.counter}>
                <TouchableOpacity style={styles.putoon} onPress={plus}>
                    <Text style={styles.plsTXT}>+</Text>
                </TouchableOpacity>

                <Text style={styles.plsTXT}>{count}</Text>


                <TouchableOpacity style={styles.putoon} onPress={minus} >
                    <Text style={styles.plsTXT}> - </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={addtocart} style={styles.btn}>
                <Text>add to cart</Text>
            </TouchableOpacity>

        </View >
    )
}


export default Product

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    image: {
        height: '50%',
        width: '100%',
        resizeMode: 'contain'
    },
    txt: {
        fontSize: 30,
        margin: 10
    },
    text: {
        fontSize: 30,
    },
    info: {
        alignItems: 'center'

    },
    putoon: {
        alignItems: 'center',
        margin: 20,
        fontSize: 50,
    },
    plsTXT: {
        fontSize: 40,
        color: 'blue',
    },
    counter: {
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        alignSelf: 'center',
        padding: 10
    }

}
)