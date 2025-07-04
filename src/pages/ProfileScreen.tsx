import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AppLayout from '../layouts/AppLayout';
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../context/AuthContext';
import { colors } from '../variables/variables';

const ProfileScreen = () => {
  const { products } = useContext(ProductContext);
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const fridgeCount = products.filter((p) => p.type === 'fridge').length;
  const freezerCount = products.filter((p) => p.type === 'freezer').length;

  return (
    <AppLayout title='FRIDGER'>
      <View style={styles.content}>
        <Text style={styles.title}>Your Profile</Text>

        <View style={styles.profileInfo}>
          <Text style={styles.infoText}>Name: Example Examplesson</Text>
          <Text style={styles.infoText}>Email: example@example.com</Text>
          <Text style={styles.infoText}>Member since: June 2025</Text>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            Total products added: {products.length}
          </Text>
          <Text style={styles.statsText}>
            Products in fridge: {fridgeCount}
          </Text>
          <Text style={styles.statsText}>
            Products in freezer: {freezerCount}
          </Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  profileInfo: {
    marginBottom: 24,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: colors.black,
    marginVertical: 2,
  },
  statsContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  statsText: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 2,
  },
  logoutButton: {
    backgroundColor: colors.orange,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30,
  },
  logoutButtonText: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
  },
});
