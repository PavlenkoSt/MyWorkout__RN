import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  FlatList,
  LayoutAnimation,
  ListRenderItem,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch, useSelector} from 'react-redux';

import useDebounce from '@app/hooks/useDebounce';
import {
  enableAutocompleteSelector,
  exercisesForAutocompleteSelector,
} from '@app/store/selectors/settingsSelector';
import {removeExerciseForAutocomplete} from '@app/store/slices/settingsSlice';
import HighlightText from '@sanar/react-native-highlight-text';
import CloseIcon from '../Icons/CloseIcon';
import Input from '../UI-kit/Input';

export interface IExerciseInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const UIManagerConfig = {
  duration: 250,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

let timeout: NodeJS.Timeout | null = null;

const ExerciseInput: FC<IExerciseInputProps> = ({
  onChangeText,
  value,
  ...rest
}) => {
  const exercises = useSelector(exercisesForAutocompleteSelector);
  const enableAutocomplete = useSelector(enableAutocompleteSelector);

  const dispatch = useDispatch();

  const [isFocused, setIsFocused] = useState(false);

  const debouncedValue = useDebounce(value, 300);

  const filteredSuggestions = useMemo(() => {
    if (!enableAutocomplete) return [];

    if (!isFocused || !debouncedValue) {
      LayoutAnimation.configureNext(UIManagerConfig);
      return [];
    }

    const filtered = exercises.filter(ex =>
      ex.toLowerCase().includes(debouncedValue.toLowerCase()),
    );

    if (filtered.length === 1 && debouncedValue === filtered[0]) {
      LayoutAnimation.configureNext(UIManagerConfig);
      return [];
    }

    LayoutAnimation.configureNext(UIManagerConfig);
    return filtered;
  }, [exercises, debouncedValue, isFocused, enableAutocomplete]);

  const renderItem: ListRenderItem<string> = useCallback(
    ({item}) => (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => onChangeText(item)}
          style={styles.item}>
          <HighlightText
            highlightStyle={{fontWeight: '700', color: '#e8e8e8'}}
            //@ts-ignore
            searchWords={[value]}
            textToHighlight={item}
            style={styles.itemText}>
            {item}
          </HighlightText>
          <TouchableOpacity
            onPress={() => dispatch(removeExerciseForAutocomplete(item))}>
            <CloseIcon fill="red" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    ),
    [value],
  );

  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    };
  }, []);

  const onBlur = () => {
    if (!enableAutocomplete) return;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      setIsFocused(false);
    }, 400);
  };

  const onFocus = () => {
    if (!enableAutocomplete) return;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => setIsFocused(true), 400);
  };

  return (
    <View style={styles.container}>
      <Input
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        {...rest}
      />
      {enableAutocomplete && (
        <View style={styles.suggestions}>
          <FlatList
            data={filteredSuggestions}
            keyExtractor={item => item}
            renderItem={renderItem}
            nestedScrollEnabled
            keyboardShouldPersistTaps="always"
            updateCellsBatchingPeriod={200}
            disableVirtualization
          />
        </View>
      )}
    </View>
  );
};

export default memo(ExerciseInput);

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  suggestions: {
    backgroundColor: '#222',
    borderRadius: 5,
    zIndex: 100000000,
    maxHeight: 150,
  },
  itemContainer: {
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    color: '$white',
  },
});
