import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import realm from '@app/db';
import {PRESETS_DB} from '@app/db/realm.constants';
import {setPresets} from '@app/store/slices/presetsSlice';
import {IPreset} from '@app/types/IPreset';

const useGetPresetsFromDB = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const presets =
      (realm.objects(PRESETS_DB).toJSON() as unknown as IPreset[]) || [];

    dispatch(setPresets(presets));
  }, []);
};

export default useGetPresetsFromDB;
