import Card from '@/components/Card';
import AppContext from '@/hooks/AppContext';
import { Ionicons } from '@expo/vector-icons'; // Import Icons
import { useNavigation } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Search from '../../components/Search';
import { DeleteProduct, findAllProduct } from '../../constants/API.js';

const Page = () => {
  const { cart, user } = useContext(AppContext)
  const navigation = useNavigation()

  const [products, setProducts] = useState([])
  const [filterdata, setfilterdata] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  const searchData = (text) => {
    const filtered = products.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    )
    setfilterdata(filtered)
  }

  const getProducts = async () => {
    try {
      setLoading(true)
      const response = await findAllProduct({})
      if (response.success) {
        setProducts(response.data)
        setfilterdata(response.data)
      }
    } catch (error) {
      console.log("Error fetching products:", error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveItem = async (id) => {
    const confirmed = window.confirm("هل أنت متأكد أنك تريد مسح هذا البرودكت؟ 🗑️");

    if (confirmed) {
      try {
        const response = await DeleteProduct({ _id: id });
        if (response.success) {
          const updated = filterdata.filter(item => (item._id || item.id) !== id);
          setfilterdata(updated);
          setProducts(updated);
        } else {
          alert("خطأ: فشلت عملية الحذف من السيرفر ❌");
        }
      } catch (error) {
        console.error("Delete error:", error.message);
      }
    }
  };

  useEffect(() => {
    getProducts()
  }, [])

  const renderData = () => {
    if (filterdata.length === 0 && !loading) {
      return <Text style={styles.emptyText}>No products found.</Text>
    }

    return filterdata.map((item) => (
      <Card
        key={item._id || item.id}
        {...item}
        isEditing={isEditing}
        onDelete={() => handleRemoveItem(item._id || item.id)}
      />
    ))
  }

  return (
    <View style={{ flex: 1 }}>
      {/* --- Header Section --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('user')}>
          <Ionicons name="person-circle-outline" size={32} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Store</Text>

        <TouchableOpacity onPress={() => navigation.navigate('cart')} style={styles.cartContainer}>
          <Ionicons name="cart-outline" size={30} color="white" />
          {cart?.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.screen}>
        <Search searchData={searchData} />

        {user?.isAdmin && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setIsEditing(!isEditing)}
              style={[styles.btn, isEditing && { backgroundColor: '#ff4444' }]}
            >
              <Text style={styles.btnText}>{isEditing ? "Done" : "Edit List"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('CreateProduct')}
              style={[styles.btn, styles.createBtn]}
            >
              <Text style={styles.btnText}>+ Create Product</Text>
            </TouchableOpacity>
          </View>
        )}

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        ) : (
          renderData()
        )}
      </ScrollView>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60, // Adjust for status bar
    paddingBottom: 20,
    backgroundColor: '#333',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  screen: {
    flex: 1,
    backgroundColor: "gray",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  btn: {
    width: 160,
    height: 50,
    backgroundColor: '#2999',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  createBtn: {
    backgroundColor: '#4CAF50',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold'
  },
  loaderContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    textAlign: 'center',
    color: 'white',
    marginTop: 20
  }
})