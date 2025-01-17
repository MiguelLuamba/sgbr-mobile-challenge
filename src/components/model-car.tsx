import { BlurView } from "expo-blur";
import React, { useEffect, useRef } from "react";
import { Barcode, StepForward } from "lucide-react-native";
import { Animated, StyleSheet, Text, View } from "react-native";

interface ModelCarCardsProps {
  name: string;
  code: string;
}

export function ModelCarCard({ name, code }: ModelCarCardsProps) {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // SCALE ANIMATION
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleValue }],
      }}
    >
      <BlurView intensity={50} tint="light" style={styles.blurView}>
        <View className="flex-row items-center justify-between">
          <Barcode color="#FFF" size={24} />
          <Text className="font-bebas text-base text-light">CODE: {code}</Text>
        </View>

        <Text
          className="font-poppinsBold text-base text-left text-light relative"
          numberOfLines={4}
          ellipsizeMode="tail"
        >
          {name}
        </Text>

        <View className="w-full h-max p-2 bg-dark_900 rounded-full">
          <View className="size-8 items-center justify-center bg-[#D9D9D9] rounded-full">
            <StepForward color="#161616" size={20} />
          </View>
        </View>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  blurView: {
    width: 160,
    height: 190,
    padding: 12,
    justifyContent: "space-between",
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    overflow: "hidden",
  },
});
