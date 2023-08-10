import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

export enum LocalStorageKeys {
  EXERCISES = 'exercises',
}

class LocalStorageService {
  async get(key: LocalStorageKeys) {
    return await RNSecureStorage.get(key);
  }

  async set(key: LocalStorageKeys, value: string) {
    return await RNSecureStorage.set(key, value, {
      accessible: ACCESSIBLE.ALWAYS,
    });
  }

  async remove(key: LocalStorageKeys) {
    await RNSecureStorage.remove(key);
  }
}

export default new LocalStorageService();
