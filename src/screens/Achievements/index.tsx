import React from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';

import Btn from '@app/components/UI-kit/Btn';
import {archivementsSelector} from '@app/store/selectors/archivementsSelector';

const Achievements = () => {
  const archivements = useSelector(archivementsSelector);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Archivements</Text>
      <>
        {archivements.length ? (
          archivements.map(archivement => <Text key={archivement.id}>1</Text>)
        ) : (
          <Text style={styles.noDataText}>No archivements yet</Text>
        )}
      </>
      <View style={styles.btnContainer}>
        <Btn onPress={() => {}}>
          {archivements.length ? '+ Add archivement' : '+ Create first'}
        </Btn>
      </View>
    </View>
  );
};

export default Achievements;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  noDataText: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
