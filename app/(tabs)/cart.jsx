import AppContext from '@/hooks/AppContext';
import { useRouteInfo, useRouter } from 'expo-router/build/hooks';
import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardCart from '../../components/cardcart';

const Cart = () => {
  const { cart } = useContext(AppContext)
  const params = useRouteInfo().params;
  const product = { ...params }
  const nav = useRouter()

  const rendercart = () => {
    return cart.map((item, index) => (
      <CardCart
        key={index}
        {...item}
      />
    ))
  }


  const getTotal = () => {
    var total = 0
    cart.forEach(element => {
      total = element.count * element.price
    });
    return total
  }

  const buy = () => {
    nav.push({
            pathname: "/pay",
        })
  }



  return (
    <View style={styles.view}>
      <ScrollView style={styles.screen}>
        <View style={styles.hed}>
          <Text style={styles.title}>total:{getTotal() || 0}$</Text>
          <Text style={styles.title}>CART</Text>
        </View>
        {rendercart()}


      </ScrollView>
      <TouchableOpacity
        onPress={buy}
        style={styles.btn}
      >
        <Text>buy</Text>
      </TouchableOpacity>
      <View style={styles.pad} />
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "gray",
  },
  screen: {
    flex: 1,
    backgroundColor: "gray",
    height: "100%",
    paddingTop: 70,
  },
  btn: {
    width: 200,
    height: 50,
    backgroundColor: '#2999',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center'
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  hed: {
    borderBottomWidth: 2,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  pad: {
    height: 85
  }
})