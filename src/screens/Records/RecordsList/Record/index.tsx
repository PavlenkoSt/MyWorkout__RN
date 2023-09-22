import React, {FC, useCallback, useRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaleDecorator} from 'react-native-draggable-flatlist';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import SwipeableItem, {
  SwipeableItemImperativeRef,
} from 'react-native-swipeable-item';
import {useDispatch} from 'react-redux';

import ListUnderlayActions from '@app/components/ListUnderlayActions';
import {deleteRecord} from '@app/store/slices/recordsSlice';
import {IRecord} from '@app/types/IRecord';
import {SWIPABLE_ITEM_CONFIG} from '@app/utilts/constants';
import {CELLS_FLEX, CELL_OFFSET, ROW_HEIGHT} from '../constants';

interface IProps {
  record: IRecord;
  drag: () => void;
  onEditRecordPress: (record: IRecord) => void;
  isActive: boolean;
}

const ACTION_PANEL_WIDTH = 200;

const Record: FC<IProps> = ({record, drag, onEditRecordPress, isActive}) => {
  const itemRef = useRef<SwipeableItemImperativeRef>(null);

  const dispatch = useDispatch();

  const renderUnderlayLeft = useCallback(
    (record: IRecord) => (
      <ListUnderlayActions
        onDeletePress={() => dispatch(deleteRecord(record.id))}
        onEditPress={() => {
          itemRef.current?.close();
          onEditRecordPress(record);
        }}
        actionPanelWidth={ACTION_PANEL_WIDTH}
        inRow
      />
    ),
    [],
  );

  return (
    <SwipeableItem
      key={record.id}
      ref={itemRef}
      item={record}
      swipeEnabled={!isActive}
      {...SWIPABLE_ITEM_CONFIG}
      renderUnderlayLeft={params => renderUnderlayLeft(record)}
      snapPointsLeft={[ACTION_PANEL_WIDTH]}>
      <ScaleDecorator activeScale={0.9}>
        <TouchableOpacity
          onPress={() => itemRef.current?.close()}
          onLongPress={drag}
          activeOpacity={1}
          style={styles.container}>
          <View style={{flex: CELLS_FLEX[0]}}>
            <Text style={styles.text}>{record.name}</Text>
          </View>
          <View style={{flex: CELLS_FLEX[1]}}>
            <Text style={styles.text}>{`${record.count} ${record.units}`}</Text>
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    </SwipeableItem>
  );
};

export default Record;

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    minHeight: ROW_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  text: {
    margin: CELL_OFFSET,
    color: '#fff',
    fontWeight: '500',
  },
});
