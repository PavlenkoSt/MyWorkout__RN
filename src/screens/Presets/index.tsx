import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, ListRenderItem, Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch, useSelector} from 'react-redux';

import PresetModal from './PresetModal';

import ConfirmModal from '@app/components/ConfirmModal';
import Loader from '@app/components/Loader';
import SearchHeader from '@app/components/SearchHeader';
import BtnGhost from '@app/components/UI-kit/BtnGhost';
import useGetPresetsFromDB from '@app/hooks/useGetPresetsFromDB';
import useMounted from '@app/hooks/useMounted';
import {presetsSelector} from '@app/store/selectors/presetsSelector';
import {deletePreset} from '@app/store/slices/presetsSlice';
import {IPreset} from '@app/types/IPreset';

import PresetItem from './PresetItem';

const Presets = () => {
  const [searchValue, setSearchValue] = useState('');
  const [presetModalVisible, setPresetModalVisible] = useState(false);
  const [deleteConfirmCandidate, setDeleteConfirmCandidate] = useState<
    string | null
  >(null);

  const {mounted} = useMounted();

  const dispatch = useDispatch();

  const presets = useSelector(presetsSelector);

  const presetsWithSearching = useMemo(() => {
    return presets.filter(preset =>
      preset.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [presets, searchValue]);

  useGetPresetsFromDB();

  const onDelete = (presetId: string | null) => {
    if (!presetId) return;

    dispatch(deletePreset(presetId));
  };

  const renderItem: ListRenderItem<IPreset> = useCallback(info => {
    return (
      <PresetItem
        preset={info.item}
        setDeleteConfirmCandidate={setDeleteConfirmCandidate}
      />
    );
  }, []);

  const onPresetModalClose = () => {
    setPresetModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <SearchHeader searchValue={searchValue} setSearchValue={setSearchValue}>
        <BtnGhost
          color="#fff"
          onPress={() => setPresetModalVisible(true)}
          btnStyle={styles.btn}>
          + Add
        </BtnGhost>
      </SearchHeader>
      {!mounted ? (
        <Loader />
      ) : !!searchValue && !presetsWithSearching.length ? (
        <Text style={styles.noPresets}>
          Presets matching your request were not found
        </Text>
      ) : !presetsWithSearching.length ? (
        <Text style={styles.noPresets}>No presets yet</Text>
      ) : (
        <FlatList
          data={presetsWithSearching}
          renderItem={renderItem}
          keyExtractor={preset => preset.id}
        />
      )}
      <PresetModal visible={presetModalVisible} onClose={onPresetModalClose} />
      <ConfirmModal
        visible={!!deleteConfirmCandidate}
        onClose={() => setDeleteConfirmCandidate(null)}
        onConfirm={() => onDelete(deleteConfirmCandidate)}
      />
    </View>
  );
};

export default Presets;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$bgColor',
    flex: 1,
  },
  noPresets: {
    paddingVertical: 30,
    color: '$white',
    fontSize: 16,
    textAlign: 'center',
  },
  btn: {
    paddingVertical: 0,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
