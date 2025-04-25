import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for wishlist items
const initialWishlistItems = [
  {
    id: '3',
    name: 'Smartphone',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
  },
  {
    id: '4',
    name: 'Laptop Stand',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.5,
  },
  {
    id: '6',
    name: 'Bluetooth Speaker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.7,
  },
  {
    id: '8',
    name: 'Running Shoes',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.6,
  },
];

export default function WishlistScreen() {
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const navigateToProduct = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const addToCart = (id: string) => {
    // In a real app, this would add the item to the cart
    // For now, we'll just show a success message
    alert(`Added ${wishlistItems.find(item => item.id === id)?.name} to cart`);
  };

  const renderWishlistItem = ({ item }: { item: typeof initialWishlistItems[0] }) => (
    <View style={styles.wishlistItem}>
      <TouchableOpacity 
        style={styles.itemImageContainer}
        onPress={() => navigateToProduct(item.id)}
      >
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <TouchableOpacity onPress={() => navigateToProduct(item.id)}>
          <Text style={styles.itemName}>{item.name}</Text>
        </TouchableOpacity>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>★ {item.rating}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.addToCartButton}
            onPress={() => addToCart(item.id)}
          >
            <ShoppingCart size={16} color="white" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={() => removeFromWishlist(item.id)}
          >
            <Trash2 size={16} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wishlist</Text>
        <Text style={styles.itemCount}>{wishlistItems.length} items</Text>
      </View>

      {wishlistItems.length > 0 ? (
        <FlatList
          data={wishlistItems}
          renderItem={renderWishlistItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.wishlistList}
        />
      ) : (
        <View style={styles.emptyWishlistContainer}>
          <Heart size={60} color="#FF4785" style={{ opacity: 0.5 }} />
          <Text style={styles.emptyWishlistText}>Your wishlist is empty</Text>
          <Text style={styles.emptyWishlistSubtext}>
            Save items you like by tapping the heart icon on product pages
          </Text>
          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.exploreButtonText}>Explore Products</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  itemCount: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    marginTop: 4,
  },
  wishlistList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  wishlistItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  itemImageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FF4785',
    marginBottom: 4,
  },
  ratingContainer: {
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFB800',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#FF4785',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  addToCartText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    marginLeft: 5,
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyWishlistContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyWishlistText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyWishlistSubtext: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  exploreButton: {
    backgroundColor: '#FF4785',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  exploreButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
  },
});