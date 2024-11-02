import {FilterGoalsEnum} from '@app/screens/Goals/constants';
import {
  defaultGoalsFilterSelector,
  enableAutocompleteSelector,
  enableExerciseScreenSelector,
  enableStartRestTimerAfterStaticExerciseSelector,
} from '@app/store/selectors/settingsSelector';
import {
  setDefaultGoalsFilter,
  setEnableAutocomplete,
  setEnableExerciseScreen,
  setEnableStartRestTimerAfterStaticExercise,
  setExercisesForAutocomplete,
} from '@app/store/slices/settingsSlice';
import {
  LocalStorageKeysEnum,
  localStorageService,
} from '@app/services/localStorage.service';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const useSettings = () => {
  const dispatch = useDispatch();

  const enableAutocomplete = useSelector(enableAutocompleteSelector);
  const enableExerciseScreen = useSelector(enableExerciseScreenSelector);
  const defaultGoalsFilter = useSelector(defaultGoalsFilterSelector);
  const enableStartRestTimerAfterStaticExercise = useSelector(
    enableStartRestTimerAfterStaticExerciseSelector,
  );

  useEffect(() => {
    const init = async () => {
      const defaultGoalsFilter = await localStorageService.get(
        LocalStorageKeysEnum.DEFAULT_GOALS_FILTER,
      );
      const enableAutocomplete = await localStorageService.get(
        LocalStorageKeysEnum.ENABLE_AUTOCOMPLETE,
      );
      const enableExerciseScreen = await localStorageService.get(
        LocalStorageKeysEnum.ENABLE_EXERCISE_SCREEN,
      );
      const enableStartRestTimerAfterStaticExercise =
        await localStorageService.get(
          LocalStorageKeysEnum.ENABLE_START_REST_TIMER_AFTER_STATIC_EXERCISE,
        );

      const exercises =
        (await localStorageService.get(
          LocalStorageKeysEnum.AUTOCOMPLETE_EXERCISES,
        )) || '[]';

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
      onChangeEnableExerciseScreen(enableExerciseScreen === '1');
    };

    init();
  }, []);

  const onChangeAutocomplete = async (value: boolean) => {
    dispatch(setEnableAutocomplete(value));
    await localStorageService.set(
      LocalStorageKeysEnum.ENABLE_AUTOCOMPLETE,
      value ? '1' : '0',
    );
  };

  const onChangeEnableExerciseScreen = async (value: boolean) => {
    dispatch(setEnableExerciseScreen(value));
    await localStorageService.set(
      LocalStorageKeysEnum.ENABLE_EXERCISE_SCREEN,
      value ? '1' : '0',
    );
  };

  const onChangeEnableStartRestTimerAfterStaticExercise = async (
    value: boolean,
  ) => {
    dispatch(setEnableStartRestTimerAfterStaticExercise(value));
    await localStorageService.set(
      LocalStorageKeysEnum.ENABLE_START_REST_TIMER_AFTER_STATIC_EXERCISE,
      value ? '1' : '0',
    );
  };

  const onChangeDefaultGoalsFilter = async (value: FilterGoalsEnum) => {
    dispatch(setDefaultGoalsFilter(value));
    await localStorageService.set(
      LocalStorageKeysEnum.DEFAULT_GOALS_FILTER,
      value,
    );
  };

  return {
    enableAutocomplete,
    defaultGoalsFilter,
    enableStartRestTimerAfterStaticExercise,
    enableExerciseScreen,
    onChangeAutocomplete,
    onChangeEnableStartRestTimerAfterStaticExercise,
    onChangeDefaultGoalsFilter,
    onChangeEnableExerciseScreen,
  };
};

export default useSettings;
