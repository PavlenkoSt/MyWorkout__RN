import LottieView from 'lottie-react-native';
import React, {FC, useState} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch, useSelector} from 'react-redux';

import {ConfirmModal} from '@app/components/ConfirmModal';
import {PresetModal} from '@app/components/PresetModal';
import {ContextMenu} from '@app/components/UI-kit';
import {
  activeDateSelector,
  trainingDateSelector,
} from '@app/store/selectors/trainingDaySelectors';
import {deleteExercise} from '@app/store/slices/trainingDaySlice';
import {toastService} from '@app/services/toast.service';

import CopyDayModal from './CopyDayModal';
import {TRAINING_DAY_DELETED} from './constants';

const TrainingHeader: FC = () => {
  const activeDate = useSelector(activeDateSelector);
  const trainingDay = useSelector(trainingDateSelector);

  const dispatch = useDispatch();

  const [copyDayModalVisible, setCopyDayModalVisible] = useState(false);
  const [presetModalVisible, setPresetModalVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

  const atLeastOneExercise = !!trainingDay?.exercises.length;
  const allExercisesDone = trainingDay?.exercises.every(
    ex => ex.setsDone >= ex.sets,
  );

  const onDeleteTrainingDay = () => {
    if (!trainingDay?.exercises?.length) return;

    trainingDay.exercises.forEach(ex => {
      dispatch(deleteExercise({id: ex.id}));
    });
    toastService.success(TRAINING_DAY_DELETED);
  };

  return (
    <>
      <ContextMenu
        disabled={!atLeastOneExercise}
        actions={[
          {
            action: () => setCopyDayModalVisible(true),
            text: 'Copy training day',
          },
          {
            action: () => setPresetModalVisible(true),
            text: 'Save as preset',
          },
          {
            action: () => setDeleteConfirmVisible(true),
            text: 'Delete training',
            danger: true,
          },
        ]}>
        <View style={styles.header}>
          <Text style={styles.text}>
            Workout session - {new Date(activeDate).toDateString()}
          </Text>
          {atLeastOneExercise && allExercisesDone && (
            <LottieView
              source={require('@app/assets/animations/Check.json')}
              autoPlay
              loop={false}
              style={{width: 35, height: 35}}
            />
          )}
        </View>
      </ContextMenu>
      {atLeastOneExercise && (
        <>
          <CopyDayModal
            visible={copyDayModalVisible}
            onClose={() => setCopyDayModalVisible(false)}
          />
          <PresetModal
            visible={presetModalVisible}
            onClose={() => setPresetModalVisible(false)}
            presetToEdit={null}
            initialExercises={trainingDay.exercises}
          />
          <ConfirmModal
            visible={deleteConfirmVisible}
            onClose={() => setDeleteConfirmVisible(false)}
            onConfirm={onDeleteTrainingDay}
          />
        </>
      )}
    </>
  );
};

export default TrainingHeader;

const styles = EStyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
  },
});
