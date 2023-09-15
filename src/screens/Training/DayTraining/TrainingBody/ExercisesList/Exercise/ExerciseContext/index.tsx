import React, {FC} from 'react';
import {useDispatch} from 'react-redux';

import ContextMenu from '@app/components/UI-kit/ContextMenu';
import {deleteExercise} from '@app/store/slices/trainingDaySlice';
import {DELETE_OPTION, UPDATE_OPTION} from '@app/utilts/constants';

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
    {text: UPDATE_OPTION, action: onChangeEditExersice},
    {
      text: DELETE_OPTION,
      action: () => dispatch(deleteExercise({id: exerciseId})),
    },
  ];

  return <ContextMenu actions={actions}>{children}</ContextMenu>;
};

export default ExerciseContext;
