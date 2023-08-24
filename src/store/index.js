import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { usersReducer } from './slices/UsersSlice';
import { albumsApi } from './apis/albumsApi';
import { photosApi } from './apis/photosApi';

export const store = configureStore({
	reducer: {
		[albumsApi.reducerPath]: albumsApi.reducer,
		[photosApi.reducerPath]: photosApi.reducer,
		users: usersReducer
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(albumsApi.middleware)
			.concat(photosApi.middleware);
	}
});

setupListeners(store.dispatch);

export * from './thunks/addUser';
export * from './thunks/fetchUsers';
export * from './thunks/removeUser';
export {
	useAddAlbumMutation,
	useFetchAlbumsQuery,
	useRemoveAlbumMutation
} from './apis/albumsApi';
export {
	useAddPhotoMutation,
	useFetchPhotosQuery,
	useRemovePhotoMutation
} from './apis/photosApi';
