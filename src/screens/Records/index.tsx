import React, {useMemo, useState} from 'react';
import {Text} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';

import Loader from '@app/components/Loader';
import ScreenContainer from '@app/components/ScreenContainer';
import useGetRecordsFromDB from '@app/hooks/db/useGetRecordsFromDB';
import useMounted from '@app/hooks/useMounted';
import {recordsSelector} from '@app/store/selectors/recordsSelector';
import {IRecord} from '@app/types/IRecord';

import RecordModal from './RecordModal';
import RecordsList from './RecordsList';
import SearchHeader from '@app/components/SearchHeader';
import BtnGhost from '@app/components/UI-kit/BtnGhost';

const Records = () => {
  const records = useSelector(recordsSelector);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState<IRecord | null>(null);
  const [searchValue, setSearchValue] = useState('');

  const recordsWithSearch = useMemo(() => {
    const searchStr = searchValue.trim().toLowerCase();
    return records.filter(record =>
      record.name.toLowerCase().includes(searchStr),
    );
  }, [records, searchValue]);

  const {mounted} = useMounted();

  const onEditRecordPress = (record: IRecord) => {
    setRecordToEdit(record);
    setIsModalVisible(true);
  };

  useGetRecordsFromDB();

  return (
    <ScreenContainer>
      <SearchHeader searchValue={searchValue} setSearchValue={setSearchValue}>
        <BtnGhost
          color="#fff"
          onPress={() => setIsModalVisible(true)}
          btnStyle={styles.btn}>
          + Add
        </BtnGhost>
      </SearchHeader>
      {!mounted ? (
        <Loader />
      ) : !recordsWithSearch.length && !searchValue ? (
        <Text style={styles.noDataText}>No records yet</Text>
      ) : !recordsWithSearch.length && !!searchValue ? (
        <Text style={styles.noDataText}>
          No records matching your request were found
        </Text>
      ) : (
        <RecordsList
          records={recordsWithSearch}
          onEditRecordPress={onEditRecordPress}
        />
      )}
      <RecordModal
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setRecordToEdit(null);
        }}
        recordToEdit={recordToEdit}
      />
    </ScreenContainer>
  );
};

export default Records;

const styles = EStyleSheet.create({
  noDataText: {
    color: '$white',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  btn: {
    paddingVertical: 0,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
