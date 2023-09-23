import React, {Dispatch, FC, SetStateAction, useCallback, useRef} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import SwipeableItem, {
  SwipeableItemImperativeRef,
} from 'react-native-swipeable-item';

import ListUnderlayActions from '@app/components/ListUnderlayActions';
import useTypedNavigation from '@app/hooks/useTypedNavigation';
import {IPreset} from '@app/types/IPreset';
import {SWIPABLE_ITEM_CONFIG} from '@app/utilts/constants';

const BTN_WIDTH = 100;
const BTN_OFFSET = 5;
const SNAP_POINT = BTN_WIDTH * 2 + BTN_OFFSET * 3;

interface IProps {
  preset: IPreset;
  setDeleteConfirmCandidate: Dispatch<SetStateAction<string | null>>;
  onEditPress: (preset: IPreset) => void;
}

const PresetItem: FC<IProps> = ({
  preset,
  setDeleteConfirmCandidate,
  onEditPress,
}) => {
  const navigation = useTypedNavigation();

  const swipableRef = useRef<SwipeableItemImperativeRef | null>(null);

  const renderUnderlayLeft = useCallback((preset: IPreset) => {
    return (
      <ListUnderlayActions
        onDeletePress={() => setDeleteConfirmCandidate(preset.id)}
        onEditPress={() => {
          onEditPress(preset);
          swipableRef.current?.close();
        }}
        actionPanelWidth={SNAP_POINT}
        inRow
      />
    );
  }, []);

  return (
    <SwipeableItem
      key={preset.id}
      ref={swipableRef}
      item={preset}
      {...SWIPABLE_ITEM_CONFIG}
      renderUnderlayLeft={params => renderUnderlayLeft(preset)}
      snapPointsLeft={[SNAP_POINT]}>
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
});
