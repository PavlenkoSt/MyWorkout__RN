import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch, useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';

import {presetsSelector} from '@app/store/selectors/presetsSelector';
import {recordsSelector} from '@app/store/selectors/recordsSelector';
import {allTrainingDaysSelector} from '@app/store/selectors/trainingDaySelectors';
import {setPresets} from '@app/store/slices/presetsSlice';
import {setRecords} from '@app/store/slices/recordsSlice';
import {setTrainingDays} from '@app/store/slices/trainingDaySlice';
import {IPreset} from '@app/types/IPreset';
import {IRecord} from '@app/types/IRecord';
import {ITrainingDay} from '@app/types/ITrainingDay';
import {
  CORRUPTED_JSON,
  DB_EXPORTED,
  DB_IMPORTED,
  ONLY_JSON_FILE,
} from '@app/utilts/constants';
import showToast from '@app/utilts/showToast';

interface IDB {
  trainingDays: ITrainingDay[];
  records: IRecord[];
  presets: IPreset[];
}

const Actions = () => {
  const dispatch = useDispatch();

  const trainingDays = useSelector(allTrainingDaysSelector);
  const records = useSelector(recordsSelector);
  const presets = useSelector(presetsSelector);

  const onExportDatabase = async () => {
    const dbToExport: IDB = {trainingDays, records, presets};

    const string = JSON.stringify(dbToExport);

    const path = RNFetchBlob.fs.dirs.DownloadDir + '/WorkoutDatabase.json';

    try {
      await RNFetchBlob.fs.unlink(path);
    } catch (e) {}

    try {
      await RNFetchBlob.fs.createFile(path, string, 'utf8');
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

      const parsedJSON: IDB = JSON.parse(json);

      if (
        !parsedJSON.trainingDays &&
        !parsedJSON.records &&
        !parsedJSON.presets
      ) {
        return showToast.error(CORRUPTED_JSON);
      }

      if (parsedJSON.trainingDays?.length) {
        dispatch(setTrainingDays(parsedJSON.trainingDays));
      }

      if (parsedJSON.records?.length) {
        dispatch(setRecords(parsedJSON.records));
      }

      if (parsedJSON.presets?.length) {
        dispatch(setPresets(parsedJSON.presets));
      }

      showToast.success(DB_IMPORTED);
    } catch (e: any) {
      if (e.message !== 'User canceled directory picker') {
        showToast.error(CORRUPTED_JSON);
      }
    }
  };

  const actions = [
    {text: '⏫ Import database', action: onImportDatabase},
    {text: '⏬ Export database', action: onExportDatabase},
  ];

  return (
    <View style={styles.container}>
      {actions.map(action => (
        <TouchableOpacity
          key={action.text}
          onPress={action.action}
          style={styles.action}>
          <Text style={styles.actionText}>{action.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Actions;

const styles = EStyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  action: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  actionText: {
    fontSize: 20,
    color: '$white',
  },
});
