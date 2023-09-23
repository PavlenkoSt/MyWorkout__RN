import React, {FC, useCallback, useState} from 'react';
import {Text, View} from 'react-native';
import DraggableFlatList, {
  DragEndParams,
  RenderItem,
} from 'react-native-draggable-flatlist';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch, useSelector} from 'react-redux';

import ConfirmModal from '@app/components/ConfirmModal';
import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import Btn from '@app/components/UI-kit/Btn';
import {presetsSelector} from '@app/store/selectors/presetsSelector';
import {
  changeExercisesOrderingInPreset,
  deleteExerciseInPreset,
} from '@app/store/slices/presetsSlice';
import {IExercise} from '@app/types/IExercise';

import Exercise from './Exercise';
import ExerciseModal from './ExerciseModal';

interface IProps {
  route: {
    params: {
      id: string;
    };
  };
}

const Preset: FC<IProps> = ({route}) => {
  const presetId = route.params.id;

  const preset = useSelector(presetsSelector).find(
    preset => preset.id === presetId,
  );

  const dispatch = useDispatch();

  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState<IExercise | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<IExercise | null>(
    null,
  );

  const onDeleteExercise = () => {
    if (!deleteCandidate) return;

    dispatch(deleteExerciseInPreset({exercise: deleteCandidate, presetId}));
  };

  const onEditPress = (exercise: IExercise) => {
    setExerciseToEdit(exercise);
    setExerciseModalVisible(true);
  };

  const renderItem: RenderItem<IExercise> = useCallback(
    ({item, isActive, getIndex, drag}) => {
      return (
        <Exercise
          exercise={item}
          idx={getIndex() || 0}
          isActive={isActive}
          drag={drag}
          onEditPress={onEditPress}
          onDeletePress={setDeleteCandidate}
        />
      );
    },
    [],
  );

  const onDragEnd = (params: DragEndParams<IExercise>) => {
    if (params.from === params.to) return;

    dispatch(
      changeExercisesOrderingInPreset({exercises: params.data, presetId}),
    );
  };

  if (!preset) return <Text>Preset not found</Text>;

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={EStyleSheet.value('$primaryColor')}
        barStyle="light-content"
      />
      {!preset.exercises.length ? (
        <Text style={styles.noItemsText}>No exercises in preset yet</Text>
      ) : (
        <View>
          <DraggableFlatList
            data={preset.exercises}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            onDragEnd={onDragEnd}
            extraData={[preset.exercises]}
          />
        </View>
      )}
      <View style={styles.btnContainer}>
        <Btn onPress={() => setExerciseModalVisible(true)}>+ Add</Btn>
      </View>
      <ExerciseModal
        visible={exerciseModalVisible}
        onClose={() => {
          setExerciseModalVisible(false);
          setExerciseToEdit(null);
        }}
        presetId={presetId}
        exerciseToEdit={exerciseToEdit}
      />
      <ConfirmModal
        visible={!!deleteCandidate}
        onClose={() => setDeleteCandidate(null)}
        onConfirm={onDeleteExercise}
      />
    </View>
  );
};

export default Preset;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  noItemsText: {
    fontSize: 18,
    color: '$white',
    marginTop: 20,
    marginBottom: 5,
    textAlign: 'center',
  },
  btnContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
});
