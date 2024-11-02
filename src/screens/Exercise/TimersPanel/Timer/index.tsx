import React, {FC} from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import PlayIcon from '@app/components/Icons/PlayIcon';
import PauseIcon from '@app/components/Icons/PauseIcon';
import Sound from 'react-native-sound';
import {ColorVars} from '@app/utilts/theme';

Sound.setCategory('Playback');

interface IProps {
  title: string;
  disabled: boolean;
  time: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
}

const {width} = Dimensions.get('window');

const GAP = 10;
const PADDING_HORIZONTAL = 10;
const TIMER_SIZE = width / 2 - GAP / 2 - PADDING_HORIZONTAL;

function convertMilliseconds(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const millisecondsRest = Math.floor((ms % 1000) / 100);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedSeconds = seconds.toString().padStart(2, '0');
  const formattedMilliseconds = millisecondsRest.toString();

  return {
    seconds: `${minutes}:${formattedSeconds}`,
    milliseconds: formattedMilliseconds,
  };
}

const Timer: FC<IProps> = ({
  title,
  disabled,
  isRunning,
  pause,
  start,
  time,
}) => {
  const {milliseconds, seconds} = convertMilliseconds(time);

  const onPress = () => {
    if (disabled) return;

    if (isRunning) {
      pause();
    } else {
      start();
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={disabled ? 0.5 : 0.2}
      style={[styles.container, disabled && styles.containerDisabled]}>
      <Text style={styles.title}>{title}:</Text>
      <View style={styles.timer}>
        <View style={styles.timerValue}>
          <Text style={styles.timerValueS}>{seconds}</Text>
          <Text style={styles.timerValueMs}>{milliseconds}</Text>
        </View>
        <View style={styles.timerState}>
          {isRunning ? (
            <PauseIcon color="rgba(168, 168, 168, 0.8)" />
          ) : (
            <PlayIcon color="rgba(168, 168, 168, 0.8)" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Timer;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  title: {
    textAlign: 'center',
    color: ColorVars.$white,
  },
  timer: {
    width: TIMER_SIZE,
    height: TIMER_SIZE,
    borderWidth: 6,
    borderColor: 'rgba(168, 168, 168, 0.8)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerValue: {
    alignItems: 'flex-end',
    marginTop: -20,
  },
  timerValueS: {
    fontSize: 40,
    color: ColorVars.$white,
  },
  timerValueMs: {
    fontSize: 20,
    color: ColorVars.$white,
  },
  timerState: {
    position: 'absolute',
    padding: 10,
    bottom: 0,
  },
});
