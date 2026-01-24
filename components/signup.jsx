import { StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-web'

fetch

const Signup = ({
  name,
  setname,
  age,
  setage,
  lastname,
  setlastname,
  numberphone,
  setnumberphone }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="first name"
        value={name}
        onChangeText={text => setname(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="last name"
        value={lastname}
        onChangeText={text => setlastname(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="age"
        value={age}
        onChangeText={text => setage(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="numberphone"
        value={numberphone}
        onChangeText={text => setnumberphone(text)}
      />
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    textAlign: 'right', // ليدعم اللغة العربية
  },
})