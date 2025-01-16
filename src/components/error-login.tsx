import { OctagonX } from "lucide-react-native";
import { Text, View } from "react-native";
import { Modal } from "react-native";

interface ErrorComponentLoginType {
  error: string
  status: boolean
}
export function ErrorComponentLogin({
  error, status
}:ErrorComponentLoginType){
  return (
    <View className="top-4 left-2 gap-3 bg-brown_900 absolute flex-row items-center justify-between p-3 rounded-lg">
      <OctagonX size={20} color="#FFF"/>
      <Text className="text-light font-semibold font-poppins text-lg">{error}</Text>
    </View>
  )
}