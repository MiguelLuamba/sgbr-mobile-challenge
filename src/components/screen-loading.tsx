import { ActivityIndicator, View } from "react-native";

export function ScreenLoading(){
  return(
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#000"/>
    </View>
  )
}