import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Search from '../../components/Search'

const Usestate = () => {
    const [first, setfirst] = useState("mosa")
    const [color, setcolor] = useState("black")

    const onpressName = (name, color) => {
        setfirst(name)
        setcolor(color)
    }

    return (
        <View style={styles.screen}>
            <Text>this is first : </Text>
            <Text style={{ color: color }}>{first}</Text>
            <TouchableOpacity
                style={styles.nseem}
                onPress={() => onpressName('nseem', "blue")}
            >
                <Text>nseem</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.hasan}
                onPress={() => onpressName('hasan', "yellow")}
            >
                <Text>hasan</Text>
            </TouchableOpacity>

            <Search />
        </View>
    )
}

export default Usestate

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "gray",
        flex: 1,
        paddingTop: 100
    },
    nseem: {
        backgroundColor: "blue",
        padding: 10,
        margin: 10
    },
    hasan: {
        backgroundColor: "yellow",
        padding: 10,
        margin: 10
    },

})