import React, {FC, useState} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';

import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import Btn from '@app/components/UI-kit/Btn';
import {presetsSelector} from '@app/store/selectors/presetsSelector';

import ExerciseModal from './ExerciseModal';

interface IProps {
  route: {
    params: {
      id: string;
    };
  };
}

const Preset: FC<IProps> = ({route}) => {
  const preset = useSelector(presetsSelector).find(
    preset => preset.id === route.params.id,
  );

  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);

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
        <></>
      )}
      <ExerciseModal
        visible={exerciseModalVisible}
        onClose={() => setExerciseModalVisible(false)}
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
