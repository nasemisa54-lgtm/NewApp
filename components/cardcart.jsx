import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppContext from '../hooks/AppContext';

const Page = (params) => {
  const { cart, setcart } = useContext(AppContext);
  const found = cart.find((item) => item.name === params.name);

  const updateCart = (newCount) => {
    const updatedCart = cart.map(item => 
      item.name === params.name ? { ...item, count: newCount } : item
    );
    setcart(updatedCart);
  };

  const plus = () => {
    updateCart((found?.count || 1) + 1);
  };

  const minus = () => {
    if (found?.count > 1) {
      updateCart(found.count - 1);
    }
  };

  const deleteItem = () => {
    setcart(cart.filter((item) => item.name !== params.name));
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: params.image }} style={styles.image} />
      
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>{params.name}</Text>
        <Text style={styles.price}>₪{params.price}</Text>
        
        <View style={styles.controls}>
          <TouchableOpacity onPress={minus} style={styles.stepBtn}>
            <MaterialCommunityIcons name="minus" size={18} color="#555" />
          </TouchableOpacity>
          
          <Text style={styles.countText}>{found?.count || 1}</Text>
          
          <TouchableOpacity onPress={plus} style={styles.stepBtn}>
            <MaterialCommunityIcons name="plus" size={18} color="#555" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={deleteItem} style={styles.deleteBtn}>
        <MaterialCommunityIcons name="close-circle-outline" size={24} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "92%",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: "4%",
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    // Shadow for iOS/Android
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  details: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    alignSelf: 'flex-start',
    borderRadius: 8,
    padding: 2,
  },
  stepBtn: {
    padding: 6,
  },
  countText: {
    fontSize: 15,
    fontWeight: '600',
    paddingHorizontal: 12,
  },
  deleteBtn: {
    padding: 5,
  }
});

export default Page;