import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {deleteRecordRealm} from '@app/db/actions/deleteRecordRealm';
import {IRecord} from '@app/types/IRecord';

export interface RecordsSlice {
  records: IRecord[];
}

const initialState: RecordsSlice = {
  records: [],
};

const recordsSlice = createSlice({
  name: 'recordsSlice',
  initialState,
  reducers: {
    setRecords(state, action: PayloadAction<IRecord[]>) {
      state.records = action.payload;
    },
    addRecord(state, action: PayloadAction<IRecord>) {
      state.records = [...state.records, action.payload];
    },
    updateRecord(state, action: PayloadAction<IRecord>) {
      state.records = state.records.map(record => {
        if (record.id === action.payload.id) {
          return action.payload;
        }
        return record;
      });
    },
    deleteRecord(state, action: PayloadAction<string>) {
      state.records = state.records.filter(record => {
        if (record.id == action.payload) {
          deleteRecordRealm(record);
          return false;
        }
        return true;
      });
    },
  },
});

export const {addRecord, deleteRecord, setRecords, updateRecord} =
  recordsSlice.actions;
export default recordsSlice.reducer;
