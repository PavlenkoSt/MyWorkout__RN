import React, {useCallback, useMemo} from 'react';
import {FlatList, LayoutAnimation, ListRenderItem, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import SuggestionItem from './SuggestionItem';
import useDebounce from '@app/hooks/useDebounce';
import {useSelector} from 'react-redux';
import {exercisesForAutocompleteSelector} from '@app/store/selectors/settingsSelector';

interface IProps {
  value: string;
  isActive: boolean;
  onSuggestionPress: (suggestion: string) => void;
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

export default function SuggestionsWindow({
  value,
  isActive,
  onSuggestionPress,
}: IProps) {
  const exercises = useSelector(exercisesForAutocompleteSelector);

  const debouncedValue = useDebounce(value, 300);

  const filteredSuggestions = useMemo(() => {
    if (!isActive || !debouncedValue || debouncedValue.length < 2) {
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
  }, [exercises, debouncedValue, isActive]);

  const renderItem: ListRenderItem<string> = useCallback(
    ({item}) => (
      <SuggestionItem
        item={item}
        search={debouncedValue}
        onPress={() => onSuggestionPress(item)}
      />
    ),
    [debouncedValue],
  );

  return (
    <View style={styles.container}>
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
  );
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#222',
    borderRadius: 5,
    zIndex: 100000000,
    maxHeight: 150,
  },
});
