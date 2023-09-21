////////THE COLORS 
  ///dddedf-ff6b35-8fb339-1a659e-c1d6e2



import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/home';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import Camerascreen from './screens/camera';
import Form from './screens/form/indix';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  
  const loadFonts = async () => {
    await Font.loadAsync({
      
      'noto-kufi-arabic': require('./assets/NotoKufiArabic-Bold.ttf'),
      // You can add more fonts here if needed
    });

    setFontLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return null; // Render nothing while the font is loading
  }

  return (
    <SafeAreaView style={styles.container}>
    <HomeScreen/>
    <StatusBar style="auto" />
    </SafeAreaView>

      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/*<NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={HomeScreen} 
          options={{
            headerShown: false,
          }}/>
        <Stack.Screen name="camera" component={Camerascreen} 
          options={{
            headerShown: false,
          }}/>
        <Stack.Screen name="Form" component={Form} 
          options={{
            headerShown: false,
          }}/>
      </Stack.Navigator>
        </NavigationContainer>*/
