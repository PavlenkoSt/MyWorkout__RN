import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import {DELETE_OPTION, UPDATE_OPTION} from '@app/utilts/constants';

interface IProps {
  onDeletePress: () => void;
  onEditPress: () => void;
  actionPanelWidth: number;
}

const ListUnderlayActions: FC<IProps> = ({
  onDeletePress,
  onEditPress,
  actionPanelWidth,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.actionPanel, {width: actionPanelWidth}]}>
        <TouchableOpacity onPress={onEditPress} style={styles.btn}>
          <Text style={styles.text}>{UPDATE_OPTION}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDeletePress}
          style={[styles.btn, styles.dangerBtn]}>
          <Text style={[styles.text, styles.textDanger]}>{DELETE_OPTION}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListUnderlayActions;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
  },
  actionPanel: {
    paddingVertical: 5,
    paddingRight: 5,
    flex: 1,
    justifyContent: 'space-around',
    gap: 5,
  },
  btn: {
    backgroundColor: '#222',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 2,
  },
  dangerBtn: {
    borderColor: 'red',
  },
  text: {
    textAlign: 'center',
    color: 'orange',
  },
  textDanger: {
    color: 'red',
  },
});
