import { IVideo } from '../../interfaces/IVideo';
import baseCreateApi from './baseCreateApi';

export const videosApi = baseCreateApi.injectEndpoints({
  endpoints: (builder) => ({
    // fetchAllArticles: builder.query<IVideo[], unknown>({
    //   query: () => ({
    //     url: "/articles",
    //   }),
    //   async onQueryStarted(queryArgs, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       dispatch(setNfts(data));
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   },
    //   keepUnusedDataFor: 0,
    // }),
  }),
});

export const {} = videosApi;
