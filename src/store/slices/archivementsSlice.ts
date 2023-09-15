import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {IArchivement} from '@app/types/IArchivement';

export interface IArchivementsSlice {
  archivements: IArchivement[];
}

const initialState: IArchivementsSlice = {
  archivements: [],
};

const archivementsSlice = createSlice({
  name: 'archivementsSlice',
  initialState,
  reducers: {
    set(state, action: PayloadAction<IArchivement[]>) {
      state.archivements = action.payload;
    },
    add(state, action: PayloadAction<IArchivement>) {
      state.archivements = [...state.archivements, action.payload];
    },
    update(state, action: PayloadAction<IArchivement>) {
      state.archivements = state.archivements.map(archivemen => {
        if (archivemen.id === action.payload.id) {
          return action.payload;
        }
        return archivemen;
      });
    },
    deleteOne(state, action: PayloadAction<string>) {
      state.archivements = state.archivements.filter(
        archivement => archivement.id !== action.payload,
      );
    },
  },
});

export const {add, deleteOne, set, update} = archivementsSlice.actions;
export default archivementsSlice.reducer;
