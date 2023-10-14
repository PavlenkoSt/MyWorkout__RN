import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import realm from '@app/db';
import {GOALS_DB} from '@app/db/realm.constants';
import {setGoals} from '@app/store/slices/goalsSlice';
import {IGoal} from '@app/types/IGoal';

const useGetGoalsFromDB = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const goals =
      (realm.objects(GOALS_DB).toJSON() as unknown as IGoal[]) || [];

    dispatch(setGoals(goals));
  }, []);
};

export default useGetGoalsFromDB;
