import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch, useSelector} from 'react-redux';

import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import Loader from '@app/components/Loader';
import ScreenContainer from '@app/components/ScreenContainer';
import Switch from '@app/components/UI-kit/Switch';
import useMounted from '@app/hooks/useMounted';
import {
  defaultGoalsFilterSelector,
  enableAutocompleteSelector,
} from '@app/store/selectors/settingsSelector';
import {
  setDefaultGoalsFilter,
  setEnableAutocomplete,
  setExercisesForAutocomplete,
} from '@app/store/slices/settingsSlice';
import localStorage, {LocalStorageKeysEnum} from '@app/utilts/localStorage';

import Dropdown from '@app/components/UI-kit/Dropdown';
import {FilterGoalsEnum} from '../Goals/constants';
import Actions from './Actions';

const Settings = () => {
  const {mounted} = useMounted();

  const dispatch = useDispatch();

  const enableAutocomplete = useSelector(enableAutocompleteSelector);
  const defaultGoalsFilter = useSelector(defaultGoalsFilterSelector);

  useEffect(() => {
    const init = async () => {
      const defaultGoalsFilter = await localStorage.get(
        LocalStorageKeysEnum.DEFAULT_GOALS_FILTER,
      );
      const enableAutocomplete = await localStorage.get(
        LocalStorageKeysEnum.ENABLE_AUTOCOMPLETE,
      );

      const exercises =
        (await localStorage.get(LocalStorageKeysEnum.AUTOCOMPLETE_EXERCISES)) ||
        '[]';

      dispatch(setExercisesForAutocomplete(JSON.parse(exercises) || []));
      onChangeAutocomplete(enableAutocomplete === '1');
      onChangeDefaultGoalsFilter(
        defaultGoalsFilter
          ? (defaultGoalsFilter as FilterGoalsEnum)
          : FilterGoalsEnum.ALL,
      );
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

  const onChangeDefaultGoalsFilter = async (value: FilterGoalsEnum) => {
    dispatch(setDefaultGoalsFilter(value));
    await localStorage.set(LocalStorageKeysEnum.DEFAULT_GOALS_FILTER, value);
  };

  return (
    <ScreenContainer>
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
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Default goals filter</Text>
              <Dropdown
                defaultValue={defaultGoalsFilter}
                onSelect={onChangeDefaultGoalsFilter}
                data={[
                  FilterGoalsEnum.ALL,
                  FilterGoalsEnum.COMPLETED,
                  FilterGoalsEnum.INCOMPLETED,
                ]}
                buttonStyle={{flex: 1}}
              />
            </View>
          </View>
        </>
      )}
    </ScreenContainer>
  );
};

export default Settings;

const styles = EStyleSheet.create({
  settings: {
    paddingHorizontal: 10,
    gap: 20,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dropdownLabel: {
    color: '$white',
    fontSize: 16,
  },
});
