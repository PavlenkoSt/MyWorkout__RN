import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import SwipeableItem from 'react-native-swipeable-item';
import {useDispatch, useSelector} from 'react-redux';

import PresetModal from './PresetModal';

import ConfirmModal from '@app/components/ConfirmModal';
import Loader from '@app/components/Loader';
import SearchHeader from '@app/components/SearchHeader';
import BtnGhost from '@app/components/UI-kit/BtnGhost';
import useGetPresetsFromDB from '@app/hooks/useGetPresetsFromDB';
import useMounted from '@app/hooks/useMounted';
import useTypedNavigation from '@app/hooks/useTypedNavigation';
import {presetsSelector} from '@app/store/selectors/presetsSelector';
import {deletePreset} from '@app/store/slices/presetsSlice';
import {IPreset} from '@app/types/IPreset';
import {SWIPABLE_ITEM_CONFIG} from '@app/utilts/constants';

const OPENED_SNAP_POINT = 100;

const Presets = () => {
  const [searchValue, setSearchValue] = useState('');
  const [presetModalVisible, setPresetModalVisible] = useState(false);
  const [deleteConfirmCandidate, setDeleteConfirmCandidate] = useState<
    string | null
  >(null);

  const {mounted} = useMounted();

  const navigation = useTypedNavigation();

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

  const renderUnderlayLeft = useCallback((preset: IPreset) => {
    return (
      <View style={styles.btns}>
        <BtnGhost
          color="red"
          btnStyle={{width: 90}}
          onPress={() => setDeleteConfirmCandidate(preset.id)}>
          Delete
        </BtnGhost>
      </View>
    );
  }, []);

  const renderItem: ListRenderItem<IPreset> = useCallback(info => {
    return (
      <SwipeableItem
        key={info.item.id}
        item={info.item}
        {...SWIPABLE_ITEM_CONFIG}
        renderUnderlayLeft={params => renderUnderlayLeft(info.item)}
        onChange={({snapPoint}) => {
          if (snapPoint === OPENED_SNAP_POINT) {
            setDeleteConfirmCandidate(info.item.id);
          }
        }}
        snapPointsLeft={[OPENED_SNAP_POINT]}>
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate('Preset', {
              id: info.item.id,
              name: info.item.name,
            })
          }>
          <Text style={styles.itemText}>
            {info.item.name} ({info.item.exercises.length}{' '}
            {info.item.exercises.length === 1 ? 'exercise' : 'exercises'})
          </Text>
        </TouchableOpacity>
      </SwipeableItem>
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
  item: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#222',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
  btns: {
    alignItems: 'flex-end',
    padding: 5,
  },
});
