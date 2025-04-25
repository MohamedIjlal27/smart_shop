import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search as SearchIcon, X, SlidersHorizontal } from 'lucide-react-native';
import ProductCard from '../../components/ProductCard';
import { products } from '../../data/mockData';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

export default function SearchScreen() {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 20000 });
  const [sortBy, setSortBy] = useState<'relevance' | 'priceHighToLow' | 'priceLowToHigh'>(
    'relevance'
  );

  useEffect(() => {
    filterProducts();
  }, [searchQuery, priceRange, sortBy]);

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => {
        const price = product.discountPrice || product.price;
        return price >= priceRange.min && price <= priceRange.max;
      }
    );

    // Sort products
    if (sortBy === 'priceHighToLow') {
      filtered.sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        return priceB - priceA;
      });
    } else if (sortBy === 'priceLowToHigh') {
      filtered.sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        return priceA - priceB;
      });
    }

    setFilteredProducts(filtered);
  };

  const handleProductPress = (product: Product) => {
    console.log('Product selected:', product.name);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No products found</Text>
      <Text style={styles.emptyText}>
        Try adjusting your search or filter criteria
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <X size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity style={styles.filterButton} onPress={toggleFilters}>
          <SlidersHorizontal size={20} color="#0A2463" />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filterTitle}>Sort By</Text>
          <View style={styles.sortOptions}>
            <TouchableOpacity
              style={[
                styles.sortOption,
                sortBy === 'relevance' && styles.selectedSortOption,
              ]}
              onPress={() => setSortBy('relevance')}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  sortBy === 'relevance' && styles.selectedSortOptionText,
                ]}
              >
                Relevance
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.sortOption,
                sortBy === 'priceLowToHigh' && styles.selectedSortOption,
              ]}
              onPress={() => setSortBy('priceLowToHigh')}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  sortBy === 'priceLowToHigh' && styles.selectedSortOptionText,
                ]}
              >
                Price: Low to High
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.sortOption,
                sortBy === 'priceHighToLow' && styles.selectedSortOption,
              ]}
              onPress={() => setSortBy('priceHighToLow')}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  sortBy === 'priceHighToLow' && styles.selectedSortOptionText,
                ]}
              >
                Price: High to Low
              </Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.filterTitle}>Price Range</Text>
          <View style={styles.priceRangeContainer}>
            <TouchableOpacity
              style={[
                styles.priceOption,
                priceRange.max === 5000 && styles.selectedPriceOption,
              ]}
              onPress={() => setPriceRange({ min: 0, max: 5000 })}
            >
              <Text
                style={[
                  styles.priceOptionText,
                  priceRange.max === 5000 && styles.selectedPriceOptionText,
                ]}
              >
                Under Rs. 5,000
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.priceOption,
                priceRange.min === 5000 && priceRange.max === 10000 && styles.selectedPriceOption,
              ]}
              onPress={() => setPriceRange({ min: 5000, max: 10000 })}
            >
              <Text
                style={[
                  styles.priceOptionText,
                  priceRange.min === 5000 && priceRange.max === 10000 && styles.selectedPriceOptionText,
                ]}
              >
                Rs. 5,000 - Rs. 10,000
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.priceOption,
                priceRange.min === 10000 && styles.selectedPriceOption,
              ]}
              onPress={() => setPriceRange({ min: 10000, max: 100000 })}
            >
              <Text
                style={[
                  styles.priceOptionText,
                  priceRange.min === 10000 && styles.selectedPriceOptionText,
                ]}
              >
                Above Rs. 10,000
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.priceOption,
                priceRange.min === 0 && priceRange.max === 20000 && styles.selectedPriceOption,
              ]}
              onPress={() => setPriceRange({ min: 0, max: 20000 })}
            >
              <Text
                style={[
                  styles.priceOptionText,
                  priceRange.min === 0 && priceRange.max === 20000 && styles.selectedPriceOptionText,
                ]}
              >
                All Prices
              </Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={styles.applyFiltersButton}
            onPress={toggleFilters}
          >
            <Text style={styles.applyFiltersText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <View style={styles.productCardWrapper}>
            <ProductCard
              product={item}
              onPress={handleProductPress}
              onAddToCart={handleAddToCart}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productsList}
        ListEmptyComponent={renderEmptyList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    height: '100%',
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  filterTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#0A2463',
    marginBottom: 12,
  },
  sortOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  sortOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedSortOption: {
    backgroundColor: '#0A2463',
  },
  sortOptionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666',
  },
  selectedSortOptionText: {
    color: '#FFFFFF',
  },
  priceRangeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  priceOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedPriceOption: {
    backgroundColor: '#0A2463',
  },
  priceOptionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666',
  },
  selectedPriceOptionText: {
    color: '#FFFFFF',
  },
  applyFiltersButton: {
    backgroundColor: '#0A2463',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyFiltersText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  productsList: {
    padding: 12,
    paddingBottom: 80,
  },
  productCardWrapper: {
    width: '50%',
    padding: 4,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#0A2463',
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});