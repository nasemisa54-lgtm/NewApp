import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const Categories = (props) => {
  const {category, image} = props;
    return (
    <View>
      <Text>{category}</Text>
      <Image source={{uri: image}} style={styles.img}/>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
    img: {
        width: 100,
        height: 100,
    }
})