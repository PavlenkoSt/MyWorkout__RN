import realm from '../index';

import {PRESET_DB} from '../realm.constants';

import {IPreset} from '@app/types/IPreset';

export const syncPresetsRealm = (presets: IPreset[]) => {
  realm.write(() => {
    try {
      presets.forEach(preset => {
        realm.create(PRESET_DB, preset, Realm.UpdateMode.All);
      });
    } catch (e) {
      console.log('realmMiddleware syncPresetsRealm error', e);
    }
  });
};
