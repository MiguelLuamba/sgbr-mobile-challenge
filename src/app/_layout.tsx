import { Slot } from "expo-router";
import { AppProvider } from "@/context/app-context";
import { ScreenLoading } from "@/components/screen-loading";
import { Rubik_400Regular } from '@expo-google-fonts/rubik';
import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { BarlowCondensed_400Regular } from '@expo-google-fonts/barlow-condensed';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function RootLayout() {
  // LOAD FONTS
  const [fontsLoaded] = useFonts({
    PoppinsRegular: Poppins_400Regular,
    PoppinsBold: Poppins_700Bold,
    BebasNeue: BebasNeue_400Regular,
    BarlowCondensed: BarlowCondensed_400Regular,
    Rubik: Rubik_400Regular,
  });

  // WHILE LOADING FONTS RENDER LOADING SCREEN
  if(!fontsLoaded) {
    return <ScreenLoading/>
  }
  
  // AFTER LOADING FONTS RENDER MAIN ROUTE
  return (
    <AppProvider>
      <Slot />
    </AppProvider>
  );
}
