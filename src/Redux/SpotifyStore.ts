import { configureStore } from '@reduxjs/toolkit';
import SpotifyReducer from './SpotifySlice';

export default configureStore({
    reducer: {
        Spotify: SpotifyReducer,
    },
});
