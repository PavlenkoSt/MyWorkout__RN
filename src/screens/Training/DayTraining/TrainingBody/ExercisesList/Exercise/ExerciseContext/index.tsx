import React, {FC} from 'react';
import {useDispatch} from 'react-redux';

import ContextMenu from '@app/components/UI-kit/ContextMenu';
import {deleteExercise} from '@app/store/slices/trainingDaySlice';

interface IProps {
  children: React.ReactNode;
  exerciseId: string;
  onChangeEditExersice: () => void;
}

const ExerciseContext: FC<IProps> = ({
  children,
  exerciseId,
  onChangeEditExersice,
}) => {
  const dispatch = useDispatch();

  const actions = [
    {text: '✍ Update', action: onChangeEditExersice},
    {
      text: '␡  Delete',
      action: () => dispatch(deleteExercise({id: exerciseId})),
    },
  ];

  return <ContextMenu actions={actions}>{children}</ContextMenu>;
};

export default ExerciseContext;
