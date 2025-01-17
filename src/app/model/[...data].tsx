import axios from "axios";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useLocalSearchParams } from "expo-router";
import { ModelCarCard } from "@/components/model-car";
import { list_model_cars } from "@/utils/app.constants";
import { LogOutModal } from "@/components/logout-modal";
import { LogoutButton } from "@/components/logout-button";
import { RadialCircle } from "@/components/radial-circle";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";

interface ModelCarCardProps{
  nome: string
  codigo: number
}
export default function Model(){

  const { data } = useLocalSearchParams();
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [visibleLogoutModal, setVisibleLogoutModal] = useState(false)
  const [allModelCars, setAllModelCars] = useState<ModelCarCardProps[]>([])

  // SHOW LOGOUT MODAL
  function showLogoutModal(){
    setVisibleLogoutModal(true) 
  }

  // CLOSE LOGOUT MODAL
  function closeLogoutModal(){
    setVisibleLogoutModal(false) 
  }

  // GET MODELS OF CARS FROM SPECIFY MARK
  async function getModelsOfSpecifyMark () {
    try {
      setLoading(true)
      const url = list_model_cars(data[0])
      const response = await axios.get(url)
      setAllModelCars(response.data.modelos)
      
    } catch (error) {
      console.log("erro")
    } finally {
      setLoading(false)
    }
  }
  // REFRESH HTTP QUERY
  const onRefresh = async () => {
    setRefreshing(true);
    await getModelsOfSpecifyMark();
    setRefreshing(false);
  };
  // EXIT FROM APLICATION
  function back(){
    router.back()
  }
  useEffect(()=>{
    getModelsOfSpecifyMark()
  },[])
  
  return(
    <View className="flex-1 items-center justify-start bg-dark_900 px-5 pt-5 gap-5 relative">
      <StatusBar backgroundColor="#161616" translucent={false} />
      
      {/* HEADER */}
      <View className="w-full flex-row items-center justify-between">
        <Pressable
          onPress={back}
          className="items-center justify-center size-12 rounded-full border border-light bg-dark_700">
          <ChevronLeft color="#FFF" size={24}/>
        </Pressable>

        <View>
          <Text className="font-normal font-poppins text-light text-xl text-center">
            Modelos de Carro 
          </Text>
          <Text className="text-lg text-gray_900 font-poppinsBold text-center">{data[1]}</Text>
        </View>

        <LogoutButton onPress={showLogoutModal}/>
      </View>

      {/* LIST ALL MODELS */}
      {loading ?(
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
          <FlatList
            contentContainerStyle={{
              gap: 2,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingVertical: 10,
            }}
            data={allModelCars}
            keyExtractor={(item, index) => `${item.codigo}-${index}`}
            renderItem={({ item }) => (
              <ModelCarCard name={item.nome} code={String(item.codigo)} />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <Text className="text-gray_900 text-center w-full mt-6">
                Nenhuma marca encontrada.
              </Text>
            }
          />
        )
      }

      {/* LOGOUT MODAL */}
      <LogOutModal
        visible={visibleLogoutModal}
        closeModal={closeLogoutModal}
      /> 



      {/* 3D CIRCLES BACKGROUND */}

      <View className="absolute left-[22] top-[15%] -z-0">
        <RadialCircle first_color="#6FFFF3" second_color="#37958E" third_color="#186B64"/>
      </View>

      <View className="absolute right-[22] top-[42.5%] -z-0">
        <RadialCircle  first_color="#BC7777" second_color="#AB2525" third_color="#713131"/>
      </View>

      <View className="absolute left-[22] top-[70%] -z-0">
        <RadialCircle first_color="#A998FF" second_color="#634AE1" third_color="#483995" />
      </View>

  
    </View>
  )
}

