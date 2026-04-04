import { useRouter } from "expo-router";
import { useContext, useMemo, useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import AppContext from "../hooks/AppContext";

/* Utility: strip non-digits */
const onlyDigits = (s = "") => s.replace(/\D+/g, "");

/* Luhn algorithm for basic card validation */
function luhnCheck(cardNumber) {
    const digits = onlyDigits(cardNumber).split("").reverse().map((d) => parseInt(d, 10));
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
        let digit = digits[i];
        if (i % 2 === 1) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
    }
    return digits.length > 0 && sum % 10 === 0;
}

/* Detect card brand simple (Visa, Mastercard, Amex) */
function detectBrand(number) {
    const n = onlyDigits(number);
    if (/^4/.test(n)) return "visa";
    if (/^5[1-5]/.test(n) || /^2(2[2-9]|[3-6]\d|7[01])/.test(n)) return "mastercard";
    if (/^3[47]/.test(n)) return "amex";
    return "card";
}

const Page = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [touched, setTouched] = useState({
        cardNumber: false,
        name: false,
        expiry: false,
        cvv: false,
    });
    
    const { setcart } = useContext(AppContext);
    const nav = useRouter();

    const handleCardChange = (text) => {
        const digits = onlyDigits(text).slice(0, 19);
        const groups = [];
        for (let i = 0; i < digits.length; i += 4) groups.push(digits.substr(i, 4));
        setCardNumber(groups.join(" "));
    };

    const handleExpiryChange = (text) => {
        const digits = onlyDigits(text).slice(0, 4);
        if (digits.length >= 3) {
            setExpiry(digits.slice(0, 2) + "/" + digits.slice(2));
        } else {
            setExpiry(digits);
        }
    };

    const handleCvvChange = (text) => {
        const digits = onlyDigits(text).slice(0, 4);
        setCvv(digits);
    };

    const errors = useMemo(() => {
        const e = {};
        const digits = onlyDigits(cardNumber);
        if (!digits) e.cardNumber = "Card number required";
        else if (digits.length < 13 || digits.length > 19) e.cardNumber = "Incomplete";
        else if (!luhnCheck(digits)) e.cardNumber = "Invalid card";

        if (!name.trim()) e.name = "Name required";

        if (!expiry) e.expiry = "Expiry required";
        else {
            const parts = expiry.split("/");
            if (parts.length !== 2) e.expiry = "Use MM/YY";
        }

        if (!cvv) e.cvv = "CVV required";
        else if (cvv.length < 3) e.cvv = "Short";

        return e;
    }, [cardNumber, name, expiry, cvv]);

    const isValid = Object.keys(errors).length === 0;

    const onPay = () => {
        if (!isValid) {
            setTouched({ cardNumber: true, name: true, expiry: true, cvv: true });
            return;
        }
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setcart([]);
        nav.push('/');
    };

    const brand = detectBrand(cardNumber);

    return (
        <SafeAreaView style={styles.safe}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Text style={styles.title}>Payment</Text>

                    <View style={styles.cardPreview}>
                        <View style={styles.cardRow}>
                            <Text style={styles.brandText}>{brand.toUpperCase()}</Text>
                            <Text style={styles.cardBrandSmall}>{brand.toUpperCase()}</Text>
                        </View>
                        <Text style={styles.cardNumberPreview}>
                            {cardNumber ? cardNumber : "#### #### #### ####"}
                        </Text>
                        <View style={styles.cardFooter}>
                            <Text style={styles.footerName}>{name ? name.toUpperCase() : "CARDHOLDER"}</Text>
                            <Text style={styles.footerExpiry}>{expiry ? expiry : "MM/YY"}</Text>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Card number</Text>
                        <TextInput
                            value={cardNumber}
                            onChangeText={handleCardChange}
                            onBlur={() => setTouched((t) => ({ ...t, cardNumber: true }))}
                            placeholder="1234 5678 9012 3456"
                            keyboardType="number-pad"
                            placeholderTextColor={'gray'}
                            style={[styles.input, touched.cardNumber && errors.cardNumber ? styles.inputError : null]}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Name on card</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                            placeholder="Full name"
                            autoCapitalize="words"
                            placeholderTextColor={'gray'}
                            style={[styles.input, touched.name && errors.name ? styles.inputError : null]}
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.inputGroup, styles.half]}>
                            <Text style={styles.label}>Expiry</Text>
                            <TextInput
                                value={expiry}
                                onChangeText={handleExpiryChange}
                                onBlur={() => setTouched((t) => ({ ...t, expiry: true }))}
                                placeholder="MM/YY"
                                keyboardType="number-pad"
                                maxLength={5}
                                placeholderTextColor={'gray'}
                                style={[styles.input, touched.expiry && errors.expiry ? styles.inputError : null]}
                            />
                        </View>
                        <View style={[styles.inputGroup, styles.half]}>
                            <Text style={styles.label}>CVV</Text>
                            <TextInput
                                value={cvv}
                                onChangeText={handleCvvChange}
                                onBlur={() => setTouched((t) => ({ ...t, cvv: true }))}
                                placeholder="123"
                                keyboardType="number-pad"
                                secureTextEntry
                                maxLength={4}
                                placeholderTextColor={'gray'}
                                style={[styles.input, touched.cvv && errors.cvv ? styles.inputError : null]}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.payButton, !isValid ? styles.payButtonDisabled : null]}
                        onPress={onPay}
                        disabled={!isValid}
                    >
                        <Text style={styles.payButtonText}>Pay Now</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Custom Success Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <View style={styles.iconCircle}>
                            <Text style={{ fontSize: 40 }}>✅</Text>
                        </View>
                        <Text style={styles.modalTitle}>تم الشراء بنجاح</Text>
                        <Text style={styles.modalSubText}>شكراً لتسوقك معنا، تم تأكيد طلبك.</Text>
                        
                        <TouchableOpacity 
                            style={styles.closeButton} 
                            onPress={handleCloseModal}
                        >
                            <Text style={styles.closeButtonText}>العودة للرئيسية</Text>
                        </TouchableOpacity>
                    </div>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const colors = {
    background: "gray",
    accent: "#06b6d4",
    danger: "#ff6b6b",
    text: "#e6eef8",
    muted: "#94a3b8",
};

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: 'gray' },
    container: { padding: 20, paddingTop: 30 },
    title: { fontSize: 28, color: colors.text, fontWeight: "700", marginBottom: 18 },
    cardPreview: { backgroundColor: "#333", borderRadius: 14, padding: 18, marginBottom: 22 },
    cardRow: { flexDirection: "row", justifyContent: "space-between" },
    brandText: { color: colors.text, fontWeight: "700" },
    cardBrandSmall: { color: colors.muted, fontSize: 12 },
    cardNumberPreview: { color: colors.text, fontSize: 20, letterSpacing: 2, marginVertical: 18 },
    cardFooter: { flexDirection: "row", justifyContent: "space-between" },
    footerName: { color: colors.muted, fontSize: 12 },
    footerExpiry: { color: colors.muted, fontSize: 12 },
    inputGroup: { marginBottom: 14 },
    label: { color: colors.muted, fontSize: 13, marginBottom: 6 },
    input: { backgroundColor: '#fff', color: '#000', padding: 14, borderRadius: 8, fontSize: 16 },
    inputError: { borderWidth: 1, borderColor: colors.danger },
    row: { flexDirection: "row", justifyContent: "space-between" },
    half: { width: "48%" },
    payButton: { backgroundColor: colors.accent, padding: 16, borderRadius: 10, alignItems: "center", marginTop: 20 },
    payButtonDisabled: { backgroundColor: "#444" },
    payButtonText: { color: "#fff", fontWeight: "700", fontSize: 18 },
    
    /* Modal Styles */
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        elevation: 10,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f0fdf4',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalSubText: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: 25,
    },
    closeButton: {
        backgroundColor: colors.accent,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    }
});

export default Page;