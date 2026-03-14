import { AntDesign } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppContext from '../hooks/AppContext';

const Page = (user) => {
    const { setuser } = useContext(AppContext);
    const userData = user.user;
    
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        name: userData.name,
        lastname: userData.lastname,
        email: userData.email,
        age: userData.age,
        password: userData.password,
    });

    const logout = () => {
        setuser(null);
    };

    const handleEdit = () => {
        if (isEditing) {
            // Save changes
            const updatedUser = {
                ...userData,
                ...editedData,
            };
            setuser(updatedUser);
            Alert.alert('Success', 'Profile updated successfully!');
        }
        setIsEditing(!isEditing);
    };

    const handleCancel = () => {
        // Reset to original values
        setEditedData({
            name: userData.name,
            lastname: userData.lastname,
            email: userData.email,
            age: userData.age,
            password: userData.password,
        });
        setIsEditing(false);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>
                        {/* {editedData.name[0].toUpperCase()}{editedData.lastname[0].toUpperCase()} */}
                    </Text>
                </View>
                <Text style={styles.userName}>{editedData.name} {editedData.lastname}</Text>
                <Text style={styles.userEmail}>{editedData.email}</Text>
            </View>

            <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={[styles.value, isEditing && styles.editableInput]}
                        value={editedData.name}
                        onChangeText={(text) => setEditedData({ ...editedData, name: text })}
                        editable={isEditing}
                    />
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={[styles.value, isEditing && styles.editableInput]}
                        value={editedData.lastname}
                        onChangeText={(text) => setEditedData({ ...editedData, lastname: text })}
                        editable={isEditing}
                    />
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={[styles.value, isEditing && styles.editableInput]}
                        value={editedData.email}
                        onChangeText={(text) => setEditedData({ ...editedData, email: text })}
                        editable={isEditing}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Age</Text>
                    <TextInput
                        style={[styles.value, isEditing && styles.editableInput]}
                        value={editedData.age}
                        onChangeText={(text) => setEditedData({ ...editedData, age: text })}
                        editable={isEditing}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>User ID</Text>
                    <TextInput
                        style={styles.value}
                        value={userData._id}
                        editable={false}
                    />
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={[styles.value, isEditing && styles.editableInput]}
                        value={editedData.password}
                        onChangeText={(text) => setEditedData({ ...editedData, password: text })}
                        editable={isEditing}
                        secureTextEntry={!isEditing}
                    />
                </View>
            </View>

            {isEditing && (
                <TouchableOpacity onPress={handleCancel} style={styles.cancel}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity onPress={handleEdit} style={styles.edit}>
                <Text style={styles.edittext}>{isEditing ? 'Save' : 'Edit'}</Text>
                <AntDesign name={isEditing ? "check" : "edit"} size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={logout} style={styles.logout}>
                <Text style={styles.logoutText}>Logout</Text>
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
        alignItems: 'center',
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
        flex: 1,
        textAlign: 'right',
        marginLeft: 10,
    },
    editableInput: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    logout: {
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#ff4444',
        alignSelf: 'center',
        padding: 10,
        marginTop: 20,
        marginBottom: 40,
    },
    logoutText: {
        fontSize: 20,
        color: '#ff4444',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    edit: {
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#060606ff',
        backgroundColor: '#fff',
        alignSelf: 'center',
        padding: 10,
        marginTop: 30,
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    edittext: {
        fontSize: 20,
        fontWeight: '600',
    },
    cancel: {
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#999',
        alignSelf: 'center',
        padding: 10,
        marginTop: 30,
    },
    cancelText: {
        fontSize: 20,
        color: '#666',
        fontWeight: '600',
        textAlign: 'center',
    },
});