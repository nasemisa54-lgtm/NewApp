import Card from '@/components/Card'
import AppContext from '@/hooks/AppContext'
import { useNavigation } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Search from '../../components/Search'
import { DeleteProduct, findAllProduct } from '../../constants/API.js'

const Page = () => {
  const { cart, user } = useContext(AppContext)
  const navigation = useNavigation()

  const [products, setProducts] = useState([])
  const [filterdata, setfilterdata] = useState([])
  const [loading, setLoading] = useState(true)

  // حالة التعديل (Edit Mode)
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

  // حذف المنتج من الواجهة (UI)
  const handleRemoveItem = async (id) => {
    // استخدام confirm الخاصة بالمتصفح
    const confirmed = window.confirm("هل أنت متأكد أنك تريد مسح هذا البرودكت؟ 🗑️");

    if (confirmed) {
      try {
        // استدعاء الـ API الخاص بك
        const response = await DeleteProduct({ _id: id });

        if (response.success) {
          // تحديث الواجهة بعد النجاح
          const updated = filterdata.filter(item => (item._id || item.id) !== id);
          setfilterdata(updated);
          setProducts(updated);
          console.log("Deleted successfully 😎");
        } else {
          alert("خطأ: فشلت عملية الحذف من السيرفر ❌");
        }
      } catch (error) {
        console.error("Delete error:", error.message);
        alert("حدث خطأ أثناء محاولة الحذف");
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
        {...item} // نمرر كل بيانات المنتج
        isEditing={isEditing}
        onDelete={() => handleRemoveItem(item._id || item.id)}
      />
    ))
  }

  console.log("👤",user);
  

  return (
    <ScrollView style={styles.screen}>
      <Search searchData={searchData} />

      {
        user?.isAdmin &&
        <View style={styles.buttonContainer}>
          {/* زر التعديل / الإيقاف */}
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
      }

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        renderData()
      )}
    </ScrollView>
  )
}

export default Page

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "gray",
    paddingTop: 70,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
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