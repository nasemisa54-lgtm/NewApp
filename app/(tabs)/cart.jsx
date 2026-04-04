import AppContext from '@/hooks/AppContext';
import { useRouter } from 'expo-router/build/hooks';
import { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CardCart from '../../components/cardcart';

const Page = () => {
  const { cart } = useContext(AppContext);
  const nav = useRouter();

  // حالات الكوبون والخصم
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.count || 1) * item.price, 0);
  };

  const applyCoupon = () => {
    // const copon =couponCode.trim().length > 0
    if (couponCode == 'nseem tech') {
      // تطبيق خصم وهمي بنسبة 10%
      const total = getTotal();
      const discountAmount = total * 0.2;
      setDiscount(discountAmount);
      alert("Success", "Coupon applied! You got 20% off.");
    } else {
      alert("Error", "Please enter a valid coupon code.");
    }
  };

  const finalTotal = getTotal() - discount;

  const buy = () => {
    nav.push({ pathname: "/pay" });
  };

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cart.length} Items</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} style={styles.screen}>
        {cart.length > 0 ? (
          cart.map((item, index) => <CardCart key={index} {...item} />)
        ) : (
          <Text style={styles.emptyText}>Your cart is empty</Text>
        )}

        {/* قسم الكوبون */}
        <View style={styles.couponContainer}>
          <TextInput
            style={styles.couponInput}
            placeholder="Enter Coupon Code"
            value={couponCode}
            onChangeText={setCouponCode}
          />
          <TouchableOpacity style={styles.couponBtn} onPress={applyCoupon}>
            <Text style={styles.couponBtnText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.subTotalValue}>${getTotal().toFixed(2)}</Text>
        </View>

        {discount > 0 && (
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: '#4CAF50' }]}>Discount (20%):</Text>
            <Text style={[styles.subTotalValue, { color: '#4CAF50' }]}>-${discount.toFixed(2)}</Text>
          </View>
        )}

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalValue}>${finalTotal.toFixed(2)}</Text>
        </View>

        <TouchableOpacity onPress={buy} style={styles.btn} activeOpacity={0.8}>
          <Text style={styles.btnText}>Checkout Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#F5F7F9",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  badge: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  screen: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  couponContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 10,
  },
  couponInput: {
    flex: 1,
    backgroundColor: 'white',
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  couponBtn: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 12,
  },
  couponBtnText: {
    color: 'white',
    fontWeight: '600',
  },
  footer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  subTotalValue: {
    fontSize: 16,
    color: '#666',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginTop: 5,
  },
  btn: {
    backgroundColor: '#007AFF',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
    fontSize: 16,
  }
});

export default Page;