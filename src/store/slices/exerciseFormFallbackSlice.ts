import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface IExerciseFormFallbackState {
  exercise: string;
}

const initialState: IExerciseFormFallbackState = {
  exercise: '',
};

const exerciseFormFallbackSlice = createSlice({
  name: 'exerciseFormFallback',
  initialState,
  reducers: {
    setExerciseFallback: (state, action: PayloadAction<string>) => {
      state.exercise = action.payload;
    },
    clearFallback: state => {
      state.exercise = '';
    },
  },
});

export const {setExerciseFallback, clearFallback} =
  exerciseFormFallbackSlice.actions;
export default exerciseFormFallbackSlice.reducer;
