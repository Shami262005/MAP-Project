// App.js
import React, { useState } from 'react';
import StackNavigator from './navigation/StackNavigator';
import SplashScreen from './screens/Common/SplashScreen';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return <SplashScreen onFinish={() => setIsReady(true)} />;
  }
  return <StackNavigator />;
}
                                                                                                                                               