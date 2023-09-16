import React, {FC, useCallback} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';

import {setRecords} from '@app/store/slices/recordsSlice';
import {IRecord} from '@app/types/IRecord';
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
} from 'react-native-draggable-flatlist';

import Btn from '@app/components/UI-kit/Btn';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import Record from './Record';
import RecordsHeader from './RecordsHeader';

interface IProps {
  records: IRecord[];
  onEditRecordPress: (record: IRecord) => void;
  onAddNewRecordPress: () => void;
}

const RecordsList: FC<IProps> = ({
  records,
  onEditRecordPress,
  onAddNewRecordPress,
}) => {
  const dispatch = useDispatch();

  const onDragEnd = ({data, from, to}: DragEndParams<IRecord>) => {
    if (from === to) return;

    dispatch(setRecords(data));
  };

  const renderItem = useCallback(
    ({item: record, drag, isActive}: RenderItemParams<IRecord>) => {
      return (
        <Record
          record={record}
          drag={drag}
          onEditRecordPress={onEditRecordPress}
          isActive={isActive}
        />
      );
    },
    [],
  );

  const renderFoorter = useCallback(
    () => (
      <View style={styles.btnContainer}>
        <Btn onPress={onAddNewRecordPress}>+ Add record</Btn>
      </View>
    ),
    [],
  );

  return (
    <DraggableFlatList
      extraData={records}
      ListHeaderComponent={RecordsHeader}
      stickyHeaderIndices={[0]}
      data={records}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      onDragEnd={onDragEnd}
      ListFooterComponent={renderFoorter}
    />
  );
};

export default RecordsList;

const styles = EStyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});
