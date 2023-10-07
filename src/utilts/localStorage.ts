import AsyncStorage from '@react-native-async-storage/async-storage';

export enum LocalStorageKeysEnum {
  ENABLE_AUTOCOMPLETE = 'ENABLE_AUTOCOMPLETE',
  AUTOCOMPLETE_EXERCISES = 'AUTOCOMPLETE_EXERCISES',
}

class LocalStorage {
  async get(key: LocalStorageKeysEnum) {
    return await AsyncStorage.getItem(key);
  }
  async set(key: LocalStorageKeysEnum, value: string) {
    return await AsyncStorage.setItem(key, value);
  }
  async remove(key: LocalStorageKeysEnum) {
    await AsyncStorage.removeItem(key);
  }
}

export default new LocalStorage();
