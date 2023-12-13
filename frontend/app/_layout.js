import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
const HomeLayout =()=> {
  const[FontsLoaded]=useFonts({
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
  }
  
  );
  const onLayoutRootView = useCallback(async ()=>{
    if (FontsLoaded) {
      await SplashScreen.hideAsync();
      
    }
  },[FontsLoaded]);
  if (!FontsLoaded) {
    return null;
  }

  return <Stack/>;
}
export default HomeLayout;