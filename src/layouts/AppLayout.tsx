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
import { colors, fonts } from '../variables/variables';

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
          <Ionicons name='home' size={32} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name='person' size={32} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddProduct')}>
          <Ionicons name='add' size={32} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  headerWrapper: {
    backgroundColor: colors.white,
    paddingTop: 50,
    paddingBottom: 16,
    alignItems: 'center',
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.red,
    textShadowColor: colors.black,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  icon: {
    color: colors.white,
  },
  content: {
    flex: 1,
    backgroundColor: colors.gray,
    padding: 16,
  },
  menu: {
    backgroundColor: colors.green,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopColor: colors.gray,
    borderTopWidth: 1,
  },
});
