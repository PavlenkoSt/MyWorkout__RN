import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';

import PresetModal from './PresetModal';

import Loader from '@app/components/Loader';
import SearchHeader from '@app/components/SearchHeader';
import BtnGhost from '@app/components/UI-kit/BtnGhost';
import useGetPresetsFromDB from '@app/hooks/useGetPresetsFromDB';
import useMounted from '@app/hooks/useMounted';
import useTypedNavigation from '@app/hooks/useTypedNavigation';
import {presetsSelector} from '@app/store/selectors/presetsSelector';
import {IPreset} from '@app/types/IPreset';

const Presets = () => {
  const [searchValue, setSearchValue] = useState('');
  const [presetModalVisible, setPresetModalVisible] = useState(false);

  const {mounted} = useMounted();

  const navigation = useTypedNavigation();

  const presets = useSelector(presetsSelector);

  const presetsWithSearching = useMemo(() => {
    return presets.filter(preset =>
      preset.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [presets, searchValue]);

  useGetPresetsFromDB();

  const renderItem: ListRenderItem<IPreset> = useCallback(info => {
    return (
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
});
