import { useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";
import { setStoreData } from "@/store/data-store";
import { useForm, Controller } from 'react-hook-form';
import { useAppContext } from "@/context/app-context";
import { signin_user_url } from "@/utils/app.constants";
import { ScrollView, Text, TextInput, View } from "react-native";
import { ErrorComponentLogin } from "../../components/error-login";
import { ChevronsRight, LockKeyhole, User } from "lucide-react-native";


interface LoginFormInputs {
  user: string;
  password: string;
}

interface ErrorType {
  message: string
  status: boolean
}
export default function Login(){
  const [isLoading, setIsLoading] = useState(false)
  const appContext = useAppContext()
  const [error, setError] = useState<ErrorType | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();

  //VALIDATE USER DATA
  const onSubmit = (data: LoginFormInputs) => {
    verifyUserCredentials(data)
  };

  // FETCH USER DATA
  async function verifyUserCredentials(data: LoginFormInputs){
   
      setIsLoading(true)
      await fetch(signin_user_url, {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(async (data) =>{
        if(data.error){
          setError({
            message: String(data.message),
            status: true
          })
          return closeModal()
        }
        if(!data.error){
          const dataLocalStore = await setStoreData("user-data", data.user)
          if(dataLocalStore === "sucess"){
            appContext.setUser(data.user)
            router.push("/home")
          }else {
            Alert.alert("Aviso", "Alguma coisa deu errado, tente mais tarde!")
          }
        }
      })
      .catch(error =>{
        Alert.alert("Erro","O servidor não responde, verifique sua internet ou tente mais tarde!")
      })
      .finally(()=>{
        setIsLoading(false)
      });
  }

  // ADD TIMING TO CLOSE ERROR LOGIN MODAL
  function closeModal() {
    setTimeout(() => {
      setError(null)
    }, 4000);
  }

  return(
    <View className="flex-1 bg-dark_900 pt-8 relative">
      <StatusBar backgroundColor="#161616" translucent={false}/>
      {/* WELCOME HEADER */}
      <View className="w-5/6 self-center gap-4 pb-4">
        <Text className="text-light font-barlow text-3xl font-bold text-center">Bem-Vindo de volta!</Text>
        <Text className="font-poppins text-gray_900 font-normal text-sm text-center">Preencha seus dados corretamente para poder acessar sua conta.</Text>
      </View>

      {/* SIGN IN FORM */}
      <ScrollView className="flex-1 bg-dark_800 pt-6 px-4">
        <Text className="font-semibold font-poppins text-3xl text-light">Login</Text>


        {/* USERNAME INPUT BOX */}
        <View className="w-full bg-dark_600 h-20 rounded-3xl flex-row items-center p-4 mt-5">
          <User color="#999" size={24}/>

          <Controller
            name="user"
            control={control}
            defaultValue=""
            rules={{
              required: 'Usuário é obrigatório',
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]+$/,
                message: 'Usuário inválido',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="default"
                autoCapitalize="none"
                placeholder="nome de usuário"
                placeholderTextColor="#999"
                className="w-[90%] font-rubik text-lg text-light"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

        </View>

        {/* USER ERROR MESSAGE */}
        {errors.user 
          && <Text className="text-red-400 font-rubik font-bold">
              {errors.user.message}
            </Text>
        }


        {/* PASSWORD INPUT BOX */}
        <View className="w-full bg-dark_600 h-20 rounded-3xl flex-row items-center p-4 mt-5">
          <LockKeyhole color="#999" size={24}/>

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: 'Senha é obrigatória',
              minLength: {
                value: 3,
                message: 'A senha deve ter 3 caracteres',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Digite sua senha"
                secureTextEntry
                keyboardType="numeric"
                placeholderTextColor="#999"
                className="w-[90%] font-rubik text-lg text-light"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

        </View>
        {/* PASSWORD ERROR MESSAGE */}
        {errors.password 
          && <Text className="text-red-400 font-rubik font-bold">
              {errors.password.message}
            </Text>
        }


        {/* SUBMIT BUTTON */}
        <TouchableOpacity
          disabled={isLoading}
          onPress={handleSubmit(onSubmit)}
          className="w-full h-24 rounded-3xl p-2 bg-gray_900 opacity-50 mt-5"
        >
          <View
            className="size-full relative rounded-2xl bg-gray_900 flex-row items-center justify-center"
          >
            {isLoading 
              ?<ActivityIndicator size="small" color="#FFF" />
              :(
                <>
                  <ChevronsRight 
                    color="#FFF" size={30}
                    className="absolute top-0 left-0"
                  />
                  <Text className="font-semibold font-poppins text-xl text-light">CONFIRMAR</Text>
                </>
              )
            }
            

          </View>
        </TouchableOpacity>


      </ScrollView>

      {/* TERMS AND PRIVACY POLITICS */}
      <View className="w-full bg-dark_800 py-2 ">
        <Text className="text-sm text-center text-gray_900 font-poppins font-normal">
          Ao confirmar o envio significa que
        </Text>
        <Text className="text-sm text-center text-gray_900 font-poppins font-normal">
          concorda com nossos <Text className="text-light underline">Termos</Text> e
        </Text>
        <Text className="text-sm text-center text-light underline font-poppins font-normal">
          Políticas de Privacidade
        </Text>
      </View>

      {/* ERROR LOGIN MODAL */}
      {error?.status && <ErrorComponentLogin error={error.message} status={error.status} />}
    </View>
  )
}