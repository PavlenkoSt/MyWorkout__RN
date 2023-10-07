import React, {useEffect} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch, useSelector} from 'react-redux';

import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import Loader from '@app/components/Loader';
import Switch from '@app/components/UI-kit/Switch';
import useMounted from '@app/hooks/useMounted';
import {enableAutocompleteSelector} from '@app/store/selectors/settingsSelector';
import {
  setEnableAutocomplete,
  setExercisesForAutocomplete,
} from '@app/store/slices/settingsSlice';
import localStorage, {LocalStorageKeysEnum} from '@app/utilts/localStorage';

import Actions from './Actions';

const Settings = () => {
  const {mounted} = useMounted();

  const dispatch = useDispatch();

  const enableAutocomplete = useSelector(enableAutocompleteSelector);

  useEffect(() => {
    const init = async () => {
      const value = await localStorage.get(
        LocalStorageKeysEnum.ENABLE_AUTOCOMPLETE,
      );

      const exercises =
        (await localStorage.get(LocalStorageKeysEnum.AUTOCOMPLETE_EXERCISES)) ||
        '[]';

      console.log('exercises12', exercises);

      dispatch(setExercisesForAutocomplete(JSON.parse(exercises) || []));
      onChangeAutocomplete(value === '1');
    };

    init();
  }, []);

  const onChangeAutocomplete = async (value: boolean) => {
    dispatch(setEnableAutocomplete(value));
    await localStorage.set(
      LocalStorageKeysEnum.ENABLE_AUTOCOMPLETE,
      value ? '1' : '0',
    );
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={EStyleSheet.value('$bgColor')}
        barStyle="light-content"
      />
      {!mounted ? (
        <Loader />
      ) : (
        <>
          <Actions />
          <View style={styles.settings}>
            <Switch
              value={enableAutocomplete}
              onValueChange={onChangeAutocomplete}>
              Enable autocomplete for exercise
            </Switch>
          </View>
        </>
      )}
    </View>
  );
};

export default Settings;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  settings: {
    paddingHorizontal: 10,
  },
});
