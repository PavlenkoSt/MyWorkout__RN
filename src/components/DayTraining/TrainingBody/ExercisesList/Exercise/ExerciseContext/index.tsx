import React, {FC} from 'react';
import {NativeSyntheticEvent} from 'react-native';
import ContextMenu, {
  ContextMenuOnPressNativeEvent,
} from 'react-native-context-menu-view';
import {useDispatch} from 'react-redux';

import {deleteExercise} from '@app/store/slices/trainingDaySlice';

interface IProps {
  children: React.ReactNode;
  exerciseId: string;
  onChangeEditExersice: () => void;
}

enum EventsEnum {
  Edit = '✍ Edit',
  Delete = '␡  Delete',
}

const ExerciseContext: FC<IProps> = ({
  children,
  exerciseId,
  onChangeEditExersice,
}) => {
  const dispatch = useDispatch();

  const onPress = (e: NativeSyntheticEvent<ContextMenuOnPressNativeEvent>) => {
    switch (e.nativeEvent.name) {
      case EventsEnum.Edit:
        onChangeEditExersice();
        return;
      case EventsEnum.Delete:
        dispatch(deleteExercise({id: exerciseId}));
        return;
      default:
        return;
    }
  };

  return (
    <ContextMenu
      actions={[{title: '✍ Edit'}, {title: '␡  Delete', destructive: true}]}
      onPress={onPress}>
      {children}
    </ContextMenu>
  );
};

export default ExerciseContext;
