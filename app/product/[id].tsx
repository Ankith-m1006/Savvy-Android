import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart, ShoppingCart, Star, ChevronDown, ChevronUp } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Mock product data
const products = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    description: 'Premium wireless headphones with noise cancellation technology, providing an immersive audio experience. Features include 30-hour battery life, comfortable ear cushions, and high-quality sound reproduction.',
    rating: 4.8,
    reviews: 245,
    colors: ['Black', 'White', 'Blue'],
    features: [
      'Active Noise Cancellation',
      '30-hour Battery Life',
      'Bluetooth 5.0',
      'Built-in Microphone',
      'Touch Controls',
    ],
    inStock: true,
    relatedProducts: ['2', '6'],
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    description: 'Advanced smartwatch with health monitoring features, GPS tracking, and smartphone notifications. Water-resistant design with a customizable display and multiple sport modes.',
    rating: 4.6,
    reviews: 189,
    colors: ['Black', 'Silver', 'Rose Gold'],
    features: [
      'Heart Rate Monitor',
      'GPS Tracking',
      'Water Resistant',
      'Sleep Tracking',
      'Smartphone Notifications',
    ],
    inStock: true,
    relatedProducts: ['1', '5'],
  },
  {
    id: '3',
    name: 'Smartphone',
    price: 899.99,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    description: 'High-performance smartphone with a stunning display, powerful camera system, and long-lasting battery. Features the latest processor for smooth multitasking and gaming.',
    rating: 4.9,
    reviews: 320,
    colors: ['Midnight Black', 'Ocean Blue', 'Silver'],
    features: [
      '6.7-inch OLED Display',
      'Triple Camera System',
      '5G Connectivity',
      'All-day Battery Life',
      'Water and Dust Resistant',
    ],
    inStock: true,
    relatedProducts: ['1', '2'],
  },
  {
    id: '4',
    name: 'Laptop Stand',
    price: 49.99,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    description: 'Ergonomic laptop stand designed to improve posture and reduce neck strain. Adjustable height and angle for optimal viewing comfort.',
    rating: 4.5,
    reviews: 120,
    colors: ['Silver', 'Black'],
    features: [
      'Adjustable Height',
      'Portable Design',
      'Heat Dissipation',
      'Anti-slip Surface',
      'Compatible with all Laptops',
    ],
    inStock: true,
    relatedProducts: ['5', '6'],
  },
  {
    id: '5',
    name: 'Wireless Charger',
    price: 29.99,
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and built-in safety features.',
    rating: 4.3,
    reviews: 98,
    colors: ['Black', 'White'],
    features: [
      'Fast Charging',
      'Qi Compatibility',
      'LED Indicator',
      'Compact Design',
      'Overcharge Protection',
    ],
    inStock: true,
    relatedProducts: ['1', '2'],
  },
  {
    id: '6',
    name: 'Bluetooth Speaker',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    description: 'Portable Bluetooth speaker with powerful sound and deep bass. Waterproof design with 12-hour battery life, perfect for outdoor activities.',
    rating: 4.7,
    reviews: 156,
    colors: ['Black', 'Blue', 'Red'],
    features: [
      'Waterproof Design',
      '12-hour Battery Life',
      'Bluetooth 5.0',
      'Built-in Microphone',
      'Compact and Portable',
    ],
    inStock: true,
    relatedProducts: ['1', '5'],
  },
];

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<typeof products[0] | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    // Find the product with the matching ID
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors[0]);
    }
  }, [id]);

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    // In a real app, this would add the product to the cart
    alert(`Added ${quantity} ${product.name} (${selectedColor}) to cart`);
  };

  const handleBuyNow = () => {
    // In a real app, this would navigate to checkout
    router.push('/checkout');
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const renderColorOption = (color: string) => (
    <TouchableOpacity
      key={color}
      style={[
        styles.colorOption,
        selectedColor === color && styles.selectedColorOption,
      ]}
      onPress={() => setSelectedColor(color)}
    >
      <Text style={styles.colorOptionText}>{color}</Text>
    </TouchableOpacity>
  );

  const renderImageIndicator = (index: number) => (
    <View
      key={index}
      style={[
        styles.imageIndicator,
        currentImageIndex === index && styles.activeImageIndicator,
      ]}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.wishlistButton, isWishlisted && styles.wishlisted]}
            onPress={toggleWishlist}
          >
            <Heart
              size={20}
              color={isWishlisted ? 'white' : '#FF4785'}
              fill={isWishlisted ? '#FF4785' : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        {/* Product Images */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            const offsetX = event.nativeEvent.contentOffset.x;
            const index = Math.round(offsetX / width);
            setCurrentImageIndex(index);
          }}
          scrollEventThrottle={16}
        >
          {product.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.productImage}
            />
          ))}
        </ScrollView>

        {/* Image Indicators */}
        {product.images.length > 1 && (
          <View style={styles.imageIndicatorsContainer}>
            {product.images.map((_, index) => renderImageIndicator(index))}
          </View>
        )}

        {/* Product Info */}
        <View style={styles.productInfoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>

          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  color="#FFB800"
                  fill={star <= Math.floor(product.rating) ? '#FFB800' : 'transparent'}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>{product.rating}</Text>
            <Text style={styles.reviewsText}>({product.reviews} reviews)</Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText} numberOfLines={showFullDescription ? undefined : 3}>
              {product.description}
            </Text>
            <TouchableOpacity
              style={styles.readMoreButton}
              onPress={() => setShowFullDescription(!showFullDescription)}
            >
              <Text style={styles.readMoreText}>
                {showFullDescription ? 'Read Less' : 'Read More'}
              </Text>
              {showFullDescription ? (
                <ChevronUp size={16} color="#FF4785" />
              ) : (
                <ChevronDown size={16} color="#FF4785" />
              )}
            </TouchableOpacity>
          </View>

          {/* Colors */}
          <View style={styles.colorsContainer}>
            <Text style={styles.sectionTitle}>Color</Text>
            <View style={styles.colorOptionsContainer}>
              {product.colors.map(renderColorOption)}
            </View>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Features</Text>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureBullet} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Quantity */}
          <View style={styles.quantityContainer}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={incrementQuantity}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <ShoppingCart size={20} color="white" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={handleBuyNow}
        >
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wishlistButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wishlisted: {
    backgroundColor: '#FF4785',
  },
  productImage: {
    width,
    height: 400,
    resizeMode: 'cover',
  },
  imageIndicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  imageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D0D0D0',
    marginHorizontal: 4,
  },
  activeImageIndicator: {
    backgroundColor: '#FF4785',
    width: 16,
  },
  productInfoContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#FF4785',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
    lineHeight: 22,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  readMoreText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FF4785',
    marginRight: 4,
  },
  colorsContainer: {
    marginBottom: 20,
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedColorOption: {
    borderColor: '#FF4785',
    backgroundColor: 'rgba(255, 71, 133, 0.1)',
  },
  colorOptionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF4785',
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  quantityText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    minWidth: 30,
    textAlign: 'center',
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FF4785',
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  addToCartText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    marginLeft: 8,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#FF4785',
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyNowText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FF4785',
  },
});