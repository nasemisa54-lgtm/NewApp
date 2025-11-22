import Card from '@/components/Card'
import AppContext from '@/hooks/AppContext'
import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, } from 'react-native'
import Search from '../../components/Search'
import data from '../../constants/data'

const index = () => {
  const { cart } = useContext(AppContext)
  const [filterdata, setfilterdata] = useState(data)

  const searchData = (text) => {
    console.log(text)
    const filteredata = data.filter(item => item.name.toLowerCase()
      .includes(text.toLowerCase()));
    setfilterdata(filteredata);
  }

  const renderData = () => {
    return filterdata.map((item, index) => (
      <Card
        key={index}
        id={item.id}
        name={item.name}
        price={item.price}
        type={item.type}
        image={item.image}
        guntity={item.guntity}
      />
    ))
  }

  return (
    <ScrollView style={styles.screen} >
      <Search searchData={searchData}
      />
     

      <TouchableOpacity
        onPress={() => {
          console.log("fight")


        }}

        style={styles.btn}
      >
        <Text>السلام عليكم</Text>
      </TouchableOpacity>

      {renderData()}
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "gray",
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
  }

})