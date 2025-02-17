import React, {useEffect, useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch, useSelector} from 'react-redux';
import {v4} from 'uuid';

import {ConfirmModal} from '@app/components/ConfirmModal';
import {Loader} from '@app/components/Loader';
import {ScreenContainer} from '@app/components/ScreenContainer';
import {SearchHeader} from '@app/components/SearchHeader';
import {BtnGhost, Dropdown} from '@app/components/UI-kit';
import useGetGoalsFromDB from '@app/hooks/db/useGetGoalsFromDB';
import useGetRecordsFromDB from '@app/hooks/db/useGetRecordsFromDB';
import useMounted from '@app/hooks/useMounted';
import {goalsSelector} from '@app/store/selectors/goalsSelector';
import {recordsSelector} from '@app/store/selectors/recordsSelector';
import {defaultGoalsFilterSelector} from '@app/store/selectors/settingsSelector';
import {deleteGoal} from '@app/store/slices/goalsSlice';
import {addRecord, updateRecord} from '@app/store/slices/recordsSlice';
import {IGoal} from '@app/types/IGoal';
import {toastService} from '@app/services/toast.service';
import {ColorVars} from '@app/utilts/theme';

import GoalModal from './GoalModal';
import GoalsBody from './GoalsBody';
import {FilterGoalsEnum} from './constants';

const Goals = () => {
  const defaultGoalsFilter = useSelector(defaultGoalsFilterSelector);
  const goals = useSelector(goalsSelector);
  const records = useSelector(recordsSelector);

  const [modalVisible, setModalVisible] = useState(false);
  const [goalToEdit, setGoalToEdit] = useState<IGoal | null>(null);
  const [goalToDelete, setGoalToDelete] = useState<IGoal | null>(null);

  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState<FilterGoalsEnum>(
    defaultGoalsFilter || FilterGoalsEnum.ALL,
  );

  useGetGoalsFromDB();
  useGetRecordsFromDB();

  const {mounted} = useMounted();

  const dispatch = useDispatch();

  useEffect(() => {
    setFilter(defaultGoalsFilter);
  }, [defaultGoalsFilter]);

  const divinedGoals = useMemo(() => {
    const completed: IGoal[] = [];
    const incompleted: IGoal[] = [];

    const sorted = [...goals].sort(
      (a, b) => b.completionUpdatedAtTimestamp - a.completionUpdatedAtTimestamp,
    );

    sorted.forEach(goal => {
      if (goal.countArchived >= goal.count) {
        completed.push(goal);
      } else {
        incompleted.push(goal);
      }
    });

    return {
      completed,
      incompleted,
    };
  }, [goals]);

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

      toastService.success('Saved as a record');
      return;
    }

    if (candidateInRecords.count > goal.countArchived) {
      toastService.error('This record already exists with better result');
      return;
    }

    if (candidateInRecords.count === goal.countArchived) {
      toastService.error('This record already exists with such result');
      return;
    }

    dispatch(
      updateRecord({
        ...candidateInRecords,
        count: goal.countArchived,
      }),
    );

    toastService.success('Updated existing record, good job');
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
            <GoalsBody
              divinedGoals={divinedGoals}
              filter={filter}
              searchValue={searchValue}
              onEditPress={onEditPress}
              onMoveToRecords={onMoveToRecords}
              setGoalToDelete={setGoalToDelete}
            />
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
    color: ColorVars.$white,
    textAlign: 'center',
    fontSize: 16,
  },
});
