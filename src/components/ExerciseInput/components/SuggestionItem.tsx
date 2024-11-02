import CloseIcon from '@app/components/Icons/CloseIcon';
import {removeExerciseForAutocomplete} from '@app/store/slices/settingsSlice';
import {ColorVars} from '@app/utilts/theme';
import HighlightText from '@sanar/react-native-highlight-text';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch} from 'react-redux';

interface IProps {
  item: string;
  search: string;
  onPress: () => void;
}

export default function SuggestionItem({item, search, onPress}: IProps) {
  const dispatch = useDispatch();

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={onPress} style={styles.item}>
        <HighlightText
          highlightStyle={{fontWeight: '700', color: '#e8e8e8'}}
          //@ts-ignore
          searchWords={[search]}
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
  );
}

const styles = EStyleSheet.create({
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
    color: ColorVars.$white,
  },
});
