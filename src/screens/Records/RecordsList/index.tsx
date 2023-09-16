import React, {FC, useCallback} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';

import {setRecords} from '@app/store/slices/recordsSlice';
import {IRecord} from '@app/types/IRecord';
import DraggableFlatList, {
  DragEndParams,
  RenderItemParams,
} from 'react-native-draggable-flatlist';

import Record from './Record';
import RecordsHeader from './RecordsHeader';

interface IProps {
  records: IRecord[];
  onEditRecordPress: (record: IRecord) => void;
}

const RecordsList: FC<IProps> = ({records, onEditRecordPress}) => {
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

  return (
    <View>
      <RecordsHeader />
      <DraggableFlatList
        extraData={records}
        data={records}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onDragEnd={onDragEnd}
      />
    </View>
  );
};

export default RecordsList;
