import { configureStore } from '@reduxjs/toolkit';
import notesSlice from './notes-slice';
import alertSlice from './alert-slice';


const store = configureStore({
    reducer: {
        notes: notesSlice.reducer,
        alert: alertSlice
    }
})

export default store;