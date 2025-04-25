import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, CreditCard, MapPin, Check } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const cartItems = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    quantity: 1,
  },
];

const savedAddresses = [
  {
    id: '1',
    name: 'Home',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Work',
    address: '456 Business Ave, Suite 200',
    city: 'New York',
    state: 'NY',
    zipCode: '10002',
    isDefault: false,
  },
];

const paymentMethods = [
  {
    id: '1',
    type: 'Credit Card',
    cardNumber: '**** **** **** 4567',
    cardBrand: 'Visa',
    expiryDate: '05/25',
    isDefault: true,
  },
  {
    id: '2',
    type: 'Credit Card',
    cardNumber: '**** **** **** 8901',
    cardBrand: 'Mastercard',
    expiryDate: '09/24',
    isDefault: false,
  },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const [selectedAddressId, setSelectedAddressId] = useState(savedAddresses.find(addr => addr.isDefault)?.id || '');
  const [selectedPaymentId, setSelectedPaymentId] = useState(paymentMethods.find(pm => pm.isDefault)?.id || '');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    return promoApplied ? calculateSubtotal() * 0.1 : 0;
  };

  const calculateTax = () => {
    return (calculateSubtotal() - calculateDiscount()) * 0.08;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax() + 5.99;
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
      alert('Promo code applied! 10% discount');
    } else {
      alert('Invalid promo code');
    }
  };

  const placeOrder = () => {
    alert('Order placed successfully!');
    router.push('/');
  };

  const renderCartItem = (item) => (
    <View key={item.id} style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
      </View>
    </View>
  );

  const renderAddress = (address) => (
    <TouchableOpacity key={address.id} style={styles.address} onPress={() => setSelectedAddressId(address.id)}>
      <Text style={styles.addressText}>{address.name} - {address.address}</Text>
      {selectedAddressId === address.id && <Check size={20} color="green" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {cartItems.map(renderCartItem)}
        {savedAddresses.map(renderAddress)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  cartItem: { flexDirection: 'row', marginBottom: 16 },
  itemImage: { width: 80, height: 80, marginRight: 16 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemPrice: { fontSize: 14, color: 'gray' },
  itemQuantity: { fontSize: 14 },
  address: { padding: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 5, marginBottom: 10 },
  addressText: { fontSize: 16 },
});
