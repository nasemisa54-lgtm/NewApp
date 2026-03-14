import { useNavigation } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Card = (props: any) => {
  const nav = useNavigation();

  const goto = () => {
    // نمنع الانتقال لصفحة المنتج إذا كنا في وضع التعديل
    if (!props.isEditing) {
      nav.navigate("product", { ...props });
    }
  };

  return (
    <TouchableOpacity
      style={[styles.Card, props.isEditing && styles.editingCard]}
      onPress={goto}
      activeOpacity={props.isEditing ? 1 : 0.7}
    >
      {/* أيقونة الحذف تظهر فقط عند التعديل */}
      {props.isEditing && (
        <TouchableOpacity style={styles.deleteBadge} onPress={props.onDelete}>
          <Text style={styles.deleteText}>✕</Text>
        </TouchableOpacity>
      )}

      <View style={styles.texts}>
        <Text style={styles.text}>{props.name}</Text>
        <Text>{props.price}₪</Text>
      </View>

      <View style={styles.image}>
        <Image source={{ uri: props.image }} style={styles.img} />
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  Card: {
    height: 120,
    width: "95%",
    backgroundColor: '#e6e1f3ff',
    alignSelf: "center",
    flexDirection: 'row',
    padding: 7,
    borderRadius: 10,
    margin: 15,
    position: 'relative', // مهم لتحديد موقع زر الحذف
  },
  editingCard: {
    borderWidth: 1,
    borderColor: '#ff4444',
    opacity: 0.9,
  },
  text: {
    fontSize: 25
  },
  texts: {
    flex: 2,
  },
  image: {
    borderWidth: 2,
    flex: 1,
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  deleteBadge: {
    position: 'absolute',
    top: -10,
    left: -10,
    backgroundColor: '#ff4444',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 5, // للاندرويد
    shadowColor: '#000', // للايفون
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});