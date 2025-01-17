import { useState } from "react";
import { router } from "expo-router";
import { TriangleAlert } from "lucide-react-native";
import { removeLocalData } from "@/store/data-store";
import { useAppContext } from "@/context/app-context";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { ActivityIndicator, Alert, StyleSheet } from "react-native";

interface ModalProps {
  visible: boolean
  closeModal: ()=> void
}
export function LogOutModal({
  visible,
  closeModal
}: ModalProps){

  const appContext = useAppContext()
  const [isLoading, setIsLoading] = useState(false)

  // CLEAN LOCALSTORAGE AND CONTEXT API
  async function logout(){
    try {
      setIsLoading(true)
      const response = await removeLocalData("user-data")
      if(response === "sucess") {
        appContext.setUser(null)
        return router.push("/")
      }else{
        Alert.alert("Aviso","Alguma coisa deu erro, tente mais tarde")
      }
      
    } catch (error) {
      Alert.alert("Aviso","Alguma coisa deu erro, tente mais tarde")
    } finally {
      setIsLoading(false)
    }
  }
  return(
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* WARNING AND MESSAGE */}
          <View className="items-center">
            <View className="size-14 border-solid border border-yellow_900 rounded-full bg-yellow_900/15 items-center justify-center mb-4">
              <TriangleAlert color="#FF0" size={24}/>
            </View>
            <Text className="font-rubik text-2xl text-light text-center">DESEJA MESMO </Text>
            <Text className="font-rubik text-2xl text-light text-center">TERMINAR SESSÃO?</Text>
          </View>


          {/* BUTTONS */}
          <View className="w-full gap-2 flex-row items-center">
            {/* CANCEL BUTTON */}
            <TouchableOpacity 
              onPress={closeModal}
              activeOpacity={0.7}
              className="w-1/2 h-14 items-center rounded-lg justify-center bg-brown_900">
              <Text className="text-light font-rubik text-lg">CANCELAR</Text>
            </TouchableOpacity>

            {/* CONFIRM BUTTON */}
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={logout}
              className="w-1/2 h-14 items-center rounded-lg justify-center bg-purple_900">
                {isLoading 
                  ?<ActivityIndicator size="small" color="#fff"/>
                  :<Text className="text-light font-rubik text-lg">CONFIRMAR</Text>
                }
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 12,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    alignItems: 'center',
    gap: 30
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeText: {
    color: 'blue',
  },
});