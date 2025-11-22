import { useRouter } from "expo-router";
import { useContext, useMemo, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
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

const Pay = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [touched, setTouched] = useState({
        cardNumber: false,
        name: false,
        expiry: false,
        cvv: false,
    });
    const { setcart } = useContext(AppContext)
    const nav = useRouter()

    /* Format card number input into groups */
    const handleCardChange = (text) => {
        const digits = onlyDigits(text).slice(0, 16 + 3); // allow up to 19 digits if required
        // group in 4s: works for 16-digit cards; AMEX differs but this is generic
        const groups = [];
        for (let i = 0; i < digits.length; i += 4) groups.push(digits.substr(i, 4));
        setCardNumber(groups.join(" "));
    };

    /* Format expiry as MM/YY */
    const handleExpiryChange = (text) => {
        const digits = onlyDigits(text).slice(0, 4);
        if (digits.length >= 3) {
            setExpiry(digits.slice(0, 2) + "/" + digits.slice(2));
        } else if (digits.length >= 1 && digits.length <= 2) {
            setExpiry(digits);
        } else {
            setExpiry("");
        }
    };

    const handleCvvChange = (text) => {
        const digits = onlyDigits(text).slice(0, 4); // allow up to 4 for Amex
        setCvv(digits);
    };

    /* Validation rules */
    const errors = useMemo(() => {
        const e = {};
        // Card number: digits only length 13-19 and luhn
        const digits = onlyDigits(cardNumber);
        if (!digits) e.cardNumber = "Card number required";
        else if (digits.length < 13 || digits.length > 19) e.cardNumber = "Card number looks incomplete";
        else if (!luhnCheck(digits)) e.cardNumber = "Invalid card number";

        if (!name.trim()) e.name = "Name on card required";

        // expiry MM/YY valid and in future
        if (!expiry) e.expiry = "Expiry required";
        else {
            const parts = expiry.split("/");
            if (parts.length !== 2 || parts[0].length !== 2 || parts[1].length !== 2) {
                e.expiry = "Expiry must be MM/YY";
            } else {
                const mm = parseInt(parts[0], 10);
                let yy = parseInt(parts[1], 10);
                if (Number.isNaN(mm) || mm < 1 || mm > 12) e.expiry = "Invalid month";
                else {
                    // build expiry date as end of month
                    const now = new Date();
                    // convert two-digit year -> assume 2000-2099
                    yy += 2000;
                    const expDate = new Date(yy, mm - 1 + 1, 1); // first of next month
                    if (expDate <= new Date(now.getFullYear(), now.getMonth(), 1)) {
                        e.expiry = "Card expired";
                    }
                }
            }
        }

        // CVV: 3 or 4 digits
        if (!cvv) e.cvv = "CVV required";
        else if (cvv.length < 3 || cvv.length > 4) e.cvv = "CVV must be 3 or 4 digits";

        return e;
    }, [cardNumber, name, expiry, cvv]);

    const isValid = Object.keys(errors).length === 0;

    const onPay = () => {
        if (!isValid) {
            setTouched({ cardNumber: true, name: true, expiry: true, cvv: true });
            return;
        }
        // For demo: show an alert with masked card info (never do this in prod)
        const masked = "**** **** **** " + onlyDigits(cardNumber).slice(-4);
        Alert.alert("Payment info", `Paying with ${masked}\nName: ${name}\nExpiry: ${expiry}`);
        setcart([])
        nav.push('/')
    };

    const brand = detectBrand(cardNumber);

    return (
        <SafeAreaView style={styles.safe}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={Platform.select({ ios: 60, android: 0 })}
            >
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Text style={styles.title}>Payment</Text>

                    <View style={styles.cardPreview}>
                        <View style={styles.cardRow}>
                            <Text style={styles.brandText}>{brand.toUpperCase()}</Text>
                            <Text style={styles.cardBrandSmall}>{brand === "visa" ? "VISA" : brand === "mastercard" ? "Mastercard" : brand === "amex" ? "AMEX" : ""}</Text>
                        </View>
                        <Text style={styles.cardNumberPreview}>
                            {cardNumber ? cardNumber : "#### #### #### ####"}
                        </Text>
                        <View style={styles.cardFooter}>
                            <Text style={styles.footerName}>{name ? name.toUpperCase() : "CARDHOLDER NAME"}</Text>
                            <Text style={styles.footerExpiry}>{expiry ? expiry : "MM/YY"}</Text>
                        </View>
                    </View>

                    {/* Card Number */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Card number</Text>
                        <TextInput
                            value={cardNumber}
                            onChangeText={handleCardChange}
                            onBlur={() => setTouched((t) => ({ ...t, cardNumber: true }))}
                            placeholder="1234 5678 9012 3456"
                            keyboardType="number-pad"
                            returnKeyType="next"
                            placeholderTextColor={'gray'}
                            maxLength={19 + 3} // spaces
                            style={[styles.input, touched.cardNumber && errors.cardNumber ? styles.inputError : null]}
                            accessible
                            accessibilityLabel="Card number"
                        />
                        {touched.cardNumber && errors.cardNumber ? <Text style={styles.errorText}>{errors.cardNumber}</Text> : null}
                    </View>

                    {/* Name */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Name on card</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                            placeholder="Full name"
                            autoCapitalize="words"
                            returnKeyType="next"
                            style={[styles.input, touched.name && errors.name ? styles.inputError : null]}
                            accessible
                            accessibilityLabel="Name on card"
                            placeholderTextColor={'gray'}
                        />
                        {touched.name && errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
                    </View>

                    <View style={styles.row}>
                        {/* Expiry */}
                        <View style={[styles.inputGroup, styles.half]}>
                            <Text style={styles.label}>Expiry</Text>
                            <TextInput
                                value={expiry}
                                onChangeText={handleExpiryChange}
                                onBlur={() => setTouched((t) => ({ ...t, expiry: true }))}
                                placeholder="MM/YY"
                                keyboardType="number-pad"
                                placeholderTextColor={'gray'}
                                maxLength={5}
                                style={[styles.input, touched.expiry && errors.expiry ? styles.inputError : null]}
                                accessible
                                accessibilityLabel="Expiry date"
                            />
                            {touched.expiry && errors.expiry ? <Text style={styles.errorText}>{errors.expiry}</Text> : null}
                        </View>

                        {/* CVV */}
                        <View style={[styles.inputGroup, styles.half]}>
                            <Text style={styles.label}>CVV</Text>
                            <TextInput
                                value={cvv}
                                onChangeText={handleCvvChange}
                                onBlur={() => setTouched((t) => ({ ...t, cvv: true }))}
                                placeholder="123"
                                placeholderTextColor={'gray'}
                                keyboardType="number-pad"
                                secureTextEntry
                                maxLength={4}
                                style={[styles.input, touched.cvv && errors.cvv ? styles.inputError : null]}
                                accessible
                                accessibilityLabel="Card CVV"
                            />
                            {touched.cvv && errors.cvv ? <Text style={styles.errorText}>{errors.cvv}</Text> : null}
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.payButton, !isValid ? styles.payButtonDisabled : null]}
                        onPress={onPay}
                        activeOpacity={0.9}
                        accessibilityRole="button"
                        accessibilityState={{ disabled: !isValid }}
                        disabled={!isValid}
                    >
                        <Text style={styles.payButtonText}>Pay</Text>
                    </TouchableOpacity>

                    <Text style={styles.hint}>Tip: This demo performs client-side validation only — do not use for real payments.</Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const colors = {
    background: "gray",
    cardBg: "#0b1321",
    accent: "#06b6d4",
    accentDark: "#0891b2",
    inputBg: "#0b1220",
    danger: "#ff6b6b",
    text: "#e6eef8",
    muted: "#94a3b8",
};

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: 'gray' },
    container: {
        padding: 20,
        paddingTop: 30,
    },
    title: {
        fontSize: 28,
        color: colors.text,
        fontWeight: "700",
        marginBottom: 18,
    },
    cardPreview: {
        backgroundColor: "#424242ff",
        borderRadius: 14,
        padding: 18,
        marginBottom: 22,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },
    cardRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    brandText: { color: colors.text, fontSize: 14, fontWeight: "700" },
    cardBrandSmall: { color: colors.muted, fontSize: 12 },

    cardNumberPreview: {
        color: colors.text,
        fontSize: 20,
        letterSpacing: 2,
        marginTop: 18,
        marginBottom: 12,
    },
    cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    footerName: { color: colors.muted, fontSize: 12, flex: 1 },
    footerExpiry: { color: colors.muted, fontSize: 12 },

    inputGroup: { marginBottom: 14 },
    label: { color: colors.muted, fontSize: 13, marginBottom: 6 },
    input: {
        backgroundColor: '#fff',
        color: '#000',
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === "ios" ? 14 : 10,
        borderRadius: 8,
        fontSize: 16,
    },
    inputError: { borderWidth: 1, borderColor: colors.danger },
    errorText: { color: colors.danger, marginTop: 6, fontSize: 12 },

    row: { flexDirection: "row", justifyContent: "space-between" },
    half: { width: "48%" },

    payButton: {
        backgroundColor: colors.accent,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 14,
    },
    payButtonDisabled: { backgroundColor: "#274153" },
    payButtonText: { color: "#012027", fontWeight: "700", fontSize: 16 },

    hint: { color: colors.muted, fontSize: 12, marginTop: 12, textAlign: "center" },
});

export default Pay