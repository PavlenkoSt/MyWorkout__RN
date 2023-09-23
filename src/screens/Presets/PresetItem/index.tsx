import React, {Dispatch, FC, SetStateAction, useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import SwipeableItem from 'react-native-swipeable-item';

import BtnGhost from '@app/components/UI-kit/BtnGhost';
import useTypedNavigation from '@app/hooks/useTypedNavigation';
import {IPreset} from '@app/types/IPreset';
import {DELETE_OPTION, SWIPABLE_ITEM_CONFIG} from '@app/utilts/constants';

const OPENED_SNAP_POINT = 120;

interface IProps {
  preset: IPreset;
  setDeleteConfirmCandidate: Dispatch<SetStateAction<string | null>>;
}

const PresetItem: FC<IProps> = ({preset, setDeleteConfirmCandidate}) => {
  const navigation = useTypedNavigation();

  const renderUnderlayLeft = useCallback((preset: IPreset) => {
    return (
      <View style={styles.btns}>
        <BtnGhost
          color="red"
          btnStyle={{width: 110}}
          onPress={() => setDeleteConfirmCandidate(preset.id)}>
          {DELETE_OPTION}
        </BtnGhost>
      </View>
    );
  }, []);

  return (
    <SwipeableItem
      key={preset.id}
      item={preset}
      {...SWIPABLE_ITEM_CONFIG}
      renderUnderlayLeft={params => renderUnderlayLeft(preset)}
      onChange={({snapPoint}) => {
        if (snapPoint === OPENED_SNAP_POINT) {
          setDeleteConfirmCandidate(preset.id);
        }
      }}
      snapPointsLeft={[OPENED_SNAP_POINT]}>
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('Preset', {
            id: preset.id,
            name: preset.name,
          })
        }>
        <Text style={styles.itemText}>
          {preset.name} ({preset.exercises.length}{' '}
          {preset.exercises.length === 1 ? 'exercise' : 'exercises'})
        </Text>
      </TouchableOpacity>
    </SwipeableItem>
  );
};

export default PresetItem;

const styles = EStyleSheet.create({
  item: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#222',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
  btns: {
    alignItems: 'flex-end',
    padding: 5,
  },
});
