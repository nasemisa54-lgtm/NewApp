import { useContext, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Login from '../../components/login';
import Signup from '../../components/signup';
import Userscreen from '../../components/userscreen';
import { login_api, signup_Api } from '../../constants/API';
import AppContext from '../../hooks/AppContext';

const User = () => {
    const { setuser, user } = useContext(AppContext)
    const [form, setForm] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setname] = useState('');
    const [lastname, setlastname] = useState('');
    const [age, setage] = useState('');
    const [numberphone, setnumberphone] = useState('');

    const switchLogin = () => {
        console.log(form);
        if (form === 'login') {
            setForm("signup")
        } else {
            setForm("login")
        }
    }
    const handlepress = () => {
        const body = {
            name,
            lastname,
            password,
            email,
            age,
            numberphone,

        }
        if (form == "login") {
            loginApi(body)
        } else {
            signupApi(body)
        }
    }
    const loginApi = async (body) => {
        const response = await login_api(body);
        console.log(response);
        if (response?.success) {
            alert(response.message)
            setuser({ ...response.user })
        } else {
            alert(JSON.stringify(response))
        }
    }
    const signupApi = async (body) => {
        const response = await signup_Api(body);
        console.log(response);
        if (response?.success) {
            alert(response.message)
            setuser({ ...response.user })
        } else {
            alert(JSON.stringify(response))
        }
    }


    return (
        // KeyboardAvoidingView يرفع الواجهة للأعلى عند ظهور لوحة المفاتيح
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            {user && user?.name ?
                <Userscreen user={user} /> :
                (
                    <View style={styles.innerContainer}>
                        <Text style={styles.header}>nseem tech 📱💻</Text>


                        <>
                            <Login
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                            />

                            {form == "signup" &&
                                <Signup
                                    name={name}
                                    setname={setname}
                                    age={age}
                                    setage={setage}
                                    lastname={lastname}
                                    setlastname={setlastname}
                                    numberphone={numberphone}
                                    setnumberphone={setnumberphone}
                                />}
                        </>

                        <TouchableOpacity style={styles.button} onPress={handlepress}>
                            <Text style={styles.buttonText}>
                                {
                                    form == "login" ?
                                        " تسجيل الدخول" :
                                        "انشاء حساب"
                                }
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={switchLogin} style={styles.link}>
                            <Text style={styles.linkText}>
                                {
                                    form === "login" ?
                                        "  ليس لديك حساب؟ إنشاء حساب جديد" :
                                        "لدي حساب"
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }
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