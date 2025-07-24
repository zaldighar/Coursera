// store.js
import { configureStore } from '@reduxjs/toolkit';
import crap from './venueSlice';

export default configureStore({
  reducer: {
    venue: crap,
  },
});
