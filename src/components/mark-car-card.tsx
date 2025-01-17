import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Component, Eclipse, KeySquare } from "lucide-react-native";
import { Animated, TouchableOpacity, Text, View } from "react-native";

interface MarkCarCardProps {
  name: string;
  code: string;
}

export function MarkCarCard({ name, code }: MarkCarCardProps) {
  // RAMDOM NUMBER TO SET CARD COLOR
  const isHighlighted = parseInt(code, 36) % 2 === 0;

  // Ref para a animação
  const scaleValue = useRef(new Animated.Value(0)).current;

  function viewSpecifyModelsOfCars(id: string, name: string) {
    router.push(`/model/${id}/${name}`);
  }

  useEffect(() => {
    // SLALE SIZE ANIMATION
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
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => viewSpecifyModelsOfCars(code, name)}
        className={`w-[160] h-[190] ${
          isHighlighted ? "bg-purple_900" : "bg-dark_700"
        } rounded-3xl p-4 relative z-50`}
      >
        {/* TOP ENFASE ELEMENT */}
        <View className="flex-row items-start justify-between">
          {isHighlighted ? (
            <Component color="#FFF" size={24} />
          ) : (
            <Eclipse color="#FFF" size={24} />
          )}

          <View className="w-12 h-20 py-1 rounded-full bg-dark_900 items-center justify-end">
            <View className="size-10 rounded-full bg-purple_900 items-center justify-center">
              <KeySquare color="#FFFFFF" size={20} />
            </View>
          </View>
        </View>

        {/* MARK OF CAR */}
        <View className="relative -top-5 gap-2">
          <Text
            className={`font-poppinsBold ${
              isHighlighted ? "text-lime_900" : "text-gray_900"
            } text-base`}
          >
            Marca
          </Text>
          <Text
            className="font-poppinsBold text-3xl text-light"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {name}
          </Text>
        </View>

        {/* MARK CODE */}
        <Text
          className={`font-bebas text-right font-bold ${
            isHighlighted ? "text-lime_900" : "text-gray_900"
          } text-base absolute bottom-4 right-4`}
        >
          CODE: {code}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
