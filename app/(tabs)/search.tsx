import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Search as SearchIcon, X, SlidersHorizontal } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data for search results
const allProducts = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    category: 'Electronics',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.6,
    category: 'Electronics',
  },
  {
    id: '3',
    name: 'Smartphone',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    category: 'Electronics',
  },
  {
    id: '4',
    name: 'Laptop Stand',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.5,
    category: 'Electronics',
  },
  {
    id: '5',
    name: 'Wireless Charger',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.3,
    category: 'Electronics',
  },
  {
    id: '6',
    name: 'Bluetooth Speaker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.7,
    category: 'Electronics',
  },
  {
    id: '7',
    name: 'Denim Jacket',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.2,
    category: 'Fashion',
  },
  {
    id: '8',
    name: 'Running Shoes',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.6,
    category: 'Sports',
  },
];

// Popular search terms
const popularSearches = [
  'Headphones', 'Smartphones', 'Laptops', 'Watches', 'Speakers', 'Cameras'
];

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof allProducts>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    if (text.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    
    setIsSearching(true);
    
    // Filter products based on search query
    const filteredResults = allProducts.filter(product => 
      product.name.toLowerCase().includes(text.toLowerCase()) ||
      product.category.toLowerCase().includes(text.toLowerCase())
    );
    
    setSearchResults(filteredResults);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  const navigateToProduct = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const renderSearchResult = ({ item }: { item: typeof allProducts[0] }) => (
    <TouchableOpacity 
      style={styles.resultItem}
      onPress={() => navigateToProduct(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.resultImage} />
      <View style={styles.resultInfo}>
        <Text style={styles.resultName}>{item.name}</Text>
        <Text style={styles.resultCategory}>{item.category}</Text>
        <Text style={styles.resultPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>★ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <SearchIcon size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <X size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <SlidersHorizontal size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {!isSearching ? (
        <View style={styles.popularContainer}>
          <Text style={styles.popularTitle}>Popular Searches</Text>
          <View style={styles.popularTermsContainer}>
            {popularSearches.map((term, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.popularTerm}
                onPress={() => handleSearch(term)}
              >
                <Text style={styles.popularTermText}>{term}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsList}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No products found</Text>
          <Text style={styles.noResultsSubtext}>Try a different search term</Text>
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  filterButton: {
    width: 50,
    height: 50,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popularContainer: {
    paddingHorizontal: 20,
  },
  popularTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 15,
  },
  popularTermsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  popularTerm: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  popularTermText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  resultsList: {
    paddingHorizontal: 20,
  },
  resultItem: {
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
  resultImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  resultInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  resultName: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    marginBottom: 4,
  },
  resultCategory: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#999',
    marginBottom: 4,
  },
  resultPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FF4785',
  },
  ratingContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#FFB800',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  noResultsText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#999',
    textAlign: 'center',
  },
});