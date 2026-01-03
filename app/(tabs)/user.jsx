import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Login from '../../components/login';

const User = () => {
    /*
     name,
        lastname,
        age,
        numberphone,
        password,
        image,
     */
    const [form, setForm] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setname] = useState('');
    const [lastname, setlastname] = useState('');
    const [image, setimage] = useState('');
    const [age, setage] = useState('');
    const [ numberphone, setnumberphone] = useState('');

    const handleLogin = () => {
        alert(`محاولة تسجيل دخول بـ: ${email}`);

    };
    const switchLogin =() => {
        if(form=='login'){
            setForm("signup")
        }else{setForm("login")}
    }

    return (
        // KeyboardAvoidingView يرفع الواجهة للأعلى عند ظهور لوحة المفاتيح
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.header}>nseem tech 📱💻</Text>

                <Login
                email={email}
                setEmail={setEmail}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>تسجيل الدخول</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.link}>
                    <Text style={styles.linkText}>ليس لديك حساب؟ إنشاء حساب جديد</Text>
                </TouchableOpacity>
            </View>
            
        </KeyboardAvoidingView>
    );
}
export default User

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f4f4ff',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
        color: '#333',
    },
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
    button: {
        backgroundColor: '#050505ff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 20,
        alignItems: 'center',
    },
    linkText: {
        color: '#007AFF',
        fontSize: 14,
    },
});