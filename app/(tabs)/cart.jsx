import AppContext from '@/hooks/AppContext';
import { useRouter } from 'expo-router/build/hooks';
import { useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardCart from '../../components/cardcart';

const Page = () => {
  const { cart } = useContext(AppContext);
  const nav = useRouter();

  const getTotal = () => {
    // Fixed: Use reduce or addition to get the actual sum
    return cart.reduce((sum, item) => sum + (item.count || 1) * item.price, 0);
  };

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
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalValue}>${getTotal().toFixed(2)}</Text>
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
    backgroundColor: "#F5F7F9", // Lighter, modern background
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
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  btn: {
    backgroundColor: '#007AFF',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
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