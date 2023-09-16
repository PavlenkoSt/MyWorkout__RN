import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';

import Btn from '@app/components/UI-kit/Btn';
import useGetRecordsFromDB from '@app/hooks/useGetRecordsFromDB';
import {recordsSelector} from '@app/store/selectors/recordsSelector';
import {IRecord} from '@app/types/IRecord';

import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import RecordModal from './RecordModal';
import RecordsList from './RecordsList';

const Records = () => {
  const records = useSelector(recordsSelector);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState<IRecord | null>(null);

  const onEditRecordPress = (record: IRecord) => {
    setRecordToEdit(record);
    setIsModalVisible(true);
  };

  useGetRecordsFromDB();

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={EStyleSheet.value('$primaryColor')}
        barStyle="light-content"
      />
      {records.length ? (
        <RecordsList
          records={records}
          onEditRecordPress={onEditRecordPress}
          onAddNewRecordPress={() => setIsModalVisible(true)}
        />
      ) : (
        <>
          <Text style={styles.noDataText}>No records yet</Text>
          <View style={styles.btnContainer}>
            <Btn onPress={() => setIsModalVisible(true)}>+ Create first</Btn>
          </View>
        </>
      )}
      <RecordModal
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setRecordToEdit(null);
        }}
        recordToEdit={recordToEdit}
      />
    </View>
  );
};

export default Records;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  noDataText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});
