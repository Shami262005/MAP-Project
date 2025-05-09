import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SetupAccountScreen({ navigation }) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) return;
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/HockeyWallpaper.png')}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.avoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={26} color="white" />
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.title}>Enter Code</Text>
            <Text style={styles.instruction}>
              Enter the code sent to your registered email
            </Text>

            <View style={styles.codeRow}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.codeBox}
                  keyboardType="numeric"
                  maxLength={1}
                  ref={(ref) => (inputs.current[index] = ref)}
                  onChangeText={(text) => handleChange(text, index)}
                  value={digit}
                  textAlign="center"
                />
              ))}
            </View>

            <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('CreateCredentials')}
>
  <Text style={styles.buttonText}>Continue</Text>
</TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  avoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  backIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingBottom: 50,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#22396D',
    marginBottom: 10,
  },
  instruction: {
    color: '#22396D',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 25,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  codeBox: {
    width: 45,
    height: 50,
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    fontSize: 22,
    color: '#000',
  },
  button: {
    backgroundColor: '#22396D',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
