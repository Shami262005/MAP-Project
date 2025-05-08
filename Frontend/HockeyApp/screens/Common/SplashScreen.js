import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  Image,
  Easing,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const BALL_SIZE = 60;
// drop-to-middle
const dropY = height / 2 - BALL_SIZE / 2;
// diagonal-based scale + 10% fudge
const diagonal  = Math.hypot(width, height);
const finalScale = (diagonal / BALL_SIZE) * 1.1;

export default function SplashScreen({ onFinish }) {
  const [bgColor, setBgColor] = useState('#22396D');
  const ballY       = useRef(new Animated.Value(-BALL_SIZE)).current;
  const ballScale   = useRef(new Animated.Value(1)).current;
  const logoScale   = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1) drop + bounce, pause, then expand
    Animated.sequence([
      Animated.timing(ballY, {
        toValue: dropY,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.delay(80),
      Animated.timing(ballScale, {
        toValue: finalScale,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      // as soon as expansion ends, flip container to white
      setBgColor('#FFFFFF');

      // then do the logo fade/scale
      Animated.sequence([
        Animated.delay(500),
        Animated.parallel([
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(logoScale, {
            toValue: 1,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(9000),
      ]).start(() => onFinish && onFinish());
    });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Animated.View
        style={[
          styles.ball,
          {
            transform: [
              { translateY: ballY },
              { scale:     ballScale },
            ],
          },
        ]}
      />

      <Animated.Image
        source={require('../assets/logo.png')}
        style={[
          styles.logo,
          {
            opacity:   logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    alignItems:      'center',
    justifyContent:  'center',
  },
  ball: {
    position:    'absolute',
    top:         0,
    left:        width / 2 - BALL_SIZE / 2,
    width:       BALL_SIZE,
    height:      BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    position: 'absolute',
    width:    width * 0.9,
    height:   width * 0.9,
  },
});
