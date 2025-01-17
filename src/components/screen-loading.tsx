import { ActivityIndicator, View } from "react-native";

export function ScreenLoading(){
  return(
    <View className="flex-1 items-center justify-center bg-dark_900">
      <ActivityIndicator size="large" color="#fff"/>
    </View>
  )
}