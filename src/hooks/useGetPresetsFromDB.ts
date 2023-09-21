import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import realm from '@app/db';
import {PRESET_DB} from '@app/db/realm.constants';
import {setPresets} from '@app/store/slices/presetsSlice';
import {IPreset} from '@app/types/IPreset';

const useGetPresetsFromDB = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const records =
      (realm.objects(PRESET_DB).toJSON() as unknown as IPreset[]) || [];

    dispatch(setPresets(records));
  }, []);
};

export default useGetPresetsFromDB;
