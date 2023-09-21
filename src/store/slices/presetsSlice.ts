import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {deletePresetRealm} from '@app/db/actions/deletePresetRealm';
import {IPreset} from '@app/types/IPreset';

export interface RecordsSlice {
  presets: IPreset[];
}

const initialState: RecordsSlice = {
  presets: [],
};

const presetsSlice = createSlice({
  name: 'presetsSlice',
  initialState,
  reducers: {
    setPresets(state, action: PayloadAction<IPreset[]>) {
      state.presets = action.payload;
    },
    addPreset(state, action: PayloadAction<IPreset>) {
      state.presets = [...state.presets, action.payload];
    },
    updatePreset(state, action: PayloadAction<IPreset>) {
      state.presets = state.presets.map(preset => {
        if (preset.id === action.payload.id) {
          return action.payload;
        }
        return preset;
      });
    },
    deletePreset(state, action: PayloadAction<string>) {
      state.presets = state.presets.filter(preset => {
        if (preset.id == action.payload) {
          deletePresetRealm(preset);
          return false;
        }
        return true;
      });
    },
  },
});

export const {addPreset, deletePreset, setPresets, updatePreset} =
  presetsSlice.actions;
export default presetsSlice.reducer;
