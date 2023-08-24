import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const albumsApi = createApi({
	reducerPath: 'albums',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3005'
	}),
	endpoints(builder) {
		return {
			addAlbum: builder.mutation({
				invalidatesTags: (result, error, user) => {
					return [{ type: 'Album', id: user.id }];
				},
				query: (user) => {
					return {
						body: {
							userId: user.id,
							title: faker.commerce.productName()
						},
						method: 'POST',
						url: '/albums'
					};
				}
			}),
			fetchAlbums: builder.query({
				providesTags: (result, error, user) => {
					return [{ type: 'Album', id: user.id }];
				},
				query: (user) => {
					return {
						method: 'GET',
						params: {
							userId: user.id
						},
						url: '/albums'
					};
				}
			})
		};
	}
});

export const { useAddAlbumMutation, useFetchAlbumsQuery } = albumsApi;
export { albumsApi };
