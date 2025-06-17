import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import AppLayout from '../layouts/AppLayout';
import { ProductContext } from '../context/ProductContext';

const HomeScreen = () => {
  const { products } = useContext(ProductContext);

  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  const renderItem = ({ item }: any) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productAmount}>Amount: {item.amount}</Text>
      <Text style={styles.productBestBefore}>
        Best before: {item.bestBefore}
      </Text>
    </View>
  );

  const fridgeProducts = products.filter((p) => p.type === 'fridge');
  const freezerProducts = products.filter((p) => p.type === 'freezer');

  return (
    <AppLayout title='FRIDGER'>
      <ScrollView contentContainerStyle={styles.content}>
        {products.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>The fridge is empty</Text>
            <Text style={styles.text}>Add something tasty!</Text>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Fridge</Text>
            {fridgeProducts.length === 0 ? (
              <Text style={styles.emptySectionText}>No products in fridge</Text>
            ) : (
              <FlatList
                data={fridgeProducts}
                keyExtractor={(item, index) => `fridge-${item.name}-${index}`}
                renderItem={renderItem}
                scrollEnabled={false} // För att FlatList inte ska scrolla inuti ScrollView
              />
            )}

            <Text style={styles.sectionTitle}>Freezer</Text>
            {freezerProducts.length === 0 ? (
              <Text style={styles.emptySectionText}>
                No products in freezer
              </Text>
            ) : (
              <FlatList
                data={freezerProducts}
                keyExtractor={(item, index) => `freezer-${item.name}-${index}`}
                renderItem={renderItem}
                scrollEnabled={false}
              />
            )}
          </>
        )}
      </ScrollView>
    </AppLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  content: {
    padding: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 8,
  },
  emptySectionText: {
    fontStyle: 'italic',
    marginBottom: 12,
    color: '#666',
  },
  text: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 20,
  },
  productItem: {
    backgroundColor: '#F2F2F2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
  },
  productAmount: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  productBestBefore: {
    fontSize: 14,
    color: '#333',
    marginTop: 2,
    fontStyle: 'italic',
  },
});
