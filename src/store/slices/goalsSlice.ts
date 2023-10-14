import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {deleteGoalRealm} from '@app/db/actions/deleteGoalRealm';
import {IGoal} from '@app/types/IGoal';

export interface GoalsSlice {
  goals: IGoal[];
}

const initialState: GoalsSlice = {
  goals: [],
};

const goalsSlice = createSlice({
  name: 'goalsSlice',
  initialState,
  reducers: {
    setGoals(state, action: PayloadAction<IGoal[]>) {
      state.goals = action.payload;
    },
    addGoal(state, action: PayloadAction<IGoal>) {
      state.goals = [...state.goals, action.payload];
    },
    updateGoal(state, action: PayloadAction<IGoal>) {
      state.goals = state.goals.map(goal => {
        if (goal.id === action.payload.id) {
          return action.payload;
        }
        return goal;
      });
    },
    deleteGoal(state, action: PayloadAction<string>) {
      state.goals = state.goals.filter(goal => {
        if (goal.id == action.payload) {
          deleteGoalRealm(goal);
          return false;
        }
        return true;
      });
    },
    incrementGoal(state, action: PayloadAction<string>) {
      state.goals = state.goals.map(goal => {
        if (goal.id === action.payload) {
          const countArchived = goal.countArchived + 1;
          return {
            ...goal,
            countArchived,
            completionUpdatedAtTimestamp:
              countArchived >= goal.count
                ? Date.now()
                : goal.completionUpdatedAtTimestamp,
          };
        }
        return goal;
      });
    },
    decrementGoal(state, action: PayloadAction<string>) {
      state.goals = state.goals.map(goal => {
        if (goal.id === action.payload) {
          const countArchived = goal.countArchived - 1;
          return {
            ...goal,
            countArchived,
            completionUpdatedAtTimestamp:
              goal.countArchived >= goal.count
                ? Date.now()
                : goal.completionUpdatedAtTimestamp,
          };
        }
        return goal;
      });
    },
  },
});

export const {
  addGoal,
  deleteGoal,
  setGoals,
  updateGoal,
  incrementGoal,
  decrementGoal,
} = goalsSlice.actions;
export default goalsSlice.reducer;
