import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet, TextInput, View } from 'react-native'

const Search = (props) => {
  return (
    <View style={styles.Search}>
      <TextInput
      onChangeText={text => props.searchData(text)}
      placeholder='Search'
      style={styles.TextInput}
        />
    <MaterialIcons name="location-searching" size={50} color="black" />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    Search:{
   flexDirection:'row',
   justifyContent:'space-between',
   alignItems:'center',
   padding:10,
   borderRadius:20,
   borderWidth:2,
   width:'90%',
   margin:'5%'
    },
    TextInput:{
        flex:1,
        height:'100%'
    }
})