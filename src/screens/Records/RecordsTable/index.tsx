import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {Row, Table} from 'react-native-table-component';
import {useDispatch} from 'react-redux';

import ContextMenu from '@app/components/UI-kit/ContextMenu';
import {deleteRecord} from '@app/store/slices/recordsSlice';
import {IRecord} from '@app/types/IRecord';
import {
  DELETE_OPTION,
  OPTIONS_DOTS,
  UPDATE_OPTION,
} from '@app/utilts/constants';

const OPTIONS_SIZE = 30;
const ROW_HEIGHT = 50;

interface IProps {
  records: IRecord[];
  onEditRecordPress: (record: IRecord) => void;
}

const RecordsTable: FC<IProps> = ({records, onEditRecordPress}) => {
  const dispatch = useDispatch();

  const onDelete = (id: string) => {
    dispatch(deleteRecord(id));
  };

  return (
    <Table style={styles.table}>
      <Row
        data={['Name', 'Count', 'Units']}
        style={styles.head}
        textStyle={styles.headerText}
      />
      {records.map(record => (
        <View key={record.id}>
          <View style={styles.optionsWrapper}>
            <ContextMenu
              actions={[
                {text: UPDATE_OPTION, action: () => onEditRecordPress(record)},
                {
                  text: DELETE_OPTION,
                  action: () => onDelete(record.id),
                },
              ]}>
              <Text style={styles.options}>{OPTIONS_DOTS}</Text>
            </ContextMenu>
          </View>
          <Row
            data={[record.name, record.count, record.units]}
            textStyle={styles.text}
            style={styles.row}
          />
        </View>
      ))}
    </Table>
  );
};

export default RecordsTable;

const styles = EStyleSheet.create({
  table: {
    marginBottom: 20,
  },
  head: {
    backgroundColor: '$primaryColor',
    minHeight: ROW_HEIGHT,
  },
  text: {
    margin: 6,
    color: '#fff',
  },
  headerText: {
    margin: 6,
    color: '#dedede',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#212121',
    position: 'relative',
    minHeight: ROW_HEIGHT,
  },
  options: {
    color: '$white',
    width: OPTIONS_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 25,
    height: ROW_HEIGHT,
  },
  optionsWrapper: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -(ROW_HEIGHT / 2)}],
    right: 0,
    zIndex: 1000,
  },
});
