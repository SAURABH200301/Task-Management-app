import { createSlice } from '@reduxjs/toolkit';

const notes ='';

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: notes,
    title: '',
    status: '',
    dueDate: '',
  },
  reducers: {
    addTitle(state, action) {
      state.title = action.payload.title;
    },
    addNotes(state, action) {
      state.notes = action.payload.notes;
      
    },
    updateStatus(state, action) {
      state.status = action.payload.status;
    },
    addDueDate(state, action) {
      state.dueDate = action.payload.dueDate;
    },
  },
});

export const notesActions = notesSlice.actions;

export default notesSlice;
