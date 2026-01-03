import { StyleSheet, TextInput, View } from 'react-native'

const Login = ({email,setEmail,password,setPassword}) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="البريد الإلكتروني"
                value={email}
                onChangeText={text => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="كلمة المرور"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry // لإخفاء الحروف وتحويلها لنقاط
            />
        </View>
    )
}

export default Login

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