import React, {Dispatch, FC, ReactNode, SetStateAction, useRef} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import FocusAwareStatusBar from '../FocusAwareStatusBar';
import CloseIcon from '../Icons/CloseIcon';
import SearchIcon from '../Icons/SearchIcon';

interface IProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  verticalOffset?: number;
  children?: ReactNode;
  column?: boolean;
}

const HEIGHT = 40;
const CLOSE_OFFSET_FROM = 200;
const CLOSE_OFFSET_TO = 0;

const SearchHeader: FC<IProps> = ({
  searchValue,
  setSearchValue,
  verticalOffset,
  column,
  children,
}) => {
  const inputRef = useRef<TextInput | null>(null);

  const closeOffset = useSharedValue(CLOSE_OFFSET_FROM);

  const closeBtnAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: closeOffset.value}],
    };
  });

  const onFocus = () => inputRef.current?.focus();

  const onChangeText = (text: string) => {
    closeOffset.value = withTiming(!text ? CLOSE_OFFSET_FROM : CLOSE_OFFSET_TO);

    setSearchValue(text);
  };

  const onClose = () => {
    closeOffset.value = withTiming(CLOSE_OFFSET_FROM);
    setSearchValue('');
  };

  return (
    <View
      style={[
        styles.container,
        {paddingVertical: verticalOffset ? verticalOffset : 15},
        column && {flexDirection: 'column'},
      ]}>
      <FocusAwareStatusBar
        backgroundColor={EStyleSheet.value('$primaryColor')}
        barStyle="light-content"
      />
      <View style={[styles.inputContainer, !column && {flex: 1}]}>
        <TouchableOpacity
          onPress={onFocus}
          activeOpacity={1}
          style={styles.searchIcon}>
          <SearchIcon fill="#333" width={25} height={25} />
        </TouchableOpacity>
        <TextInput
          ref={inputRef}
          value={searchValue}
          onChangeText={onChangeText}
          style={styles.input}
          placeholder="Type to search..."
          cursorColor="#333"
          placeholderTextColor="#666"
        />
        <Animated.View style={[styles.closeWrapper, closeBtnAnimatedStyles]}>
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <CloseIcon fill="#333" width={25} height={25} />
          </TouchableOpacity>
        </Animated.View>
      </View>
      {children}
    </View>
  );
};

export default SearchHeader;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$primaryColor',
    paddingHorizontal: 10,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    height: HEIGHT,
  },
  input: {
    paddingVertical: 5,
    fontSize: 18,
    flex: 1,
    height: HEIGHT,
    paddingHorizontal: 0,
    color: '#333',
  },
  searchIcon: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: HEIGHT,
  },
  closeWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
  },
  close: {
    paddingHorizontal: 10,
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
