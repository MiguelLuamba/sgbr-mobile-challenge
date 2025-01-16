import AsyncStorage from '@react-native-async-storage/async-storage';


// ADD DATA TO ASYNC STORAGE
export const setStoreData = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return "sucess"
  } catch (e) {
    return "error";
  }
}


// GET DATA FROM ASYNC STORAGE
export const getLocalData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const parsedValue = JSON.parse(value);
      return parsedValue;
    }else{
      return null
    }
  } catch (e) {
    console.log(e);
  }
}

// REMOVE DATA FROM ASYNC STORAGE
export const removeLocalData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return "sucess"
  } catch (e) {
    return "error";
  }
}