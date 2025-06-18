import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { colors, fonts } from '../variables/variables';

const backgroundImg = require('../../assets/refridgerator-background.jpg');

const LoginScreen = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    login();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={backgroundImg}
        style={styles.content}
        resizeMode='stretch'>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.headerText}>FRIDGER</Text>
        </View>

        <Text style={styles.description}>
          Add it, chill it, track it. Add your fridge and freezer products and
          keep track of when they expire.
        </Text>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  headerText: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.red,
    textShadowColor: colors.black,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  content: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: colors.white,
    textShadowColor: colors.black,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  description: {
    fontSize: 16,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    maxWidth: 300,
    alignSelf: 'center',
  },
  loginButton: {
    backgroundColor: colors.orange,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 16,
  },
});
