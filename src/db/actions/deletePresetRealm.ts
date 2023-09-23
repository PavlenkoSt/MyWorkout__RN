import realm from '../index';

import {IPreset} from '@app/types/IPreset';
import {PRESETS_DB} from '../realm.constants';

export const deletePresetRealm = (preset: IPreset) => {
  realm.write(() => {
    try {
      const targetPreset = realm
        .objects(PRESETS_DB)
        .find(value => value.toJSON().id === preset.id);

      if (!targetPreset) {
        console.error('Tried to delete preset, but not found in db', preset);
        return;
      }

      realm.delete(targetPreset);
    } catch (e) {
      console.error(e);
    }
  });
};
