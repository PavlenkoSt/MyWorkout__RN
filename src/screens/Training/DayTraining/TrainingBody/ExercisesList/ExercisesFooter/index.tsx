import React, {FC, useMemo, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';

import ArrowUpIcon from '@app/components/Icons/ArrowUpIcon';
import Btn from '@app/components/UI-kit/Btn';
import {trainingDateSelector} from '@app/store/selectors/trainingDaySelectors';
import {ExerciseTypeEnum} from '@app/types/IExercise';

import Statistic from './Statistic';

export interface IStatistic {
  exercise: string;
  totalNeed: number;
  totalDone: number;
  type: ExerciseTypeEnum;
}

interface IProps {
  onAddExercisePress: () => void;
  scrollListToEnd: () => void;
}

let timer: NodeJS.Timer | null = null;

const ExercisesFooter: FC<IProps> = ({onAddExercisePress, scrollListToEnd}) => {
  const trainingDay = useSelector(trainingDateSelector);

  const [collapsed, setCollapsed] = useState(true);
  const [animationEndAndExpanded, setAnimationEndAndExpanded] = useState(false);

  const rotation = useSharedValue(0);

  const arrowStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotation.value}deg`}],
    };
  });

  const onPressTrigger = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (collapsed) {
      rotation.value = withTiming(180, {duration: 300});
    } else {
      rotation.value = withTiming(0, {duration: 300});
    }

    setAnimationEndAndExpanded(false);
    timer = setTimeout(() => setCollapsed(prev => !prev), 100);
  };

  const onAnimationEnd = () => {
    if (collapsed) return;

    scrollListToEnd();

    setAnimationEndAndExpanded(true);
  };

  const statistic = useMemo(() => {
    const result: IStatistic[] = [];

    if (!trainingDay || !trainingDay.exercises.length) return result;

    trainingDay.exercises.forEach(exercise => {
      const candidate = result.findIndex(
        resItem =>
          resItem.exercise === exercise.exercise &&
          resItem.type === exercise.type,
      );

      const totalDone = exercise.reps * exercise.setsDone;
      const totalNeed = exercise.reps * exercise.sets;

      if (candidate !== -1) {
        result[candidate].totalDone += totalDone;
        result[candidate].totalNeed += totalNeed;
      } else {
        result.push({
          exercise: exercise.exercise,
          type: exercise.type,
          totalDone,
          totalNeed,
        });
      }
    });

    return result;
  }, [trainingDay]);

  return (
    <View>
      <View>
        {!!statistic.length && (
          <View style={styles.triggerContainer}>
            <TouchableOpacity style={styles.trigger} onPress={onPressTrigger}>
              <Text style={styles.triggerText}>
                {collapsed ? 'Show' : 'Hide'} statistic
              </Text>
              <Animated.View style={[arrowStyle]}>
                <ArrowUpIcon stroke={EStyleSheet.value('$white')} />
              </Animated.View>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.btnContainer}>
          <Btn onPress={onAddExercisePress}>+ Add exercise</Btn>
        </View>
      </View>
      {animationEndAndExpanded ? (
        <View style={styles.collapsible}>
          <Statistic statistic={statistic} />
        </View>
      ) : (
        <Collapsible
          collapsed={collapsed}
          onAnimationEnd={onAnimationEnd}
          style={styles.collapsible}>
          <Statistic statistic={statistic} />
        </Collapsible>
      )}
    </View>
  );
};

export default ExercisesFooter;

const styles = EStyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  triggerContainer: {
    position: 'absolute',
    top: 0,
    left: 5,
    bottom: 0,
    zIndex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  collapsible: {
    paddingBottom: 10,
    paddingHorizontal: 5,
    alignItems: 'flex-start',
  },
  collapsibleInner: {
    flex: 1,
  },
  trigger: {
    flexDirection: 'row',
    gap: 5,
    paddingVertical: 20,
  },
  triggerText: {
    color: '$white',
  },
});
