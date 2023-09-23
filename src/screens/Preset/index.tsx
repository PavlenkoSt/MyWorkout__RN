import React, {FC, useCallback, useState} from 'react';
import {FlatList, ListRenderItem, Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';

import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import Btn from '@app/components/UI-kit/Btn';
import {presetsSelector} from '@app/store/selectors/presetsSelector';

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

  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);

  const renderItem: ListRenderItem<IExercise> = useCallback(info => {
    return <Exercise exercise={info.item} />;
  }, []);

  if (!preset) return <Text>Preset not found</Text>;

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={EStyleSheet.value('$primaryColor')}
        barStyle="light-content"
      />
      {!preset.exercises.length ? (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>No exercises in preset yet</Text>
          <Btn onPress={() => setExerciseModalVisible(true)}>+ Add</Btn>
        </View>
      ) : (
        <FlatList
          data={preset.exercises}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
      <ExerciseModal
        visible={exerciseModalVisible}
        onClose={() => setExerciseModalVisible(false)}
        presetId={presetId}
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
  noItemsContainer: {
    marginVertical: 20,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemsText: {
    fontSize: 18,
    color: '$white',
    marginBottom: 10,
  },
});
