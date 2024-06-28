import AsyncStorage from '@react-native-async-storage/async-storage';

export enum LocalStorageKeysEnum {
  ENABLE_AUTOCOMPLETE = 'ENABLE_AUTOCOMPLETE',
  ENABLE_EXERCISE_SCREEN = 'ENABLE_EXERCISE_SCREEN',
  ENABLE_START_REST_TIMER_AFTER_STATIC_EXERCISE = 'ENABLE_START_REST_TIMER_AFTER_STATIC_EXERCISE',
  AUTOCOMPLETE_EXERCISES = 'AUTOCOMPLETE_EXERCISES',
  DEFAULT_GOALS_FILTER = 'DEFAULT_GOALS_FILTER',
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
