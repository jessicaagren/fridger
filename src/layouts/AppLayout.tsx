import React, { ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  children: ReactNode;
  title?: string;
};

const AppLayout = ({ children, title = 'FRIDGER' }: Props) => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>{title}</Text>
      </View>

      <View style={styles.content}>{children}</View>

      <View style={[styles.menu, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name='home' size={32} color='#F2F2F2' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name='person' size={32} color='#F2F2F2' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddProduct')}>
          <Ionicons name='add' size={32} color='#F2F2F2' />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  headerWrapper: {
    backgroundColor: '#F2F2F2',
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 16,
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 32,
    fontFamily: 'Fredoka_600SemiBold',
    color: '#F20530',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },

  content: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    padding: 16,
  },
  menu: {
    backgroundColor: '#63A621',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
});
