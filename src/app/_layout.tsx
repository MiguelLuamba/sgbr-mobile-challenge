import { Slot } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native"
import { Rubik_400Regular } from '@expo-google-fonts/rubik';
import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { BarlowCondensed_400Regular } from '@expo-google-fonts/barlow-condensed';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { AppProvider, useAppContext } from "@/context/app-context";
import { getLocalData } from "@/store/data-store";
import { useState } from "react";
import { ScreenLoading } from "@/components/screen-loading";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    PoppinsRegular: Poppins_400Regular,
    PoppinsBold: Poppins_700Bold,
    BebasNeue: BebasNeue_400Regular,
    BarlowCondensed: BarlowCondensed_400Regular,
    Rubik: Rubik_400Regular,
  });

  if(!fontsLoaded) {
    return <ScreenLoading/>
  }

  return (
    <AppProvider>
      <Slot />
    </AppProvider>
  );
}
