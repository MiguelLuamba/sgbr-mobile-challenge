import { LogoutButton } from "@/components/logout-button";
import { MarkCarCard } from "@/components/mark-car-card";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { list_mark_cars } from "@/utils/app.constants";
import { Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TextInput, View, ActivityIndicator, RefreshControl } from "react-native";
import { useAppContext } from "@/context/app-context";
import { LogOutModal } from "@/components/logout-modal";
import { Redirect } from "expo-router";

interface MarkCarsData {
  nome: string;
  codigo: string;
}

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false); // Carregamento inicial
  const [refreshing, setRefreshing] = useState<boolean>(false); // Para "pull-to-refresh"
  const [carsMark, setCarsMark] = useState<MarkCarsData[]>([]); // Dados da API
  const [filteredCars, setFilteredCars] = useState<MarkCarsData[]>([]); // Dados filtrados pela busca
  const [searchQuery, setSearchQuery] = useState<string>(""); // Termo de busca

  const [visibleLogoutModal, setVisibleLogoutModal] = useState(false)

  function showLogoutModal(){
    setVisibleLogoutModal(true) 
  }

  function closeLogoutModal(){
    setVisibleLogoutModal(false) 
  }

  const appContext = useAppContext()

  // Função para buscar os dados da API
  const getAllMarkOfCarsFromDatabase = async () => {
    setLoading(true);
    try {
      const response = await axios.get(list_mark_cars);
      if (response.status === 200) {
        setCarsMark(response.data);
        setFilteredCars(response.data); // Exibe todos os dados inicialmente
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  // Atualiza os dados ao fazer "pull-to-refresh"
  const onRefresh = async () => {
    setRefreshing(true);
    await getAllMarkOfCarsFromDatabase();
    setRefreshing(false);
  };

  // Função de busca
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredCars(carsMark); // Se o campo de busca estiver vazio, exibe todos os dados
    } else {
      const filtered = carsMark.filter((car) =>
        car.nome.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredCars(filtered);
    }
  };

  // Busca inicial dos dados
  useEffect(() => {
    getAllMarkOfCarsFromDatabase();
  }, []);

  if(!appContext.user?.id) {
    return <Redirect href="/"/>
  }

  return (
    <View className="flex-1 items-center justify-start bg-dark_900 px-5 pt-5 gap-5">
      <StatusBar backgroundColor="#161616" translucent={false} />
      
      {/* HEADER */}
      <View className="w-full flex-row justify-between items-center">
        <View>
          <Text className="font-rubik text-base text-gray_900">Bem-vindo de volta!</Text>
          <Text className="font-rubik text-2xl text-light items-center justify-center">
            {appContext.user?.name}
            <Image source={require("@/assets/hi.png")} />
          </Text>
        </View>

        <View className="flex-row items-center gap-3">
          <View className="size-12 rounded-full overflow-hidden">
            <Image
              source={require("@/assets/user_placeholder.png")}
              className="size-full"
            />
          </View>

          <LogoutButton onPress={showLogoutModal}/>
        </View>
      </View>

      {/* SEARCH INPUT */}
      <View className="w-full h-[94px] bg-dark_700 rounded-lg pt-2 px-3 gap-1">
        <Text className="text-light">PESQUISAR</Text>
        <View className="bg-dark_800 h-[66%] py-2 pl-3 pr-[2px] flex-row items-center rounded-md">
          <Search size={20} color="#999999" />
          <TextInput
            className="text-light text-xl flex-1 h-full"
            placeholder="Pesquise pela marca de um carro"
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {/* ALL CAR'S MARK */}
      <View className="flex-1">
        <View className="w-full flex-row items-end justify-between">
          <Text className="font-bold font-poppins text-light text-xl">
            Marcas de Carro
          </Text>
          <Text className="text-base text-purple_900 font-bold font-poppins">
            {searchQuery.trim().length>0?"Filtro aplicado":"Todos"}
          </Text>
        </View>

        {/* LISTAGEM DAS MARCAS */}
        {loading ? (
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
            data={filteredCars}
            keyExtractor={(item, index) => `${item.codigo}-${index}`}
            renderItem={({ item }) => (
              <MarkCarCard name={item.nome} code={item.codigo} />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <Text className="text-light text-center">
                Nenhuma marca encontrada.
              </Text>
            }
          />
        )}
      </View>

      <LogOutModal 
        visible={visibleLogoutModal}
        closeModal={closeLogoutModal}
      />
    </View>
  );
}
