import React from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import {FocusAwareStatusBar} from '@app/components/FocusAwareStatusBar';
import {Loader} from '@app/components/Loader';
import {ScreenContainer} from '@app/components/ScreenContainer';
import {Switch, Dropdown} from '@app/components/UI-kit';
import useMounted from '@app/hooks/useMounted';

import {FilterGoalsEnum} from '../Goals/constants';
import Actions from './Actions';
import useSettings from './useSettings';

const Settings = () => {
  const {mounted} = useMounted();

  const {
    defaultGoalsFilter,
    enableAutocomplete,
    enableStartRestTimerAfterStaticExercise,
    enableExerciseScreen,
    onChangeAutocomplete,
    onChangeDefaultGoalsFilter,
    onChangeEnableStartRestTimerAfterStaticExercise,
    onChangeEnableExerciseScreen,
  } = useSettings();

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
            <Switch
              value={enableStartRestTimerAfterStaticExercise}
              onValueChange={onChangeEnableStartRestTimerAfterStaticExercise}>
              Enable automatically start rest timer after static exercise
            </Switch>
            <Switch
              value={enableExerciseScreen}
              onValueChange={onChangeEnableExerciseScreen}>
              Enable exercise screen
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
