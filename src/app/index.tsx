import "@/styles/global.css";
import { ChevronsRight } from "lucide-react-native"
import { StatusBar } from "expo-status-bar"
import { Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function Welcome() {
  function goToLoginScreen(){
    router.push("/home")
  }
  return (
    <View
      className="flex-1 items-center justify-end bg-dark_900 pb-8"
    >
      <StatusBar backgroundColor="#161616"/>
      <View className="w-full gap-16">
        <Image
          source={require("@/assets/scarlate_car.png")}
          className="w-full"
        />


        <View className="w-full px-4 gap-6">
          <View className="w-full">
            <Text className="font-barlow text-light text-4xl font-bold">Faça Login e</Text>
            <Text className="font-barlow text-light text-4xl font-bold">Veja mais modelos</Text>
            <Text className="font-barlow text-light text-4xl font-bold">de Carros</Text>
          </View>
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={goToLoginScreen}
            className="w-full h-[70px] overflow-hidden relative bg-light/15 rounded-3xl backdrop-blur-2xl flex-row items-center justify-center self-center"
          >
            <View 
              className="absolute left-1 w-20 h-[60px] rounded-3xl bg-gray_900 p-2 justify-center items-center"
            >
              <ChevronsRight color="#FFFFFF" size={36}/>
            </View>

            <Text className="text-light font-semibold text-xl">Avançar</Text>
          </TouchableOpacity>

        </View>


      </View>
    </View>
  );
}




// backdrop-filter: blur(65px);




// background: linear-gradient(91.59deg, rgba(255, 255, 255, 0.7) -1.19%, rgba(153, 153, 153, 0.81) 99.52%);
// opacity: 0.51;
// border: 2px solid rgba(255, 255, 255, 0.002);
// filter: blur(25px);
