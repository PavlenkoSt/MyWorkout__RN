import React, {memo} from 'react';
import {Text, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch, useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';

import ContextMenu from '@app/components/UI-kit/ContextMenu';
import {recordsSelector} from '@app/store/selectors/recordsSelector';
import {allTrainingDaysSelector} from '@app/store/selectors/trainingDaySelectors';
import {setRecords} from '@app/store/slices/recordsSlice';
import {setTrainingDays} from '@app/store/slices/trainingDaySlice';
import {
  CORRUPTED_JSON,
  DB_EXPORTED,
  DB_IMPORTED,
  ONLY_JSON_FILE,
} from '@app/utilts/constants';
import showToast from '@app/utilts/showToast';

const Actions = () => {
  const dispatch = useDispatch();

  const trainingDays = useSelector(allTrainingDaysSelector);
  const records = useSelector(recordsSelector);

  const onExportDatabase = async () => {
    const string = JSON.stringify({trainingDays, records});

    const path = RNFetchBlob.fs.dirs.DownloadDir + '/WorkoutDatabase.json';

    try {
      await RNFetchBlob.fs.unlink(path);
    } catch (e) {}

    try {
      await RNFetchBlob.fs.writeFile(path, string, 'utf8');
      showToast.success(DB_EXPORTED);
    } catch (e) {
      showToast.someError();
    }
  };

  const onImportDatabase = async () => {
    try {
      const results = await DocumentPicker.pick({
        allowMultiSelection: false,
      });

      const result = results?.[0];

      if (!result) return showToast.someError();

      if (!result.type?.includes('json'))
        return showToast.error(ONLY_JSON_FILE);

      const json = await RNFetchBlob.fs.readFile(result.uri, 'utf8');

      const parsedJSON = JSON.parse(json);

      if (!parsedJSON.trainingDays) {
        return showToast.error(CORRUPTED_JSON);
      }

      dispatch(setTrainingDays(parsedJSON.trainingDays));

      if (parsedJSON.records) {
        dispatch(setRecords(parsedJSON.records));
      }

      showToast.success(DB_IMPORTED);
    } catch (e) {
      return showToast.error(CORRUPTED_JSON);
    }
  };

  return (
    <View style={styles.container}>
      <ContextMenu
        actions={[
          {text: 'Export database', action: onExportDatabase},
          {text: 'Import database', action: onImportDatabase},
        ]}>
        <Text style={styles.text}>◆</Text>
      </ContextMenu>
    </View>
  );
};

export default memo(Actions);

const styles = EStyleSheet.create({
  container: {
    padding: 0,
    position: 'absolute',
    top: -5,
    left: 0,
  },
  text: {
    fontSize: 30,
    color: '#222',
  },
});
