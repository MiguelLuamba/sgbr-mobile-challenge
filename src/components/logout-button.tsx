import { Power } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

interface LogoutButtonProps {
  onPress?: ()=> void
}
export function LogoutButton({
  onPress,
}: LogoutButtonProps){
  return (
    <TouchableOpacity
      onPress={onPress}
      className="size-12 rounded-full bg-brown_900 items-center justify-center"
    >
      <Power size={20} color="#1E1E1E"/>
    </TouchableOpacity>
  )
}