import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  isWishlisted?: boolean;
  onToggleWishlist?: (id: string) => void;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  rating,
  reviews,
  isWishlisted = false,
  onToggleWishlist,
}: ProductCardProps) {
  const router = useRouter();

  const navigateToProduct = () => {
    router.push(`/product/${id}`);
  };

  const handleWishlistToggle = (e: any) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(id);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={navigateToProduct}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.productImage} />
        {onToggleWishlist && (
          <TouchableOpacity 
            style={[styles.wishlistButton, isWishlisted && styles.wishlisted]}
            onPress={handleWishlistToggle}
          >
            <Heart
              size={16}
              color={isWishlisted ? 'white' : '#FF4785'}
              fill={isWishlisted ? '#FF4785' : 'transparent'}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{name}</Text>
        <Text style={styles.productPrice}>${price.toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>★ {rating}</Text>
          <Text style={styles.reviewsText}>({reviews})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productCard: {
    width: 170,
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 170,
    resizeMode: 'cover',
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  wishlisted: {
    backgroundColor: '#FF4785',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FF4785',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#FFB800',
  },
  reviewsText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#999',
    marginLeft: 4,
  },
});