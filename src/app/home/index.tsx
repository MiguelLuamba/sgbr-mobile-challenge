import { LogoutButton } from "@/components/logout-button";
import { StatusBar } from "expo-status-bar";
import { Power, Search } from "lucide-react-native";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Home(){
  return(
    <View
      className="flex-1 items-center justify-start bg-dark_900 px-5 pt-5 gap-5"
    >
      <StatusBar backgroundColor="#161616" translucent={false}/>
      {/* HEADER */}
      <View className="w-full flex-row justify-between items-center">
        <View>
          <Text className="font-rubik text-base text-gray_900">Bem-vindo de volta!</Text>
          <Text className="font-rubik text-2xl text-light items-center justify-center">
            Miguel
            <Image source={require("@/assets/hi.png")}/>
          </Text>
        </View>

        <View className="flex-row items-center gap-3">
          <View className="size-12 rounded-full overflow-hidden">
            <Image 
              source={require("@/assets/user_placeholder.png")}
              className="size-full"
            />
          </View>

          <LogoutButton/>
        </View>
      </View>

      {/* SEARCH INPUT */}
      <View
        className="w-full h-[94px] bg-dark_700 rounded-lg pt-2 px-3 gap-1"
      >
        <Text className="text-light">PESQUISAR</Text>
        <View className="bg-dark_800 h-[68%] py-2 pl-3 pr-[2px] flex-row items-center rounded-md">
          <Search size={20} color="#999999"/>
          <TextInput
            className="text-light text-xl flex-1 h-full"
          
            placeholder="pesquise pela marca de um carro"
            placeholderTextColor="#999999"
          />
        </View>
      </View>

      {/* ALL CAR'S MARK */}
      <View className="w-full">
        <View className="flex-row items-end justify-between">
          <Text className="font-bold font-poppins text-light text-xl">Marcas de Carro</Text>
          <Text className="text-base text-purple_900 font-semibold font-poppins">Todos</Text>
        </View>
      </View>
    </View>
  )
}