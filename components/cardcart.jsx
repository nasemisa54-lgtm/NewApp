import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppContext from '../hooks/AppContext';

const CardCart = (params) => {
    const { cart, setcart } = useContext(AppContext)
    const found = cart.find((item) => item.name == params.name);
    console.log(found);


    const plus = () => {
        // setcount(count + 1);
        if (found?.count) {
            found.count += 1
            setcart([...cart])
        } else {
            found.count = 2
            setcart([...cart])
        }
    }

    const minus = () => {
        if (found?.count > 1) {
            found.count -= 1
            setcart([...cart]);
        }
        else {
            alert('cant be less than 1')
        }
    }

    const deleteItem = () => {
        const filterd = cart.filter((item) => item.name !== params.name)
        setcart([...filterd])
    }

    return (
        <View style={styles.card}>
            <View>
                <Text>{params.name}</Text>
                <Text>{params.price}₪</Text>
                <Image
                    source={{ uri: params.image }}
                    style={styles.Image}

                />
            </View>
            <View style={styles.counter}>
                <TouchableOpacity style={styles.putoon} onPress={plus}>
                    <Text style={styles.plsTXT}>+</Text>
                </TouchableOpacity>

                <Text style={styles.plsTXT}>{found?.count || 1}</Text>


                <TouchableOpacity style={styles.putoon} onPress={minus} >
                    <Text style={styles.plsTXT}> - </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.trash}>
                <TouchableOpacity onPress={deleteItem}>
                    <MaterialCommunityIcons name="trash-can" size={25} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CardCart

const styles = StyleSheet.create({
    card: {
        width: "90%",
        height: 100,
        backgroundColor: "#fff",
        borderRadius: 10,
        margin: 10,
        padding: 10,
        flexDirection: 'row'
    },
    Image: {
        height: 50,
        width: 50
    },
    counter: {
        alignItems: 'center',
        flexDirection: "row",
        alignSelf: 'center',
        flex: 1,
        justifyContent:'center'
    },
    putoon: {
        alignItems: 'center',
        margin: 20,
        fontSize: 50,

    },
    plsTXT: {
        fontSize: 25,
        color: 'black',
        // borderWidth:1,
    },
    trash: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

