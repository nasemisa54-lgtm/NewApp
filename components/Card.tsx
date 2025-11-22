import { useNavigation } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Card = (props : any) => {
  const nav = useNavigation();
  const goto = () => {
    nav.navigate("product",{ ...props })
}

  return (
    <TouchableOpacity style={styles.Card} onPress={goto}>
      <View style={styles.texts}>
        <Text style={styles.text}>{props.name}</Text>
        <Text>{props.price}₪</Text>
      </View>
      <View style={styles.image}>
        <Image source={{ uri: props.image }} style={styles.img} />
      </View>
    </TouchableOpacity>
  )
}
export default Card

const styles = StyleSheet.create({
  Card: {
    height: 120,
    width: "95%",
    backgroundColor: '#e6e1f3ff',
    alignSelf: "center",
    flexDirection: 'row',
    padding: 7,
    borderRadius: 10,
    margin: 15
  },
  text: {
    fontSize: 25
  },

  texts: {
    flex: 2,

  },
  image: {
    borderWidth: 2,
    flex: 1,
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  }

})