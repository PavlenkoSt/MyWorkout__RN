import {FilterGoalsEnum} from '@app/screens/Goals/constants';
import {
  defaultGoalsFilterSelector,
  enableAutocompleteSelector,
  enableStartRestTimerAfterStaticExerciseSelector,
} from '@app/store/selectors/settingsSelector';
import {
  setDefaultGoalsFilter,
  setEnableAutocomplete,
  setEnableStartRestTimerAfterStaticExercise,
  setExercisesForAutocomplete,
} from '@app/store/slices/settingsSlice';
import localStorage, {LocalStorageKeysEnum} from '@app/utilts/localStorage';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const useSettings = () => {
  const dispatch = useDispatch();

  const enableAutocomplete = useSelector(enableAutocompleteSelector);
  const defaultGoalsFilter = useSelector(defaultGoalsFilterSelector);
  const enableStartRestTimerAfterStaticExercise = useSelector(
    enableStartRestTimerAfterStaticExerciseSelector,
  );

  useEffect(() => {
    const init = async () => {
      const defaultGoalsFilter = await localStorage.get(
        LocalStorageKeysEnum.DEFAULT_GOALS_FILTER,
      );
      const enableAutocomplete = await localStorage.get(
        LocalStorageKeysEnum.ENABLE_AUTOCOMPLETE,
      );
      const enableStartRestTimerAfterStaticExercise = await localStorage.get(
        LocalStorageKeysEnum.ENABLE_START_REST_TIMER_AFTER_STATIC_EXERCISE,
      );

      const exercises =
        (await localStorage.get(LocalStorageKeysEnum.AUTOCOMPLETE_EXERCISES)) ||
        '[]';

      dispatch(setExercisesForAutocomplete(JSON.parse(exercises) || []));
      onChangeAutocomplete(enableAutocomplete === '1');
      onChangeEnableStartRestTimerAfterStaticExercise(
        enableStartRestTimerAfterStaticExercise === '1',
      );
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

  const onChangeEnableStartRestTimerAfterStaticExercise = async (
    value: boolean,
  ) => {
    dispatch(setEnableStartRestTimerAfterStaticExercise(value));
    await localStorage.set(
      LocalStorageKeysEnum.ENABLE_START_REST_TIMER_AFTER_STATIC_EXERCISE,
      value ? '1' : '0',
    );
  };

  const onChangeDefaultGoalsFilter = async (value: FilterGoalsEnum) => {
    dispatch(setDefaultGoalsFilter(value));
    await localStorage.set(LocalStorageKeysEnum.DEFAULT_GOALS_FILTER, value);
  };

  return {
    enableAutocomplete,
    defaultGoalsFilter,
    enableStartRestTimerAfterStaticExercise,
    onChangeAutocomplete,
    onChangeEnableStartRestTimerAfterStaticExercise,
    onChangeDefaultGoalsFilter,
  };
};

export default useSettings;
