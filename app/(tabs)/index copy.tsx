import images from '@/assets/images/Images'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
const index = () => {
  const image = "https://th.bing.com/th/id/OIP.AXXLtU3cjvPKmZHAVeW3sgHaHa?w=203&h=203&c=7&r=0&o=7&pid=1.7&rm=3"
  const image2 = "https://wallpapercave.com/wp/wp14116551.jpg"
  const image3="https://m.media-amazon.com/images/I/8187Jv5hanS._AC_SL1500_.jpg"
  const image4="https://tse4.mm.bing.net/th/id/OIP.-Qswi7tbqYEsWO-iMvW5ggAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.bottom} >
          <View style={styles.box3}>
            <Image source={{uri: image}} style={styles.img} />
          </View>
          <View style={styles.txtcontainer}>
            <Text style={styles.name}>sae</Text>
            <Text style={styles.name}>2000</Text>
          </View>
        </View>
        <Text style={styles.Text}>no fox no tred</Text>
      </View>

      <View style={styles.top}>
        <View style={styles.bottom} >
          <Image style={styles.img} source={{uri: image2}}/>
          <View style={styles.txtcontainer}>
            <Text style={styles.name}>rin</Text>
            <Text style={styles.name}>2005</Text>
          </View>
        </View>
        <Text style={styles.Text}>no you first</Text>
      </View>



      <View style={styles.top}>
        <View style={styles.bottom} >
          <Image style={styles.img}source={images.bachira}/>
          <View style={styles.txtcontainer}>
            <Text style={styles.name}>bachira</Text>
            <Text style={styles.name}>2006</Text>
          </View>
        </View>
        <Text style={styles.Text}>you first</Text>

      </View>

      <View style={styles.top}>
        <View style={styles.bottom} >
          <Image style={styles.img}source={{uri: image4}}/>
          <View style={styles.txtcontainer}>
            <Text style={styles.name}>isagi</Text>
            <Text style={styles.name}>2006</Text>
          </View>
        </View>
        <Text style={styles.Text}>me first</Text>
      </View>

    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    // alignItems: "center",
  },
  name: {
    fontSize: 35,
    color: "white",

  },
  age: {
    fontSize: 70,
    color: "green",
  },
  grade: {
    borderWidth: 3,
    fontSize: 70,
    color: "red",
  },
  top: {
    borderWidth: 1,
    width: 350,
    height: 250,
    margin: 4,
  },
  box: {
    borderWidth: 1,
    backgroundColor: "green",
    margin: 20,
    width: 130,
    height: 150,

  },
  box1: {
    borderWidth: 1,
    backgroundColor: "red",
    margin: 20,
    width: 130,
    height: 150,
  },
  box2: {
    borderWidth: 1,
    backgroundColor: "orange",
    margin: 20,
    width: 130,
    height: 150,
  },
  box3: {
    borderWidth: 1,
    backgroundColor: "white",
    margin: 20,
    width: 130,
    height: 150,
    
  },
  bottom: {
    flexDirection: "row",
  },
  Text: {
    fontSize: 50,
  },
  txtcontainer: {
    alignItems: "center",
    flex: 1
  },

  img: {
    width: 130,
    height: 150,
  }
})


































