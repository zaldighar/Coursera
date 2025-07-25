// store.js
import { configureStore } from '@reduxjs/toolkit';
import crap from './venueSlice';
import avReducer from './avSlice'

export default configureStore({
  reducer: {
    venue: crap,
    av: avReducer
  },
});
