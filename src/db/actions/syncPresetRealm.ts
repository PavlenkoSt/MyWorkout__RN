import realm from '../index';
import {PRESETS_DB} from '../realm.constants';

import {IPreset} from '@app/types/IPreset';

export const syncPresetsRealm = (presets: IPreset[]) => {
  realm.write(() => {
    try {
      presets.forEach(preset => {
        realm.create(PRESETS_DB, preset, Realm.UpdateMode.All);
      });
    } catch (e) {
      console.log('realmMiddleware syncPresetsRealm error', e);
    }
  });
};
