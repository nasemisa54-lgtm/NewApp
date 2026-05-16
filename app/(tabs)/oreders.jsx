import { useContext, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { deleteOrder, getOrders, updateOrder } from '../../constants/API';
import AppContext from '../../hooks/AppContext';

const Orders = () => {
    const { user } = useContext(AppContext);
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    const statuses = ['all', 'pending', 'shipped', 'delivered'];

    useEffect(() => {
        fetchOrderData();
    }, [user]);

    const fetchOrderData = async () => {
        try {
            setLoading(true);
            // Admins fetch all orders ({}), normal users only fetch their own orders
            const query = user?.isAdmin ? {} : { user: user?._id };
            const response = await getOrders(query);
            setOrders(response || []);
            setFilteredOrders(response || []);
            setActiveFilter('all'); // Reset filter view on fresh reload
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = (status) => {
        setActiveFilter(status);
        if (status === 'all') {
            setFilteredOrders(orders);
        } else {
            const filtered = orders.filter(order => order.status === status);
            setFilteredOrders(filtered);
        }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await updateOrder({ id: orderId, status: newStatus });
            fetchOrderData();
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (confirm("Are you sure you want to delete this order?")) {
            try {
                await deleteOrder({ id: orderId });
                fetchOrderData();
            } catch (error) {
                console.error("Error deleting order:", error);
            }
        }
    };

    const renderOrderItem = ({ item }) => (
        <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Order #{item._id.slice(-6).toUpperCase()}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.user?.name || "Unknown User"}</Text>
                <Text style={styles.userEmail}>{item.user?.email || "No Email"}</Text>
            </View>

            {item.products.map((prod, index) => (
                <View key={index} style={styles.productRow}>
                    <Image source={{ uri: prod._id?.image }} style={styles.productImage} />
                    <View style={styles.productDetails}>
                        <Text style={styles.productName}>{prod._id?.name}</Text>
                        <Text style={styles.productQty}>Qty: {prod.amount} x ${prod._id?.price}</Text>
                    </View>
                </View>
            ))}

            <View style={styles.footer}>
                <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
                <Text style={styles.totalAmount}>Total: ${item.totalAmount}</Text>
            </View>

            {user?.isAdmin && (
                <View style={styles.adminPanel}>
                    <Text style={styles.adminTitle}>Admin Actions:</Text>
                    <View style={styles.adminActionRow}>
                        <View style={styles.statusUpdateGroup}>
                            {['pending', 'shipped', 'delivered'].map((status) => (
                                <TouchableOpacity
                                    key={status}
                                    style={[
                                        styles.actionBtn,
                                        item.status === status && styles.disabledActionBtn
                                    ]}
                                    disabled={item.status === status}
                                    onPress={() => handleUpdateStatus(item._id, status)}
                                >
                                    <Text style={styles.actionBtnText}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={styles.deleteBtn}
                            onPress={() => handleDeleteOrder(item._id)}
                        >
                            <Text style={styles.deleteBtnText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return '#f39c12';
            case 'shipped': return '#3498db';
            case 'delivered': return '#2ecc71';
            default: return '#95a5a6';
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header Container with Title & Reload Button */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Order Management</Text>
                <TouchableOpacity style={styles.reloadBtn} onPress={fetchOrderData}>
                    <Text style={styles.reloadBtnText}>Reload</Text>
                </TouchableOpacity>
            </View>

            {/* Filter Bar */}
            <View style={styles.filterBar}>
                {statuses.map((status) => (
                    <TouchableOpacity
                        key={status}
                        onPress={() => handleFilter(status)}
                        style={[
                            styles.filterBtn,
                            activeFilter === status && styles.activeFilterBtn
                        ]}
                    >
                        <Text style={[
                            styles.filterBtnText,
                            activeFilter === status && styles.activeFilterText
                        ]}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredOrders}
                keyExtractor={(item) => item._id}
                renderItem={renderOrderItem}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={<Text style={styles.emptyText}>No orders found.</Text>}
            />
        </View>
    );
};

export default Orders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingTop: 50,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    reloadBtn: {
        backgroundColor: '#6c757d',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 6,
    },
    reloadBtnText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    filterBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    filterBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
    },
    activeFilterBtn: {
        backgroundColor: '#007bff',
    },
    filterBtnText: {
        fontSize: 12,
        color: '#444',
    },
    activeFilterText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    listContainer: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderId: {
        fontWeight: 'bold',
        color: '#333',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 10,
    },
    userInfo: {
        marginBottom: 10,
    },
    userName: {
        fontSize: 14,
        fontWeight: '600',
    },
    userEmail: {
        fontSize: 12,
        color: '#777',
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 12,
        backgroundColor: '#eaeaea'
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 14,
        fontWeight: '500',
    },
    productQty: {
        fontSize: 12,
        color: '#666',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        paddingBottom: 10,
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#999',
    },
    adminPanel: {
        marginTop: 15,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    adminTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#7f8c8d',
        marginBottom: 8,
    },
    adminActionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statusUpdateGroup: {
        flexDirection: 'row',
        gap: 6,
    },
    actionBtn: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        backgroundColor: '#f1f2f6',
        borderWidth: 1,
        borderColor: '#ced4da',
    },
    disabledActionBtn: {
        backgroundColor: '#e9ecef',
        opacity: 0.4,
    },
    actionBtnText: {
        fontSize: 11,
        fontWeight: '500',
        color: '#495057',
    },
    deleteBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        backgroundColor: '#dc3545',
    },
    deleteBtnText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
    }
});