import "@/styles/global.css";
import { ChevronsRight } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Redirect, router } from "expo-router";
import { useAppContext } from "@/context/app-context";
import { getLocalData } from "@/store/data-store";
import { useEffect, useState } from "react";
import { ScreenLoading } from "@/components/screen-loading";

export default function Welcome() {
  const appContext = useAppContext();
  const [loadingLocalData, setLoadingLocalData] = useState(true); // Por padrão, está carregando

  useEffect(() => {
    async function verifyLocalData() {
      try {
        const data = await getLocalData("user-data");
        if (data) {
          appContext.setUser(data); // Atualiza apenas se houver dados
        }
      } catch (error) {
        console.error("Error fetching local data:", error);
      } finally {
        setLoadingLocalData(false); // Sempre finaliza o carregamento
      }
    }

    verifyLocalData(); // Chama a função apenas uma vez
  }, []); // Dependências vazias garantem que execute apenas na montagem

  const goToLoginScreen = () => {
    router.push("/(auth)/login");
  };

  // Enquanto estiver carregando, exibe o componente de loading
  if (loadingLocalData) {
    return <ScreenLoading />;
  }

  // Se o usuário já está autenticado, redireciona para a tela inicial
  if (appContext.user?.id) {
    return <Redirect href="/home" />;
  }

  // Caso contrário, exibe a tela de boas-vindas
  return (
    <View className="flex-1 items-center justify-end bg-dark_900 pb-8">
      <StatusBar backgroundColor="#161616" />
      <View className="w-full gap-16">
        <Image
          source={require("@/assets/scarlate_car.png")}
          className="w-full"
        />

        <View className="w-full px-4 gap-6">
          <View className="w-full">
            <Text className="font-barlow text-light text-4xl font-bold">
              Faça Login e
            </Text>
            <Text className="font-barlow text-light text-4xl font-bold">
              Veja mais modelos
            </Text>
            <Text className="font-barlow text-light text-4xl font-bold">
              de Carros
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={goToLoginScreen}
            className="w-full h-[70px] overflow-hidden relative bg-light/15 rounded-3xl backdrop-blur-2xl flex-row items-center justify-center self-center"
          >
            <View className="absolute left-1.5 w-20 h-[60px] rounded-3xl bg-gray_900 p-2 justify-center items-center">
              <ChevronsRight color="#FFFFFF" size={36} />
            </View>

            <Text className="text-light font-semibold text-xl">Avançar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
