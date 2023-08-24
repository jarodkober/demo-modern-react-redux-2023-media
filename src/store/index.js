import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { usersReducer } from './slices/UsersSlice';
import { albumsApi } from './apis/albumsApi';

export const store = configureStore({
	reducer: {
		[albumsApi.reducerPath]: albumsApi.reducer,
		users: usersReducer
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(albumsApi.middleware);
	}
});

setupListeners(store.dispatch);

export * from './thunks/addUser';
export * from './thunks/fetchUsers';
export * from './thunks/removeUser';
export { useAddAlbumMutation, useFetchAlbumsQuery } from './apis/albumsApi';
