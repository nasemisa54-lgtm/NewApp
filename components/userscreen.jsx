import { AntDesign } from '@expo/vector-icons';
import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppContext from '../hooks/AppContext';

const Page = (user) => {
    const { setuser } = useContext(AppContext)
    // Extracting data from the user object provided
    const userData = user.user;
    const logout = () => {
        setuser(null)
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>
                        {userData.name[0].toUpperCase()}{userData.lastname[0].toUpperCase()}
                    </Text>
                </View>
                <Text style={styles.userName}>{userData.name} {userData.lastname}</Text>
                <Text style={styles.userEmail}>{userData.email}</Text>
            </View>

            <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Age</Text>
                    <TextInput
                        style={styles.value}
                        value={userData.age}
                    />
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>User ID</Text>
                    <Text style={styles.value} numberOfLines={1}>{userData._id}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>password</Text>
                    {/* <Text style={styles.value}>{userData.password}</Text> */}
                    <Text style={styles.value}>
                        {userData.password.replace(/./g, '*')}
                    </Text>
                </View>
            </View>
            {/* <MiniGame /> */}
            <TouchableOpacity onPress={logout} style={styles.logout}>
                <Text style={styles.logoutText}>logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.edit}>
                <Text style={styles.edittext}>edit</Text>
                <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: '#f9f9f9ff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#060606ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatarText: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1a1a1a',
        textTransform: 'capitalize',
    },
    userEmail: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    infoSection: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    label: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    value: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
    logout: {
        borderRadius: 25,
        borderWidth: 2,
        alignSelf: 'center',
        padding: 10,
        marginTop: 100,
    },
    logoutText: {
        fontSize: 20,
        color: '#333',
        fontWeight: 'bold',
        textAlign: "center",

    },
    edit: {
        borderRadius: 25,
        borderWidth: 2,
        alignSelf: 'center',
        padding: 10,
        marginTop: 10,
        flexDirection: "row"
    },
    edittext: {
        fontSize: 20
    }
});