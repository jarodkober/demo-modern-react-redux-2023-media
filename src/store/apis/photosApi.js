import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const photosApi = createApi({
	reducerPath: 'photos',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3005'
	}),
	endpoints(builder) {
		return {
			addPhoto: builder.mutation({
				invalidatesTags: (result, error, album) => {
					return [{ type: 'AlbumPhoto', id: album.id }];
				},
				query: (album) => {
					return {
						body: {
							albumId: album.id,
							url: faker.image.url(150, 150, true)
						},
						method: 'POST',
						url: '/photos'
					};
				}
			}),
			fetchPhotos: builder.query({
				providesTags: (result, error, album) => {
					const tags = result.map((photo) => {
						return { type: 'Photo', id: photo.id };
					});
					tags.push({ type: 'AlbumPhoto', id: album.id });
					return tags;
				},
				query: (album) => {
					return {
						method: 'GET',
						params: {
							albumId: album.id
						},
						url: '/photos'
					};
				}
			}),
			removePhoto: builder.mutation({
				invalidatesTags: (results, error, photo) => {
					return [{ type: 'Photo', id: photo.id }];
				},
				query: (photo) => {
					return {
						method: 'DELETE',
						url: `/photos/${photo.id}`
					};
				}
			})
		};
	}
});

export const {
	useAddPhotoMutation,
	useFetchPhotosQuery,
	useRemovePhotoMutation
} = photosApi;
export { photosApi };
