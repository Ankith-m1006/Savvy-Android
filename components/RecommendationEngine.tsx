import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

// Types
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
}

interface UserPreference {
  category: string;
  weight: number;
}

interface RecommendationEngineProps {
  userId: string;
  viewedProducts: string[];
  purchasedProducts: string[];
  allProducts: Product[];
}

export default function RecommendationEngine({
  userId,
  viewedProducts,
  purchasedProducts,
  allProducts,
}: RecommendationEngineProps) {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to recommendation engine
    const getRecommendations = async () => {
      setLoading(true);
      
      // In a real app, this would be an API call to a backend service
      // that implements collaborative filtering or other ML algorithms
      setTimeout(() => {
        const recommendedProducts = generateRecommendations();
        setRecommendations(recommendedProducts);
        setLoading(false);
      }, 500);
    };
    
    getRecommendations();
  }, [userId, viewedProducts, purchasedProducts]);

  // Simple recommendation algorithm based on user preferences
  const generateRecommendations = (): Product[] => {
    // 1. Determine user preferences based on viewed and purchased products
    const userPreferences = calculateUserPreferences();
    
    // 2. Filter out products the user has already purchased
    const candidateProducts = allProducts.filter(
      product => !purchasedProducts.includes(product.id)
    );
    
    // 3. Score each product based on user preferences
    const scoredProducts = candidateProducts.map(product => ({
      product,
      score: calculateProductScore(product, userPreferences),
    }));
    
    // 4. Sort by score and return top recommendations
    return scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(item => item.product);
  };

  // Calculate user preferences based on viewed and purchased products
  const calculateUserPreferences = (): UserPreference[] => {
    const preferences: Record<string, number> = {};
    
    // Viewed products contribute less to preferences
    viewedProducts.forEach(productId => {
      const product = allProducts.find(p => p.id === productId);
      if (product) {
        preferences[product.category] = (preferences[product.category] || 0) + 1;
      }
    });
    
    // Purchased products contribute more to preferences
    purchasedProducts.forEach(productId => {
      const product = allProducts.find(p => p.id === productId);
      if (product) {
        preferences[product.category] = (preferences[product.category] || 0) + 3;
      }
    });
    
    // Convert to array format
    return Object.entries(preferences).map(([category, weight]) => ({
      category,
      weight,
    }));
  };

  // Calculate a score for a product based on user preferences
  const calculateProductScore = (product: Product, preferences: UserPreference[]): number => {
    // Base score is the product rating
    let score = product.rating;
    
    // Add preference-based score
    const categoryPreference = preferences.find(pref => pref.category === product.category);
    if (categoryPreference) {
      score += categoryPreference.weight * 0.5;
    }
    
    // Add popularity factor (number of reviews)
    score += Math.min(product.reviews / 100, 1);
    
    return score;
  };

  const navigateToProduct = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigateToProduct(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>★ {item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading recommendations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={recommendations}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#666',
  },
  productsList: {
    paddingHorizontal: 15,
  },
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
  productImage: {
    width: '100%',
    height: 170,
    resizeMode: 'cover',
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