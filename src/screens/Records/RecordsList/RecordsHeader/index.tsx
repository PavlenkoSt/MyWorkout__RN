import React from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import {CELLS_FLEX, CELL_OFFSET, ROW_HEIGHT} from '../constants';

const RecordsHeader = () => {
  return (
    <View style={styles.container}>
      <View style={{flex: CELLS_FLEX[0]}}>
        <Text style={styles.text}>Exercise</Text>
      </View>
      <View style={{flex: CELLS_FLEX[1]}}>
        <Text style={styles.text}>Result</Text>
      </View>
    </View>
  );
};

export default RecordsHeader;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$primaryColor',
    minHeight: ROW_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#fff',
  },
  text: {
    margin: CELL_OFFSET,
    color: '#dedede',
  },
});
