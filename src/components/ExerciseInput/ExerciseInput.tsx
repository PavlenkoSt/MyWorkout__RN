import React, {memo, useEffect, useState} from 'react';
import {TextInputProps, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';

import {enableAutocompleteSelector} from '@app/store/selectors/settingsSelector';
import Input from '../UI-kit/Input';
import {SuggestionsWindow} from './components';

export interface IExerciseInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

let timeout: NodeJS.Timeout | null = null;

export default memo(function ExerciseInput({
  onChangeText,
  value,
  ...rest
}: IExerciseInputProps) {
  const enableAutocomplete = useSelector(enableAutocompleteSelector);

  const [isFocused, setIsFocused] = useState(false);

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

  const onSuggestionPress = (suggestion: string) => onChangeText(suggestion);

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
        <SuggestionsWindow
          value={value}
          isActive={isFocused}
          onSuggestionPress={onSuggestionPress}
        />
      )}
    </View>
  );
});

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'column',
  },
});
