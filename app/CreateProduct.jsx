import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
// افترضت وجود دالة createProduct في ملف API الخاص بك
import { createproduct } from '../constants/API.js';

const Page = () => {
    const navigation = useNavigation();

    // حالات الإدخال بناءً على الـ Schema
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        // التحقق من الحقول المطلوبة (required: true في المخطط)
        if (!name || !price) {
            Alert.alert("خطأ", "يرجى ملء اسم المنتج والسعر على الأقل");
            return;
        }

        try {
            setLoading(true);

            const productData = {
                name,
                price: Number(price), // تحويل السعر لرقم
                image,
                category
            };

            const response = await createproduct(productData) || "";

            if (response.success) {
                Alert.alert("تم بنجاح", "تم إضافة المنتج بنجاح");
                navigation.goBack(); // العودة للصفحة السابقة بعد النجاح
            } else {
                Alert.alert("فشل", response.message || "حدث خطأ أثناء الإضافة");
            }
        } catch (error) {
            console.log("Error:", error.message);
            Alert.alert("خطأ", "تعذر الاتصال بالخادم");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>إضافة منتج جديد</Text>

            <View style={styles.form}>
                <Text style={styles.label}>اسم المنتج *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="أدخل اسم المنتج"
                    placeholderTextColor="#ccc"
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>السعر *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="أدخل السعر (مثلاً: 100)"
                    placeholderTextColor="#ccc"
                    keyboardType="numeric"
                    value={price}
                    onChangeText={setPrice}
                />

                <Text style={styles.label}>رابط الصورة</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ضع رابط الصورة هنا (URL)"
                    placeholderTextColor="#ccc"
                    value={image}
                    onChangeText={setImage}
                />

                <Text style={styles.label}>الفئة (Category)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="مثلاً: إلكترونيات، ملابس..."
                    placeholderTextColor="#ccc"
                    value={category}
                    onChangeText={setCategory}
                />

                <TouchableOpacity
                    style={[styles.button, loading && { opacity: 0.7 }]}
                    onPress={handleCreate}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.buttonText}>حفظ المنتج</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.cancelText}>إلغاء</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333', // متناسق مع الخلفية الرمادية التي تستخدمها
        padding: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 30,
    },
    form: {
        backgroundColor: '#444',
        padding: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        color: '#ddd',
        marginBottom: 8,
        fontSize: 16,
    },
    input: {
        backgroundColor: '#555',
        color: 'white',
        borderRadius: 8,
        padding: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#666',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    cancelButton: {
        marginTop: 15,
        alignItems: 'center',
    },
    cancelText: {
        color: '#bbb',
        fontSize: 16,
    },
});