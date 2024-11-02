import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, ListRenderItem, Text} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';

import {Loader} from '@app/components/Loader';
import {PresetModal} from '@app/components/PresetModal';
import {ScreenContainer} from '@app/components/ScreenContainer';
import {SearchHeader} from '@app/components/SearchHeader';
import {BtnGhost} from '@app/components/UI-kit';
import useGetPresetsFromDB from '@app/hooks/db/useGetPresetsFromDB';
import useMounted from '@app/hooks/useMounted';
import {presetsSelector} from '@app/store/selectors/presetsSelector';
import {IPreset} from '@app/types/IPreset';
import {ColorVars} from '@app/utilts/theme';

import PresetItem from './PresetItem';

let timer: NodeJS.Timeout | null = null;

const Presets = () => {
  const [searchValue, setSearchValue] = useState('');
  const [presetModalVisible, setPresetModalVisible] = useState(false);
  const [presetToEdit, setPresetToEdit] = useState<IPreset | null>(null);

  const {mounted} = useMounted();

  const presets = useSelector(presetsSelector);

  const presetsWithSearching = useMemo(() => {
    const trimed = searchValue.trim();

    if (!trimed) return presets;

    return presets.filter(preset =>
      preset.name.toLowerCase().includes(trimed.toLowerCase()),
    );
  }, [presets, searchValue]);

  useGetPresetsFromDB();

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, []);

  const onEditPress = (presetToEdit: IPreset) => {
    setPresetToEdit(presetToEdit);
    setPresetModalVisible(true);
  };

  const renderItem: ListRenderItem<IPreset> = useCallback(info => {
    return <PresetItem preset={info.item} onEditPress={onEditPress} />;
  }, []);

  const onPresetModalClose = () => {
    setPresetModalVisible(false);

    if (presetToEdit) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      timer = setTimeout(() => setPresetToEdit(null), 200);
    }
  };

  return (
    <ScreenContainer>
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
          No presets matching your request were found
        </Text>
      ) : !presetsWithSearching.length ? (
        <Text style={styles.noPresets}>No presets yet</Text>
      ) : (
        <FlatList
          data={presetsWithSearching}
          renderItem={renderItem}
          extraData={[presets]}
          keyExtractor={preset => preset.id}
        />
      )}
      <PresetModal
        presetToEdit={presetToEdit}
        visible={presetModalVisible}
        onClose={onPresetModalClose}
      />
    </ScreenContainer>
  );
};

export default Presets;

const styles = EStyleSheet.create({
  noPresets: {
    paddingVertical: 30,
    color: ColorVars.$white,
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
