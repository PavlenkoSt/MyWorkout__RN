import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch, useSelector} from 'react-redux';
import {v4} from 'uuid';

import ConfirmModal from '@app/components/ConfirmModal';
import Loader from '@app/components/Loader';
import ScreenContainer from '@app/components/ScreenContainer';
import SearchHeader from '@app/components/SearchHeader';
import BtnGhost from '@app/components/UI-kit/BtnGhost';
import Dropdown from '@app/components/UI-kit/Dropdown';
import useGetGoalsFromDB from '@app/hooks/db/useGetGoalsFromDB';
import useGetRecordsFromDB from '@app/hooks/db/useGetRecordsFromDB';
import useMounted from '@app/hooks/useMounted';
import {goalsSelector} from '@app/store/selectors/goalsSelector';
import {recordsSelector} from '@app/store/selectors/recordsSelector';
import {deleteGoal} from '@app/store/slices/goalsSlice';
import {addRecord, updateRecord} from '@app/store/slices/recordsSlice';
import {IGoal} from '@app/types/IGoal';
import showToast from '@app/utilts/showToast';

import GoalItem from './GoalItem';
import GoalModal from './GoalModal';

enum FilterGoalsEnum {
  ALL = 'All',
  INCOMPLETED = 'Incompleted',
  COMPLETED = 'Completed',
}

const Goals = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState<IGoal | null>(null);
  const [goalToDelete, setGoalToDelete] = useState<IGoal | null>(null);

  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState<FilterGoalsEnum>(FilterGoalsEnum.ALL);

  const dispatch = useDispatch();

  useGetGoalsFromDB();
  useGetRecordsFromDB();

  const {mounted} = useMounted();

  const goals = useSelector(goalsSelector);
  const records = useSelector(recordsSelector);

  const onMoveToRecords = (goal: IGoal) => {
    const candidateInRecords = records.find(
      record => record.name === goal.name,
    );

    if (!candidateInRecords) {
      dispatch(
        addRecord({
          id: v4(),
          count: goal.countArchived,
          name: goal.name.trim(),
          units: goal.units,
        }),
      );

      showToast.success('Saved as a record');
      return;
    }

    if (candidateInRecords.count > goal.countArchived) {
      showToast.error('This record already exists with better result');
      return;
    }

    if (candidateInRecords.count === goal.countArchived) {
      showToast.error('This record already exists with such result');
      return;
    }

    dispatch(
      updateRecord({
        ...candidateInRecords,
        count: goal.countArchived,
      }),
    );

    showToast.success('Updated existing record, good job');
  };

  const onEditPress = (goal: IGoal) => {
    setGoalToEdit(goal);
    setModalVisible(true);
  };

  const onDeleteGoal = () => {
    if (!goalToDelete?.id) return;
    dispatch(deleteGoal(goalToDelete.id));
  };

  return (
    <ScreenContainer>
      <SearchHeader
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        column>
        <View style={styles.headerContainer}>
          <Dropdown
            data={[
              FilterGoalsEnum.ALL,
              FilterGoalsEnum.COMPLETED,
              FilterGoalsEnum.INCOMPLETED,
            ]}
            defaultValue={filter}
            onSelect={setFilter}
            arrowColor="#fff"
            buttonStyle={styles.dropdownButton}
          />
          <BtnGhost
            color="#fff"
            btnStyle={styles.addBtn}
            onPress={() => setModalVisible(true)}>
            + Add
          </BtnGhost>
        </View>
      </SearchHeader>
      {mounted ? (
        <View>
          {!goals.length ? (
            <Text style={styles.noGoalsMessage}>
              You haven't set any goals yet
            </Text>
          ) : (
            <View style={styles.goalsContainer}>
              {goals.map(goal => (
                <GoalItem
                  key={goal.id}
                  moveToRecord={onMoveToRecords}
                  goal={goal}
                  setGoalToDelete={setGoalToDelete}
                  onEditPress={onEditPress}
                />
              ))}
            </View>
          )}
        </View>
      ) : (
        <Loader />
      )}
      <GoalModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setGoalToEdit(null);
        }}
        goalToEdit={goalToEdit}
      />
      <ConfirmModal
        visible={!!goalToDelete}
        onClose={() => setGoalToDelete(null)}
        onConfirm={onDeleteGoal}
      />
    </ScreenContainer>
  );
};

export default Goals;

const styles = EStyleSheet.create({
  dropdownButton: {
    borderColor: '#fff',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  addBtn: {
    height: 40,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noGoalsMessage: {
    paddingVertical: 20,
    color: '$white',
    textAlign: 'center',
    fontSize: 16,
  },
  goalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
});
