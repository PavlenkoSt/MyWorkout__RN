import React, {useState} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import {DELETE_OPTION, UPDATE_OPTION} from '@app/utilts/constants';
import {ConfirmModal} from '../ConfirmModal';
import BtnGhost from '../UI-kit/BtnGhost';

interface IProps {
  onDeletePress: () => void;
  onEditPress: () => void;
  actionPanelWidth: number;
  inRow?: boolean;
}

export default function ListUnderlayActions({
  onDeletePress,
  onEditPress,
  actionPanelWidth,
  inRow,
}: IProps) {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.actionPanel,
          {width: actionPanelWidth},
          inRow && styles.actionPanelRow,
        ]}>
        <BtnGhost
          color="orange"
          onPress={onEditPress}
          btnStyle={styles.btn}
          textStyle={{fontSize: inRow ? 13 : 15}}>
          {UPDATE_OPTION}
        </BtnGhost>
        <BtnGhost
          color="red"
          onPress={() => setConfirmModalVisible(true)}
          btnStyle={styles.btn}
          textStyle={{fontSize: inRow ? 13 : 15}}>
          {DELETE_OPTION}
        </BtnGhost>
      </View>
      <ConfirmModal
        visible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        onConfirm={onDeletePress}
      />
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
  },
  actionPanel: {
    padding: 5,
    flex: 1,
    justifyContent: 'space-around',
    gap: 5,
  },
  actionPanelRow: {
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#222',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});
